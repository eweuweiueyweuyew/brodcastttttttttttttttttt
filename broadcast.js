const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
	client.user.setStatus("dnd");
});

const moment = require("moment");
client.on('message', async message => {
    if (!message.channel.guild) return undefined;
    let time = moment().format('Do MMMM YYYY , hh:mm');
    let args = message.content.split(" ").slice(1).join(" ");
    if(message.content.startsWith(prefix + "bc")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_SERVER")) return message.reply("**# You don't have the needed permissions!**");
        if(!args) return message.reply("**# Supply a message!**");
        message.channel.send(`\`\`- Name:\`\`\n${message.author}\n\n\`\`- Date:\`\`\n${time}\n\n\`\`- Message:\`\`\n${args}\n\n__# | You have 15s to say Yes or No__`)
.then(() => {
  message.channel.awaitMessages(response => response.content === 'yes', {
    max: 1,
    time: 15000,
    errors: ['time'],
  })
  .then((collected) => {
                let bcEmbed = new Discord.RichEmbed()
          .setAuthor(`${message.author.username}#${message.author.discriminator}`,message.author.avatarURL)
          .setThumbnail(message.guild.iconURL || message.guild.avatarURL)
          .addField('- Sender:',message.author)
          .addField('- Server:',message.guild.name)
          .addField('- Message:',`\`\`\`${args}\`\`\``);
          message.guild.members.forEach(m => m.sendMessage(bcEmbed));
          message.channel.send(`**Done!, Sent the message to: \`${message.guild.members.size}\` members!**`);
      
  });
});
    } else {
          message.channel.awaitMessages(response => response.content === 'no', {
    max: 1,
    time: 15000,
    errors: ['time'],
  })
  .then((collected) => {
      message.channel.send("__- Canceled!__")
    });
    }
});
client.login(process.env.Fadi);
