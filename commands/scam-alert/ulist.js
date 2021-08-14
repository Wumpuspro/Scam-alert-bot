const { Client, Message, MessageEmbed } = require('discord.js');
const Scam = require("../Schema/ScamSchema");
let tool = require("lodash");

module.exports = {
    name: "ulist",
    aliases: ["scam-list", "list"], 
    categories : "other", 
    permissions : 'Embed', 
    description: "Show scammers list",
    cooldown : 10000,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
  let ErrorEmbed = new MessageEmbed()
    .setTitle(`:x: Error`)
    .setDescription(` **No Scammers Found**`)
    .setColor(`RANDOM`)
    .setTimestamp()
    .setFooter(`ScamAlert `);

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
            .setDescription(`${uScam.join("\n\n")}`)
            .setColor("RANDOM")
            .setFooter(
              `${message.author.username} You Can Get Details About The Case By Doing a!caseinfo <uid>`
            );
          message.channel.send(ScamEmbed);
        })
      );
    }
  });
};
