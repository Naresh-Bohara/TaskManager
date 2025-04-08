const HttpStatus = {
    NOT_FOUND: {statusCode: 404, message: "Not Found", status: "NOT_FOUND"},
    INTERNAL_SERVER_ERROR: {statusCode: 500, message: "Internal Server Error", status: "INTERNAL_SERVER_ERROR"},
    UNAUTHENTICATED: { statusCode: 401, message: "Unauthenticated", status: "UNAUTHENTICATED" },
    UNAUTHORIZED: { statusCode: 403, message: "Unauthorized", status: "UNAUTHORIZED" },
    BAD_REQUEST: { statusCode: 400, message: "Bad Request", status: "BAD_REQUEST" },

    OK:{ statusCode: 200, message: "Success", status: "SUCCESS" }
}

export default HttpStatus;