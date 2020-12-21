require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "$";

client.on('ready', ()=>{
    console.log(`${client.user.username}`);
});
client.on('message',(message)=>{
          if(message.author.bot) return;
       //   console.log(`[${message.author.tag}]: ${message.content}`);
          if(message.content === 'hello'){
              message.channel.send('hello');
          }
});

client.on('message',(message)=>{
    if(message.author.bot) return;
  
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split("/\s+/");

        if(CMD_NAME === 'kick'){
            if(!message.member.hasPermission('KICK_MEMBER'))
                  return message.reply('you do not hae permission to use that command');
               if(args.length === 0)
                return message.reply('Please proivde an ID ');
               const member = message.guild.members.cache.get(args[0]);
               if(member){
                   member
                   .kick()
                   .then((member)=>message.channel.send(`${member} was kicked`))
                   .catch((err)=> message.channel.send('I do not have permissions: ('));
               }else{
                   message.channel.send('That member was not found');
               }
        }else if(CMD_NAME === 'ban'){
            if(!message.member.hasPermission('BAN_MEMBER'))
            return message.reply('you do not hae permission to use that command');
            if(args.length === 0) return message.reply("Please provide an ID");
            message.guild.members.ban(args[0])
               .catch((err)=>console.log(err));
        }
        
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);