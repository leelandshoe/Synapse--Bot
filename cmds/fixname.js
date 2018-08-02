const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {

let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
let kReason = args.join(" ").slice(22);
if(!kUser) return message.channel.send("You did not specify a user mention or ID!");
if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("You do not have permission!");
if(kUser.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("This users name cannot be fixed .");

message.guild.member(kUser).setNickname(" ");
message.channel.send("I have fixed the specified users name.");


}

module.exports.help = {
	name: "fixname"
}