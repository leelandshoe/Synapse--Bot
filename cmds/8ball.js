const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {


if(!args[2]) return message.channel.send("Please ask a full question.");
let replies = ["Yes.", "No.", "I dont know.", "Ask again later"];

let result = Math.floor((Math.random() * replies.length));
let question = args.slice(1).join(" ");

message.channel.send(replies[result]);


}

module.exports.help = {
	name: "8ball"
}