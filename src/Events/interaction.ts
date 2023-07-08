import {
  Interaction,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import { Event } from "../Interfaces";
import { ExtetendInteraction } from "../Interfaces/Command";

export const event: Event = {
  name: "interactionCreate",
  run: async (client, interaction: Interaction) => {
    if (interaction.isCommand()) {
      await interaction.deferReply();
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        return interaction.reply("Command not found!");
      }

      command.run({
        args: interaction.options as CommandInteractionOptionResolver,
        client,
        interaction: interaction as ExtetendInteraction,
      });
    }
  },
};
