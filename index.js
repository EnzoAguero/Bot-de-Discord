const Discord = require('discord.js');  //modulo instalado de discord.js
const client = new Discord.Client();  //El client es el bot el cual recibe y envia mensajes devuelta y demas //cuando determino un objeto con el new me devuelve un objeto
const chiste = require("./chistes.js")
const config = require('./config.json')
const prefix = config.prefix
const user = require('./user.js');
let fecha = new Date();
let fechaDia = fecha.getDate();
let fechaMes = fecha.getMonth() + 1;
let horario = fecha.getHours()
const ytdl = require('ytdl-core');
const search = require('youtube-search');
const ffmpeg = require("ffmpeg-static");

//<-- Parte de la musica -->



client.on('ready', () => {                //esto es un evento            //cuando el bot esta listo ingresa el mensaje

    console.log(`Logeada como ${client.user.tag}! en Discord`);
    birthdays()
});

function birthdays() {
    user.forEach(usuario => {
        if (fechaDia === usuario.dia_nacimiento && fechaMes === usuario.mes_nacimiento) {
            if (horario == '12') {
                console.log('Feliz cumple');
                client.channels.fetch('844252977820467220') /* '836028558321123333' */ /* 295351539923550209 */
                    .then(channel => {
                        channel.send(`@everyone diganle feliz cumple ${usuario.nombre} ${usuario.apellido}:partying_face: :partying_face: denle muchos regalitos uwu  `);
                    })
            }
        }
    }
    )
}
/* client.on('message', message => {
   //recibiendo el mensaje y lo muestro por consola aca
   console.log(message.content);
   message.reply("mensaje")
 
 }); */
