const Discord = module.require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");
let cooldown = new Set();
let cdseconds = 3;

module.exports.run = async (bot, message, args) => {

if(cooldown.has(message.author.id)){
	return message.reply("You must wait 3 seconds before paying again! ");
}

setTimeout(() => {
	cooldown.delete(message.author.id)
}, cdseconds * 1000)

cooldown.add(message.author.id);

let pUser = message.guild.member(message.mentions.users.first());
let kReason = args.join(" ").slice(22);
if(!pUser) return message.channel.send("You did not specify a user mention!");
if(!kReason) return message.channel.send("Please send a number.");

if(!coins[message.author.id]){
	return message.reply("You do not have any Synbucks!")
}


if(pUser.id === message.author.id) return message.channel.send("You cannot pay yourself.");
if(!coins [pUser.id]){
	coins[pUser.id] = {
		coins: 1000
	};
}

let pCoins = coins[pUser.id].coins;
let sCoins = coins[message.author.id].coins;

if(sCoins < args[1]) return message.reply("You do not have enough Synbucks!");
if(message.content.includes ("e+")) return message.reply("Please send a valid number!");
if(message.content.includes ("e")) return message.reply("Please send a valid number!");
if(message.content.includes (".")) return message.reply("Please send a valid number!");
if(message.content.includes ("  ")) return message.reply("Please send a valid number!");
if(args[1].startsWith("-")) return message.channel.send("You cannot send negative Synbucks!");
if(isNaN(args[1])) return message.channel.send("You can only send numbers!");


coins[message.author.id] = {
	coins: sCoins - parseInt (args[1])
};

coins[pUser.id] = {
	coins: pCoins + parseInt(args[1])
};

message.channel.send(`You have sent ${pUser} ${args[1]} Synbucks`)

fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
	if(err) console.log (err)
});

}

module.exports.help = {
	name: "pay"
}