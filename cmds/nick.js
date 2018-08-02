const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {

let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
let kUser = message.guild.member(message.mentions.users.first());
let kUser2 = message.guild.members.get(args[0]);
let kReason = args.join(" ").slice(19);
let kReason2 = args.join(" ").slice(22);

if(!pUser) return message.channel.send("You did not specify a user mention or ID!");
if(!kReason) return message.channel.send("Please specify a name.");
if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("You do not have permission!");
if(pUser.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("This user cannot be nicknamed.");

if(kUser2) message.guild.member(kUser2).setNickname(kReason);
if(kUser) message.guild.member(kUser).setNickname(kReason2);
message.channel.send("I have nicked the specified user.");


}

module.exports.help = {
	name: "nick"
}


