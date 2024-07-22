const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const saveHtmlToFile = async (htmlContent, fileName) => {
    const filePath = path.join(__dirname, fileName);
    fs.writeFileSync(filePath, htmlContent, 'utf8');
    return filePath;
};

async function generatePdf(products) {
    const validity = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });

    const totalAmount = products.reduce((acc, product) => acc + (product.rate * product.qty), 0);
    const gstPer = parseInt(process.env.GST);
    const grandTotal = totalAmount + gstPer;
    // Render HTML content using EJS
    const templatePath = path.join(__dirname, '../templates/invoiceTemplate.ejs');
    const htmlContent = await ejs.renderFile(templatePath, { products, validity, totalAmount, gstPer, grandTotal });

    const headerTemplatePath = path.join(__dirname, '../templates/invoiceHeader.html');
    const headerHtmlContent = fs.readFileSync(headerTemplatePath, 'utf-8');

    const footerTemplatePath = path.join(__dirname, '../templates/invoiceFooter.html');
    const footerHtmlContent = fs.readFileSync(footerTemplatePath, 'utf-8');

    // Save HTML to a local file
    const htmlFilePath = await saveHtmlToFile(htmlContent, '../templates/invoice.html');

    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: true, devtools: true });
    const page = await browser.newPage();
    await page.goto(`file://${htmlFilePath}`, { waitUntil: 'networkidle0', timeout: 60000 });
    const pdfPath = path.join(__dirname, '../templates/invoice.pdf');
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        timeout: 60000,
        displayHeaderFooter: true,
        headerTemplate: headerHtmlContent,
        footerTemplate: footerHtmlContent,
        margin: {
            top: '120px', // Adjust top margin to accommodate header
            bottom: '150px', // Adjust bottom margin to accommodate footer
            left: '20px',
            right: '20px'
        },
        printBackground: true,
    });
    await browser.close();
    return { pdfPath, htmlFilePath };
}

module.exports = {
    generatePdf
}