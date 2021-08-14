const { Client, Message, MessageEmbed } = require('discord.js');
const Scam = require("../Schema/ScamSchema");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
let tool = require("lodash");
const moment = require("moment")

module.exports = {
    name: "ulist",
    aliases: ["scam-list", "list"], 
    categories : "scam-list", 
    permissions : '', 
    description: "Show scammers list",
    usage: '',
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
  let ErrorEmbed = new MessageEmbed()
    .setTitle(`:x: Error`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setDescription(` **No Scammers Found**`)
    .setTimestamp()
    .setColor(ee.color)
    .setFooter(ee.footertext, ee.footericon)

  Scam.find({ Collection: "ScamCollection" }, async (err, data) => {
    if (err) return message.channel.send(err);
    if (!data) return message.channel.send(ErrorEmbed);

    if (data && data.length) {
      let array = await Promise.all(
        data.map(
          (m) =>
            `**__Name__** : \`${m.ScammerName}\` | **__ID__** : \`${m.ScammerID}\` | **__Server Details__** : \`${m.ServerDetails}\` | **__Case UID__** : \`${m.CaseUID}\``
        )
      );
      array = await tool.chunk(array);
      array = await Promise.all(
        array.map((uScam) => {
          let ScamEmbed = new MessageEmbed()
            .setTitle(`Scammers List`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setDescription(`${uScam.join("\n\n")}`)
  
