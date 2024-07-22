const admin = require('firebase-admin');
require('web-streams-polyfill/polyfill');

// Initialize Firebase Admin SDK
const serviceAccount = require('../mern-igm-b453e942aa81.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: `${process.env.PROJECT_ID}.appspot.com`
});

const bucket = admin.storage().bucket();

const uploadFileToFirebase = async (filePath, destination) => {
    const [file] = await bucket.upload(filePath, {
        destination: destination,
        metadata: {
            contentType: 'application/pdf',
        },
    });

    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500', // Long expiration time
    });
    return url;
};

module.exports = {
    uploadFileToFirebase
}