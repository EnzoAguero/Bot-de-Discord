const Discord = require('discord.js');  //modulo instalado de discord.js
const client = new Discord.Client();  //El client es el bot el cual recibe y envia mensajes devuelta y demas //cuando determino un objeto con el new me devuelve un objeto
const chiste = require("./chistes.js")
const config = require('./config.json')
const user = require('./user.js');
let fecha = new Date();
let fechaDia = fecha.getDate();
let fechaMes = fecha.getMonth()+1;
let horario = fecha.getHours()
/* const canal = client.channels.get('836028558321123333'); */


/* let data = {mensaje:'Feliz cumpleaños'} 
let mensaje = new Discord.Message(client,data,'TextChannel'); */





client.on('ready', () => {                //esto es un evento            //cuando el bot esta listo ingresa el mensaje
    
    console.log(`Logeada como ${client.user.tag}! en Discord`);
    birthdays()
    
});

function birthdays(){
    user.forEach(usuario =>  {
        if (fechaDia === usuario.dia_nacimiento && fechaMes === usuario.mes_nacimiento ) {
             if (fecha.getHours() == '01') {
                 console.log('Feliz cumple '); 
                 client.channels.fetch('836028558321123333')
                 .then(channel => {
                     channel.send("Feliz cumple!!!"); })

                 
                 
            } 
        }

    }
    )
    


}





/* client.on('message', message => {
   //recibiendo el mensaje y lo muestro por consola aca
   console.log(message.content);
   msg.reply("mensaje")
 
 }); */
client.on('message', msg => {                                      //recibo un mensaje en discord

    //convierte el string en minusculas
    let mensaje = msg.content.toLowerCase()
    console.log(mensaje)
    if (mensaje.startsWith(config.prefix +'ping')) {                                // si el mensaje contiene el prefix que es ! mas ping
        msg.reply('Pong!');                                                           //responde esto
        //me responde el mensaje con lo que le pase 
    }else
    if (mensaje === 'hola cata') {                                   //si el contenido del mensaje es Hola cata
        msg.reply('Hola, como estas?')                                   //me responde esto a TODO el canal

    }
    if(mensaje == "muy bien y vos" || mensaje === "muy bien, vos?" || mensaje === "bien, vos?"){
        msg.reply('No me preguntes, sólo soy una chica')
    }
    if (mensaje === 'cata, como van los grupos?') {
        msg.reply('@everyone Hi!! Los grupos ya estan armados con su respectivo canal de voz. :]')
    }
    if (mensaje === 'gracias cata') {
        msg.reply('No hay ningun problema, estoy hecha para ayudar a las personas')
    }

    if (mensaje === 'que sale gente') {
        msg.reply('@everyone Lolsito, Cs, Valorant o dbd?')
    }

    mensaje === 'chau cata' ? msg.reply ('Adios, me voy a mimir') : null
        
    
    if (mensaje === 'cata, como van los canales?') {
        msg.reply('@everyone Los canales ya estan armados, tanto canales de voz como de texto para que los grupos trabajen organizada y comodamente. Espero que trabajen duro y nadie abandone en el camino.')
    }
    if (mensaje === 'cata, toda la comision esta en el grupo?') {
        msg.reply('No lo se Enzo, pero estaria necesitando que todas las personas ingresen al discord ya que estamos trabajando para facilitar la organizacion del mismo para que cada grupo tenga su espacio.')
    }

    if (mensaje.startsWith(config.prefix + 'chistes')){
        msg.reply(chiste[Math.floor(Math.random() * chiste.length)])
    }
    if (mensaje === "cata, por que ella no me ama?"){
        msg.reply("porque te esta gorreando con otro")
    }
        
    if (msg.content.startsWith(config.prefix + 'Moderadores')){
        msg.channel.send({embed: {
          color: 3447003,
          description: "Enzo Aguero y Daniel Fernandez"
        }});

    }
    if (msg.content.startsWith(config.prefix + 'Fecha')){
        msg.channel.send({embed: {
          color: 3447003,
          description: "Fecha de entrega del primer Sprint: 2 de junio 2021" 
        }});
    }
    if (mensaje === "catita, porque estas inactiva?"){
        msg.reply("Mi creador anda ocupado con las cosas del sprint 1 porque quiere tener la mejor idea. Pero apenas termine voy a recibir una actualizacion :]")}


       /*  const Mensaje={
            'hola' : msg.reply('hola, que haces'),
            'que tal' : 'todo bien'
        }

        console.log(Mensaje['que tal']); */


        
});

//Robert, agregue un prefix que es el simbolo del comando, en este caso es el "!", y eso lo determino en el json

client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Envía un mensaje al nuevo miembro en el grupo
    channel.send(`Bienvenidos al servidor de las Berenjenas frustradas, ${member}. Espero que lo disfrutes y respetes las reglas`);
  });





//NOTA: No usar switch, rompe todo
/* 
    Instalación de nodemon
    Para que funque, hacer un npm install
    y utilizar npx nodemon en consola


*/




client.login('ODQ0MjUzNDU0OTE4NjE1MDQw.YKPuTQ.FhRrcvJGwp0sDvjaBu-MYBS5vFg')  //Aca pongo el token para llamar al bot
