const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {

let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!kUser) return message.channel.send("You did not specify a user mention or ID!");
let replies = [" is 3% gay", " is 97% gay", " is 42% gay", " is 28% gay", " is 13% gay", " is 73% gay", " is 51% gay"];

let result = Math.floor((Math.random() * replies.length));
let question = args.slice(1).join(" ");

message.channel.send(kUser + replies[result]);


}

module.exports.help = {
	name: "gay"
}