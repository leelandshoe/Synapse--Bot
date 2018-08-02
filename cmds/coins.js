const Discord = module.require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {

if(!coins[message.author.id]){
	coins[message.author.id] = {
		coins: 100
	};
}

let uCoins = coins[message.author.id].coins;

message.channel.send('You have ' + uCoins + ' Synbucks!');

}

module.exports.help = {
	name: "bal"
}