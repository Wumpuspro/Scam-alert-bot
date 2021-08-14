const Scam = require("../Schema/ScamSchema");
const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const moment = require("moment")

module.exports = {
  name: "scam-alert",
  aliases: ["case-info", "uidinfo", "uid-info"],
  categories: "scam list",
  permissions: " ",
  description: "Send information about case",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
  let CaseInfo = args[0];
  if (!CaseInfo) return message.channel.send(`**Please Provide The Case UID**`);

  let UidInfo = await Scam.findOne({ CaseUID: CaseInfo });
  if (!UidInfo)
    return message.channel.send(`**No Case Found With The Provided UID**`);

  let embed = new discord.MessageEmbed()
    .setTitle(`Scam Details`)
    .setDescription(
      `
-----------------------------------------------------------------------
**__Case Reporter Was__** : \`${UidInfo.Reporter}\`
 **__Reported Person Name / Scammer Was__** : \`${UidInfo.ScammerName}\`
 **__Reported Person ID / Scammer ID Was__** : \`${UidInfo.ScammerID}\`
 **__The Description Provided__** : \`${UidInfo.ScamReason}\`
 **__Scammer Server Details__** : \`${UidInfo.ServerDetails}\`
**__Some Attachments__** : ${UidInfo.Attachment}
-----------------------------------------------------------------------
`
    )
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
  
  
  message.channel.send(embed);
};
