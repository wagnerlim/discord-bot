import { Client, IntentsBitField, Invite } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  // intents: [
  //   IntentsBitField.Flags.Guilds,
  //   IntentsBitField.Flags.GuildMessages,
  //   IntentsBitField.Flags.MessageContent,
  // ],
  intents: [
    "Guilds",
    "GuildMessages",
    "MessageContent",
    "GuildMessageReactions",
    "GuildMembers",
  ],
});

client.on("ready", () => {
  console.log("Discord-bot on!");
});

client.on("messageCreate", (message) => {
  console.log("message :>> ", message);
  if (message.content === "Oi") message.reply("Olá mundo!");
  message.react("🚀");
});

client.on("inviteCreate", (Invite) => {
  Invite.maxUses = 1;
  console.log("Invite :>> ", Invite);
  console.log(`Invited createdBy ${Invite.targetUser}`);
});

client.login(process.env.DISCORD_TOKEN);
