import {
  Client,
  Collection,
  ApplicationCommandDataResolvable,
} from "discord.js";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { readdirSync } from "fs";
import { Command, Event, RegisterCommandOptions } from "../Interfaces";

class Krzbot extends Client {
  commands: Collection<string, Command> = new Collection();
  events: Collection<string, Event> = new Collection();
  aliases: Collection<string, RegisterCommandOptions> = new Collection();
  config = process.env;

  public constructor() {
    super({
      intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent",
        "GuildMessageReactions",
        "GuildMembers",
      ],
      partials: [],
    });
  }

  async importFile(filePath: string) {
    return (await import(filePath))?.slash;
  }

  async registerCommands({ commands, guildId }: RegisterCommandOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log("Commands Successful loaded");
    } else {
      this.application?.commands.set(commands);
      console.log(`Registered basic commands`);
    }
  }

  async registerModules() {
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandPath = path.join(__dirname, "..", "Commands");

    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) =>
        file.endsWith(".ts")
      );
      commands.forEach(async (file) => {
        const command: Command = await this.importFile(
          `${commandPath}/${dir}/${file}`
        );
        console.log("command :>> ", command);
        console.log(`${command.name} Successful loaded!`);
        if (!command.name) return;
        this.commands.set(command.name, command);
        slashCommands.push(command);
      });
    });

    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: `${this.config.TESTSERVER}`,
      });
    });
  }

  public async init() {
    this.login(this.config.token);
    this.registerModules();

    if (!this.config.TESTSERVER) console.log("No test servers configured!");

    const eventPath = path.join(__dirname, "..", "Events");
    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await import(`${eventPath}/${file}`);
      this.events.set(event.name, event);
      this.on(event.name, event.run.bind(null, this));
    });
  }
}

export default Krzbot;
