/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Bot, Context, InputFile, webhookCallback } from 'grammy';

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
	BOT_INFO: string;
	BOT_TOKEN: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const bot = new Bot(env.BOT_TOKEN, { botInfo: JSON.parse(env.BOT_INFO) });

		bot.command('start', async (ctx: Context) => {
			await ctx.reply('Hello, world!');
		});

		bot.on('message:voice', async (ctx) => {
			const params = {
				reply_parameters: {
					message_id: ctx.msg.message_id,
				},
			};
			try {
				// Get the file_id of the voice message
				const fileId = ctx.message.voice.file_id;
				const chatId = ctx.msg.chat.id;

				// Use getFile() to get the file info
				const file = await ctx.api.getFile(fileId);

				// Generate the file URL
				const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
				console.log('url is', fileUrl, 'path is', file.file_path);

				const downloadedFile = new InputFile(new URL(fileUrl));
				const xx = await fetch(fileUrl).then((res) => res.bytes());

				const formData = new FormData();
				// formData.append('file', xx);
				// const response = await fetch('http://localhost:8000/gett', {
				// 	method: 'post',
				// 	body: formData,
				// });
				await bot.api.sendVoice(chatId, downloadedFile, params);
				await bot.api.sendVoice(chatId, new InputFile(xx), params);
				console.log('file is', downloadedFile);

				await ctx.reply('Voice message has been successfully downloaded and processed.');
			} catch (error) {
				console.error('Error downloading voice message:', error);
				await ctx.reply('Failed to download the voice message.');
			}
		});

		bot.on('message', async (ctx) => {
			const message = ctx.message;
			const chatId = ctx.msg.chat.id;
			const params = {
				reply_parameters: {
					message_id: ctx.msg.message_id,
				},
			};
			await ctx.replyWithPhoto('https://grammy.dev/images/grammY.png', params);
		});

		return webhookCallback(bot, 'cloudflare-mod')(request);
	},
};