client.on('message', message => {                                      //recibo un mensaje en discord

    

    //convierte el string en minusculas
    let mensaje = message.content.toLowerCase()
    console.log(mensaje)
    if (mensaje.startsWith(config.prefix + 'ping')) {                                // si el mensaje contiene el prefix que es ! mas ping
        return message.reply('Pong!');                                                           //responde esto
        //me responde el mensaje con lo que le pase 
    }
    mensaje === 'hola cata' ? message.reply('Holis c:') : null
    mensaje === 'gracias cata' ? message.reply('No hay ningun problema, fui creada para ayudar') : null   //si el contenido del mensaje es ...    //me responde esto a TODO el canal                                                      
    mensaje === 'chau cata' ? message.reply('Adios, me voy a mimir') : null


    if (mensaje.startsWith(config.prefix + 'chistes')) {
        message.reply(chiste[Math.floor(Math.random() * chiste.length)])
    }

    const user = message.author;
    const member = message.member;

    if (mensaje.startsWith(config.prefix + 'pj')) {
        const embed = new Discord.MessageEmbed()

        .setAuthor('Username: ' + user.tag, user.avatarURL())
        .setThumbnail(user.avatarURL())
        .addField('Creación de la cuenta', user.createdAt.toLocaleDateString(), true)
        .addField('Estado', user.presence.status, true)
        .addField('Apodo', member.nickname ? member.nickname : 'No tiene', true)
        .addField('Roles',
            message.member.roles.cache.map(rol => '`' + rol.name + '`').join(', ')
        )
        .setFooter('ID: ' + user.id)

    message.channel.send({ embed });
    }

// *************************//MUSICA//********************** */
    
var queue = {
    nowplayng: [],
    list: []
};
var disp;

client.on("message", async (message) => {

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

  if(message.content.startsWith(prefix)) {

    if(command.toLowerCase() == 'play' || command == 'p') {
        if (message.member.voice.channel) {
            async function play() {
                const connection = await message.member.voice.channel.join();     //Se conecta al canal de donde se envio el mensaje
                const dispatcher = connection.play(await ytdl(queue.list[0], { filter: 'audio' }));     //El dispatcher me tira el play desde la conecction, es decir el bot que se conecto al canal de voz 
                disp = dispatcher;
        
                dispatcher.on('start', async () => {
                    queue.nowplayng[0] = queue.list[0];
                    await queue.list.shift();
                });

                dispatcher.on('finish', async () => {
                    if(!queue.nowplayng[0]) {  //Si no hay ninguna cancion
                        var m = await message.channel.send('No queda ninguna cancion...');
                        queue.list = [];
                        queue.nowplayng = [];
                        dispatcher.destroy();
                        connection.disconnect();
                        message.member.voice.channel.leave();  //Si no hay cancion, se va del canal
                        await m.delete({ timeout: 5000 })
                        return
                    } else {
                        play();
                    }
                });
            }


            if(args[0]) {
                if(!queue.nowplayng[0]) {
                    queue.list.push(`${args.slice(0).join(' ')}`);
                    play();
                } else {
                    queue.list.push(`${args.slice(0).join(' ')}`);
                    var m = await message.channel.send(`Se añadio a la cola ${args.slice(0).join(' ')}`)
                    await m.delete({ timeout: 5000 });
                    return
                }
            } else {
                var m = await message.channel.send('Debes de poner un **Link de YouTube**')
                await m.delete({ timeout: 5000 });
                return
            }
        } else {
            var m = await message.channel.send('Debes de estar en un canal de voz')
            await m.delete({ timeout: 5000 });
            return
        }
    }

    if(command == 'pause' || command == 'pa') {
        if (message.member.voice.channel) {
            if(!queue.nowplayng[0]) {
                var m = await message.channel.send('No hay ninguna cancion')
                await m.delete({ timeout: 5000 });
                
            } else {
                disp.pause(true);
                var m = await message.channel.send('Se pauso la musica')
                await m.delete({ timeout: 15000 });
               
            }
        } else {
            var m = await message.channel.send('Debes de estar en un canal de voz')
            await m.delete({ timeout: 5000 });
            return
        }
    }

    if(command == 'resume' || command == 'r') {
        if (message.member.voice.channel) {
            if(!queue.nowplayng[0]) {
                var m = await message.channel.send('No hay ninguna cancion')
                await m.delete({ timeout: 5000 });
                return
            } else {
                disp.resume();
                var m = await message.channel.send('Que siga el bailongo')
                await m.delete({ timeout: 5000 });
                return
            }
        } else {
            var m = await message.channel.send('Debes de estar en un canal de voz')
            await m.delete({ timeout: 5000 });
            return
        }
    }

    if(command == 'now' || command == 'song') {
        if (message.member.voice.channel) {
            if(!queue.nowplayng[0]) {
                var m = await message.channel.send('No hay ninguna cancion')
                await m.delete({ timeout: 5000 });
                return
            } else {
                var m = await message.channel.send(`Ahora esta sonando: ${queue.nowplayng[0]}`)
                await m.delete({ timeout: 5000 });
                return
            }
        } else {
            var m = await message.channel.send('Debes de estar en un canal de voz')
            await m.delete({ timeout: 5000 });
            return
        }
    }

    if(command == 'skip' || command == 's') {
        if (message.member.voice.channel) {
            if(!queue.nowplayng[0]) {
                var m = await message.channel.send('No hay ninguna cancion')
                await m.delete({ timeout: 5000 });
                return
            } else {
                disp.emit('finish');
                var m = await message.channel.send('Se salto de cancion')
                await m.delete({ timeout: 5000 });
                return
            }
        } else {
            var m = await message.channel.send('Debes de estar en un canal de voz')
            await m.delete({ timeout: 5000 });
            return
        }
    }

    if(command == 'clear-queue' || command == 'cq') {
        if (message.member.voice.channel) {
            if(!queue.nowplayng[0]) {
                var m = await message.channel.send('No hay ninguna cancion')
                await m.delete({ timeout: 5000 });
                return
            } else {
                queue.list = [];
                var m = await message.channel.send('Se elimino la queue')
                await m.delete({ timeout: 5000 });
                return
            }
        } else {
            var m = await message.channel.send('Debes de estar en un canal de voz')
            await m.delete({ timeout: 5000 });
            return
        }
    }

    if(command == 'stop' || command == 'end') {
        if (message.member.voice.channel) {
            if(!queue.nowplayng[0]) {
                var m = await message.channel.send('No hay ninguna cancion')
                await m.delete({ timeout: 5000 });
                return
            } else {
                queue.list = [];
                queue.nowplayng = [];
                disp.emit('finish');
                var m = await message.channel.send('Se paro la musica y se elimino la queue')
                await m.delete({ timeout: 5000 });
                return
            }
        } else {
            var m = await message.channel.send('Debes de estar en un canal de voz')
            await m.delete({ timeout: 5000 });
            return
        }
    }

    if(command == 'queue' || command == 'q') {
        if(!args[0]) {
            function mapas(contenido) {
                let q = contenido.map((song, i) => {
                return `${i === 0 ? '1' : `${i+1}`} -> ${song}`
            }).join('\n\n');       
                return `${q}`
            }

            if(!queue.list[0]) {
                var m = await message.channel.send('No hay ninguna queue usa !now o !song para ver cual esta sonando ahora')
                await m.delete({ timeout: 5000 });
                return
            } else {

                var playngnow;

                if(queue.nowplayng[0] == undefined) {
                    playngnow = 'No hay ninguna cancion sonando...';
                } else {
                    playngnow = `${queue.nowplayng[0]}`;
                }


            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Queue')
            .setTimestamp()
            .setDescription(`\nAhora -> ${playngnow}
            
            ${mapas(queue.list)}`);
            
            var m = await message.channel.send(embed)
            await m.delete({ timeout: 30000 });
            return
            }
        } else {
            queue.list.push(`${args.slice(0).join(' ')}`);
            var m = await message.channel.send('Se añadio **`' + args.slice(0).join(' ') + '`** a la lista de la queue')
            await m.delete({ timeout: 5000 });
            return
        }
       }
  }
});
    
   
    
    
    
});


client.on("guildMemberAdd", (member) => {
    let canal = client.channels.cache.get('629721506842411049');
    canal.send(`Bienvenidos al servidor TELEKINO DE LOS ÑOQUIS, ${member}. Espero que lo disfrutes y respetes las reglas`)

    /* agregar multiples frases */
})

//NOTA: No usar switch, rompe todo
/* 
    Instalación de nodemon
    Para que funque, hacer un npm install
    y utilizar npx nodemon en consola


*/




client.login('')  //Aca pongo el token para llamar al bot
