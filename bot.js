const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");

const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");

fs.readdir("./cmds/", (err, files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0){
	console.log("No commands to load!");
	return;
	}

	console.log(`Loading ${jsfiles.length}commands!`);

	jsfiles.forEach((f, i) => {
       let props = require(`./cmds/${f}`);
       console.log(`${i + 1} ${f} loaded!`);
       bot.commands.set(props.help.name, props);
	});
});

bot.on("ready", async () => {
	console.log(`Bot is ready! ${bot.user.username}`);
	console.log(bot.commands);
          try { let link = await bot.generateInvite(["ADMINISTRATOR"]);
         console.log(link);
    } catch(e) {
         console.log(e.stack);
    };

    bot.on("guildCreate", () => {
         bot.user.setActivity(bot.guilds.size + ' Servers | !cmds', {type: "LISTENING"});
     });
    bot.on("guildDelete", () => {
        bot.user.setActivity(bot.guilds.size + ' Servers | !cmds', {type: "LISTENING"});
    });
    bot.setInterval(() => {
        for(let i in bot.mutes) {
            let time = bot.mutes[i].time;
            let guildId = bot.mutes[i].guild;
            let guild = bot.guilds.get(guildId);
            let member = guild.members.get(i);
            let mutedRole = guild.roles.find(r => r.name === "Muted");
            if(!mutedRole) continue;

            if(Date.now() > time) {
                console.log(`${i} is now able to be unmuted!`);
                

                member.removeRole(mutedRole);
                delete bot.mutes[i];

                fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
                if(err) throw err;
                console.log(`I have unmuted ${member.user.tag}.`);
               }); 
                
            }

        }
    }, 5000)
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);

if(command === `${prefix}mute`) {
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission!");

	let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	if(!toMute) return message.channel.send("You did not specify a user mention or ID!");

	if(toMute.id === message.author.id) return message.channel.send("You cannot mute yourself.");
	if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot mute this user.");
    if(message.content.includes ("e+")) return message.reply("Please use a valid number!");
    if(message.content.includes (".")) return message.reply("Please use a valid number!");
    if(message.content.includes ("  ")) return message.reply("Please use a valid number!");
    if(isNaN(args[1])) return message.channel.send("Please use a valid number!");
    if(args[1].startsWith("-")) return message.channel.send("You cannot mute negative!");
    let role = message.guild.roles.find(r => r.name === "Speed Bot Muted"); 
    if(!role) {
   try{
         role = await message.guild.createRole({
            name: "Muted",
            color: "#000000",
            permissions: []
         });

         message.guild.channels.forEach(async (channel,id) => {
             await channel.overwritePermissions(role, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
             });
         });
    }catch(e) {
    console.log(e.stack);
    }
    }
    
    
    if(toMute.roles.has(role.id)) return message.channel.send("This user is already muted!");

    bot.mutes[toMute.id] = {
        guild: message.guild.id,
        time: Date.now() + parseInt(args[1]) * 60000
    }

    await toMute.addRole(role);
    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
         if(err) throw err;
         message.channel.send("I have muted this user for the specified amount of time!");
    });

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let embed = new Discord.RichEmbed()
    .setAuthor("Uh Oh!")
    .setDescription("You have been muted!")
    .addField("Time:", parseInt(args[1]) + " minutes" || "User did not specify a time.")
    .addField("Muted by", `${message.author.username}#${message.author.discriminator}`)
    .setColor("#329FB0");
    await message.guild.member(kUser).send(embed); 
    
    	return;
    }

    if(command === `${prefix}unmute`) {
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission!");

	let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	if(!toMute) return message.channel.send("You did not specify a user mention or ID!");

    let role = message.guild.roles.find(r => r.name === "Speed Bot Muted"); 
    
    if(!role || !toMute.roles.has(role.id)) return message.channel.send("This user is not muted!");

    await toMute.removeRole(role);
    delete bot.mutes[toMute.id];

    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
    if(err) throw err;
    message.channel.send(`I have unmuted ${toMute.user.tag}.`);
    });
   
    
	return;
    }

if(command === `${prefix}test`) {
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setDescription("Test complete!")
    .setColor("#329FB0")

    message.channel.send(embed);

    return;
    }

    if(command === `${prefix}cmds`) {
    message.channel.send("Here are the bots commands!");
    let embed = new Discord.RichEmbed()
    .setTitle("Commands")
    .setDescription("!cmds, !mute, !unmute, !kick, !ban, !botinfo, !warn, !nick, !fixname, !8ball, !pp, !purge, !serverinfo, !role, !derole, !gay, !bal, !pay")
    .setColor("#329FB0");
    message.channel.send(embed);
    return;
    }




});

bot.login(botSettings.token);