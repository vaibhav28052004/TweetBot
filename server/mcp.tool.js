import { config } from "dotenv"
import { TwitterApi } from "twitter-api-v2"
config()


const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

export async function createPost(status) {
    try {
        const newPost = await twitterClient.v2.tweet(status);

        return {
            content: [
                {
                    type: "text",
                    text: `Tweeted: ${status}`
                }
            ]
        };
    } catch (error) {
        console.error("Twitter error:", error);
        return {
            content: [
                {
                    type: "text",
                    text: `Failed to tweet. Reason: ${error.message || "Unknown error"}`
                }
            ]
        };
    }
}
