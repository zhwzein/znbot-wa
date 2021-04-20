const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('config.json'))
//const { prefix } = require('../../../config.json')

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
exports.listBlock = (blockNumber) => {
    return `TOTAL USER YANG SHIRO BLOKIR
    
*${blockNumber.length} Pengguna :*\n\n`
}
exports.afkOn = (pushname, reason) => {
    return `Fitur AFK berhasil diaktifkan!\n\n*Nama*: ${pushname}\n*Alasan*: ${reason}`
}

exports.afkOnAlready = () => {
    return `gomenasai onii chan!\nFitur AFK telah diaktifkan sebelumnya.`
}

exports.afkMentioned = (getReason, getTime) => {
    return `Sssttt! Orangnya lagi AFK, jangan diganggu dulu, panggil lagi nanti..\n\n*Alasanya :* ${getReason}\n*Sejak :* ${getTime}`
}

exports.afkDone = (pushname) => {
    return `*${pushname}* telah kembali dari AFK! Selamat datang kembali`
}

/********** END OF USER **********/

exports.notNsfw = () => {
    return `Command NSFW belum diaktifkan.`
}

exports.nsfwOn = () => {
    return `Command NSFW berhasil diaktifkan dosa tanggung sendiri ya!`
}

exports.nsfwOff = () => {
    return `Command NSFW berhasil dinonaktifkan.`
}

exports.nsfwAlready = () => {
    return `Command NSFW sudah diaktifkan sebelumnya.`
}

/********** REGISTER **********/

exports.notRegistered = (senderr) => {
    return `${senderr}\n\nbelum terdaftar di database\nketik ${prefix}verify untuk melakukan pendaftaran`
}
exports.registered = (namaUser, senderr) => {
    return `
╭────────────────────
│ ⤷ Nama : ${namaUser}
│ ⤷ Nomor : ${senderr.split("@")[0]}
╰────────────────────

_Verifikasi selesai silahkan ketik *${prefix}lanjut*_
_Bila belum paham ketik *${prefix}rules*_
    `
}

exports.wait = () => {
    return 'Mohon tunggu sebentar..'
}
exports.minimalDb = () => {
    return `_Perlu setidaknya 10 user yang memiliki level di database!_`
}

/********** END OF REGISTER **********/



/********** GROUP **********/
exports.addedGroup = () => {
    return `Halo Terima Kasih Telah Mengundangku Ke Group Ini, Para Member Silahkan Daftar Dengan Ketik ${prefix}register`
}

exports.groupOnly = () => {
    return `gomenasai onii chan!
ini hanya dapat digunakan di dalam grup.
gabung group shiro disini

https://chat.whatsapp.com/J9FmTrDcGzeFvr19YZMHZW`
}
exports.adminOnly = () => {
    return `gomenasai onii chan!\nPerintah ini hanya bisa digunakan oleh admin grup ini.`
}
exports.profile = (username, status, premi, benet, adm, level, requiredXp, xp, kantongs, limitnya) => {
    return `*USER INFO*

_Username : ${username}_
_Status : ${status}_

_Premium : ${premi}_
_Admin : ${adm}_

╭───────────
│ _Level : ${level}_
│ _Limit : ${limitnya}_
│ _Xp : ${xp}_ / _${requiredXp}_
│ _Balance : ${kantongs}_
╰───────────`
}

