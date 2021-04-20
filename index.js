const { create } = require('@open-wa/wa-automate')
const { color, options, nocache } = require('./function')
//const fs = require('fs-extra')
const zein = require('./zein.js')
const config = require('./config.json')
const ownerNumber = config.owner
const { groupLimit, memberLimit } = require('./database/bot/setting.json')
const { msg } = require('./msg')

const start = async (zn = new zn()) => {
    console.log(color('[ZENBOT]', 'magenta'), color('IS NOW ONLINE!', 'aqua'))
    
    nocache('../zein.js', m => console.log(color('[WATCH]', 'orange'), color(`=> '${m}'`, 'yellow'), 'file is updated!'))
    // Uncomment this code below for activating an automated cache deletion

    zn.onStateChanged((state) => {
        console.log(color('-> [STATE]'), state)
        if (state === 'CONFLICT') zn.forceRefocus()
        if (state === 'UNPAIRED') zn.forceRefocus()
    })

    /*zn.onAddedToGroup(async (chat) => {
        await zn.sendText(chat.groupMetadata.id, 'Maaf, bot ini tidak tersedia untuk grup!')
        await zn.leaveGroup(chat.groupMetada.id)
    })

    zn.onMessage((message) => {
        require('./zein.js')(zn, message)
        //zein(zn, message)
    })*/

    //Listening to messages
    zn.onMessage((message) => {
        zn.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 500) {
                    console.log('[BOCCHI]', color(`Loaded message reach ${msg}, cuting message cache...`, 'yellow'))
                    zn.cutMsgCache()
                    console.log('[BOCCHI]', color('Cache deleted!', 'yellow'))
                }
            })
        //Below is an watched version but it will affect the performance
        require('./zein.js')(zn, message)
        //zein(zn, message)
    })

    zn.onIncomingCall(async (call) => {
        await zn.sendText(call.peerJid, `Kamu telah menelpon BOT\nMaaf kamu akan diblockir!\nChat owner: wa.me/${ownerNumber} agar dibuka blok-nya!`)
        await zn.contactBlock(call.peerJid)
            .then(() => console.log(`Seseorang menelpon BOT, dan telah diblokir. ID: ${call.peerJid}`))
    })

    zn.onAddedToGroup(async (chat) => {
        const gc = await zn.getAllGroups()
        console.log(color('[zn]'), 'Added a to new group. Name:', color(chat.contact.name, 'yellow'), 'Total members:', color(chat.groupMetadata.participants.length, 'yellow'))
        if (chat.groupMetadata.participants.includes(ownerNumber)) {
            await zn.sendText(chat.id, msg.addedGroup(chat))
        } else if (gc.length > groupLimit) {
            await zn.sendText(chat.id, `Maaf Group Untuk BOT sudah Max!\n\nCurrent status: ${gc.length}/${groupLimit}`)
            await zn.leaveGroup(chat.id)
        } else if (chat.groupMetadata.participants.length < memberLimit) {
            await zn.sendText(chat.id, `Maaf BOT Membutuhkan Minimal ${memberLimit} member didalam group!`)
            await zn.leaveGroup(chat.id)
        } else {
            await zn.sendText(chat.id, msg.addedGroup(chat))
        }
    })
}
create(options(start))
    .then((zn) => start(zn))
    .catch((err) => console.error(err))