const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {


let kUser = message.guild.member(message.mentions.users.first());
let kReason = args.join(" ").slice(22);


if(!kUser) return message.channel.send("You did not specify a user mention!");
if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have permission!");
if(kUser.hasPermission("MANAGE_ROLES")) return message.channel.send("This user cannot be rolled.");


let role = message.guild.roles.find(r => r.name === kReason);

 if(!role) return message.channel.send("This role does not exist.");
 if(kUser.roles.has(role.id)) return message.channel.send("This user already has that role.");
if(kReason) kUser.addRole(role);
message.channel.send("The role has been added to the user.");
return;

}

module.exports.help = {
	name: "role"
}


