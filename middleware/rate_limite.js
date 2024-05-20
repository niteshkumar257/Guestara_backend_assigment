import {rateLimit} from "express-rate-limit"

export const passwordLimiter=rateLimit({
    limit: async (req, res) => {
        console.log(req.rateLimit);
		if (await isPremium(req.user)) return 10
		else return 5
	},
    windowMs:30*60*1000,
    message:"Maximum Number of tries please try again after some time"
})
export const requestLimiter=rateLimit({
    limit: async (req, res) => {
        console.log(req.rateLimit);
        return 100;

	},
    windowMs:60*60*1000,
    message:"More number of request"
})