exports.linkDetected = () => {
    return `gomenasai onii chan! Kamu mengirim link di group chat ini!\n\nMaaf tapi kami harus mengeluarkan mu...\nSayonaraa~`
}
exports.botNotAdmin = () => {
    return `Jadikan shiro sebagai admin dulu.`
}
exports.detectorOnAlready = () => {
    return `gomenasai onii chan! Fitur anti-group link telah diaktifkan sebelumnya.`
}
exports.detectorOn = (name, formattedTitle) => {
    return `*ANTI GROUP LINK ON*\n\nPerhatian untuk semua member grup ini\nGrup ini sudah mengaktifkan anti-group link, apabila ada salah satu member mengirim group link di sini maka dia akan ter-kick secara otomatis.\n\nSekian terima kasih.\nAdmin ${(name || formattedTitle)}`
}
exports.detectorOff = () => {
    return `Fitur anti-group link berhasil dimatikan.`
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
┏━━━┳━━━┓
⤷			⤷
━╋━━━┫ 
⤷			⤷
┗━━━┻━━━┛ 
**/

exports.menu = (jumlahUser, role, namaUserr, tgl, uptem) => {
    return `
╭───────────────
│ _Halo : ${namaUserr}_
│ _Role : ${role}_
├───────────────
│ *PLAYER MENU*
│   ⤷ menu 1
│ 
│ *STICKER MENU*
│   ⤷ menu 2
│ 
│ *STICKERH MENU*
│   ⤷ menu 3
│ 
│ *ANIME MENU*
│   ⤷ menu 4
│ 
│ *DOWNLOAD MENU*
│   ⤷ menu 5
│ 
│ *RANDOM MENU*
│   ⤷ menu 6
│ 
│ *HIBURAN MENU*
│   ⤷ menu 7
│ 
│ *KERANG MENU*
│   ⤷ menu 8
│ 
│ *MISC MENU*
│   ⤷ menu 9
│ 
│ *NSFW MENU*
│   ⤷ menu 10
│ 
│ *WEBZONE MENU*
│   ⤷ menu 11
│ 
│ *ADMIN MENU*
│   ⤷ menu 12
│ 
│ *DESIGN MENU*
│   ⤷ menu 13
│ 
│ *STALKER MENU*
│   ⤷ menu 14
│ 
│ *MUSIC MENU*
│   ⤷ menu 15
│ 
│ *SAVER MENU*
│   ⤷ menu 16
│ 
│ _Ketik : menu angka_
│ _Contoh : menu 1_
│ _Verified User : ${jumlahUser}_ 
│ _Active : ${uptem}_
├───────────────                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
│ *Jadwal Waktu Sholat*
│
│ _Date : ${tgl}_
│ _Wilayah : Jakarta_
│ _Sahur : 04:02_
│ _Imsak : 04:32_ 
│ _Subuh : 04:42_
│ _Dzuhur : 12:04_
│ _Ashar : 15:12_
│ _Maghrib : 18:07_
│ _Isya : 19:15_
│
│ _Kota Lainya Silahkan_
│ _Ketik ${prefix}jadwal *namakota*_
│
╰─────「 S H I R O 」
	`
}

exports.menuSaver = () => {
    return `
# MENU SAVER
╭───────────────
│ *STICKER SAVER*
│
│ *save sticker*
│ ⤷ ${prefix}addsticker
│
│ *ambil sticker*
│ ⤷ ${prefix}getsticker
│
│ *menghapus sticker*
│ ⤷ ${prefix}delsticker
│
│ *list sticker*
│ ⤷ ${prefix}liststicker
├───────────────
│ *IMAGE SAVER*
│
│ *save image*
│ ⤷ ${prefix}addimage
│
│ *ambil image*
│ ⤷ ${prefix}getimage
│
│ *menghapus image*
│ ⤷ ${prefix}delimage
│
│ *list image*
│ ⤷ ${prefix}listimage
├───────────────
│ *AUDIO SAVER*
│
│ *save audio*
│ ⤷ ${prefix}addaudio
│
│ *ambil audio*
│ ⤷ ${prefix}getaudio
│
│ *menghapus audio*
│ ⤷ ${prefix}delaudio
│
│ *list audio*
│ ⤷ ${prefix}listaudio
├───────────────
│ *VIDEO SAVER*
│
│ *save video*
│ ⤷ ${prefix}addvideo
│
│ *ambil video*
│ ⤷ ${prefix}getvideo
│
│ *menghapus video*
│ ⤷ ${prefix}delvideo
│
│ *list video*
│ ⤷ ${prefix}listvideo
╰───────────────
    `
}

exports.menuPlayer = () => {
    return `
# MENU PLAYER
╭───────────────
│ *cek player profile*
│ ⤷ ${prefix}me
├───────────────
│ *cek player level*
│ ⤷ ${prefix}level
├───────────────
│ *cek player limit*
│ ⤷ ${prefix}limit
├───────────────
│ *beli player limit*
│ ⤷ ${prefix}buylimit
├───────────────
│ *cek player balance*
│ ⤷ ${prefix}balance
├───────────────
│ *cek premium*
│ ⤷ ${prefix}cekpremium
├───────────────
│ *cek player top 10*
│ ⤷ ${prefix}leaderboard
├───────────────
│ *cek player pendaftar*
│ ⤷ ${prefix}daftar
├───────────────
│ *cek player terblock*
│ ⤷ ${prefix}listblock
├───────────────
│ *cek player premium*
│ ⤷ ${prefix}listpremium
├───────────────
│ *membuat player jadi afk*
│ ⤷ ${prefix}afk
╰───────────────
    `
}

exports.menuSticker = () => {
    return `
# MENU STICKER
╭───────────────
│ *${prefix}sticker*
│ ⤷ _membuat sticker dari gambar_
├───────────────
│ *${prefix}stickergif*
│ ⤷ _membuat sticker dari video_
├───────────────
│ *${prefix}stickerp*
│ ⤷ _membuat sticker nocrop_
├───────────────
│ *${prefix}bunder*
│ ⤷ _membuat sticker bunder_
├───────────────
│ *${prefix}toimg*
│ _ubah sticker ke foto_
├───────────────
│ *${prefix}takestick*
│ _ubah wm sticker_
├───────────────
│ *KETIK CAPTION TEKS*
├───────────────
│ *${prefix}ssticker*
│ ⤷ _mencari sticker_
├───────────────
│ *${prefix}attp*
│ ⤷ _membuat stiker GIF_
├───────────────
│ *${prefix}ttp*
│ ⤷ _membuat teks ke stiker_
├───────────────
│ *${prefix}ttp2*
│ ⤷ _membuat teks ke stiker_
├───────────────
│ *${prefix}amongus*
│ ⤷ _membuat teks ke stiker_
├───────────────
│ *${prefix}emoji*
│ ⤷ _ubah emoji ke stiker_
├───────────────
│ *${prefix}passed*
│ ⤷ _membuat mission passed_
├───────────────
│ *EXTRA STICKER*
├───────────────
│ *${prefix}trigger*
│ ⤷ _membuat trigger sticker_
├───────────────
│ *${prefix}invert*
│ ⤷ _membuat invert sticker_
├───────────────
│ *${prefix}pelangi*
│ ⤷ _membuat pelangi sticker_
├───────────────
│ *${prefix}wasted*
│ ⤷ _membuat wasted sticker_
├───────────────
│ *${prefix}sepia*
│ ⤷ _membuat sepia sticker_
├───────────────
│ *${prefix}merah*
│ ⤷ _membuat merah sticker_
├───────────────
│ *${prefix}hijau*
│ ⤷ _membuat hijau sticker_
├───────────────
│ *${prefix}biru*
│ ⤷ _membuat biru sticker_
├───────────────
│ *${prefix}glass*
│ ⤷ _membuat glass sticker_
├───────────────
│ *${prefix}cry*
│ ⤷ _random crynime_
├───────────────
│ *${prefix}hug*
│ ⤷ _random hugenime_
├───────────────
│ *${prefix}animekiss*
│ ⤷ _random kissnime_
├───────────────
│ *${prefix}tosan*
│ ⤷ _random tosannime:v_
╰───────────────
    `
}
exports.menuStickernime = () => {
    return `
# MENU STICKER NIME
╭───────────────
│ ⤷ *${prefix}ngif*
│
│ ⤷ *${prefix}feetgif*
│
│ ⤷ *${prefix}nekogif*
│
│ ⤷ *${prefix}anal*
│
│ ⤷ *${prefix}kuni*
│
│ ⤷ *${prefix}smug*
│
│ ⤷ *${prefix}baka*
│
│ ⤷ *${prefix}solog*
│
│ ⤷ *${prefix}kiss*
│
│ ⤷ *${prefix}pussy*
│
│ ⤷ *${prefix}feetg*
│
│ ⤷ *${prefix}bj*
│
│ ⤷ *${prefix}feed*
│
│ ⤷ *${prefix}cum*
│
│ ⤷ *${prefix}cuddle*
│
│ ⤷ *${prefix}classic*
│
│ ⤷ *${prefix}nsfw_neko_gif*
│
│ ⤷ *${prefix}random_hentai_gif*
╰───────────────
    `
}

exports.menuWeeaboo = () => {
    return `	
# MENU ANIME
╭───────────────
│ *${prefix}yaoi*
│ ⤷ _random yaoi_
├───────────────
│ *${prefix}yuri*
│ ⤷ _random yuri_
├───────────────
│ *${prefix}yuri2*
│ ⤷ _random yuri_
├───────────────
│ *${prefix}loli*
│ ⤷ _random loli_
├───────────────
│ *${prefix}shota*
│ ⤷ _random shota_
├───────────────
│ *${prefix}waifu*
│ ⤷ _random waifu_
├───────────────
│ *${prefix}neko*
│ ⤷ _random nekonime_
├───────────────
│ *${prefix}neko2*
│ ⤷ _random neko_
├───────────────
│ *${prefix}kemono*
│ ⤷ _random kemono_
├───────────────
│ *${prefix}elf*
│ ⤷ _random elf_
├───────────────
│ *${prefix}art*
│ ⤷ _random art_
├───────────────
│ *${prefix}husbu*
│ ⤷ _random husbu_
├───────────────
│ *${prefix}sagiri*
│ ⤷ _random sagiri_
├───────────────
│ *${prefix}shinobu*
│ ⤷ _random shinobu_
├───────────────
│ *${prefix}megumin*
│ ⤷ _random megumin_
├───────────────
│ *${prefix}naruto*
│ ⤷ _random naruto_
├───────────────
│ *${prefix}minato*
│ ⤷ _random minato_
├───────────────
│ *${prefix}boruto*
│ ⤷ _random boruto_
├───────────────
│ *${prefix}hinata*
│ ⤷ _random hinata_
├───────────────
│ *${prefix}sasuke*
│ ⤷ _random sasuke_
├───────────────
│ *${prefix}sakura*
│ ⤷ _random sakura_
├───────────────
│ *${prefix}toukachan*
│ ⤷ _random touka_
├───────────────
│ *${prefix}rize*
│ ⤷ _random rize_
├───────────────
│ *${prefix}akira*
│ ⤷ _random akira_
├───────────────
│ *${prefix}itori*
│ ⤷ _random itori_
├───────────────
│ *${prefix}kurumi*
│ ⤷ _random kurumi_
├───────────────
│ *${prefix}miku*
│ ⤷ _random miku_
├───────────────
│ *${prefix}wallnime*
│ ⤷ _random wallnime_
├───────────────
│ *${prefix}wallpaper*
│ ⤷ _random wallpaper_
├───────────────
│ *${prefix}wallpaper2*
│ ⤷ _random wallpaper_
╰───────────────
    `
}

exports.menuPremium = () => {
    return `
# MENU DOWNLOAD
╭───────────────
│ *${prefix}play*
│ ⤷ _download youtube music_
├───────────────
│ *${prefix}playvideo*
│ ⤷ _download youtube video_
├───────────────
│ *${prefix}joox*
│ ⤷ _download joox Music_
├───────────────
│ *${prefix}spotify*
│ ⤷ _info spotify music_
├───────────────
│ *${prefix}audiosurah*
│ ⤷ _download quran audio_
├───────────────
│ *${prefix}pin*
│ ⤷ _img from pinterest_
├───────────────
│ *${prefix}pixiv*
│ ⤷ _img from pixiv
├───────────────
│ *${prefix}konachan*
│ ⤷ _img from konachan_
├───────────────
│ *${prefix}wall*
│ ⤷ _mencari wallpaper_
├───────────────
│ *KETIK CAPTION & LINK*
├───────────────
│ *${prefix}facebook*
│ ⤷ _download facebook video_
├───────────────
│ *${prefix}spotifydl*
│ ⤷ _download spotify music_
├───────────────
│ *${prefix}cocofun*
│ ⤷ _download cocofun video_
├───────────────
│ *${prefix}tiktok*
│ ⤷ _download tiktok video_
├───────────────
│ *${prefix}twitter*
│ ⤷ _download twitter video_
├───────────────
│ *${prefix}igdl*
│ ⤷ _download instagram post_
├───────────────
│ *${prefix}dojins*
│ ⤷ _download doujin PDF_
├───────────────
│ *${prefix}xnxx*
│ ⤷ _download xnxx video_
╰───────────────
	`
}

exports.menuRandom = () => {
    return `
# MENU RANDOM
╭───────────────
│ *${prefix}wancak*
│ ⤷ _random 1cak meme_
├───────────────
│ *${prefix}meme*
│ ⤷ _random meme indonesia_
├───────────────
│ *${prefix}meme2*
│ ⤷ _random meme indonesia 2_
├───────────────
│ *${prefix}memeindo*
│ ⤷ _random meme indonesia 3_
├───────────────
│ *${prefix}memew*
│ ⤷ _random meme world_
├───────────────
│ *${prefix}darkjokes*
│ ⤷ _random darkjokes_
├───────────────
│ *${prefix}fakta*
│ ⤷ _random faktanya_
├───────────────
│ *${prefix}funik*
│ ⤷ _random fakta unik_
├───────────────
│ *${prefix}asupan*
│ ⤷ _random asupan tiktok_
├───────────────
│ *${prefix}puisi*
│ ⤷ _random puisi_
├───────────────
│ *${prefix}bucin*
│ ⤷ _random kebucinan_
├───────────────
│ *${prefix}quotes*
│ ⤷ _random quotes_
├───────────────
│ *${prefix}dilan*
│ ⤷ _random dilan quotes_
├───────────────
│ *${prefix}kanye*
│ ⤷ _random kanyewest quotes_
├───────────────
│ *${prefix}quotenime*
│ ⤷ _random anime quotes_
├───────────────
│ *${prefix}motivasi*
│ ⤷ _random motivasi_
├───────────────
│ *${prefix}fiersa*
│ ⤷ _random quote senja_
├───────────────
│ *${prefix}cerpen*
│ ⤷ _random cerpen_
╰───────────────
    `
}

exports.menuFun = () => {
    return `
# MENU HIBURAN
╭───────────────
│ *${prefix}tebakgambar*
│ ⤷ _bermain kuis tebak gambar_
├───────────────
│ *${prefix}family100*
│ ⤷ _bermain kuis family 100_
├───────────────
│ *${prefix}caklontong*
│ ⤷ _bermain kuis caklontong_
├───────────────
│ *${prefix}casino*
│ ⤷ _mining balance 1_
├───────────────
│ *${prefix}suit*
│ ⤷ _mining balance 2_
├───────────────
│ *${prefix}fight*
│ ⤷ _mining balance 3_
├───────────────
│ *${prefix}jadian*
│ ⤷ _random Jadian_
├───────────────
│ *KETIK CAPTION & TEKS*
├───────────────
│ *${prefix}zodiac*
│ ⤷ _ramalan zodiak_
├───────────────
│ *${prefix}say*
│ ⤷ _bot akan mengulangi kata_
├───────────────
│ *${prefix}artinama*
│ ⤷ _arti nama_
├───────────────
│ *${prefix}zen*
│ ⤷ _chatt gabut_
├───────────────
│ *${prefix}cekkelamin*
│ ⤷ _cek kelamin_
├───────────────
│ *${prefix}cekmati*
│ ⤷ _cek kematian_
├───────────────
│ *${prefix}hilih*
│ ⤷ _membuat text menjadi i_
├───────────────
│ *${prefix}bapak*
│ ⤷ _membuat text alay_
├───────────────
│ *${prefix}hitunghuruf*
│ ⤷ _menghitung huruf_
├───────────────
│ *${prefix}balikhuruf*
│ ⤷ _membalikan huruf_
╰───────────────
    `
}

exports.menuMisc = () => {
    return `
# MENU LAINYA
╭───────────────
│ *${prefix}corona*
│ ⤷ _info corona virus_
├───────────────
│ *${prefix}randomkpop*
│ ⤷ _random kpop_
├───────────────
│ *${prefix}avatar*
│ ⤷ _random avatar aang_
├───────────────
│ *${prefix}bts*
│ ⤷ _random BTS_
├───────────────
│ *${prefix}exo*
│ ⤷ _random EXO_
├───────────────
│ *${prefix}blackpinx*
│ ⤷ _random BLINK_
├───────────────
│ *${prefix}readmore*
│ ⤷ _membuat text tertutup_
├───────────────
│ *${prefix}creditcard*
│ ⤷ _fake cc_
├───────────────
│ *${prefix}fakeidentity*
│ ⤷ _fake identity_
├───────────────
│ *${prefix}tts*
│ ⤷ _membuat text menjadi suara_
├───────────────
│ *${prefix}toxic*
│ ⤷ _bot Menjadi Toxic_
├───────────────
│ *${prefix}twister*
│ ⤷ _ngoceh sama bot_
├───────────────
│ *${prefix}lirik*
│ ⤷ _mencari lirik lagu_
├───────────────
│ *${prefix}resep*
│ ⤷ _mengirim resep makanan_
├───────────────
│ *${prefix}wiki*
│ ⤷ _info dari wikipedia_
├───────────────
│ *${prefix}distance*
│ ⤷ _untuk mengetahui jarak_
├───────────────
│ *${prefix}translate*
│ ⤷ _terjemahan text_
├───────────────
│ *${prefix}tomp3*
│ ⤷ _mengubah video menjadi suara_
├───────────────
│ *${prefix}pitch*
│ ⤷ _membuat pitch suara_
├───────────────
│ *${prefix}gemuk*
│ ⤷ _membuat gemuk suara_
├───────────────
│ *${prefix}slow*
│ ⤷ _membuat slow suara_
├───────────────
│ *${prefix}tupai*
│ ⤷ _membuat tupai suara_
├───────────────
│ *${prefix}bass*
│ ⤷ _membuat bass suara_
├───────────────
│ *${prefix}nightcore*
│ ⤷ _membuat nightcore suara_
╰───────────────
    `
}

exports.menuNsfw = () => {
    return `
# MENU NSFW
╭───────────────
│ *${prefix}realnsfw*
│ ⤷ _random nsfw irl_
├───────────────
│ *${prefix}waifu18*
│ ⤷ _random nsfw waifu_
├───────────────
│ *${prefix}yuri18*
│ ⤷ _random nsfw yuri_
├───────────────
│ *${prefix}yaoi18*
│ ⤷ _random nsfw yaoi_
├───────────────
│ *${prefix}loli18*
│ ⤷ _random nsfw loli_
├───────────────
│ *${prefix}yurin*
│ ⤷ _random nsfw yuri_
├───────────────
│ *${prefix}lesbian*
│ ⤷ _random nsfw lesbian_
├───────────────
│ *${prefix}pussyart*
│ ⤷ _random nsfw pussyart_
├───────────────
│ *${prefix}milf*
│ ⤷ _random nsfw milf_
├───────────────
│ *${prefix}hentai*
│ ⤷ _random nsfw hentai_
├───────────────
│ *${prefix}femdom*
│ ⤷ _random nsfw erofemdom_
├───────────────
│ *${prefix}sideoppai*
│ ⤷ _random nsfw oppai_
├───────────────
│ *${prefix}ecchi*
│ ⤷ _random nsfw ecchi_
├───────────────
│ *${prefix}animebellybutton*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}hentai4everyone*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}biganimetiddies*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}lewdanimegirls*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}chiisaihentai*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}hentaifemdom*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}animearmpits*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}lovemessage*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}hentaiparadise*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}animethighss*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}animebooty*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}animefeets*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}homekewd*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}ahegao*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}trap*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}blowjob*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}ero*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}feet*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}lewd*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}eron*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}solo*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}gasm*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}poke*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}anal*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}holo*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}tits*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}erok*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}lewdk*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}futanari*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}eroyuri*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}cum_jpg*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}blowjob*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}erofeet*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}holoero*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}erokemo*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}fox_girl*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}lewdkemo*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}pussy_jpg*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}kemonomimi*
│ ⤷ _random nsfw_
├───────────────
│ *${prefix}nsfw_avatar*
│ ⤷ _random nsfw_
╰───────────────
    `
}

exports.menuWeb = () => {
    return `
# MENU WEBZONE
╭─────────────── 
│ *${prefix}xnxxsearch*
│ ⤷ _mencari info xnxx_
├───────────────
│ *${prefix}xhsearch*
│ ⤷ _mencari info xhamster_
├───────────────
│ *${prefix}jurnal*
│ ⤷ _mencari infoanime_
├───────────────
│ *${prefix}drakor*
│ ⤷ _mencari info drakor_
├───────────────
│ *${prefix}wattpad*
│ ⤷ _mencari info wattpad_
├───────────────
│ *${prefix}sauce*
│ ⤷ _mencari info doujin_
├───────────────
│ *${prefix}what*
│ ⤷ _mencari info anime_
├───────────────
│ *${prefix}chara*
│ ⤷ _mencari info character_
├───────────────
│ *${prefix}lk21*
│ ⤷ _mencari film lk21_
├───────────────
│ *${prefix}kusosearch*
│ ⤷ _info kusonimesearch_
├───────────────
│ *${prefix}ss*
│ ⤷ _membuat bot ssweb_
├───────────────
│ *${prefix}smeme*
│ ⤷ _membuat meme dari gambar_
╰───────────────
    `
}

exports.menuModeration = () => {
    return `
# MENU ADMIN
╭───────────────
│ *${prefix}add*
│ ⤷ _menambah user ke group_
├───────────────
│ *${prefix}kick*
│ ⤷ _kick member dari grup_
├───────────────
│ *${prefix}promote*
│ ⤷ _promote member ke admin_
├───────────────
│ *${prefix}demote*
│ ⤷ _demote admin ke member_
├───────────────
│ *${prefix}mutegc*
│ ⤷ _hanya admin yg mengirim pesan_
├───────────────
│ *${prefix}revoke*
│ ⤷ _merevoke group link_
├───────────────
│ *${prefix}linkgroup*
│ ⤷ _group link_
├───────────────
│ *${prefix}ownergroup*
│ ⤷ _owner group info_
├───────────────
│ *${prefix}groupicon*
│ ⤷ _mengganti group icon_
├───────────────
│ *${prefix}leave*
│ ⤷ _bot akan keluar group_
├───────────────
│ *${prefix}nsfw*
│ ⤷ _nsfw enable/disable_
├───────────────
│ *${prefix}antilink*
│ ⤷ _antilink enable/disable_
╰───────────────
    `
}



exports.menuStalker = () => {
    return `
# MENU STALKER​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
╭───────────────
│ *${prefix}igstalk*
│ ⤷ _stalk ig profile_
├───────────────
│ *${prefix}twitslak*
│ ⤷ _stalk tw profile_
├───────────────
│ *${prefix}github*
│ ⤷ _stalk github profile_
├───────────────
│ *${prefix}ttstalk*
│ ⤷ _stalk tiktok profile_
├───────────────
│ *${prefix}ytstalk*
│ ⤷ _stalk youtube profile_
├───────────────
│ *${prefix}ffnama*
│ ⤷ _cek username FF_
├───────────────
│ *${prefix}mlnama*
│ ⤷ _cek username ML_
├───────────────
│ *${prefix}mole*
│ ⤷ _info hero ML_
╰───────────────
    `
}



exports.menuPepek = () => {
    return `
# MENU PREMIUM​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
╭───────────────
│ *${prefix}takestick*
│ ⤷ _merubah watermark sticker_
├───────────────
│ *${prefix}tikel*
│ ⤷ _membuat stiker circle_
├───────────────
│ *${prefix}nowm*
│ ⤷ _tiktok tanpa watermark_
├───────────────
│ *${prefix}dojins*
│ ⤷ _download doujin PDF_
├───────────────
│ *${prefix}play*
│ ⤷ _download yt music_
├───────────────
│ *${prefix}joox*
│ ⤷ _download joox music_
├───────────────
│ *${prefix}spotify*
│ ⤷ _info spotify music_
├───────────────
│ *${prefix}spotifydl*
│ ⤷ _download spotify music_
├───────────────
│ *${prefix}cocofun*
│ ⤷ _download cocofun video_
├───────────────
│ *${prefix}join*
│ ⤷ _invite bot ke group_
├───────────────
│ *${prefix}pussy*
│ ⤷ _random Pussy nime_
├───────────────
│ *${prefix}ahegao*
│ ⤷ _random ahegao nime_
├───────────────
│ *${prefix}loliy*
│ ⤷ _random loli nsfw_
╰───────────────
    `
}

exports.menuDesain = () => {
    return `
# MENU DESIGN​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
╭───────────────
│ *KETIK CAPTION DAN TEXT*
├───────────────
│ *${prefix}logomafia*
│ ⤷ _ex: ${prefix}logomafia zen_
├───────────────
│ *${prefix}hartatahta*
│ ⤷ _ex: ${prefix}harta zen_
├───────────────
│ *${prefix}playbutton*
│ ⤷ _ex: ${prefix}playbutton zen_
├───────────────
│ *${prefix}blackpink*
│ ⤷ _ex: ${prefix}blackpink zenuwu_
├───────────────
│ *${prefix}ffbanner*
│ ⤷ _ex: ${prefix}epep zenuwu_
├───────────────
│ *${prefix}nulis*
│ ⤷ _ex: ${prefix}nulis zenuwu_
├───────────────
│ *${prefix}nulis2*
│ ⤷ _ex: ${prefix}nulis2 zenuwu_
├───────────────    
│ *${prefix}nulis3*
│ ⤷ _ex: ${prefix}nulis3 zenuwu_
├───────────────
│ *${prefix}qmaker*
│ ⤷ _ex: ${prefix}qmaker halo zen_
├───────────────
│ *${prefix}trump*
│ ⤷ _ex: ${prefix}trump halo zen_
├───────────────
│ *${prefix}tolol*
│ ⤷ _ex: ${prefix}tolol yang baca_
├───────────────
│ *${prefix}lol*
│ ⤷ _ex: ${prefix}lol zenuwu_
├───────────────
│ *${prefix}fisheye*
│ ⤷ _ex: Kirim gambar dan caption_
├───────────────
│ *${prefix}gtav*
│ ⤷ _ex: Kirim gambar dan caption_
├───────────────
│ *KETIK TEXT1 & TEXT2
├───────────────
│ *${prefix}wanted*
│ ⤷ _ex: ${prefix}wanted zen | uwu_
├───────────────
│ *${prefix}phlogo*
│ ⤷ _ex: ${prefix}phlogo zen | uwu_
├───────────────
│ *${prefix}phcomment*
│ ⤷ _ex: ${prefix}phcomment zen | uwu_
├───────────────
│ *${prefix}ytc*
│ ⤷ _ex: ${prefix}ytc zen | uwu_
├───────────────
│ *${prefix}ttefek*
│ ⤷ _ex: ${prefix}ttefek zen | uwu_
├───────────────
│ *${prefix}pubg* 
│ ⤷ _ex: ${prefix}pubg zen | uwu_
├───────────────
│ *${prefix}cod* 
│ ⤷ _ex: ${prefix}cod zen | uwu_
├───────────────
│ *${prefix}juventus* 
│ ⤷ _ex: ${prefix}juventus nama | nomor_
├───────────────
│ *${prefix}battlefield* 
│ ⤷ _ex: ${prefix}battlefield zen | uwu_
╰───────────────
	`
}

exports.menuDesign = () => {
    return `
# MENU DESIGN
╭───────────────
│ *${prefix}textpro*
│ ⤷ _text textpro editor_
├───────────────
│ *${prefix}ephoto*
│ ⤷ _text ephoto editor_
├───────────────
│ *${prefix}photoxy*
│ ⤷ _text photoxy editor_
├───────────────
│ *${prefix}design*
│ ⤷ _text design editor_
╰───────────────
    `
}

exports.menuTextpro = () => {
    return `
# MENU TEXTPRO
╭───────────────
│ *KETIK CAPTION DAN TEXT*
│ *contoh: ${prefix}blackpink zen*
├───────────────
│ ⤷ *${prefix}blackpink*
│
│ ⤷ *${prefix}tahta*
│
│ ⤷ *${prefix}neon*
│
│ ⤷ *${prefix}greenneon*
│
│ ⤷ *${prefix}playbutton*
│
│ ⤷ *${prefix}advanceglow*
│
│ ⤷ *${prefix}futureneon*
│
│ ⤷ *${prefix}sandwriting*
│
│ ⤷ *${prefix}sandsummer*
│
│ ⤷ *${prefix}sandengraved*
│
│ ⤷ *${prefix}metaldark*
│
│ ⤷ *${prefix}neonlight*
│
│ ⤷ *${prefix}holographic*
│
│ ⤷ *${prefix}text1917*
│
│ ⤷ *${prefix}minion*
│
│ ⤷ *${prefix}deluxesilver*
│
│ ⤷ *${prefix}newyearcard*
│
│ ⤷ *${prefix}bloodfrosted*
│
│ ⤷ *${prefix}halloween*
│
│ ⤷ *${prefix}fireworksparkle*
│
│ ⤷ *${prefix}natureleaves*
│
│ ⤷ *${prefix}bokeh*
│
│ ⤷ *${prefix}strawberry*
│
│ ⤷ *${prefix}box3d*
│
│ ⤷ *${prefix}roadwarning*
│
│ ⤷ *${prefix}breakwall*
│
│ ⤷ *${prefix}icecold*
│
│ ⤷ *${prefix}luxury*
│
│ ⤷ *${prefix}cloud*
│
│ ⤷ *${prefix}summersand*
│
│ ⤷ *${prefix}horrorblood*
│
│ ⤷ *${prefix}thunder*
│
│ ⤷ *${prefix}christmas*
╰───────────────
	`
}


exports.menuEphoto = () => {
    return `
# MENU EPHOTO
╭───────────────
│ *KETIK CAPTION DAN TEXT*
│ *contoh: ${prefix}wetglass zen*
├───────────────
│ ⤷ *${prefix}wetglass*
│
│ ⤷ *${prefix}multicolor3d*
│
│ ⤷ *${prefix}watercolor*
│
│ ⤷ *${prefix}luxurygold*
│
│ ⤷ *${prefix}galaxywallpaper*
│
│ ⤷ *${prefix}lighttext*
│
│ ⤷ *${prefix}beautifulflower*
│
│ ⤷ *${prefix}puppycute*
│
│ ⤷ *${prefix}royaltext*
│
│ ⤷ *${prefix}heartshaped*
│
│ ⤷ *${prefix}birthdaycake*
│
│ ⤷ *${prefix}galaxystyle*
│
│ ⤷ *${prefix}hologram3d*
│
│ ⤷ *${prefix}greenneons*
│
│ ⤷ *${prefix}glossychrome*
│
│ ⤷ *${prefix}greenbush*
│
│ ⤷ *${prefix}metallogo*
│
│ ⤷ *${prefix}noeltext*
│
│ ⤷ *${prefix}glittergold*
│
│ ⤷ *${prefix}textcake*
│
│ ⤷ *${prefix}starsnight*
│
│ ⤷ *${prefix}wooden3d*
│
│ ⤷ *${prefix}textbyname*
│
│ ⤷ *${prefix}writegalacy*
│
│ ⤷ *${prefix}galaxybat*
│
│ ⤷ *${prefix}snow3d*
│
│ ⤷ *${prefix}birthdayday*
│
│ ⤷ *${prefix}goldplaybutton*
│
│ ⤷ *${prefix}silverplaybutton*
│
│ ⤷ *${prefix}freefire*
╰───────────────
	`
}

exports.menuPhotoxy = () => {
    return `
# MENU PHOTOXY
╭───────────────
│ *KETIK CAPTION DAN TEXT*
│ *contoh: ${prefix}shadow zen*
├───────────────
│ ⤷ *${prefix}shadow*
│
│ ⤷ *${prefix}nulis*
│
│ ⤷ *${prefix}nulis2*
│
│ ⤷ *${prefix}nulis3*
│
│ ⤷ *${prefix}cup*
│
│ ⤷ *${prefix}cup1*
│
│ ⤷ *${prefix}romance*
│
│ ⤷ *${prefix}smoke*
│
│ ⤷ *${prefix}burnpaper*
│
│ ⤷ *${prefix}lovemessage*
│
│ ⤷ *${prefix}love*
│
│ ⤷ *${prefix}coffe*
│
│ ⤷ *${prefix}woodheart*
│
│ ⤷ *${prefix}flowerheart*
│
│ ⤷ *${prefix}woodenboard*
│
│ ⤷ *${prefix}summer3d*
│
│ ⤷ *${prefix}wolfmetal*
│
│ ⤷ *${prefix}nature3d*
│
│ ⤷ *${prefix}underwater*
│
│ ⤷ *${prefix}golderrose*
│
│ ⤷ *${prefix}summernature*
│
│ ⤷ *${prefix}letterleaves*
│
│ ⤷ *${prefix}glowingneon*
│
│ ⤷ *${prefix}fallleaves*
│
│ ⤷ *${prefix}flamming*
│
│ ⤷ *${prefix}harrypotter*
│
│ ⤷ *${prefix}carvedwood*
╰───────────────
	`
}

exports.menuMusik = () => {
    return `
# MENU MUSIC
╭───────────────
│ *${prefix}tika*
│ ⤷ _play random Tiktok vn_
├───────────────
│ *${prefix}tika2*
│ ⤷ _play random Tiktok2 vn_
├───────────────
│ *${prefix}tiktod*
│ ⤷ _play random Tiktok music_
├───────────────
│ *${prefix}gustixa*
│ ⤷ _play random gustixa music_
├───────────────
│ *${prefix}kpopmusic*
│ ⤷ _Kpop music menu_
├───────────────
│ *${prefix}ostanime*
│ ⤷ _Anime music menu_
├───────────────
│ *${prefix}ringtone*
│ ⤷ _ringtone menu_
╰───────────────
    `
}

exports.kpopmusik = () => {
    return `
# MENU KPOP MUSIC
╭───────────────
│ *${prefix}kpopmisc*
│ ⤷ _kpop random_
├───────────────
│ *${prefix}nct*
│ ⤷ _NCT menu_
├───────────────
│ *${prefix}blink*
│ ⤷ _blackpink menu_
├───────────────
│ *${prefix}sn*
│ ⤷ _secretnumber menu_
├───────────────
│ *${prefix}itzy*
│ ⤷ _itzy menu_
├───────────────
│ *${prefix}twice*
│ ⤷ _twice menu_
╰───────────────
    `
}

exports.blackpinkk = () => {
    return `
❏ *BLACKPINK*
══════════════════
Ketik: ${prefix}blink angka
Contoh: ${prefix}blink 1

⤷ 1. As If Its Your Last
⤷ 2. Dont Know What To Do
⤷ 3. Forever Young
⤷ 4. How You Like That
⤷ 5. Ice Cream
⤷ 6. Kick It
⤷ 7. Love To Hate Me
⤷ 8. Lovesick Girls
⤷ 9. Playing with fire
⤷ 10. Pretty Savage
⤷ 11. Really
⤷ 12. See U Later
⤷ 13. Stay
⤷ 14. Whistle
⤷ 15. Bombayah
⤷ 16. Sour Candy
⤷ 17. You Never Know

    `
}

exports.snnn = () => {
    return `
❏ *SECRET NUMBER*
══════════════════
Ketik: ${prefix}sn angka
Contoh: ${prefix}sn 1

⤷ 1. Got That Boom
⤷ 2. Who Dis?

    `
}

exports.itzyy = () => {
    return `
❏ *ITZY*
══════════════════
Ketik: ${prefix}itzy angka
Contoh: ${prefix}itzy 1

⤷ 1. Dalla Dalla
⤷ 2. Icy
⤷ 3. Not Shy
⤷ 4. Wannabe

    `
}

exports.twices = () => {
    return `
❏ *TWICE*
══════════════════
Ketik: ${prefix}twice angka
Contoh: ${prefix}twice 1

⤷ 1. CHEER UP
⤷ 2. FANCY
⤷ 3. What is Love

    `
}

exports.nctu = () => {
    return `
❏ *NCT U*
══════════════════  
Ketik: ${prefix}nct angka
Contoh: ${prefix}nct 1

⤷ 1. Boom
⤷ 2. Kick It
⤷ 3. Resonance
⤷ 4. Make A Wish

    `
}

exports.islam = () => {
    return `
❏ *MENU ISLAM* ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
═════════════════
│ *${prefix}kisahnabi*
 _Cerita Kisah Nabi_

│ *${prefix}listsurah*
_Melihat list surah Al-Quran_

│ *${prefix}surah*
_Mengirim surah Al-Quran_
│ ⤷ _ex: ${prefix}surah nomor surah_

│ *${prefix}jadwalsholat*
_Cek jadwal sholat_
│ ⤷ _ex: ${prefix}jadwalsholat Jakarta_

│ *${prefix}tafsir*
_Tafsir ayat surah Al-Quran_
│ ⤷ _ex: ${prefix}tafsir nama surah ayat_

│ *${prefix}alkitab*
_Al-Kitab search_
│ ⤷ _ex: ${prefix}alkitab nama injil_

│ *${prefix}hadis*
_Info hadis_
│ ⤷ _ex: ${prefix}hadis kitab | nomor_

│ *${prefix}asmaulhusna*
_Asmaul husna_
│ ⤷ _ex: ${prefix}asmaulhusna nomor_

│ *${prefix}randomquran*
│ ⤷ _random surah Al-Qur'an_

    `
}

exports.randomQuran = (ranquran) => {
    return `
❏ *RANDOM QURAN*
━━
بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم

⤷ *Nama surah*: ${ranquran.data.result.nama} / ${ranquran.data.result.asma}
⤷ *Arti*: ${ranquran.data.result.arti}
⤷ *Surat ke*: ${ranquran.data.result.nomor}
⤷ *Keterangan*: ${ranquran.data.result.keterangan}
⤷ *Link audio*: ${ranquran.data.result.audio}

    `
}

exports.hadis = () => {
    return `
❏ *MENU HADIST*
━━
بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم

⤷ *Daftar hadis*:
⤷1. Hadis Bukhari ada 6638 hadis
⤷    _usage_: ${prefix}hadis bukhari 1

⤷2. Hadis Muslim ada 4930 hadis
⤷    _usage_: ${prefix}hadis muslim 25

⤷3. Hadis Tirmidzi ada 3625 hadis
⤷    _usage_: ${prefix}hadis tirmidzi 10

⤷4. Hadis nasai ada 5364 hadis
⤷    _usage_: ${prefix}hadis nasai 6

⤷5. Hadis Ahmad ada 4305 hadis
⤷    _usage_: ${prefix}hadis ahmad 5

⤷6. Hadis Abu Daud ada 4419 hadis
⤷    _usage_: ${prefix}hadis abudaud 45

⤷7. Hadis Malik ada 1587 hadis
⤷    _usage_: ${prefix}hadis malik 45

⤷8. Hadis Ibnu Majah ada 4285 hadis
⤷    _usage_: ${prefix}hadis ibnumajah 8

⤷9. Hadis Darimi ada 2949 hadis
⤷    _usage_: ${prefix}hadis darimi 3

⤷ *Semoga bermanfaat*
_*Wassalam*_

    `
}

exports.asmaulHusna = (assna) => {
    return `
❏ *ASMAUL HUSNA*
━━
*${assna.name}*

⤷ *Asmaul husna ke*: ${assna.number}
⤷ *Pelafalan*: ${assna.transliteration}
⤷ *Inggris*: ${assna.en.meaning}

    `
}



exports.menuKerang = () => {
    return `
# MENU KERANG AJAIB
╭───────────────
│ *${prefix}gantengcek*
│ ⤷ _rate ganteng_
├───────────────
│ *${prefix}cantikcek*
│ ⤷ _rate cantik_
├───────────────
│ *${prefix}pbucin*
│ ⤷ _rate kebucinan_
├───────────────
│ *${prefix}watak*
│ ⤷ _cek watak_
├───────────────
│ *${prefix}hobby*
│ ⤷ _cek hobby_
├───────────────
│ *${prefix}apakah*
│ ⤷ _ex: ${prefix}apakah kamu lesbi ?_
├───────────────
│ *${prefix}rate*
│ ⤷ _ex: ${prefix}rate seberapa bucin ?_
├───────────────
│ *${prefix}bisakah*
│ ⤷ _ex: ${prefix}bisakah doi ?_
├───────────────
│ *${prefix}kapankah*
│ ⤷ _ex: ${prefix}kapankah dia mati ?_
├───────────────
│ *${prefix}Kutuk*
│ ⤷ _ex: ${prefix}kutuk @tag | karena_
├───────────────
│ *${prefix}Santet*
│ ⤷ _ex: ${prefix}santet @tag | karena_
╰───────────────
	`
}

exports.ringtone = () => {
    return `
❏ *MENU RINGTONE* ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
═════════════════
*VOICE ANIME*

⤷ 1. *${prefix}vndaisuki*

⤷ 2. *${prefix}vnbirthday*

⤷ 3. *${prefix}ostrandom*

⤷ 4. *${prefix}vn1*

⤷ 5. *${prefix}vn2*

⤷ 6. *${prefix}vn3*

⤷ 7. *${prefix}vn4*

⤷ 8. *${prefix}vn5*

⤷ 9. *${prefix}vn6*

⤷ *NOTIF ANIME*
_Penggunaan Ketik_ 

_*${prefix}notif1* sampai *${prefix}notif25*_

    `
}

exports.ostanime = () => {
    return `
❏ *OST ANIME*	 ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
══════════════════
│ *${prefix}ost-aot1*
_AOT Opening .1_

│ *${prefix}ost-aot2*
_AOT Opening .2_

│ *${prefix}ost-aot3*
_AOT Opening .3_

│ *${prefix}ost-sao*
_Sword art online_

│ *${prefix}ost-kny*
_Kimetsu No Yaiba_

│ *${prefix}ost-tg*
_Tokyo Ghoul_

│ *${prefix}ost-sparkle*
_Kimi no nawa_

│ *${prefix}ost-again*
_Fullmetal Alchemist_

│ *${prefix}ost-dn*
_Death Note_

│ *${prefix}ost-n1*
_Naruto Opening .1_

│ *${prefix}ost-n2*
_Naruto Opening .2_

│ *${prefix}ost-bc1*
_Black Clover .1_

│ *${prefix}ost-bc1*
_Black Clover .2_

│ *${prefix}ost-bc1*
_Black Clover .3_

│ *${prefix}ost-bc1*
_Black Clover .4_

│ *${prefix}ost-anohana*
_Anohana Ending_

│ *${prefix}ostrandom*
_OST anime random_

    `
}


exports.menuOwner = () => {
    return `
❏ *MENU OWNER*	
══════════════════
│ *${prefix}bc*
│ ⤷ _Membuat broadcast_
_Usage: ${prefix}bc teks_

│ *${prefix}clearall*
_Menghapus semua chat di akun bot_
_Usage: ${prefix}clearall_

│ *${prefix}getses*
_Mengambil screenshot sesi dari akun bot_
_Usage: ${prefix}getses_

│ *${prefix}ban*
_Menambah/menghapus user yang diban_
_Usage: ${prefix}ban add/del @user/62812xxxxxxxx_

│ *${prefix}leaveall*
_Keluar dari semua grup_
_Usage: ${prefix}leaveall_

│ *${prefix}shutdown*
_Men-shutdown bot_
_Usage: ${prefix}shutdown_

│ *${prefix}serial*
_Cek pendaftaran akun via serial_
_Usage: ${prefix}serial serial_user_

│ *${prefix}exif*
_Atur WM stiker bot_
_Usage: ${prefix}exif packname | authorname_

│ *${prefix}mute*
_Mute semua user_
_Usage: Gunakan ${prefix}mute_
══════════════════
	`
}

exports.menuLeveling = () => {
    return `
❏ *MENU LEVELING*
══════════════════
│ *${prefix}level*
_Untuk melihat level kamu_

│ *${prefix}leaderboard*
_Untuk melihat leaderboard_

    `
}

exports.rules = () => {
    return `
❏ *R U L E S*
══════════════════
1. Jangan spam bot. 
Sanksi: *SOFT BLOCK*

2. Jangan telepon bot.
Sanksi: *SOFT BLOCK*

3. Jangan mengeksploitasi bot.
Sanksi: *PERMANENT BLOCK*

Jika sudah dipahami rules-nya
silakan lanjut baca biar paham !
══════════════════

bot dapat online 24 Jam.
Gunakan bot sewajarnya.

*> dilarang keras spam*
*> telpon bot*
*> sanksi block*

sisa limit yg kamu punya hanya 25 perhari dan otomatis reset pada jam 00:00 WIB..
tidak ada limit untuk user premium.

untuk membeli premium ketik *${prefix}belipremium*

*Cara menggunakan Bot*

Prefix Shiro adalah : *${prefix}* Untuk membuka menu ketikan *${prefix}menu*
otomatis menu akan di kirimkan, lalu untuk memilih menu cukup ketikan *menu angka*
contoh : *menu 1* sampai dengan angka yang tersedia

lalu ada banyak pilihan fitur dan cara menggunakanya? contoh stiker
kirimkan gambar atau balas gambar lalu beri perintah caption dengan ketik *${prefix}sticker*
otomatis gambar tersebut akan Bot kirim menjadi Sticker.

jika ada error atau menu tidak bekerja, harap hubungi owner bot ini dengan ketik *$owner*.

dan jika masih bingung cara menggunakan bot silakan join group bantuan bot di bawah ini.

*Bot Support* : https://chat.whatsapp.com/J9FmTrDcGzeFvr19YZMHZW

_-zenuwu_`
}