const successResponse = (payload, message) => {
    const response = {
        success: true,
        data: payload,
        message: message
    }
    return { code: 200, data: response }
}

const errorResponse = (message, code) => {
    const response = {
        success: false,
        error: {
            code: code,
            message: message
        }
    }
    return { code: code, data: response }
}

module.exports = {
    successResponse,
    errorResponse
}