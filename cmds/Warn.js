const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {

let kUser = message.guild.member(message.mentions.users.first());
let kReason = args.join(" ").slice(22);
if(!kUser) return message.channel.send("You did not specify a user mention!");
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission!");
if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This user cannot be warned.");

let embed = new Discord.RichEmbed()
    .setAuthor("Uh Oh!")
    .setDescription("You have been warned!")
    .addField("Reason:", kReason || "User did not specify a reason.")
    .addField("Warned by", `${message.author.username}#${message.author.discriminator}`)
    .setColor("#329FB0");
    await message.guild.member(kUser).send(embed); 
    message.channel.send("User has been warned.")

}

module.exports.help = {
	name: "warn"
}