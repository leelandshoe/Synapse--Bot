const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {

let guild = message.guild

    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setDescription("Here is the servers info!")
    .setColor("#329FB0")
    .setThumbnail(guild.iconURL)
    .addField("Server name", guild.name)
    .addField("ID", guild.id)
    .addField("Created at", guild.createdAt)
    .addField("Owner", guild.owner)
    .addField("Owner ID", guild.ownerID)
    .addField("Server region", guild.region)
    .addField("Members", guild.memberCount);
    message.channel.send(embed);

    return;
    }

module.exports.help = {
	name: "serverinfo"
}