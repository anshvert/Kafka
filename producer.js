const {kafka} = require("./client")
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function init () {
    const producer = kafka.producer()
    console.log("Connecting Producer")
    await producer.connect()
    console.log("Producer Connected")
    rl.setPrompt('>')
    rl.prompt()
    rl.on('line',async function(line){
        const [riderName,location] = line.split(' ')
        await producer.send({
            topic: "riderUpdates",
            messages: [
                {
                    partition: location.toLocaleLowerCase() === 'north' ? 0 : 1,
                    key: "locationUpdate",
                    value: JSON.stringify({ name:riderName,location: location })
                }
            ]
        })
    }).on("close", async ()=> {
        await producer.disconnect()
    })
}
init()