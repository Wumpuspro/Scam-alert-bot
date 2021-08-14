const Scam = require("../Schema/ScamSchema");
const discord = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
let UID = require("../Tools/ScamUID.js");
const moment = require("moment")

module.exports = {
  name: "remove",
  aliases: ["user-remove"],
  categories: "scam-list",
  permissions: " ",
  description: "Remove",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
  let element = args[0];
  if (!element)
    return message.channel.send(
      `**Please Provide The Case UID To Remove From ScamList**`
    );
  Scam.findOneAndDelete({ CaseUID: element }, (err, data) => {
    if (err) return message.channel.send(err);
    if (!data)
      return message.channel.send(`**No Case Or Scammer Found With This UID**`);

    let embed = new discord.MessageEmbed()
      .setTitle(`Removed Case From ScamList`)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`
__Case UID__ : ${element}
**Now The Case Has Been Removed From The ScamList**`);
     return interaction.followUp({ embeds: [embed] });
  });
};
