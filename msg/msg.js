const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('config.json'))

/********** USER **********/

exports.wrongFormat = () => {
    return `Format salah kak.`
}
exports.limit = () => {
    return `Sayang sekali Limit yg kamu punya telah habis! Silakan

> *Tunggu hingga jam 00:00 WIB*
> *Atau Beli Premium*`
}
exports.notPremium = () => {
    return `gomenasai onii chan!\nini khusus untuk user premium saja.`
}
exports.doneOwner = () => {
    return `Sudah selesai, Owner-sama~`
}

/********** END OF USER **********/



/********** REGISTER **********/

exports.notRegistered = (pushname) => {
    return `Kamu belum terdaftar di database\nketik ${prefix}register untuk melakukan pendaftaran`
}
exports.wrongFormatreg = () => {
	return `*FORMAT SALAH*\n\nSILAKAN REGISTER DENGAN FORMAT\n*${prefix}register Nama | Umur*\n━━━━━━━━━━━━━━━━━━━\n\ncontoh : ${prefix}register zein | 19`
}
exports.registered = (name, age, userId, time, serial) => {
    return `*PENDAFTARAN BERHASIL*\n\nKAMU TELAH TERDAFTAR\nDENGAN DATA :\n\n*NAMA* : ${name}\n*UMUR* : ${age}\n\n${time}\n━━━━━━━━━━━━━━━━━━━\n\nKetik ${prefix}lanjut untuk melanjutkan BOT\n\nbila belum paham cara menggunakan BOT ini silakan untuk membaca rules terlebih dahulu, Lanjutkan dengan ketik :\n\n${prefix}rules`
}
exports.registeredAlready = () => {
    return `gomenasai onii chan!
Kamu sudah mendaftar sebelumnya.`
}
exports.wait = () => {
    return 'Mohon tunggu sebentar..'
}
exports.minimalDb = () => {
    return `_Perlu setidaknya 10 user yang memiliki level di database!_`
}

/********** END OF REGISTER **********/



/********** GROUP **********/

exports.groupOnly = () => {
    return `gomenasai onii chan!
ini hanya dapat digunakan di dalam grup.
gabung group shiro yuk disini

https://chat.whatsapp.com/J9FmTrDcGzeFvr19YZMHZW`
}
exports.adminOnly = () => {
    return `gomenasai onii chan!\nPerintah ini hanya bisa digunakan oleh admin grup ini.`
}
exports.profile = (username, status, premi, benet, adm, level, requiredXp, xp) => {
    return `*USER INFO*\n\n# *Username*: ${username}\n# *Status*: ${status}\n# *Premium*: ${premi}\n# *Banned*: ${benet}\n# *Admin*: ${adm}\n\n███████████████████▒▒▒\n\nYour progress:\n# *Level*: ${level}\n# *XP*: ${xp} / ${requiredXp}`
}

/********** END OF GROUP **********/



/********** lEVELING **********/

exports.levelingOn = () => {
    return `Fitur leveling berhasil *diaktifkan*!`
}
exports.levelingOff = () => {
    return `Fitur leveling berhasil *dinonaktifkan*!`
}
exports.levelingOnAlready = () => {
    return `gomenasai onii chan!\nFitur leveling telah diaktifkan sebelumnya.`
}
exports.levelingNotOn = () => {
    return `gomenasai onii chan!\nFitur leveling belum diaktifkan! Suruh admin group ini untuk mengaktifkan dengan mengetik *${prefix}leveling enable**`
}
exports.levelNull = () => {
    return `Kamu belum memiliki level!`
}

/********** END OF LEVELING **********/


/********** MAIN MENU **********/


/**
┏━━━━━━━━━┳━━━━━━━━━┓
┃			┃
┣━━━━━━━━━╋━━━━━━━━━┫ 
┃			┃
┗━━━━━━━━━┻━━━━━━━━━┛ 

**/


exports.menu = (jumlahUser, level, xp, role, pushname, requiredXp, premium) => {
    return `
    ╔═══════════════════════
    ║ *Nama:* ${pushname}
    ║ *Role:* ${role}
    ╚═══════════════════════

     MENU PLAYER

    ╔═══════════════════════
    ║ *${prefix}profile*
    ║ _Cek Profile._
    ║
    ║ *${prefix}level*
    ║ _Cek Level._
    ║
    ║ *${prefix}limit*
    ║ _Cek Limit._
    ║
    ║ *${prefix}cekpremium*
    ║ _Cek Premium._
    ║
    ║ *${prefix}leaderboard*
    ║ _Top 10 leaderboard._
    ║
    ║ *${prefix}listblock*
    ║ _Total list block._
    ║
    ║ *${prefix}daftar*
    ║ _Total pendaftar._
    ╚═══════════════════════

     MENU STICKER

    ╔═══════════════════════
    ║ *${prefix}sticker*
    ║ _Membuat sticker dari gambar._
    ║
    ║ *${prefix}stickergif*
    ║ _Membuat sticker dari gif._
    ╚═══════════════════════
    `
    }