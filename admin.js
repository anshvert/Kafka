const { kafka} = require("./client")

async function init () {
    const admin = kafka.admin()
    console.log("Admin Connecting...")
    admin.connect()
    console.log("Admin Connected !")
    console.log("Creating Topics")
    await admin.createTopics({
        topics: [{
            topic: "riderUpdates",
            numPartitions: 2,
        }]
    })
    console.log("Created Topics")
    console.log("Disconnecting Admin...")
    await admin.disconnect()
}
init()