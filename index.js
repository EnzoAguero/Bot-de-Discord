const Discord = require('discord.js');  //modulo instalado de discord.js
const client =  new Discord.Client();  //El client es el bot el cual recibe y envia mensajes devuelta y demas //cuando determino un objeto con el new me devuelve un objeto


client.on('ready', () => {                       //esto es un evento                    //cuando el bot esta listo ingresa el mensaje
    console.log(`Logged in as ${client.user.tag}!`); 
    client.user.setStatus('online')
    
    console.log(client.user.presence.status);                                        //me pone el estado online del bot

});
  
    client.on('message', message => {
      //recibiendo el mensaje y lo muestro por consola aca
      console.log(message.content);
  
    }); 
    client.on('message', msg => {                                      //recibo un mensaje en discord
        
        if (msg.content === 'ping') {                                // si el mensaje contiene cierta palabra
          msg.reply('Pong!');                                       //responde esto
                                                                  //me responde el mensaje con lo que le pase 
        }
        if (msg.content==='Hola cata'){               //si el contenido del mensaje es Hola cata
            msg.reply('Hola, como estas?')                     //me responde esto a TODO el canal
            
        }
        if (msg.content === 'Cata, como van los grupos?'){
            msg.reply('@everyone Hi!! Los grupos ya estan armados con su respectivo canal de voz. :]')
        }
        if (msg.content === 'Gracias Cata'){
            msg.reply('No hay ningun problema, estoy hecha para ayudar a las personas')
        }
        
         if(msg.content === 'Q sale gente'){
            msg.reply('@everyone Lolsito, Cs, Valorant o dbd?')
        }
        
        if(msg.content === 'chau cata'){
            msg.reply('Adios, me voy a mimir :]')
        }
        if(msg.content === 'Cata, como van los canales?'){
            msg.reply('@everyone Los canales ya estan armados, tanto canales de voz como de texto para que los grupos trabajen organizada y comodamente. Espero que trabajen duro y nadie abandone en el camino.')
        }
        if (msg.content === 'Cata, toda la comision esta en el grupo?'){
        msg.reply('No lo se Enzo, pero estaria necesitando que todas las personas ingresen al discord ya que estamos trabajando para facilitar la organizacion del mismo para que cada grupo tenga su espacio.')
        }
        
        

       
        
       });
    
    
        


        //NOTA: el switch se bugea
        
       
      
  

client.login('ODQ0MjUzNDU0OTE4NjE1MDQw.YKPuTQ.FhRrcvJGwp0sDvjaBu-MYBS5vFg')  //Aca pongo el token para llamar al bot
