const {
    InvalidTokenError,
    UnauthorizedError,
    InsufficientScopeError,
} = require("express-oauth2-jwt-bearer");

// Define custom error class (DBError) to handle database errors
class DBError extends Error {
    constructor(message) {
        super(message);
        this.name = "DBError";
        this.status = 500;
    }
}

const errorHandler = (error, request, response, next) => {
    console.error(error);

    if (error instanceof InsufficientScopeError) {
        const message = "Permission denied";

        response.status(error.status).json({ message });

        return;
    }

    if (error instanceof InvalidTokenError) {
        const message = "Bad credentials";

        response.status(error.status).json({ message });

        return;
    }

    if (error instanceof UnauthorizedError) {
        const message = "Requires authentication";

        response.status(error.status).json({ message });

        return;
    }

    if (error instanceof DBError) {
        const message = "Database error";

        response.status(error.status).json({ message });

        return;
    }

    const status = 500;
    const message = "Internal Server Error";

    response.status(status).json({ message });
};

module.exports = {
    errorHandler,
    DBError
};