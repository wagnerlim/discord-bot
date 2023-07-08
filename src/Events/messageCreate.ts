import { ChannelType, Client, Message, Permissions } from "discord.js";
import { Event } from "../Interfaces";
import dotenv from "dotenv";
dotenv.config();

export const event: Event = {
  name: "messageCreate",
  run: async (client: Client, message: Message) => {
    if (message.channel.type === ChannelType.DM) return;
    if (message.author.bot) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const cmd = args.shift()?.toLowerCase();

    message.reply("Hi");
  },
};
