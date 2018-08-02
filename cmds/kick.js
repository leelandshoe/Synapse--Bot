const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {

let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!kUser) return message.channel.send("You did not specify a user mention or ID!");
let kReason = args.join(" ").slice(22);
if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have permission!");
if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("This user cannot be kicked.");

 let embed = new Discord.RichEmbed()
    .setAuthor("Uh Oh!")
    .setDescription("You have been kicked from the server!")
    .addField("Reason:", kReason || "User did not specify a reason.")
    .addField("Kicked by", `${message.author.username}#${message.author.discriminator}`)
    .setColor("#329FB0");
    await message.guild.member(kUser).send(embed); 
    message.guild.member(kUser).kick(kReason);

  let embed1 = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setDescription(kUser + ' has been kicked!')
    .setColor("#329FB0");
    message.channel.send(embed1);

return;

}

module.exports.help = {
	name: "kick"
}