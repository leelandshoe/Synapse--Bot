const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {

let kUser = message.guild.member(message.mentions.users.first());
if(!kUser) return message.channel.send("You did not specify a user mention!");
let kReason = args.join(" ").slice(22);
if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("I cannot derole this user!");
if(kUser.hasPermission("MANAGE_ROLES")) return message.channel.send("This user cannot be derolled.");


let role = message.guild.roles.find(r => r.name === kReason); 
 if(!role) return message.channel.send("This role does not exist.");
 if(!kUser.roles.has(role.id)) return message.channel.send("This user does not have that role.");
kUser.removeRole(role);
message.channel.send("The role has been removed from the user.");
return;

}

module.exports.help = {
	name: "derole"
}