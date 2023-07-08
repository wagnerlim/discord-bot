import { Command } from "../../Interfaces";

export const slash: Command = {
  name: "pickleader",
  description: "Pega um membro para ser o organizador da daily",
  testOnly: false,
  run: ({ interaction }) => {
    console.log("interaction :>> ", interaction);
    return interaction.followUp({
      content: `O ping do bot é de estimados ${interaction.client.ws.ping} ms.`,
    });
  },
};
