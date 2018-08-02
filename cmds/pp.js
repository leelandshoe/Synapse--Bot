const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {

let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!kUser) return message.channel.send("You did not specify a user mention or ID!");
let replies = [" has a big penis.", " has a small penis.", " has a very big penis.", " has a very small penis."];

let result = Math.floor((Math.random() * replies.length));
let question = args.slice(1).join(" ");

message.channel.send(kUser + replies[result]);


}

module.exports.help = {
	name: "pp"
}