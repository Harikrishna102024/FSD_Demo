import rateLimit from "express-rate-limit";

const limit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {
        res.status(429).json({
            message: "Too many requests. Please try again after 15 minutes."
        });
    }
});

export default limit;