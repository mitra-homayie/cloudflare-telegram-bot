
# Cloudflare Telegram Bot

A Cloudflare Worker Telegram bot that responds to user commands via Telegram.

## Setup

### Requirements
- You need to get a bot token from Telegram's [BotFather](https://t.me/BotFather). This token will be used to authenticate your bot.

### Environment Variables
To run the bot, you'll need to provide the `BOT_TOKEN` environment variable.

#### 1. On Local Development
- Create a `.dev.vars` file and add your `BOT_TOKEN`:
  ```env
  BOT_TOKEN=your-telegram-bot-token
  ```

#### 2. In `wrangler.toml` (for Cloudflare Workers)
Add your bot's information to the `wrangler.toml` file under the `[vars]` section. You can use the structure below, replacing it with your bot's actual details:
```toml
[vars]
BOT_INFO = """{
  "id": 8053984427,
  "is_bot": true,
  "first_name": "test",
  "username": "voice2Test2bot",
  "can_join_groups": true,
  "can_read_all_group_messages": false,
  "supports_inline_queries": true,
  "can_connect_to_business": false
}"""
```

## Deployment

To deploy the Course Tracker app, follow these steps:

1. [Create a new Cloudflare account](https://dash.cloudflare.com/sign-up) if you don't have one.

2. After creating your Cloudflare account, follow these steps to deploy the app:

   - Go to **Workers & Pages** page on your dashboard.
   - Click on the **Create** button.
   - Choose the **Pages** tab to connect to your Github account.
   - Provide access to this repository by connecting it to your GitHub account.
   - Configure the deployment settings as needed (e.g., environment variables).
   - Deploy the app.

3. Once the deployment is complete, Cloudflare will provide you with a unique URL for your deployed Telegram Bot. Use this URL and your bot's token to let Telegram know your bot's URL:
```
https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=YOUR_CLOUDFLARE_URL
```
YOUR_CLOUDFLARE_URL could be something like this: https://test-bot.aldeon.workers.dev/

## Running the Bot

Once the `BOT_TOKEN` is properly configured:
- For local development, the token must be in the `.dev.vars` file.
- For deployment on Cloudflare Workers, ensure the `BOT_INFO` is correctly set in `wrangler.toml`.

Happy coding!

Alternatively you could visit [grammy's website](https://grammy.dev/hosting/cloudflare-workers-nodejs) to create a Telegram bot for yourself. I've used the same information for this repo
