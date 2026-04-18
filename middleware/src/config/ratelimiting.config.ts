import rateLimit from "express-rate-limit";

const limit = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    keyGenerator: (req) => {
        return req.body.email + req.ip;
    },
    handler: (req: any, res: any) => {
        const reminingTime = Math.ceil((req.rateLimit.resetTime - Date.now()) / (60 * 1000));
        res.status(429).json({
            limitMessage: `Too many requests. Please try again after ${reminingTime} minutes.`,
        });
    }
});

export default limit;

export const reminingAttempts = (req: any) => {
    const reminingAttempts = req.rateLimit.remaining;
    return reminingAttempts;
}