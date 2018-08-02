const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {
	let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission!");


async function purge() {
	message.delete();


	if (isNaN(args[0])) {
		message.channel.send("Please make sure you use a number!");
		return;
	}

	const fetched = await message.channel.fetchMessages({limit: args[0]});
	message.channel.bulkDelete(fetched)
	.catch(error => message.channel.send("Oops! There was an error."));
}

purge();

}

module.exports.help = {
	name: "purge"
}