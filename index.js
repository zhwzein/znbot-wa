const { create, zn } = require('@open-wa/wa-automate')
const { color, options } = require('./function')
const fs = require('fs-extra')
const zein = require('./zein')
const config = require('./config.json')
const ownerNumber = config.owner

const start = async (zn = new zn()) => {
    console.log(color('[ZENBOT]', 'magenta'), color('IS NOW ONLINE!', 'aqua'))
    
    zn.onStateChanged((state) => {
        console.log(color('-> [STATE]'), state)
        if (state === 'CONFLICT') zn.forceRefocus()
        if (state === 'UNPAIRED') zn.forceRefocus()
    })

    zn.onAddedToGroup(async (chat) => {
        await zn.sendText(chat.groupMetadata.id, 'Maaf, bot ini tidak tersedia untuk grup!')
        await zn.leaveGroup(chat.groupMetada.id)
    })

    zn.onMessage((message) => {
        zein(zn, message)
    })

    zn.onIncomingCall(async (call) => {
        await zn.sendText(call.peerJid, `Kamu telah menelpon BOT\nMaaf kamu akan diblockir!\nChat owner: wa.me/${ownerNumber} agar dibuka blok-nya!`)
        await zn.contactBlock(call.peerJid)
            .then(() => console.log(`Seseorang menelpon BOT, dan telah diblokir. ID: ${call.peerJid}`))
    })
}
create(options(start))
    .then((zn) => start(zn))
    .catch((err) => console.error(err))