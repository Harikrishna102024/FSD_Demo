import rateLimit from "express-rate-limit";

const limit = rateLimit({
    windowMs:  5 * 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,

    handler: (req: any, res: any) => {
        const retryAfter = Math.ceil((req.rateLimit.resetTime.getTime() - Date.now()) / 1000);
        const minutes = Math.ceil(retryAfter / 60);
        res.status(429).json({
            message: `Too many requests. Please try again after.`,
            retryAfter 
        });
    }
});

export default limit;