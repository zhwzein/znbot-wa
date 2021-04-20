/*
 
 BOT WHATSAPP OPEN-WA LIB
 Source https://github.com/zhwzein/ZENZ-OPENWA
 By Zen's

 */

// NPM MODULES
const { decryptMedia, Client } = require('@open-wa/wa-automate')
const { fetchJson } = require('./function/fetcher.js')
const { exec } = require('child_process')
const config = require('./config.json')
const Nekos = require('nekos.life')
const neko = new Nekos()
const os = require('os')
const fs = require('fs-extra')
const fetch = require('node-fetch')
const emojiUnicode = require('emoji-unicode')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const cron = require('node-cron')
const canvas = require('canvacord')
const ms = require('parse-ms')
const toMs = require('ms')
const webp = require('webp-converter')
const axios = require('axios')
const path = require('path')
const ytdl = require('ytdl-core')
const ytsr = require('ytsr')
const ffmpeg = require('fluent-ffmpeg')
const translate = require('@vitalets/google-translate-api')
const convertapi = require('convertapi')('10CDuw4T35HeKK39')
const imgbb = require("imgbb-uploader");
const bent = require('bent')
const sharp = require('sharp')
const request = require('request')
const tts = require('node-gtts')
const FormData =require('form-data');
const sagiri = require('sagiri')
const saus = sagiri(config.nao, { results: 5 })

// UTILS
const { color, msgFilter, processTime, isUrl} = require('./function')
const { msg } = require('./msg')
const { downloader, stalker, fun, toxic, spammer, misc } = require('./lib')
const { register, limit, premium, level, nsfw, afk } = require('./data')
const { uploadImages } = require('./function/fetcher')
const limitCount = 25
const errorImg = 'https://i.ibb.co/yP8ZkXb/Pics-Art-02-28-08-54-47.jpg'

// MESSAGE HANDLER
module.exports = zein = async (zn = new Client(), message) => {
    try {
        const { from, id, type, caption, chat, t, sender, isGroupMsg, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { owner, prefix } = config
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const { name, formattedTitle } = chat
        let { pushname, formattedName, verifiedName } = sender
        pushname = pushname || formattedName || verifiedName
        const blockNumber = await zn.getBlockedIds()
        const botNumber = await zn.getHostNumber() + '@c.us'
        const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const ar = args.map((v) => v.toLowerCase())
        const q = args.join(' ')
        const query = args.join(' ')
        const now = moment(t * 1000).format('DD/MM/YYYY HH:mm:ss')
        const uaOverride = config.uaOverride
        const groupAdmins = isGroupMsg ? await zn.getGroupAdmins(groupId) : ''
        const url = args.length !== 0 ? args[0] : ''
        const senderr = sender.id

        // DATABASES
        const _simih = JSON.parse(fs.readFileSync('./database/group/simi.json'))
        const _antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
        const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
        const _premium = JSON.parse(fs.readFileSync('./database/bot/premium.json'))
        const _ban = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
        let _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
        const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
        const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
        const _nsfw = JSON.parse(fs.readFileSync('./database/group/nsfw.json'))
        const _afk = JSON.parse(fs.readFileSync('./database/user/afk.json'))
        const _uang = JSON.parse(fs.readFileSync('./database/user/uang.json'))
        const _userbalance = JSON.parse(fs.readFileSync('./database/user/userbalance.json')) // THIS BALANCE USER
        const _setiker = JSON.parse(fs.readFileSync('./database/data/sticker.json'))
        const _mute = JSON.parse(fs.readFileSync('./database/bot/mute.json'))
        const _videonye = JSON.parse(fs.readFileSync('./database/data/video.json'))
        const _audionye = JSON.parse(fs.readFileSync('./database/data/audio.json'))
        const _imagenye = JSON.parse(fs.readFileSync('./database/data/image.json'))

        // VALIDATOR
        const isGroupAdmins = groupAdmins.includes(senderr) || false
        const isLevelingOn = isGroupMsg ? _leveling.includes(groupId) : false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isCmd = body.startsWith(prefix)
        const isBanned = _ban.includes(senderr)
        const isBlocked = blockNumber.includes(senderr)
        const isOwner = senderr === owner
        const isRegistered = register.checkRegisteredUser(senderr, _registered)
        const isDetectorOn = isGroupMsg ? _antilink.includes(groupId) : false
        const isPremium = premium.checkPremiumUser(senderr, _premium)
        const isAfkOn = afk.checkAfkUser(senderr, _afk)
        const isSimi = _simih.includes(senderr)
        const isMute = isGroupMsg ? _mute.includes(chat.id) : false
        const isNsfw = isGroupMsg ? _nsfw.includes(groupId) : false
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')
        const isQuotedAudio = quotedMsg && quotedMsg.type === 'audio'
        const isQuotedVoice = quotedMsg && quotedMsg.type === 'ptt'
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isImage = type === 'image'
        const isAudio = type === 'audio'
        const isVoice = type === 'ptt'

        // FUNCTION
        function kyun(seconds){
        function pad(s){
            return (s < 10 ? '0' : '') + s;
        }
        var hours = Math.floor(seconds / (60*60));
        var minutes = Math.floor(seconds % (60*60) / 60);
        var seconds = Math.floor(seconds % 60);
        
        return `${pad(hours)} ${pad(minutes)} ${pad(seconds)}`
        }

        function tanggal(){
        myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
                    myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
                    var tgl = new Date();
                    var day = tgl.getDate()
                    bulan = tgl.getMonth()
                    var thisDay = tgl.getDay(),
                    thisDay = myDays[thisDay];
                    var yy = tgl.getYear()
                    var year = (yy < 1000) ? yy + 1900 : yy;
                    return `${thisDay}, ${day} ${myMonths[bulan]} ${year}`
        }
        
        premium.expiredCheck(_premium)
        cron.schedule('0 6 * * *', () => {
            const reset = []
            _limit = reset
            _afk = reset
            console.log('Resetting user limit...')
            fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
            fs.writeFileSync('./database/user/afk.json', JSON.stringify(_afk))
            console.log('Success!')
        }, {
            scheduled: true,
            timezone: 'Asia/Jakarta'
        })

        // PLAYER ROLE
        const levelRole = level.getLevelingLevel(senderr, _level)
        var role = 'Warrior III'
        if (levelRole <= 5) {
            role = 'Warrior II'
        } else if (levelRole <= 10) {
            role = 'Warrior I'
        } else if (levelRole <= 15) {
            role = 'Elite III'
        } else if (levelRole <= 20) {
            role = 'Elite II'
        } else if (levelRole <= 25) {
            role = 'Elite I'
        } else if (levelRole <= 30) {
            role = 'Master III'
        } else if (levelRole <= 35) {
            role = 'Master II'
        } else if (levelRole <= 40) {
            role = 'Master I'
        } else if (levelRole <= 45) {
            role = 'GrandMaster III'
        } else if (levelRole <= 50) {
            role = 'GrandMaster II'
        } else if (levelRole <= 55) {
            role = 'GrandMaster I'
        } else if (levelRole <= 60) {
            role = 'Epic III'
        } else if (levelRole <= 65) {
            role = 'Epic II'
        } else if (levelRole <= 70) {
            role = 'Epic I'
        } else if (levelRole <= 75) {
            role = 'Legend III'
        } else if (levelRole <= 80) {
            role = 'Legend II'
        } else if (levelRole <= 85) {
            role = 'Legend I'
        } else if (levelRole <= 90) {
            role = 'Mythic'
        } else if (levelRole <= 95) {
            role = 'Mythical Glory'
        } else if (levelRole >= 100) {
            role = 'Immortal'
        }

        // LEVELING
        if (isGroupMsg && isRegistered && !level.isGained(senderr) && !isBanned && isLevelingOn) {
            try {
                level.addCooldown(senderr)
                const currentLevel = level.getLevelingLevel(senderr, _level)
                const amountXp = Math.floor(Math.random() * (15 - 25 + 1) + 20)
                const requiredXp = 10 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100
                level.addLevelingXp(senderr, amountXp, _level)
                if (requiredXp <= level.getLevelingXp(senderr, _level)) {
                    level.addLevelingLevel(senderr, 1, _level)
                    const userLevel = level.getLevelingLevel(senderr, _level)
                    const fetchXp = 10 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                    await zn.reply(from, `*LEVEL UP*\n\n*XP :* ${level.getLevelingXp(senderr, _level)} / ${fetchXp}\n*Level :* ${currentLevel} -> ${level.getLevelingLevel(senderr, _level)}`, id)
                }
            } catch (err) {
                console.error(err)
            }
        }

        // ANTILINK GROUP
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/)/gi))) {
                const valid = await zn.inviteInfo(chats)
                if (valid) {
                    console.log(color('[KICK]', 'red'), color('Received a group link and it is a valid link!', 'yellow'))
                    await zn.reply(from, msg.linkDetected(), id)
                    await zn.removeParticipant(groupId, senderr)
                } else {
                    console.log(color('[WARN]', 'yellow'), color('Received a group link but is not a valid link!', 'yellow'))
                }
            }
        }

        // ANTILINK GROUP CHATT
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/chat.(?!whatsapp.com))/gi))) {
                console.log(color('[KICK]', 'red'), color('Received a fake group link.', 'yellow'))
                await zn.reply(from, 'Fake group link detected!', id)
                await zn.removeParticipant(groupId, senderr)
            }
        }
        
         // ANTI SPAMCHATT
         if (isGroupMsg && !isGroupAdmins && !isOwner) {
            if (chats.length > 5000) {
                await zn.sendTextWithMentions(from, `Terdeteksi Spam Chatt Oleh @${senderr}\nAnda akan dikick!`)
                await zn.removeParticipant(groupId, senderr)
             }
         }
         
         // SIMISIMI FUNCTION
		if ((!isCmd && isGroupMsg && isSimi) && type === 'chat') {
			fetchJson(`https://lolhuman.herokuapp.com/api/simi?apikey=${config.lol}&text=${encodeURIComponent(message.body)}`)
                    .then(async ({ result }) => {
                        await zn.reply(from, result, id)
                    
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, `Error!\n\n${err}`, id)
                    })
                })
            }

        // AFK FUNCTION
        if (isGroupMsg) {
            for (let ment of mentionedJidList) {
                if (afk.checkAfkUser(ment, _afk)) {
                    const getId = afk.getAfkId(ment, _afk)
                    const getReason = afk.getAfkReason(getId, _afk)
                    const getTime = afk.getAfkTime(getId, _afk)
                    await zn.reply(from, msg.afkMentioned(getReason, getTime), id)
                }
            }
            if (afk.checkAfkUser(senderr, _afk) && !isCmd) {
                _afk.splice(afk.getAfkPosition(senderr, _afk), 1)
                fs.writeFileSync('./database/user/afk.json', JSON.stringify(_afk))
                await zn.sendText(from, msg.afkDone(pushname))
            }
        }

        // BALANCE
        function convertBalanceToString(angka)
        {
            var balancenyeini = '';		
            var angkarev = angka.toString().split('').reverse().join('');
            for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) balancenyeini += angkarev.substr(i,3)+'.';
            return ''+balancenyeini.split('',balancenyeini.length-1).reverse().join('');
        }

        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`
        }
        
        const addATM = (senderr) => {
            const obj = {id: senderr, uang : 0}
            _uang.push(obj)
            fs.writeFileSync('./database/user/uang.json', JSON.stringify(_uang))
        }
        
        const addKoinUser = (senderr, amount) => {
            let position = false
            Object.keys(_uang).forEach((i) => {
                if (_uang[i].id === senderr) {
                    position = i
                }
            })
            if (position !== false) {
                _uang[position].uang += amount;
                fs.writeFileSync('./database/user/uang.json', JSON.stringify(_uang))
            }
        }
        
        const addSaldo = (senderr, amount) => {
            let position = false
            Object.keys(_userbalance).forEach((i) => {
                if (_userbalance[i].id === senderr) {
                    position = i
                }
            })
            if (position !== false) {
                _userbalance[position].xp += amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(_userbalance))
            }
        }
        
        const checkSaldouser = (senderr) => {
            let position = false
            Object.keys(_userbalance).forEach((i) => {
                if (_userbalance[i].id === senderr) {
                    position = i
                }
            })
            if (position !== false) {
                return _userbalance[position].xp
            }
        }

        const addAtmSaldo = (senderr) => {
            const obj = {id: senderr, xp : 0}
            _userbalance.push(obj)
            fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(_userbalance))
        }

        const confirmSaldo = (senderr, amount) => {
            let position = false
            Object.keys(_userbalance).forEach((i) => {
                if (_userbalance[i].id === senderr) {
                    position = i
                }
            })
            if (position !== false) {
                _userbalance[position].xp -= amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(_userbalance))
            }
        }

        const checkATMuser = (senderr) => {
            let position = false
            Object.keys(_uang).forEach((i) => {
                if (_uang[i].id === senderr) {
                    position = i
                }
            })
            if (position !== false) {
                return _uang[position].uang
            }
        }

        const bayarLimit = (senderr, amount) => {
            let pos = null
            Object.keys(_limit).forEach((i) => {
                if (_limit[i].id === senderr) {
                    pos = i
                }
            })
            if (pos !== null) {
                _limit[pos].limit -= amount
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
            }
        }
            
        const confirmATM = (senderr, amount) => {
            let position = false
            Object.keys(_uang).forEach((i) => {
                if (_uang[i].id === senderr) {
                    position = i
                }
            })
            if (position !== false) {
                _uang[position].uang -= amount
                fs.writeFileSync('./database/user/uang.json', JSON.stringify(_uang))
            }
        }
	
        if (isRegistered && isGroupMsg && !isBanned && isLevelingOn) {
            const checkATM = checkATMuser(senderr)
            try {
                if (checkATM === undefined) addATM(senderr)
                const uangsaku = Math.floor(Math.random() * 5) + 5
                addKoinUser(senderr, uangsaku)
            } catch (err) {
                console.error(err)
            }
        }

        if (isRegistered && isGroupMsg && !isBanned && isLevelingOn) {
            const checkSaldos = checkSaldouser(senderr)
            try {
                if (checkSaldos === undefined) addAtmSaldo(senderr)
                const uangsakus = Math.floor(Math.random() * 5) + 100
                addSaldo(senderr, uangsakus)
            } catch (err) {
                console.error(err)
            }
        }

        const convertSticker = function(shape, author, pack, mediaData, type) {
            return new Promise((resolve, reject) => {
                var upfile = "sticker." + type;
                var metadata = {
                    "pack": pack,
                    "author": author,
                    "shape": shape,
                    "api_key": "JDJiJDEwJEJkc09RZVhvRWJHMlNZV3RiamgyL09MTThTTy8xTGl2SVBJbHlWZklKamQ1alNTSi9FYzUu",
                };
                var url = "https://stickerman.org/api/convert";
                var boundary = "sticker";
                let data = "";
                for (var i in metadata) {
                    if ({}.hasOwnProperty.call(metadata, i)) {
                        data += "--" + boundary + "\r\n";
                        data += "Content-Disposition: form-data; name=" + i + "; \r\n\r\n" + metadata[i] + "\r\n";
                    }
                };
                data += "--" + boundary + "\r\n";
                data += "Content-Disposition: form-data; name=sticker; filename=" + upfile + "\r\n";
                data += "Content-Type:application/octet-stream\r\n\r\n";
                var payload = Buffer.concat([
                    Buffer.from(data, "utf8"),
                    Buffer.from(mediaData, 'binary'),
                    Buffer.from("\r\n--" + boundary + "--\r\n", "utf8"),
                ]);
                var options = {
                    method: 'post',
                    url: url,
                    headers: {
                        "Content-Type": "multipart/form-data; boundary=" + boundary
                },
                body: payload,
                encoding: null
            };
            request(options, function(error, response, body) {
                if (error) {
                    reject(error)
                } else {
                    resolve(body)
                }
                });
            });
        }

        // IGNORE BANNED AND BLOCKERD PLAYER
        if (isCmd && (isBanned || isBlocked) && !isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && (isBanned || isBlocked) && isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // ANTI SPAM LOG
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) {
        console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		return zn.reply(from, `_bersabar untuk cooldown 10 detik_`, id)
        }
        
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) {
        console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))
		return zn.reply(from, `_bersabar untuk cooldown 10_`, id)
        }

        // LOG
        if (isCmd && !isGroupMsg) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
            await zn.sendSeen(from)
        }
        if (isCmd && isGroupMsg) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))
            await zn.sendSeen(from)
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
		// AUTO REPLY
        if (chats == 'Menu 1'){ zn.reply(from, msg.menuPlayer(), id)}
        
        if (chats == 'menu 1'){ zn.reply(from, msg.menuPlayer(), id)}

        if (chats == 'Menu 2'){ zn.reply(from, msg.menuSticker(), id)}
        
        if (chats == 'menu 2'){ zn.reply(from, msg.menuSticker(), id)}

        if (chats == 'Menu 3'){ zn.reply(from, msg.menuStickernime(), id)}
        
        if (chats == 'menu 3'){ zn.reply(from, msg.menuStickernime(), id)}

        if (chats == 'Menu 4'){ zn.reply(from, msg.menuWeeaboo(), id)}
    
        if (chats == 'menu 4'){ zn.reply(from, msg.menuWeeaboo(), id)}
    
        if (chats == 'Menu 5'){ zn.reply(from, msg.menuPremium(), id)}
        
        if (chats == 'menu 5'){ zn.reply(from, msg.menuPremium(), id)}
    
        if (chats == 'Menu 6'){ zn.reply(from, msg.menuRandom(), id)}
    
        if (chats == 'menu 6'){ zn.reply(from, msg.menuRandom(), id)}
        
        if (chats == 'Menu 7'){ zn.reply(from, msg.menuFun(), id)}
        
        if (chats == 'menu 7'){ zn.reply(from, msg.menuFun(), id)}

        if (chats == 'Menu 8'){ zn.reply(from, msg.menuKerang(), id)}
    
        if (chats == 'menu 8'){ zn.reply(from, msg.menuKerang(), id)}

        if (chats == 'Menu 9'){ zn.reply(from, msg.menuMisc(), id)}
    
        if (chats == 'menu 9'){ zn.reply(from, msg.menuMisc(), id)}

        if (chats == 'Menu 10'){ zn.reply(from, msg.menuNsfw(), id)}
    
        if (chats == 'menu 10'){ zn.reply(from, msg.menuNsfw(), id)}
    
        if (chats == 'Menu 11'){ zn.reply(from, msg.menuWeb(), id)}
        
        if (chats == 'menu 11'){ zn.reply(from, msg.menuWeb(), id)}
    
        if (chats == 'Menu 12'){ zn.reply(from, msg.menuModeration(), id)}
    
        if (chats == 'menu 12'){ zn.reply(from, msg.menuModeration(), id)}

        if (chats == 'Menu 13'){ zn.reply(from, msg.menuDesign(), id)}
            
        if (chats == 'menu 13'){ zn.reply(from, msg.menuDesign(), id)}

        if (chats == 'Menu 14'){ zn.reply(from, msg.menuStalker(), id)}
            
        if (chats == 'menu 14'){ zn.reply(from, msg.menuStalker(), id)}
            
        if (chats == 'menu 15'){ zn.reply(from, msg.menuMusik(), id)}

        if (chats == 'Menu 15'){ zn.reply(from, msg.menuMusik(), id)}

        if (chats == 'menu 16'){ zn.reply(from, msg.menuSaver(), id)}

        if (chats == 'Menu 16'){ zn.reply(from, msg.menuSaver(), id)}

        if (chats == 'zein') {
            await zn.sendPtt(from, './media/music/areply/apa.mp3' , id)}

        if (chats == 'zen') {
            await zn.sendPtt(from, './media/music/areply/apa.mp3' , id)}
		
		if (isCmd && !isPremium && !isOwner) msgFilter.addFilter(from)
		
        switch (command) {

            case 'rules':
            case 'lanjut':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                await zn.reply(from, msg.rules(), id)
            break
            case 'menu':
            case 'help':
                const tgl = tanggal()
                uptimes = process.uptime()
                const uptem = kyun(uptimes)
                const jumlahUser = _registered.length
                const namaUserr = `${pushname}`
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                await zn.sendText(from, msg.menu(jumlahUser, role, namaUserr, tgl, uptem))
            break
            case 'register':
            case 'verify':
                if (isRegistered) return await zn.reply(from, 'Akun kamu sudah terverfikasi', id)
                const namaUser = `${pushname}`
                const umurUser = '20'
                const serialUser = register.createSerial(10)
                const userLevela = level.getLevelingLevel(senderr, _level)
                const userXpa = level.getLevelingXp(senderr, _level)
                const ppLinka = await zn.getProfilePicFromServer(senderr)
                if (ppLinka === undefined) {
                    var pepe = errorImg
                } else {
                    pepe = ppLinka
                }
                const requiredXpa = 10 * Math.pow(userLevela, 2) + 50 * userLevela + 100
                const ranka = new canvas.Rank()
                .setAvatar(pepe)
                    .setLevel(userLevela)
                    .setLevelColor('#ffffff', '#5ebdd8')
                    .setRank(Number(level.getUserRank(senderr, _level)))
                    .setRankColor('#ffffff', '#5ebdd8')
                    .setCurrentXP(userXpa)
                    .setOverlay('#000000', 100, false)
                    .setRequiredXP(requiredXpa)
                    .setProgressBar('#62d3f5', 'COLOR')
                    .setCustomStatusColor('#000000', 'COLOR')
                    .setBackground('COLOR', '#000000')
                    .setUsername(pushname)
                    .setDiscriminator(senderr.substring(9, 13))
                ranka.build()
                    .then(async (buffer) => {
                        canvas.write(buffer, `${senderr}_card.png`)                       
                register.addRegisteredUser(senderr, namaUser, umurUser, time, serialUser, _registered)
                await zn.sendFile(from, `${senderr}_card.png`, `${senderr}_card.png`, msg.registered(namaUser, senderr, time, serialUser), id)
                console.log(color('REGISTER'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
                fs.unlinkSync(`${senderr}_card.png`)
                })
                .catch(async (err) => {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                })
            break

            // ISLAMI
            case 'kota':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                await zn.reply(from, msg.wait(), id)
            try {
                const kota = await axios.get(`https://lolhuman.herokuapp.com/api/sholat/kota?apikey=${config.lol}`)
                const { result } = kota.data
                let drk = `*_Nama Kota Dari Sabang Ke Merauke :_*\n\n`
                for (let i = 0; i < kota.data.result.length; i++)
                drk += `- ${result[i].nama}\n`
                zn.sendText(from, drk, id)
            } catch (err) {
                zn.reply(from, 'Ada error sistem!', id)
            }
            break
            case 'jadwal':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!query) return await zn.reply(from, `Kota Apa? Contoh : ketik ${prefix}jadwal Jakarta\nUntuk melihat daftar kota Ketik ${prefix}kota `, id)
                await zn.reply(from, msg.wait(), id)
            try {
                const jadwal = await axios.get(`https://lolhuman.herokuapp.com/api/sholat/${query}?apikey=${config.lol}`)
                const { result } = jadwal.data
                let jdw = `*_Berikut Jadwal Dari Kota ${query} :_*\n\n`
                jdw += `Wilayah : ${result.wilayah}\nTanggal : ${result.tanggal}\nSahur : ${result.sahur}\nImsak : ${result.imsak}\nSubuh : ${result.subuh}\nTerbit : ${result.terbit}\nDhuha : ${result.dhuha}\nDzuhur : ${result.dzuhur}\nAshar : ${result.ashar}\nMaghrib : ${result.maghrib}\nIsya : ${result.isya}\n`
                zn.sendText(from, jdw, id)
            } catch (err) {
                zn.reply(from, 'Ada error sistem!', id)
            }
            break
            case 'asmaul':
            case 'asmaulhusna':
            if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
			if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                //if (args.length == 0) return zn.reply(from, `Usage: ${prefix + command} query\nExample: ${prefix + command} naruto`, id)
                get_result = await fetchJson(`https://lolhuman.herokuapp.com/api/asmaulhusna?apikey=${config.lol}`)
                get_result = get_result.result
                txt = `index : ${get_result.index}\n`
                txt += `latin : ${get_result.latin}\n`
                txt += `arab : ${get_result.ar}\n`
                txt += `id : ${get_result.id}\n`
                txt += `en : ${get_result.en}\n`
                zn.sendText(from, txt, id)
            break
            case 'kisahnabi':
            case 'kisah':
            if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
			if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (args.length == 0) return zn.reply(from, `Usage: ${prefix + command} query\nExample: ${prefix + command} muhammad`, id)
                get_result = await fetchJson(`https://lolhuman.herokuapp.com/api/kisahnabi/${query}?apikey=${config.lol}`)
                get_result = get_result.result
                txt = `name : ${get_result.name}\n`
                txt += `kelahiran : ${get_result.thn_kelahiran}\n`
                txt += `age : ${get_result.age}\n`
                txt += `place : ${get_result.place}\n\n`
                txt += `story :\n\n${get_result.story}\n`
                zn.sendText(from, txt, id)
            break
            case 'audiosurah':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (args.length == 0) return zn.reply(from, `Usage: ${prefix + command} nomor surah\nExample: ${prefix + command} 1\n\nUntuk melihat list surah ketik ${prefix}listsurah`, id)
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/quran/audio/${query}?apikey=${config.lol}`)
            break
            case 'listsurah':
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/quran?apikey=${config.lol}`)
                get_result = get_result.result
                ini_txt = '*List Surah :*\n\n'
                for (var x in get_result) {
                    ini_txt += `${x}. ${get_result[x]}\n`
                }
                zn.sendText(from, ini_txt, id)
            break
            case 'audioayat':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (args.length == 0) return zn.reply(from, `Usage: ${prefix + command} nomor surah | ayat\nExample: ${prefix + command} 56 | 1\n\nUntuk melihat list surah ketik ${prefix}listsurah`, id)
                const surat = q.substring(0, q.indexOf('|') - 1)
                const ayat = q.substring(q.lastIndexOf('|') + 2)
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/quran/audio/${surat}/${ayat}?apikey=${config.lol}`)
            break

            // Reply
            case 'masuk':
                await zn.reply(from, '*Group Shiro* : https://chat.whatsapp.com/J9FmTrDcGzeFvr19YZMHZW', id)
            break
            case 'textpro':
                zn.sendText(from, msg.menuTextpro())
            break
            case 'ephoto':
                zn.sendText(from, msg.menuEphoto())
            break
            case 'photoxy':
                zn.sendText(from, msg.menuPhotoxy())
            break
            case 'design':
                zn.sendText(from, msg.menuDesain())
            break

            // STICKER MAKER
            case 'bunder':
            case 'circle':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(pushname), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (isMedia && isImage || isQuotedImage) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    try {
                    await zn.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await zn.sendImageAsSticker(from, imageBase64, { author: 'setiker', pack: 'zen', circle: true })
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                }
            } else {
                    await zn.reply(from, `Untuk membuat sticker circle\nsilahkan *upload* atau reply foto dengan caption ${prefix}circle`, id)
            }
            break
            case 'findsticker':
            case 'findstick':
			    if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!q) return await zn.reply(from, 'mau nyari sticker apa?', id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                try {
                    await axios.get(`https://lolhuman.herokuapp.com/api/stickerwa?apikey=${config.lol}&query=${q}`)
                        .then(async ({ data }) => {
                            for (let i = 0; i < 5; i++) {
                                const findstik  = await data.result[0].stickers[i]
                                await zn.sendImageAsSticker(from, findstik, { keepScale: true, author: 'setiker', pack: 'zen'})
                                console.log('Success sending YouTube results!') 
                            } 
                        })
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                }
	        break
            case 'anal':
            case 'kuni':
            case 'smug': 
            case 'baka':
            case 'solog': 
            case 'kiss': 
            case 'ngif':
            case 'nsfw_neko_gif':
            case 'random_hentai_gif':
            case 'pussy':
            case 'feetg':
            case 'bj':
            case 'feed': 
            case 'cum':
            case 'cuddle':
            case 'classic':
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
            if (!isNsfw) return await zn.reply(from, msg.notNsfw(), id)
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
            await zn.reply(from, msg.wait(), id)
			ranp = getRandom('.gif')
			rano = getRandom('.webp')
			buffer = `http://api.lolhuman.xyz/api/random2/${command}?apikey=${config.lol}`
			exec(`wget ${buffer} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
				if (err) return zn.reply(from, 'error!', id)
                fs.unlinkSync(ranp)
				buff = fs.readFileSync(rano)
				zn.sendImageAsSticker(from, buff, { author: 'setiker', pack: 'zen' }, id)
				fs.unlinkSync(rano)
			})
		    break
            case 'takestick':
            case 'take':
                if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (quotedMsg && quotedMsg.type == 'sticker') {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                        if (!q.includes('|')) return await zn.reply(from, `*FORMAT SALAH*\n\nReply sticker dengan caption *${prefix}takestick pack | author*\n\nContoh: ${prefix}takestick zein | uwu`, id)
                        await zn.reply(from, msg.wait(), id)
                        const packnames = q.substring(0, q.indexOf('|') - 1)
                        const authors = q.substring(q.lastIndexOf('|') + 2)
                        const mediaData = await decryptMedia(quotedMsg)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await zn.sendImageAsSticker(from, imageBase64, { author: `${authors}`, pack: `${packnames}` })
                        .catch(async (err) => {
                            console.error(err)
                            await zn.reply(from, 'Error!', id)
                        })
                    } else {
                        await zn.reply(from, `Reply sticker yang ingin dicolong dengan caption *${prefix}takestick pack | author*\n\nContoh: ${prefix}takestick zein | uwu`, id)
                    }
            break
            case 'sgifwm':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (isMedia && type === 'video' || mimetype === 'image/gif') {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    const namaPacksgif = q.substring(0, q.indexOf('|') - 1)
                    const authorPacksgif = q.substring(q.lastIndexOf('|') + 2)
                    await zn.reply(from, msg.wait(), id)
                    try {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await zn.sendMp4AsSticker(from, videoBase64, { fps: 10, startTime: `00:00:00.0`, endTime : `00:00:06.0`, loop: 0 }, { author: `${authorPacksgif}`, pack: `${namaPacksgif}`, keepScale: true })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                
                            })
                    } catch (err) {
                        console.error(err)
                        await zn.reply(from, `Ukuran video terlalu besar\nMaksimal size adalah 1MB!`, id)
                    }
                } else if (isQuotedGif || isQuotedVideo) {
                    const namaPacksgif = q.substring(0, q.indexOf('|') - 1)
                    const authorPacksgif = q.substring(q.lastIndexOf('|') + 2)
                    await zn.reply(from, msg.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await zn.sendMp4AsSticker(from, videoBase64, { fps: 10, startTime: `00:00:00.0`, endTime : `00:00:06.0`, loop: 0 }, { author: `${authorPacksgif}`, pack: `${namaPacksgif}`, crop: false })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                
                            })
                    } catch (err) {
                        console.error(err)
                        await zn.reply(from, `Ukuran video terlalu besar\nMaksimal size adalah 1MB!`, id)
                    }
                } else {
                    await zn.reply(from, `Untuk membuat stickergif dengan watermark\ngunakan ${prefix}sgifwm author | packname`, id)
                }
            break
            case 'stickernocrop':
            case 'stickerp':
            case 'stnc':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (isMedia && isImage || isQuotedImage) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    try {
                    await zn.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await zn.sendImageAsSticker(from, imageBase64, { keepScale: true, author: 'setiker', pack: 'zen' })
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                }
            } else {
                    await zn.reply(from, `Untuk membuat sticker no crop\nsilahkan *upload* atau reply foto dengan caption ${prefix}stnc`, id)
            }
            break
            case 'sticker':
            case 'stiker':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(pushname), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (isMedia && isImage || isQuotedImage) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    try {
                    await zn.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await zn.sendImageAsSticker(from, imageBase64, { author: 'setiker', pack: 'zen' })
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                }
            } else {
                    await zn.reply(from, `Untuk membuat sticker\nsilahkan *upload* atau reply foto dengan caption ${prefix}sticker`, id)
            }
            break
            case 'stickergif':
            case 'sgif':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (isMedia && type === 'video' || mimetype === 'image/gif') {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    try {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await zn.sendMp4AsSticker(from, videoBase64, { fps: 10, startTime: `00:00:00.0`, endTime : `00:00:06.0`, loop: 0 }, { author: 'setiker', pack: 'zen' })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                
                            })
                    } catch (err) {
                        console.error(err)
                        await zn.reply(from, `Ukuran video terlalu besar\nMaksimal size adalah 1MB!`, id)
                    }
                } else if (isQuotedGif || isQuotedVideo) {
                    await zn.reply(from, msg.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await zn.sendMp4AsSticker(from, videoBase64, { fps: 10, startTime: `00:00:00.0`, endTime : `00:00:06.0`, loop: 0 }, { author: 'setiker', pack: 'zen' })
                            .then(async () => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                
                            })
                    } catch (err) {
                        console.error(err)
                        await zn.reply(from, `Ukuran video terlalu besar\nMaksimal size adalah 1MB!`, id)
                    }
                } else {
                    await zn.reply(from, `Untuk mengconvert GIF/Video menjadi stikergif silahkan upload video/gif dengan caption ${prefix}stikergif`, id)
                }
            break
            case 'stickertoimg':
            case 'stikertoimg':
            case 'toimg':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isQuotedSticker) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await zn.sendFile(from, imageBase64, 'sticker.jpg', '', id)
                    } catch (err) {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    }
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'triggered':
            case 'trigger':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.gif`)
                    const fileOutputPath = path.join(temp, 'video', `${name}.mp4`)
                    canvas.Canvas.trigger(mediaData)
                        .then((buffer) => {
                            canvas.write(buffer, fileInputPath)
                            ffmpeg(fileInputPath)
                                .outputOptions([
                                    '-movflags faststart',
                                    '-pix_fmt yuv420p',
                                    '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
                                ])
                                .inputFormat('gif')
                                .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                                .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                                .on('end', async () => { 
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    await zn.sendMp4AsSticker(from, fileOutputPath, { fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0}, {pack: 'zen', author: 'setiker'})
                                    console.log(color('[WAPI]', 'green'), 'Success sending GIF!')
                                    setTimeout(() => {
                                        fs.unlinkSync(fileInputPath)
                                        fs.unlinkSync(fileOutputPath)
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                } else {
                    await zn.reply(from, 'kirim gambarnya', id)
                }
            break
            case 'stickermeme':
            case 'smeme':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q.includes('|')) return await zn.reply(from, `*FORMAT SALAH*\n\nReply gambar dengan caption *${prefix}smeme atas | bawah*\n\nContoh: ${prefix}smeme zein | uwu`, id)
                if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                        limit.addLimit(senderr, _limit, isPremium, isOwner)
                    const top = q.substring(0, q.indexOf('|') - 1)
                    const bottom = q.substring(q.lastIndexOf('|') + 2)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const getUrl = await uploadImages(mediaData, `meme.${senderr}`)
                    await zn.reply(from, msg.wait(), id)
                    const create = `https://lolhuman.herokuapp.com/api/memegen?apikey=${config.lol}&texttop=${top}&textbottom=${bottom}&img=${getUrl}`
                    await zn.sendFileFromUrl(from, create, 'smeme.jpg', `${top} ${bottom}`, id)
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'attp': 
			    if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}attp text*\n\nContoh: ${prefix}attp zenuwu`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    const textu = body.slice(6)
                    const resultattp = await axios.get('https://api.xteam.xyz/attp?text=' + textu)
                    let stikes = resultattp.data.result
			    zn.sendImageAsSticker(from, stikes, { author: 'setiker', pack: 'zen', keepScale:'true' }, true)      
	        break
            case 'ttp': // CHIKAA CHANTEKKXXZZ
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                misc.ttp(q)
                    .then(async (res) => {
						await zn.sendImageAsSticker(from, res.base64, { author: 'setiker', pack: 'zen', keepScale:'true' })
                        console.log('Success creating TTP!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'emot':
            case 'emoji':    
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!q) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}emoji emot*\n\nContoh: ${prefix}emoji 🐦`, id)
                try {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                const emoji = emojiUnicode(q)
                await zn.sendImageAsSticker(from, await zn.download(`http://videfikri.com/api/emojitopng?emojicode=${emoji}`), { keepScale: true, author: 'setiker', pack: 'zen'})
                //await zn.sendStickerfromUrl(from, `http://videfikri.com/api/emojitopng?emojicode=${emoji}`){ keepScale: true, author: 'setiker', pack: 'zen'}
            } catch (err) {
                console.error(err)
                await zn.reply(from, 'Error!', id)
            }
            break
            case 'ttp2': 
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!q) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}ttp2 Text*\n\nContoh: ${prefix}ttp2 zenuwu`, id)
                try {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                console.log('Creating text...')
                await zn.sendImageAsSticker(from, await zn.download(`https://lolhuman.herokuapp.com/api/ttp3?apikey=${config.lol}&text=${q}`), { keepScale: true, author: 'setiker', pack: 'zen'})
                //await zn.sendStickerfromUrl(from, `http://videfikri.com/api/emojitopng?emojicode=${emoji}`){ keepScale: true, author: 'setiker', pack: 'zen'}
            } catch (err) {
                console.error(err)
                await zn.reply(from, 'Error!', id)
            }
            break
            case 'amongus': 
            case 'among': 
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!q) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}ttp2 Text*\n\nContoh: ${prefix}ttp2 zenuwu`, id)
                try {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                console.log('Creating text...')
                await zn.sendImageAsSticker(from, await zn.download(`https://lolhuman.herokuapp.com/api/amongus?apikey=${config.lol}&text=${q}`), { keepScale: true, author: 'setiker', pack: 'zen'})
                //await zn.sendStickerfromUrl(from, `http://videfikri.com/api/emojitopng?emojicode=${emoji}`){ keepScale: true, author: 'setiker', pack: 'zen'}
            } catch (err) {
                console.error(err)
                await zn.reply(from, 'Error!', id)
            }
            break
            case 'passed': 
                if (!q.includes('|')) return await zn.reply(from, `*FORMAT SALAH*\n\nReply dengan caption *${prefix}passed atas | bawah*\n\nContoh: ${prefix}passed zein | uwu`, id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
				await zn.reply(from, msg.wait(), id)
				const tek1 = q.substring(0, q.indexOf('|') - 1)
                const tek2 = q.substring(q.lastIndexOf('|') + 2)
                const passed = `https://lolhuman.herokuapp.com/api/gtapassed?apikey=${config.lol}&text1=${tek1}&text2=${tek2}`
                //await zn.sendImageAsSticker(from, passed, 'SPLBOT.jpg', `Nih : ${q}`, id)
                await zn.sendImageAsSticker(from, passed, { keepScale: true, author: 'setiker', pack: 'zen' })
                //zn.sendImageAsSticker(from, passed, { author: 'setiker', pack: 'zen' }, id)
				console.log('Success!')
            break
            case 'gifcricle':
            if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
            if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
            await zn.reply(from, 'processing data, please wait', message.id)
            const packi = 'zenuwu'
            const authori = 'setiker'
            if (isMedia && mimetype == 'image/jpeg') {
            await sleep(1000)
            const mediaData = await decryptMedia(quotedMsg)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await zn.sendImageAsSticker(from, imageBase64, { author: `${authori}`, pack: `${packi}` })
            } else if (quotedMsg && quotedMsgObj.mimetype == 'image/jpeg') {
            await sleep(1000)
            const mediaData = await decryptMedia(quotedMsg)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await zn.sendImageAsSticker(from, imageBase64, { author: `${authori}`, pack: `${packi}` })
            } else if (isMedia && mimetype == 'image/gif') {
            const shape = "circle"
            const type = "gif"
            const mediaData = await decryptMedia(message);
            await convertSticker(shape, authori, packi, mediaData, type, from).then((res) => zn.sendRawWebpAsSticker(from, res.toString("base64")))
            } else if (quotedMsg && quotedMsgObj.mimetype == 'image/gif') {
            const shape = "circle"
            const type = "gif"
            const mediaData = await decryptMedia(quotedMsg);
            await convertSticker(shape, authori, packi, mediaData, type, from).then((res) => zn.sendRawWebpAsSticker(from, res.toString("base64")))
            } else if (isMedia && mimetype == 'video/mp4') {
            const shape = "circle"
            const type = "mp4"
            const mediaData = await decryptMedia(message);
            await convertSticker(shape, authori, packi, mediaData, type, from).then((res) => zn.sendRawWebpAsSticker(from, res.toString("base64")))
            } else if (quotedMsg && quotedMsgObj.mimetype == 'video/mp4') {
            const shape = "circle"
            const type = "mp4"
            const mediaData = await decryptMedia(quotedMsg);
            await convertSticker(shape, authori, packi, mediaData, type, from).then((res) => zn.sendRawWebpAsSticker(from, res.toString("base64")))
            }
            break
            case 'wasted':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${senderr}`)
                    await zn.reply(from, msg.wait(), id)
                    await zn.sendImageAsSticker(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`, { keepScale: true, author: 'setiker', pack: 'zen'})
                    console.log('Success sending Wasted image!')
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'invert':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${senderr}`)
                    await zn.reply(from, msg.wait(), id)
                    await zn.sendImageAsSticker(from, `https://lolhuman.herokuapp.com/api/editor/invert?apikey=${config.lol}&img=${fotoWtNya}`, { keepScale: true, author: 'setiker', pack: 'zen'})
                    console.log('Success sending invert image!')
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'pixel':
            case 'pixelate':
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${senderr}`)
                    await zn.reply(from, msg.wait(), id) 
                    await zn.sendImageAsSticker(from, `https://lolhuman.herokuapp.com/api/editor/pixelate?apikey=${config.lol}&img=${fotoWtNya}`, { keepScale: true, author: 'setiker', pack: 'zen'})
                    console.log('Success sending invert image!')
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'pelangi':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${senderr}`)
                    await zn.reply(from, msg.wait(), id)
                    await zn.sendImageAsSticker(from, `https://some-random-api.ml/canvas/gay?avatar=${fotoWtNya}`, { keepScale: true, author: 'setiker', pack: 'zen'})
                    console.log('Success sending Wasted image!')
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'sepia':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${senderr}`)
                    await zn.reply(from, msg.wait(), id)
                    await zn.sendImageAsSticker(from, `https://some-random-api.ml/canvas/sepia?avatar=${fotoWtNya}`, { keepScale: true, author: 'setiker', pack: 'zen'})
                    console.log('Success sending Wasted image!')
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'merah':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${senderr}`)
                    await zn.reply(from, msg.wait(), id)
                    await zn.sendImageAsSticker(from, `https://some-random-api.ml/canvas/red?avatar=${fotoWtNya}`, { keepScale: true, author: 'setiker', pack: 'zen'})
                    console.log('Success sending Wasted image!')
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'hijau':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${senderr}`)
                    await zn.reply(from, msg.wait(), id)
                    await zn.sendImageAsSticker(from, `https://some-random-api.ml/canvas/green?avatar=${fotoWtNya}`, { keepScale: true, author: 'setiker', pack: 'zen'})
                    console.log('Success sending Wasted image!')
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'biru':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${senderr}`)
                    await zn.reply(from, msg.wait(), id)
                    await zn.sendImageAsSticker(from, `https://some-random-api.ml/canvas/blue?avatar=${fotoWtNya}`, { keepScale: true, author: 'setiker', pack: 'zen'})
                    console.log('Success sending Wasted image!')
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'glass':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${senderr}`)
                    await zn.reply(from, msg.wait(), id)
                    await zn.sendImageAsSticker(from, `https://some-random-api.ml/canvas/glass?avatar=${fotoWtNya}`, { keepScale: true, author: 'setiker', pack: 'zen'})
                    console.log('Success sending Wasted image!')
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'telesticker':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}ig link*\n\nContoh: ${prefix}ig linknya`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                try {
                    await axios.get(`https://lolhuman.herokuapp.com/api/telestick?apikey=${config.lol}&url=${q}`)
                        .then(async ({ data }) => {
                            for (let i = 0; i < 5; i++) {
                                const teled  = await data.result.sticker[i]
                                await zn.sendImageAsSticker(from, teled, { keepScale: true, author: 'setiker', pack: 'zen'})
                                console.log('Success sending YouTube results!') 
                            } 
                        })
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                }
            break

            // DOWNLOADER
            case 'ig':
            case 'igdl':
			    if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}ig link*\n\nContoh: ${prefix}ig linknya`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    const insta = await axios.get(`https://lolhuman.herokuapp.com/api/instagram?apikey=${config.lol}&url=${q}`)
                    let instadl = insta.data.result
			    zn.sendFileFromUrl(from, instadl, 'ig.mp4', '', id)     
	        break
            case 'twitter':
			    if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}twitter link*\n\nContoh: ${prefix}twitter linknya`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    const twitter = await axios.get(`https://lolhuman.herokuapp.com/api/twitter?apikey=${config.lol}&url=${q}`)
                    let twitterdl = twitter.data.result[1].link
			    zn.sendFileFromUrl(from, twitterdl, 'twitter.mp4', '', id)
	        break
            case 'fb':
            case 'facebook':
			    if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}fb link*\n\nContoh: ${prefix}fb linknya`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id) 
                    const efbe = await axios.get(`https://lolhuman.herokuapp.com/api/facebook?apikey=${config.lol}&url=${q}`)
                    let efbedl = efbe.data.result[1].link
			    zn.sendFileFromUrl(from, efbedl, 'fb.mp4', '', id)
	        break
            case 'playvideo':
			    if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
				if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
				//if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
				//limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (!q) return zn.reply(from, `Cara Pake : ${prefix}playvideo Judul nye`, id)
                await zn.reply(from, msg.wait(), id) 
				const resa = await ytsr(body.slice(6)).catch(err => {
					return zn.reply(from, `Gk ketemu 😔`, id)
				})
				const videoDatas = resa.items.filter(item => item.type === 'video')[0];
				console.log(videoDatas)
				console.log(videoDatas.url)
				var viidio = videoDatas.url.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
                let info = await ytdl.getInfo(viidio);
				let format = ytdl.chooseFormat(info.formats, { quality: '18' });
				console.log('Format found!', format)
				if (format.contentLength >= 15000000) {
						return zn.reply(from, `maksimal video 15MB`, id)
					} else {
				await sleep(2000)
				await zn.sendFileFromUrl(from, format.url, `${videoDatas.title}.mp4`, '\nJudul : '+ `${videoDatas.title}` +'\nChannel : ' + `${videoDatas.author.name}` + '\nDi upload : ' + `${videoDatas.uploadedAt}` +'\nLink : ' + `${videoDatas.url}` + '')
					}
				console.log('succes')
			break
            case 'play':
				if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
				if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
				//if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
				//limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
				if (args.length == 0) return zn.reply(from, `Format salah \nPenggunaan: ${prefix}play judul lagu`, id)
				const playaudio = {
					limit: 1,
					gl: 'BR',
					hl: 'pt'
				}
				const ress = await ytsr(body.slice(6), playaudio).catch(err => {
					return zn.reply(from, `Gak ada njir..`, id)
				})
				const audioResult = ress.items.filter(item => item.type === 'video')[0]
				if (!audioResult) {
					return zn.reply(from, `Gak ada njir..`, id)
				}
				const audioInfo = await ytdl.getInfo(audioResult.url, {
					quality: 'highestaudio'
				});
				let audioStream = ytdl(audioResult.url, {
					quality: 'highestaudio'
				}); 
				let mp3PlayInfo = {
					title: audioInfo.videoDetails.title,
					url: audioInfo.videoDetails.video_url,
					lengthSeconds: audioInfo.videoDetails.lengthSeconds,
					authorName: audioInfo.videoDetails.author.name,
					videoId: audioInfo.videoDetails.videoId,
					isPrivate: audioInfo.videoDetails.isPrivate,
				} 
				zn.reply(from, `*Judul :* ${mp3PlayInfo.title}\n\nMedia sedang dikirim..`, id)
				let audioPlaySize = (((mp3PlayInfo.lengthSeconds * 128000) / 8) / 1024) / 1024
				console.log(`Ukuran viddeo : ${audioPlaySize} MB`);
				if (audioPlaySize >= 15) {
					return zn.reply(from, `Kegedean bos maksimal file 15MB`, id)
				}
				if (mp3PlayInfo.lengthSeconds > 900) {
					return zn.reply(from, `Kepanjangan maksimal 900 detik`, id)
				}
				ffmpeg(audioStream)
					.audioBitrate(128)
					.save(`./temp/${mp3PlayInfo.videoId}.mp3`)
					.on('end', () => {
						var playStats = fs.statSync(`./temp/${mp3PlayInfo.videoId}.mp3`)
						let realSize = playStats.size / (1024 * 1024);
						console.log(`Tamanho real: ${realSize} MB`);
						if (realSize <= 15) {
							zn.sendFile(from, `./temp/${mp3PlayInfo.videoId}.mp3`, `${mp3PlayInfo.videoId}.mp3`, null, id).then(f => {
								try {
									fs.unlinkSync(`./temp/${mp3PlayInfo.videoId}.mp3`);
									console.log(`successfully deleted ${mp3PlayInfo.videoId}.mp3`);
								} catch (err) {
									// handle the error
									console.log(err);
								}
							})
						} else {
							return zn.reply(from, `Gk ada lagunya njir..`, id)
						}
					});					
			break
            case 'spotify':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
                    if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                    if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    console.log('Sending yt Profile')
                    const sepot = await axios.get(`https://lolhuman.herokuapp.com/api/spotifysearch?apikey=${config.lol}&query=${q}`)
                    hasil = `Judul : ${sepot.data.result[0].title}\nArtist : ${sepot.data.result[0].artists}\nDuration : ${sepot.data.result[0].duration}\nPopularity : ${sepot.data.result[0].popularity}\n\nLink : ${sepot.data.result[0].external_urls.spotify}`
                    await zn.reply(from, hasil, id)
                    await zn.sendFileFromUrl(from, `${sepot.data.result[0].preview_url}`, 'sepot.mp3', '', id)
                        .then(() => console.log('Success sending quotes..'))
                        .catch(async (err) => {
                            console.error(err)
                            await zn.reply(from, 'ID Tidak Ketemu', id)
                        })
            break
            case 'spotifydl':
                if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
                    if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                    if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    console.log('Download Spotifydl')
                    const sepotit = await axios.get(`https://lolhuman.herokuapp.com/api/spotify?apikey=${config.lol}&url=${q}`)
                    hasil = `Judul : ${sepotit.data.result.title}\nArtist : ${sepotit.data.result.artists}\nDuration : ${sepotit.data.result.duration}\nPopularity : ${sepotit.data.result.popularity}\nMedia Sedang Dikirim..`
                    await zn.reply(from, hasil, id)
                    await zn.sendFileFromUrl(from, `${sepotit.data.result.link[3].link}`, 'sepotit.mp3', '', id)
                        .then(() => console.log('Success sending quotes..'))
                        .catch(async (err) => {
                            console.error(err)
                            await zn.reply(from, 'ID Tidak Ketemu', id)
                        })
            break
            case 'joox': // By Hafizh
				if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return await zn.reply(from. msg.groupOnly(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const dataJoox = await axios.get(`https://lolhuman.herokuapp.com/api/jooxplay?apikey=${config.lol}&query=${q}`)
                const cardJoox = new canvas.Spotify()
                    .setAuthor(dataJoox.data.result.result.info.singer)//
                    .setAlbum(dataJoox.data.result.result.info.album)//
                    .setStartTimestamp(dataJoox.data.result.result.info.duration)//
                    .setEndTimestamp(10)
                    .setImage(dataJoox.data.result.result.image)//
                    .setTitle(dataJoox.data.result.result.info.song)//
                cardJoox.build()
                    .then(async (buffer) => {
                        canvas.write(buffer, `${senderr}_joox.png`)
                        await zn.sendFile(from, `${senderr}_joox.png`, 'joox.png','Mohon tunggu media sedang dikirim..', id)
                        fs.unlinkSync(`${senderr}_joox.png`)
                        await zn.sendFileFromUrl(from, dataJoox.data.result.result.audio[0].link, 'joox.mp3', '', id)
                        await zn.reply(from, `Lirik :\n\n${dataJoox.data.result.result.lirik}`, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'cocofun':
                if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
                    if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                    if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    console.log('Download Cocofun')
                    const cocof = await axios.get(`https://lolhuman.herokuapp.com/api/cocofun?apikey=${config.lol}&url=${q}`)
                    hasil = `Judul : ${cocof.data.result.title}\nTag : ${cocof.data.result.tag}\nLikes : ${cocof.data.result.likes}\nDislike : ${cocof.data.result.dislike}\nViews : ${cocof.data.result.views}\nUploader : ${cocof.data.result.uploader}`
                    await zn.sendFileFromUrl(from, `${cocof.data.result.nowm}`, 'cocof.mp4', hasil, id)
                        .then(() => console.log('Success sending quotes..'))
                        .catch(async (err) => {
                            console.error(err)
                            await zn.reply(from, 'ID Tidak Ketemu', id)
                        })
            break
            case 'pin':
			    if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}pins query*\n\nContoh: ${prefix}pins hanekawa`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id) 
                    const pin = await axios.get(`https://lolhuman.herokuapp.com/api/pinterest?apikey=${config.lol}&query=${q}`)
                    let pint = pin.data.result
			    zn.sendFileFromUrl(from, pint, 'pin.jpg', '', id)
	        break
            case 'wall':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const wal1 = await fetch(`https://lolhuman.herokuapp.com/api/wallpaper?apikey=${config.lol}&query=${q}`)
                const wal2 = await wal1.json()
                zn.sendFileFromUrl(from, wal2.result, 'randomwall.jpg', `Hasil Dari ${q}`, id)
                .then(() => console.log('Success sending wall..'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
			break
            case 'pixiv':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                await zn.reply(from, `_*NSFW WARNING*_\nMohon Tunggu Sebentar..`, id)
                console.log('Sending pixiv Pict..')
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/pixiv?apikey=${config.lol}&query=${q}`, '_*NSFW WARNING*_','', id)
                    .then(() => console.log('Success sending pixiv image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'pixivdl':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (args.length == 0) return reply(`Usage: ${prefix + command} pixiv_id\nExample: ${prefix + command} 63456028`)
                await zn.sendFileFromUrl(from, `http://api.lolhuman.xyz/api/pixivdl/${q}?apikey=${config.lol}`,`pixdl.jpg`,`nah ini`, id)
			break
            case 'konachan':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                await zn.reply(from, `_*NSFW WARNING*_\nMohon Tunggu Sebentar..`, id)
                console.log('Sending konachan Pict..')
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/konachan?apikey=${config.lol}&query=${q}`, '_*NSFW WARNING*_','', id)
                    .then(() => console.log('Success sending konachan image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'tiktok': 
            case 'nowm':
                if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
                    if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                    if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    console.log('Download tiktok')
                    await zn.reply(from, `Mohon Tunggu Sebentar..`, id)
                    const tiktok = await axios.get(`https://lolhuman.herokuapp.com/api/tiktok?apikey=${config.lol}&url=${q}`)
                    hasil = `Title : ${tiktok.data.result.title}\nDescription : ${tiktok.data.result.description}\nDuration : ${tiktok.data.result.duration}\n`
                    await zn.sendFileFromUrl(from, `${tiktok.data.result.link}`, 'tiktok.mp4', hasil, id)
                        .then(() => console.log('Success sending quotes..'))
                        .catch(async (err) => {
                            console.error(err)
                            await zn.reply(from, 'Link Tidak Ketemu', id)
                        })
            break
            
			// MUSIC
            case 'slow':
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
			if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && isAudio || isQuotedAudio || isVoice || isQuotedVoice) {
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedAudio || isQuotedVoice ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.mp3`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .audioFilter(`atempo=0.7,asetrate=44100`)
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await zn.sendPtt(from, fileOutputPath, id)
                                console.log(color('[WAPI]', 'green'), 'Success sending audio!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await zn.reply(from, `*FORMAT SALAH*\n\nReply suara/vn dengan caption *${prefix}bass ukuran*\n\nContoh: ${prefix}bass 50`, id)
                }
            break
            case 'pitch':
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
			if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && isAudio || isQuotedAudio || isVoice || isQuotedVoice) {
                    if (args.length !== 1) return await zn.reply(from, `*FORMAT SALAH*\n\nReply suara/vn dengan caption *${prefix}bass ukuran*\n\nContoh: ${prefix}bass 50`, id)
                    if (args[0] > 12) return zn.reply(from, "Max 12", id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedAudio || isQuotedVoice ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.mp3`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .audioFilter(`asetrate=48000*2^(${args[0]}/12),atempo=1/2^(${args[0]}/12)`)
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await zn.sendPtt(from, fileOutputPath, id)
                                console.log(color('[WAPI]', 'green'), 'Success sending audio!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await zn.reply(from, `*FORMAT SALAH*\n\nReply suara/vn dengan caption *${prefix}bass ukuran*\n\nContoh: ${prefix}bass 50`, id)
                }
            break
			case 'bass':
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
			if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && isAudio || isQuotedAudio || isVoice || isQuotedVoice) {
                    if (args.length !== 1) return await zn.reply(from, `*FORMAT SALAH*\n\nReply suara/vn dengan caption *${prefix}bass ukuran*\n\nContoh: ${prefix}bass 50`, id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedAudio || isQuotedVoice ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.mp3`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .audioFilter(`equalizer=f=40:width_type=h:width=50:g=${args[0]}`)
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await zn.sendPtt(from, fileOutputPath, id)
                                console.log(color('[WAPI]', 'green'), 'Success sending audio!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await zn.reply(from, `*FORMAT SALAH*\n\nReply suara/vn dengan caption *${prefix}bass ukuran*\n\nContoh: ${prefix}bass 50`, id)
                }
            break
            case 'gemuk':
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
			if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && isAudio || isQuotedAudio || isVoice || isQuotedVoice) {
                    //if (args.length !== 1) return await zn.reply(from, `*FORMAT SALAH*\n\nReply suara/vn dengan caption *${prefix}bass ukuran*\n\nContoh: ${prefix}bass 50`, id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedAudio || isQuotedVoice ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.mp3`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .audioFilter(`atempo=1.6,asetrate=22100`)
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await zn.sendPtt(from, fileOutputPath, id)
                                console.log(color('[WAPI]', 'green'), 'Success sending audio!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await zn.reply(from, `*FORMAT SALAH*\n\nReply suara/vn dengan caption *${prefix}bass ukuran*\n\nContoh: ${prefix}bass 50`, id)
                }
            break
            case 'nightcore':
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                    if (isMedia && isAudio || isQuotedAudio || isVoice || isQuotedVoice) {
                        //if (args.length !== 1) return await zn.reply(from, `*FORMAT SALAH*\n\nReply suara/vn dengan caption *${prefix}bass ukuran*\n\nContoh: ${prefix}bass 50`, id)
                        if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                        limit.addLimit(senderr, _limit, isPremium, isOwner)
                        await zn.reply(from, msg.wait(), id)
                        const encryptMedia = isQuotedAudio || isQuotedVoice ? quotedMsg : message
                        console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        const temp = './temp'
                        const name = new Date() * 1
                        const fileInputPath = path.join(temp, `${name}.mp3`)
                        const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                        fs.writeFile(fileInputPath, mediaData, (err) => {
                            if (err) return console.error(err)
                            ffmpeg(fileInputPath)
                                .audioFilter(`atempo=1.06,asetrate=44100*1.25`)
                                .format('mp3')
                                .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                                .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                                .on('end', async () => {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    await zn.sendPtt(from, fileOutputPath, id)
                                    console.log(color('[WAPI]', 'green'), 'Success sending audio!')
                                    setTimeout(() => {
                                        fs.unlinkSync(fileInputPath)
                                        fs.unlinkSync(fileOutputPath)
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                    } else {
                        await zn.reply(from, `*FORMAT SALAH*\n\nReply suara/vn dengan caption *${prefix}bass ukuran*\n\nContoh: ${prefix}bass 50`, id)
                    }
                break
            case 'tupai':
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
			if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && isAudio || isQuotedAudio || isVoice || isQuotedVoice) {
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedAudio || isQuotedVoice ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.mp3`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .audioFilter(`atempo=0.5,asetrate=65100`)
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await zn.sendPtt(from, fileOutputPath, id)
                                console.log(color('[WAPI]', 'green'), 'Success sending audio!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await zn.reply(from, `*FORMAT SALAH*\n\nReply suara/vn dengan caption *${prefix}bass ukuran*\n\nContoh: ${prefix}bass 50`, id)
                }
            break
            
            // KERANG AJAIB
            case 'gantengcek':
		    case 'cekganteng':
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
			if (args.length < 1) return zn.reply(from, 'namanya siapa?', id)
			ganteng = body.slice(12)
			const gan =['10%','30%','20%','40%','50%','60%','70%','62%','74%','83%','97%','100%','29%','94%','75%','82%','41%','39%']
			const teng = gan[Math.floor(Math.random() * gan.length)]
			await zn.sendText(from, 'Pertanyaan : Cek Ganteng Bang *'+args+'*\n\nJawaban : '+ teng)
			break
		    case 'cantikcek':
		    case 'cekcantik':
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
			if (args.length < 1) return zn.reply(from,'namanya siapa?', id)
			cantik = body.slice(11)
			if (args.length < 1) return zn.reply(from, 'Yg Mau dicek Siapa Kak??', id)
			const can =['10% banyak" perawatan ya kak:v\nCanda Perawatan:v','30% Semangat Kaka Merawat Dirinya><','20% Semangat Ya Kaka👍','40% Wahh Kaka><','50% kaka cantik deh><','60% Hai Cantik🐊','70% Hai Ukhty🐊','62% Kakak Cantik><','74% Kakak ni cantik deh><','83% Love You Kakak><','97% Assalamualaikum Ukhty🐊','100% Kakak Pake Susuk ya??:v','29% Semangat Kakak:)','94% Hai Cantik><','75% Hai Kakak Cantik','82% wihh Kakak Pasti Sering Perawatan kan??','41% Semangat:)','39% Lebih Semangat🐊']
			const tik = can[Math.floor(Math.random() * can.length)]
			await zn.sendText(from, 'Pertanyaan : Cantik Cek Kakak *'+args+'*\n\nPersen Kecantikan : '+ tik)
			break
            case 'kapankah':
            case 'kapan':
			if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!query) return await zn.reply(from, `Kapan apaan?`, id)
                const when = args.join(' ')
                const kapankah = ['1 Hari Lagi','1 Minggu lagi','1 Bulan lagi','1 Tahun lagi']
                const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
                if (!when) zn.reply(from, `*FORMAT SALAH*\n\nKetik caption *${prefix}kapankah Text*\n\nContoh: ${prefix}kapankah dia meninggal`, id)
                await zn.sendText(from, `Pertanyaan: *${when}* \nJawaban: ${ans}`)
			break
			case 'nilai':
			case 'rate':
			if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!query) return await zn.reply(from, `mau nilai apaan?`, id)
                const rating = args.join(' ')
                const rate = ['100%','95%','90%','85%','80%','75%','70%','65%','60%','55%','50%','45%','40%','35%','30%','25%','20%','15%','10%','5%']
                const awr = rate[Math.floor(Math.random() * (rate.length))]
                if (!rating) zn.reply(from, `*FORMAT SALAH*\n\nKetik caption *${prefix}rate Text*\n\nContoh: ${prefix}rate zein ganteng`, id)
                await zn.sendText(from, `Pertanyaan: *${rating}* \nJawaban: ${awr}`)
			break
			case 'apakah':
            case 'apa':
			if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
			if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!query) return await zn.reply(from, `ya apaan?`, id)
                const nanya = args.join(' ')
                const apakah = ['Iya','Sangat Setuju','Tidak','Tidak Setuju','Tidak Tau','Mungkin','Coba Tanyakan Sekali Lagi']
                const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
                if (!nanya) zn.reply(from, `*FORMAT SALAH*\n\nKetik caption *${prefix}apakah Text*\n\nContoh: ${prefix}kapankah zein ganteng`, id)
                await zn.sendText(from, `Pertanyaan: *${nanya}* \nJawaban: ${jawab}`)
			break
			case 'bisakah':
            case 'bisa':
			if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
			if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
			if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!query) return await zn.reply(from, `bisa apaan?`, id)
                const bsk = args.join(' ')
                const bisakah = ['Sangat Bisa','Bisa','B Aja','Coba Tanyakan Sekali Lagi','Tidak Bisa','Tidak Tau']
                const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
                if (!bsk) zn.reply(from, `*FORMAT SALAH*\n\nKetik caption *${prefix}bisakah Text*\n\nContoh: ${prefix}bisakah dia meninggal`, id)
                await zn.sendText(from, `Pertanyaan: *${bsk}* \nJawaban: ${jbsk}`)
			break
	        case 'santet':
			if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (mentionedJidList.length === 0) return zn.reply(from, `Tag member yang mau disantet\n\nContoh : ${prefix}santet @tag | kalo berak kaga di siram`, id)
                if (args.length === 1) return zn.reply(from, `Masukkan alasan kenapa menyantet dia!!\n\nContoh : ${prefix}santet @tag | kalo berak kaga di siram`, id)
                const santet = ['Muntah Paku','Meninggoy','Meninggal','Berak Paku','Muntah Rambut','Muntah Jembut','Ketempelan MONYET!!!','Ketempelan Tuyul','Berak di Celana Terus','Menjadi Gila','Menjadi Bodoh','Berak Beling','Berak Batu']
                const terima1 = santet[Math.floor(Math.random() * (santet.length))]
                const nyante = body.slice(7)
                const target = nyante.split('|')[0]
                const alasan = nyante.split('|')[1]
                await zn.sendTextWithMentions(from, `Santet terkirim ke ${target}\n\nAlasan: ${alasan}\n\nJenis Santet Yang di Terima:\n*${terima1}*`)
			break
			case 'kutuk':
			if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (mentionedJidList.length === 0) return zn.reply(from, `Tag member yang mau disantet\n\nContoh : ${prefix}kutuk @tag | kalo berak kaga di siram`, id)
                if (args.length === 1) return zn.reply(from, `Masukkan alasan kenapa menyantet dia!!\n\nContoh : ${prefix}kutuk @tag | kalo berak kaga di siram`, id)
                const kutuk = ['Sapi','Batu','Babi','pohon pisang','janda','bangsat','buaya','Jangkrik','Kambbing','Bajing','kang seblak','kang gorengan','kang siomay','badut ancol','Tai Badak','Kebo','Badak','tai kotok','Bwebwek','Orang Suksesss...... tapi boong','Beban Keluarga']
                const terima2 = kutuk[Math.floor(Math.random() * (kutuk.length))]
                const nyantey = body.slice(7)
                const target2 = nyantey.split('|')[0]
                const alasan2 = nyantey.split('|')[1]
                await zn.sendTextWithMentions(from, `Kutukan terkirim ke ${target2}\n\nAlasan: ${alasan2}\n\nJenis Santet Yang di Terima:\n*${terima2}*`)
			break
            case 'pbucin':
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (args.length < 1) return zn.reply(from, 'Namanya siapa?', id)
                persenbucin = ["4%\n\nHadehh🤦","9%\n\nMasih Kecil Dah Bucin Ae","17%\n\nNakk Masih Kecil","28%\n\nYoalahh hmm","34%\n\nMayan Lah","48%\n\nGatau","59%\n\nBiasa Kang Bucin","62%\n\nHadehhh🏃","74%\n\nbucen Teroosss","83%\n\nSekali² kek Ga bucin Gitu","97%\n\nHadehh Pakboi²","100%\n\nHadehhh Ini Bukan Bucin Tapi Pakboi","29%\n\nKasian Mana Masih Muda","94%\n\nDasar Pakboi","75%\n\nYa Ampun"]
                const pbucin = persenbucin[Math.floor(Math.random() * persenbucin.length)]
                zn.sendText(from, 'Persen Bucin: '+query+'\nJawaban : '+ pbucin)
		    break
            case 'watak':
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (args.length < 1) return zn.reply(from, 'Namanya siapa?', id)
                wa =["penyayang","pemurah","Pemarah","Pemaaf","Penurut","Baik","baperan","Baik Hati","penyabar","Uwu","top deh, pokoknya","Suka Membantu"]
                const tak = wa[Math.floor(Math.random() * wa.length)]
			    zn.sendText(from, 'Pertanyaan : *'+query+'*\n\nJawaban : '+ tak)
            break 
            case 'hobby':
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (args.length < 1) return zn.reply(from, 'Namanya siapa?', id)
                hob =["ngeue sapi","ngeue kambing","Memasak","Membantu Atok","Mabar","Nobar","Sosmed an","Membantu Orang lain","Nonton Anime","Nonton Drakor","Naik Motor","Nyanyi","Menari","Bertumbuk","Menggambar","Foto fotoan Ga jelas","Maen Game","Berbicara Sendiri"]
                const by = hob[Math.floor(Math.random() * hob.length)]
                zn.sendText(from, 'Pertanyaan : *'+query+'*\n\nJawaban : '+ by)
            break 

            // FUN MENU
            case 'cekkelamin':
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
			const seanl = await axios.get(`https://api.genderize.io/?name=${body.slice(12)}`)
			const name11 = seanl.data.name
            const genderr = seanl.data.gender
			await zn.reply(from, `    「 Cek Kelamin \n\nNama : ${name11} \n Jenis Kelamin : ${genderr}\n\nMale : Laki-Laki\nFemale : Perempuan\nNull : Error`, id)
			break
            case 'cekmati':
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
			const predea = await axios.get(`https://api.agify.io/?name=${body.slice(9)}`)
			await zn.reply(from, `Nama : ${predea.data.name}\n*Mati Pada Umur :* ${predea.data.age} Tahun.\n\n_Cepet Cepet Tobat Bro Soalnya Mati ga ada yang tau_`, id)
			break
            case 'creepyfact': // By Kris
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    fetch('https://raw.githubusercontent.com/TheSploit/CreepyFact/main/creepy.txt')
                    .then((res) => res.text())
                    .then(async (body) => {
                        let creepyx = body.split('\n')
                        let creepyz = creepyx[Math.floor(Math.random() * creepyx.length)]
                        await zn.reply(from, creepyz, id)
                })
                    .catch(async (err) => {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                })
            break
            case 'zodiac':
            case 'zodiak':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (args.length !== 1) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                fun.zodiak(args[0])
                    .then(async ({ result }) => {
                        if (result.status === 204) {
                            return await zn.reply(from, result.ramalan, id)
                        } else {
                            let ramalan = `Zodiak: ${result.zodiak}\n\nRamalan: ${result.ramalan}\n\nAngka laksek: ${result.nomorKeberuntungan}\n\n${result.motivasi}\n\n${result.inspirasi}`
                            await zn.reply(from, ramalan, id)
                                .then(() => console.log('Success sending zodiac fortune!'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'wancak':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                console.log('Sending wancak meme..')
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/onecak?apikey=${config.lol}`, 'wancak.jpg','', id)
                    .then(() => console.log('Success sending wancak image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
		    case 'simih':
			if (!isGroupMsg) return zn.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return zn.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
			if (args.length !== 1) return zn.reply(from, `Untuk mengaktifkan simi-simi pada Group Chat\n\nPenggunaan\n${prefix}simi on --mengaktifkan\n${prefix}simi off --nonaktifkan\n`, id)
			if (args[0] == 'on') {
				_simih.push(senderr)
				fs.writeFileSync('./database/group/simi.json', JSON.stringify(_simih))
                zn.reply(from, 'Mengaktifkan bot simi-simi!', id)
			} else if (args[0] == 'off') {
				let inxx = _simih.indexOf(senderr)
				_simih.splice(inxx, 1)
				fs.writeFileSync('./database/group/simi.json', JSON.stringify(_simih))
				zn.reply(from, 'Menonaktifkan bot simi-simi!', id)
			} else {
				zn.reply(from, `Untuk mengaktifkan simi-simi pada Group Chat\n\nPenggunaan\n${prefix}simi on --mengaktifkan\n${prefix}simi off --nonaktifkan\n`, id)
			}
			break
            case 'family100': //By: VideFrelan
             if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
             fun.family()
             .then(async ({ result }) => {
                 await zn.reply(from, `*Soal :* ${result.question}`, id)
                 await zn.sendText(from, '30 Detik Tersisa...')
                     await sleep(10000)
                     await zn.sendText(from, '20 Detik Tersisa...')
                     await sleep(10000)
                     await zn.sendText(from, '10 Detik Tersisa...')
                     await sleep(10000)
                await zn.reply(from, `*Jawaban :* \n-${result.aswer[0]}\n-${result.aswer[1]}\n-${result.aswer[2]}`, id)   
             })
             .then(() => {
                 console.log('Sukses mengirim jawaban caklontong!')
             })
             .catch(async (err) => {
                 console.error(err)
                 await zn.reply(from, 'Error!')
             })
            break
			case 'caklontong': //By: VideFrelan
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                fun.caklontong()
                .then(async ( { result }) => {
                    await zn.reply(from, `*Soal :* ${result.question}`, id)
                    await zn.sendText(from, '30 Detik Tersisa...')
                        await sleep(10000)
                        await zn.sendText(from, '20 Detik Tersisa...')
                        await sleep(10000)
                        await zn.sendText(from, '10 Detik Tersisa...')
                        await sleep(10000)
                    await zn.reply(from, `*Jawaban :* ${result.answer}\n*Information :* ${result.information}`, id)
                })
                .then(() => {
                    console.log('Sukses mengirim jawaban caklontong!')
                })
                .catch(async (err) => {
                    console.error(err)
                    await zn.reply(from, 'Error!')
                })
            break
            case 'tebakgambar':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                fun.tbkgmbr()
                    .then(async ({ result }) => {
                        await zn.sendFileFromUrl(from, result.soal_gbr, 'TebakGambar.jpg', '', id)
                        await zn.sendText(from, '30 Detik Tersisa...')
                        await sleep(10000)
                        await zn.sendText(from, '20 Detik Tersisa...')
                        await sleep(10000)
                        await zn.sendText(from, '10 Detik Tersisa...')
                        await sleep(10000)
                        await zn.reply(from, `*Jawaban :* ${result.jawaban}`, id)
                        console.log('Success sending tebakgambar result!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!')
                    })
            break
            case 'casino':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)

                if (!q) return await zn.reply(from, `Kirim perintah ${prefix}casino taruhan\n\nContoh: ${prefix}casino 5000`, id)
                const betcasino = q * 1
                if (checkSaldouser(senderr) <= betcasino) return zn.reply(from, `Saldomu tidak cukup untuk taruhan Rp. ${convertBalanceToString(q)}`, id)
                if (checkSaldouser(senderr) >= betcasino) {
                    confirmSaldo(senderr, betcasino)
                    zn.reply(from, `Saldo dikurangkan -Rp ${convertBalanceToString(q)}`, id)
                    const hadiahcsn = betcasino * 2
                    const maxcasino = 30
                    const thisyou = Math.floor(Math.random() * maxcasino) + 1;
                    const thiscomputer = Math.floor(Math.random() * maxcasino) + 1;
                    if (thisyou >= thiscomputer) {

                        zn.reply(from, `You: ${thisyou}\nComputer: ${thiscomputer}\n\nYou win and get Rp. ${convertBalanceToString(hadiahcsn)}`, id)
                        addSaldo(senderr, hadiahcsn)
                    } else if (thisyou <= thiscomputer) {
                        zn.reply(from, `You: ${thisyou}\nComputer: ${thiscomputer}\n\nYou lose`, id)
                    } else if (thisyou == thiscomputer) {
                        zn.reply(form, `You: ${thisyou}\nComputer: ${thiscomputer}\n\nDraw!`, id)
                    }
                }

            break

            case 'suit':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)

                if (!q.includes('|')) return await zn.reply(from, `Kirim perintah ${prefix}suit gunting | jumlah\nContoh: ${prefix}suit gunting | 5000\n\nKet:\n- gunting\n- batu\n- kertas`, id)
                const userspilih = q.substring(0, q.indexOf('|') - 1)
                const jumlahsuit = q.substring(q.lastIndexOf('|') + 2)

                if (checkSaldouser(senderr) <= jumlahsuit) return zn.reply(from, `Saldomu tidak cukup untuk taruhan Rp. ${convertBalanceToString(jumlahsuit)}`, id)
                if (jumlahsuit.length > 5) return zn.reply(from, `maximal Rp. 90.000`, id)
                if (checkSaldouser(senderr) >= jumlahsuit) {
                if (!userspilih.match(/batu|gunting|kertas/)) return zn.reply(from, `Format salah`, id)
                if (userspilih.match(/batu|gunting|kertas/)) {
                zn.reply(from, `Saldo dikurangkan -Rp ${convertBalanceToString(jumlahsuit)}`, id)
                confirmSaldo(senderr, jumlahsuit)
                await sleep(3000)

                var computer = Math.random();

                const hadiahnye = jumlahsuit * 2
                const hadiahtostr = convertBalanceToString(hadiahnye)
                const balikin = jumlahsuit * 1

                if (computer < 0.34 ) {
                    computer = 'batu';
                } else if( computer >= 0.34 && computer < 0.67) {
                    computer = 'gunting';
                } else {
                    computer = 'kertas';
                }

                if ( userspilih == computer ) {
                    zn.reply(from, `Pertandingan Seri!\nSaldomu dikembalikan Rp ${convertBalanceToString(jumlahsuit)}`, id)
                    addSaldo(senderr, balikin)

                } else if ( userspilih == 'batu' ) {
                    if( computer == 'gunting' ) {
                        // hasil = 'MENANG';
                        zn.reply(from, `Kamu memilih Batu dan bot Gunting kamu menang! +Rp ${hadiahtostr}`, id)
                        addSaldo(senderr, hadiahnye)
                    } else {
                        zn.reply(from, `You Lose, Kamu memilih Batu dan bot memilih Kertas`, id)
                    }

                } else if ( userspilih == 'gunting' ) {
                    if( computer == 'batu' ) {
                        // hasil = 'MENANG';
                        zn.reply(from, `You Lose, Kamu memilih Gunting dan bot memilih Batu, Dan kamu tidak dapat apa-apa`, id)
                    } else {
                        zn.reply(from, `Kamu memilih Gunting dan bot Kertas kamu menang! +Rp ${hadiahtostr}`, id)
                        addSaldo(senderr, hadiahnye)
                    }

                } else if ( userspilih == 'kertas' ) {
                    if( computer == 'batu' ) {
                        // hasil = 'MENANG';
                        zn.reply(from, `Kamu memilih Kertas dan bot Batu kamu menang! +Rp ${hadiahtostr}`, id)
                        addSaldo(senderr, hadiahnye)
                    } else {
                        zn.reply(from, `You Lose, Kamu memilih Kertas dan bot memilih Gunting`, id)
                    }
                    } 
                } else {
                    zn.reply(from, `Salah, gunakan huruf kecil\nExample:\n\nk = kertas\ng = gunting\nb = batu\nContoh: ${prefix}suit g | 15000`, id)
                }
                }
            break
            
            case 'fight':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)

                if (!q) return await zn.reply(from, `Kirim perintah ${prefix}fight taruhan\n\nContoh: ${prefix}fight 5000`, id)

                const bestfight = Math.floor(q)
                const fightmax = 200001
                if (bestfight >= fightmax) return zn.reply(from, `Maximal 100k`, id)

                const isifight = [
                    'Computer Berhasil Membuat mu takut dengan ototnya.',
                    'Computer Berhasil Membanting mu dengan sangat kuat.',
                    'Computer Berhasil Membuat Biji Tyt*d mu pecah.',
                    'Computer Berhasil Membuat patah tulang leher.',
                    'Computer Berhasil Melempar Molotov Tepat di Pala mu.',
                    'Computer Berhasil Menendang dengan jurus loncat tendang.',
                    'Computer Berhasil Menyantet badan mu hingga terbagi 2',
                    'Computer Berhasil Membuat mu mati dengan 1 pukulan karena dia saitama',
                    'Computer Berhasil Memutuskan Tangan mu hingga kamu kehabisan darah dan mati.'
                ]

                if (checkSaldouser(senderr) <= bestfight) return zn.reply(from, `Saldomu tidak cukup untuk taruhan Rp. ${convertBalanceToString(q)}`, id)
                if (checkSaldouser(senderr) >= bestfight) {
                confirmSaldo(senderr, bestfight)

                const menanglawan = [
                    'KAMU Berhasil Membuat mu takut dengan ototnya.',
                    'KAMU Berhasil Membanting mu dengan sangat kuat.',
                    'KAMU Berhasil Membuat Biji Tyt*d mu pecah.',
                    'KAMU Berhasil Membuat patah tulang leher.',
                    'KAMU Berhasil Melempar Molotov Tepat di Pala mu.',
                    'KAMU Berhasil Menendang dengan jurus loncat tendang.',
                    'KAMU Berhasil Menyantet badan mu hingga terbagi 2',
                    'KAMU Berhasil Membuat mu mati dengan 1 pukulan karena dia saitama',
                    'KAMU Berhasil Memutuskan Tangan mu hingga kamu kehabisan darah dan mati.'
                ]

                    const hadiahfight = bestfight * 2 - 2000
                    const mathfights = menanglawan[Math.floor(Math.random() * (menanglawan.length))]
                    const mathfight = isifight[Math.floor(Math.random() * (isifight.length))]
                    //addSaldo(senderr, hadiahfight)

                    if (mathfight == `${menanglawan}`) {
                    zn.reply(from, `「 RESULT-FIGHT 」

${mathfights}

Congrats You win!
Reward: +Rp. ${convertBalanceToString(rewardslot)}`, id)
                    addSaldo(senderr, rewardslot)
                    } else {
                        zn.reply(from, `「 RESULT-FIGHT 」

${mathfight}

Sorry You lost`, id)
                    }
                }
            break

            case 'simi':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (!q) return await zn.reply(from, `kenapa? mau nanya apa kak ${pushname}?`, id)
				if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                fun.simi2(q)
                    .then(async ({ result }) => {
                        await zn.reply(from, result, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, `Hah?\nkalo nanya jangan pake emoji kak`, id)
                    })
            break
            case 'darkjokes':
            case 'darkjoke':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                console.log('Sending wancak meme..')
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/meme/darkjoke?apikey=${config.lol}`, 'darkjokes.jpg','', id)
                    .then(() => console.log('Success sending wancak image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'artinama':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                const artipler = await axios.get(`https://videfikri.com/api/primbon/artinama/?nama=${q}`)
                const plerrr = artipler.data.result
                await zn.reply(from, `${plerrr.arti}\n${plerrr.desk}`, id)
            break
            case 'bucin':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
			    if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                fetch('https://raw.githubusercontent.com/HasamiAini/Bot_Takagisan/main/bucin.txt')
                .then(res => res.text())
                .then(body => {
                let splitnix = body.split('\n')
                let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
                zn.reply(from, randomnix, id)
					})
					.catch(() => {
					zn.reply(from, '*Gomenasai Onichan Ada yang error!*', id)
					})
			break
			case 'fiersa':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/Fiersa-Besari/main/fiersa-besari.txt')
                .then(res => res.text())
                .then(body => {
                let ff = body.split('\n')
                let randomff = ff[Math.floor(Math.random() * ff.length)]
                zn.reply(from, randomff, id)
                })
                .catch(() => {
                zn.reply(from, 'Ada yang Error!', id)
                })
            break
            case 'bapak': // By Kris
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                axios.get(`https://api.terhambar.com/bpk?kata=${q}`)
                    .then(async (res) => await zn.reply(from, res.data.text, id))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'quotes':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                misc.quotes()
                .then(async ({ result }) => {
                    await zn.reply(from, `*Quotes :* ${result.quotes}\n\n*Author :* ${result.author}`, id)
                })
            break
            case 'meme':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                console.log('Sending meme meme..')
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/meme/memeindo?apikey=${config.lol}`, 'mem2.jpg','AOWWKKW', id)
                    .then(() => console.log('Success sending wancak image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'meme2':
			if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
			const memeindnya = await fetch('https://api.zeks.xyz/api/memeindo?apikey=apivinz')
			const mememsg = await memeindnya.json()
			zn.sendFileFromUrl(from, mememsg.result, 'meme.jpg', 'Nih bang dah jadi', id)
			break
            case 'worldmeme':
            case 'memew':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
            const memew = await axios.get('https://meme-api.herokuapp.com/gimme');
            hasil = `Judul : ${memew.data.title}\nAuthor : ${memew.data.author}`
            await zn.sendFileFromUrl(from, `${memew.data.url}`, 'sr.jpg', hasil, id)
            break
            case 'fakta':
			if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                console.log('Sending random quote...')
                const faktas = await axios.get('https://videfikri.com/api/fakta')
                await zn.sendText(from, `*Faktanya* : ${faktas.data.result.fakta}`, id)
                    .then(() => console.log('Success sending quotes..'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'dilan':
			if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                console.log('Sending random quote...')
                const dilan = await axios.get(`https://lolhuman.herokuapp.com/api/quotes/dilan?apikey=${config.lol}`)
                await zn.sendText(from, `_*Quotes Dilan*_\n\n${dilan.data.result}`, id)
                    .then(() => console.log('Success sending quotes..'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
			case 'kanye':
			if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                console.log('Sending random quote...')
                const kanye = await axios.get(`https://dhyzx-free-api.herokuapp.com/api/quotes/kanye?apikey=undefined`)
                await zn.sendText(from, `${kanye.data.result.text_id}\n\n-Kanye West`, id)
                    .then(() => console.log('Success sending quotes..'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'quotenime':
            case 'quotesnime':
			case 'quotesanime':
			if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                console.log('Sending random quote...')
                const quotenime = await axios.get(`https://lolhuman.herokuapp.com/api/random/quotesnime?apikey=${config.lol}`)
                await zn.reply(from, `_${quotenime.data.result.quote}_\n\n_Character : ${quotenime.data.result.character}_\n_Anime : ${quotenime.data.result.anime}_\n_Episode : ${quotenime.data.result.episode}_`, id)
                    .then(() => console.log('Success sending quotes..'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'cekumur':
			if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                console.log('Sending random quote...')
                const tebakumur = await axios.get(`https://lolhuman.herokuapp.com/api/tebakumur?apikey=${config.lol}&name=${q}`)
                await zn.sendText(from, `*Nama :* ${tebakumur.data.result.name}\n*Umur :* ${tebakumur.data.result.age}`, id)
                    .then(() => console.log('Success sending quotes..'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'funik':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
                    if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    console.log('Sending random quote...')
                    const funik = await axios.get(`https://lolhuman.herokuapp.com/api/random/faktaunik?apikey=${config.lol}`)
                    await zn.sendText(from, `_*Fakta Unik*_\n\n${funik.data.result}`, id)
                        .then(() => console.log('Success sending quotes..'))
                        .catch(async (err) => {
                            console.error(err)
                            await zn.reply(from, 'Error!', id)
                        })
            break
			case 'motivasi':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                misc.motivasi()
                    .then(async (body) => {
                        const motivasiSplit = body.split('\n')
                        const randomMotivasi = motivasiSplit[Math.floor(Math.random() * motivasiSplit.length)]
                        await zn.sendText(from, randomMotivasi)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
			case 'puisi': // By Kris
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                axios.get('https://masgi.herokuapp.com/api/puisi2')
                    .then(async (res) => await zn.reply(from, res.data.data, id))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'cerpen': // By Kris
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                axios.get('https://masgi.herokuapp.com/api/cerpen')
                    .then(async (res) => await zn.reply(from, res.data.data, id))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'cerhor':
            if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                console.log('Sending wattpad Profile') 
                await zn.reply(from, msg.wait(), id)
                const cerhor = await axios.get(`https://lolhuman.herokuapp.com/api/ceritahoror?apikey=${config.lol}`)
                hasil = `*Title :* ${cerhor.data.result.title}\n${cerhor.data.result.desc}`
                await zn.sendFileFromUrl(from, `${cerhor.data.result.thumbnail}`, 'cerhor.jpg', hasil, id)
                    .then(() => console.log('Success sending quotes..'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'ID Tidak Ketemu', id)
                    })
            break
            case 'twister':
			if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                console.log('Sending random quote...')
                const twister = await axios.get(`https://docs-jojo.herokuapp.com/api/tongue_twister`)
                await zn.reply(from, `${twister.data.result}`, id)
                    .then(() => console.log('Success sending quotes..'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'sindir':
            case 'nyindir':
			if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                console.log('Sending random quote...')
                const sindir = await axios.get(`https://leyscoders-api.herokuapp.com/api/skak?apikey=freeKeY`)
                await zn.reply(from, `${sindir.data.result}`, id)
                    .then(() => console.log('Success sending quotes..'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'wiki':
            case 'wikipedia':
			if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (!q) return await zn.reply(from, 'mau nyari wiki tentang apa?', id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                console.log('Sending random quote...')
                const wiki = await axios.get(`https://lolhuman.herokuapp.com/api/wiki?apikey=${config.lol}&query=${query}`)
                await zn.reply(from, `${wiki.data.result}`, id)
                    .then(() => console.log('Success sending quotes..'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'lirik':
			if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (!q) return await zn.reply(from, 'mau nyari lirik lagu apa?', id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                console.log('Sending lirik...')
                await zn.reply(from, msg.wait(), id)
                const lirik = await axios.get(`https://lolhuman.herokuapp.com/api/lirik?apikey=${config.lol}&query=${query}`)
                await zn.reply(from, `Pencarian : ${query}\n\n${lirik.data.result}`, id)
                    .then(() => console.log('Success sending lirik..'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'toxic':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, toxic(), id)
            break
            case 'say':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.sendText(from, q)
            break
            break
            case 'balikhuruf':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await zn.reply(from, `Untuk membalik huruf\ngunakan ${prefix}balikhuruf teks\n\nContoh: ${prefix}balikhuruf halo`, id)
                fun.balikhuruf(query)
                .then(async ({result}) => {
                    await zn.reply(from, result.kata, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                })
            break
            case 'hitunghuruf':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await zn.reply(from, `Untuk menghitung jumlah huruf\ngunakan ${prefix}hitunghuruf teks\n\nContoh: ${prefix}hitunghuruf halo`, id)
                fun.hitunghuruf(query)
                .then(async ({result}) => {
                    await zn.reply(from, result.jumlah, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                })
            break
            case 'hilih':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await zn.reply(from, `Untuk membuat hilih teks\ngunakan ${prefix}hilih teks\n\nContoh: ${prefix}hilih halah bacot`, id)
                fun.hilihteks(query)
                .then(async ({result}) => {
                    await zn.reply(from, result.kata, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                })
            break
            // END OF FUN MENU

            // STALKER
            case 'igstalk':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (!q) return await zn.reply(from, `*Format salah!*\nuntuk meng-stalk akun Instagram seseorang, gunakan ${prefix}igstalk username\n\nContoh: ${prefix}igstalk zhwzein`, id)
                await zn.reply(from, msg.wait(), id)
                stalker.instagram(q)
                .then(async ({result}) => {
                    const { full_name, username, bio, followers, following, post_count, profile_hd, is_verified, is_private } = await result
                    await zn.sendFileFromUrl(from, profile_hd, 'ProfileIgStalker.jpg', `*_INSTAGRAM STALK_*\n\n*Username :* ${username}\n*Full Name :* ${full_name}\n*Biography :* ${bio}\n*Followers :* ${followers}\n*Following :* ${following}\n*Post :* ${post_count}\n*Verified :* ${is_verified}\n*Private :* ${is_private}`, id)
                }) 
                .catch(async (err) => {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                })
            break
            case 'twitprof':
            case 'twitstalk':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (!q) return await zn.reply(from, `*Format salah!*\nuntuk meng-stalk akun Twitter seseorang, gunakan ${prefix}twitstalk username\n\nContoh: ${prefix}twitstalk zhwzein`, id)
                await zn.reply(from, msg.wait(), id)
                stalker.twitter(q)
                .then(async ({result}) => {
                    const { full_name, username, followers, following, tweets, profile, verified, listed_count, favourites, joined_on, profile_banner } = await result
                    await zn.sendFileFromUrl(from, profile, 'ProfileTwitter.jpg', `*_TWITTER STALK_*\n\n*Username :* ${username}\n*Full Name :* ${full_name}\n*Followers :* ${followers}\n*Following :* ${following}\n*Tweet :* ${tweets}\n*Favourites :* ${favourites}\n*Listed Count :* ${listed_count}\n\n*Joined On :*\n${joined_on}`, id)
                }) 
                .catch(async (err) => {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                })
            break
            case 'ttstalk':
            case 'tiktokstalk':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
                    if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                    if (!q) return zn.reply(from, `*FORMAT SALAH*\nBeri caption *${prefix}ffnama ID*\n\nContoh: ${prefix}ffnama 570098876`, id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    console.log('Sending Tiktok Profile')
                    const namatt = await axios.get(`https://lolhuman.herokuapp.com/api/stalktiktok/${q}?apikey=${config.lol}`)
                    hasil = `*_TIKTOK STALK_*\n\n*Username :* ${namatt.data.result.username}\n*Nickname :* ${namatt.data.result.nickname}\n*Bio :* ${namatt.data.result.bio}\n\n*Followers :* ${namatt.data.result.followers}\n*Followings :* ${namatt.data.result.followings}\n*Likes :* ${namatt.data.result.likes}\n*Video :* ${namatt.data.result.video}`
                    await zn.sendFileFromUrl(from, `${namatt.data.result.user_picture}`, 'tt.jpg', hasil, id)
                        .then(() => console.log('Success sending quotes..'))
                        .catch(async (err) => {
                            console.error(err)
                            await zn.reply(from, 'ID Tidak Ketemu', id)
                        })
            break
            case 'ytstalk':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
                    if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                    if (!q) return zn.reply(from, `*FORMAT SALAH*\nBeri caption *${prefix}ffnama ID*\n\nContoh: ${prefix}ffnama 570098876`, id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    console.log('Sending yt Profile')
                    const namayt = await axios.get(`https://lolhuman.herokuapp.com/api/ytchannel?apikey=${config.lol}&query=${q}`)
                    hasil = `*_YOUTUBE STALK_*\n\n*Channel Name :* ${namayt.data.result[0].channel_name}\n*Channel About :* ${namayt.data.result[0].channel_about}\n\n*Channel Created :* ${namayt.data.result[0].channel_created}`
                    await zn.sendFileFromUrl(from, `${namayt.data.result[0].channel_picture.high.url}`, 'yt.jpg', hasil, id)
                        .then(() => console.log('Success sending quotes..'))
                        .catch(async (err) => {
                            console.error(err)
                            await zn.reply(from, 'ID Tidak Ketemu', id)
                        })
            break
            case 'github':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (!q) return await zn.reply(from, `*Format salah!*\nuntuk meng-stalk akun Github seseorang, gunakan ${prefix}github username\n\nContoh: ${prefix}github zhwzein`, id)
                await zn.reply(from, msg.wait(), id)
                stalker.github(q)
                .then(async ({result}) => {
                    const { username, id, profile_pic, fullname, company, blog, location, email, hireable, biografi, public_repository, public_gists, followers, following, joined_on, last_updated, profile_url} = await result
                    await zn.sendFileFromUrl(from, profile_pic, 'ProfileGithub.jpg', `*_GITHUB STALK_*\n\n*Username :* ${username}\n*Full Name :* ${fullname}\n*ID :* ${id}\n*Company :* ${company}\n*Blog :*\n${blog}\n\n*Location :* ${location}\n*Email :* ${email}\n*Hireable :* ${hireable}\n*Biography :* ${biografi}\n*Public Repository :* ${public_repository}\n*Public Gists :* ${public_gists}\n*Followers :* ${followers}\n*Following :* ${following}\n\n*Joined On :*\n${joined_on}\n\n*Last Updated :* ${last_updated}\n\n*Profile URL :*\n${profile_url}`, id)
                }) 
                .catch(async (err) => {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                })
            break
            
            case 'ffnama':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
                    if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                    if (!q) return zn.reply(from, `*FORMAT SALAH*\nBeri caption *${prefix}ffnama ID*\n\nContoh: ${prefix}ffnama 570098876`, id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    console.log('Sending FF Nick')
                    const namaff = await axios.get(`https://lolhuman.herokuapp.com/api/freefire/${q}?apikey=${config.lol}`)
                    await zn.sendText(from, `*Nickname FF :* ${namaff.data.result}`, id)
                        .then(() => console.log('Success sending quotes..'))
                        .catch(async (err) => {
                            console.error(err)
                            await zn.reply(from, 'ID Tidak Ketemu', id)
                        })
            break
            case 'mlnama':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
                    if (!isGroupMsg) return zn.reply(from,  msg.groupOnly(), id)
                    if (!q) return zn.reply(from, `*FORMAT SALAH*\nBeri caption *${prefix}mlnama ID | Server*\n\nContoh: ${prefix}mlnama 84830127 | 2169`, id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    const userml = q.substring(0, q.indexOf('|') - 1)
                    const serverml = q.substring(q.lastIndexOf('|') + 2)
                    console.log('Sending ML Nick')
                    const namaMl = await axios.get(`https://lolhuman.herokuapp.com/api/mobilelegend/${userml}/${serverml}?apikey=${config.lol}`)
                    await zn.sendText(from, `*Nickname ML :* ${namaMl.data.result}`, id)
                        .then(() => console.log('Success sending NICK..'))
                        .catch(async (err) => {
                            console.error(err)
                            await zn.reply(from, 'ID Tidak Ketemu', id)
                        })
            break
            case 'mole':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
                    if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                    if (!q) return zn.reply(from, `*FORMAT SALAH*\nBeri caption *${prefix}mole namahero*\n\nContoh: ${prefix}mole miya`, id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    console.log('Sending mole Profile')
                    const namah = await axios.get(`https://docs-jojo.herokuapp.com/api/heroml?hero=${q}`)
                    hasil = `*_HERO INFORMATION :_*\n\n*Username :* ${namah.data.result.hero.name}\n*Quotes :* _${namah.data.result.hero.quotes}_\n*Role :* ${namah.data.result.hero.role}\n*Speciality :* ${namah.data.result.hero.speciality}\n*Lane Reccomend :* ${namah.data.result.hero.laning_recommendation}\n*Release :* ${namah.data.result.hero.release_date}\n\n*_HERO ATTRIBUTES :_*\n\n*Movement speed :* ${namah.data.result.hero.attributes.movement_speed}\n*Physical attack :* ${namah.data.result.hero.attributes.physical_attack}\n*Magic power :* ${namah.data.result.hero.attributes.magic_power}\n*Attack speed :* ${namah.data.result.hero.attributes.attack_speed}\n*Physical defense :* ${namah.data.result.hero.attributes.physical_defense}\n*Magic defense :* ${namah.data.result.hero.attributes.magic_defense}\n*Basic atk critrate :* ${namah.data.result.hero.attributes.basic_atk_crit_rate}\n*Hp :* ${namah.data.result.hero.attributes.hp}\n*Mana :* ${namah.data.result.hero.attributes.mana}\n*Ability critrate :* ${namah.data.result.hero.attributes.ability_crit_rate}\n*Hp regen :* ${namah.data.result.hero.attributes.hp_regen}\n*Mana regen :* ${namah.data.result.hero.attributes.mana_regen}\n`
                    await zn.sendFileFromUrl(from, `${namah.data.result.hero.img}`, 'tt.jpg', hasil, id)
                        .then(() => console.log('Success sending quotes..'))
                        .catch(async (err) => {
                            console.error(err)
                            await zn.reply(from, 'Hero Tidak Ketemu', id)
                        })
            break

            // OTHERS
            case 'jadian':
            if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
            const mem = await zn.getGroupMembersId(groupId)
            const aku = mem[Math.floor(Math.random() * mem.length)];
            const kamu = mem[Math.floor(Math.random() * mem.length)];
          //const sapa = `Ciee ciee ada yg baru jadian nih\n\n@${aku.replace(/[@c.us]/g, '')}\n\nSama\n\n@${kamu.replace(/[@c.us]/g, '')}\n\nGamao tau kasih Pajak Jadian nya segroup`
			const cepeter = `_Maha suci Allah yang telah menciptakan semuanya berpasang-pasangan_
			
@${aku.replace(/[@c.us]/g, '')}

💏💑 dengan 💏💑

@${kamu.replace(/[@c.us]/g, '')}

*Jangan Lupa Kasih PJ Segroup*`
            await zn.sendTextWithMentions(from, cepeter)
            break
            if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
            if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
            axios.get('https://nekos.life/api/v2/img/slap').then(res => {
                zn.sendStickerfromUrl(from, res.data.url)
            })
            break 
            case 'asupan':
			    if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                //if (!q) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}ig link*\n\nContoh: ${prefix}ig linknya`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    const supanss = await axios.get(`https://lolhuman.herokuapp.com/api/asupan?apikey=${config.lol}`)
                    let supans = supanss.data.result
			    zn.sendFileFromUrl(from, supans, 'ig.mp4', '', id)     
	        break
            case 'tomp3': // by: znbot
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if ((isMedia && isVideo || isQuotedVideo)) {
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedVideo ? quotedMsg : message
                    const _mimetype = isQuotedVideo ? quotedMsg.mimetype : mimetype
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, 'video', `${name}.${_mimetype.replace(/.+\//, '')}`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await zn.sendFile(from, fileOutputPath, 'audio.mp3', '', id)
                                console.log(color('[WAPI]', 'green'), 'Success sending mp3!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'receipt':
            case 'resep':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                try {
                    misc.resep(q)
                        .then(async ({ result }) => {
                            await zn.sendFileFromUrl(from, result.image, `${result.title}.jpg`, msg.receipt(result), id)
                            console.log('Success sending food receipt!')
                        })
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                }
            break
            case 'tts':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const ptt = tts('id')
                try {
                    ptt.save(`${q}.mp3`, q, async () => {
                        await zn.sendPtt(from, `${q}.mp3`, id)
                        fs.unlinkSync(`${q}.mp3`)
                    })
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                }
            break
            case 'corona': // by CHIKAA CHANTEKKXXZZ
            case 'coronavirus':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, 'Negara mana?', id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                misc.corona(q)
                    .then(async (res) => {
                        await zn.sendText(from, '🌎️ Covid Info - ' + q.charAt(0).toUpperCase() + q.slice(1) + ' 🌍️\n\n✨️ Total Cases: ' + `${res.cases}` + '\n📆️ Today\'s Cases: ' + `${res.todayCases}` + '\n☣️ Total Deaths: ' + `${res.deaths}` + '\n☢️ Today\'s Deaths: ' + `${res.todayDeaths}` + '\n⛩️ Active Cases: ' + `${res.active}` + '.')
                        console.log('Success sending Result!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Negara mana?', id)
                    })
            break
            case 'translate':
            case 'trans':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q.includes('|')) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const texto = q.substring(0, q.indexOf('|') - 1)
                const languaget = q.substring(q.lastIndexOf('|') + 2)
                translate(texto, {to: languaget}).then(res => {zn.reply(from, res.text, id)})
            break
            case 'distance':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const kotaAsal = q.substring(0, q.indexOf('|') - 1)
                const kotaTujuan = q.substring(q.lastIndexOf('|') + 2)
                misc.distance(kotaAsal, kotaTujuan)
                    .then(async ({ result }) => {
                        if (result.response !== 200) {
                            await zn.reply(from, 'Error!', id)
                        } else {
                            await zn.reply(from, result.data, id)
                            console.log('Success sending distance info!')
                        }
                    })
            break
            // END OF OTHERS
            
            // SPAMMER
            case 'email':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!query.includes('|')) return await zn.reply(from, `Untuk mengirim email kepada seseorang\ngunakan ${prefix}email target | subjek | pesan`, id)
                const targets = query.substring(0, q.indexOf('|') - 1)
                const subjek = query.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const pesan = query.substring(q.lastIndexOf('|') + 2)
                spammer.email(targets, subjek, pesan)
                .then(async ({result}) => {
                    await zn.reply(from, result.log_lengkap, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                })
            break
            case 'call':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!query) return await zn.reply(from, `Untuk mengirim panggilan kepada seseorang\ngunakan ${prefix}call nomor_telpon`, id)
                spammer.call(query)
                .then(async ({result}) => {
                    await zn.reply(from, result.logs, id)
                })
                .catch(async (err) => {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                })
            break
            case 'spamsms':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} 0812xxxxxxx`)
                nomor = args[0]
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam1?apikey=${config.lol}&nomor=${nomor}`)
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam2?apikey=${config.lol}&nomor=${nomor}`)
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam3?apikey=${config.lol}&nomor=${nomor}`)
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam4?apikey=${config.lol}&nomor=${nomor}`)
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam5?apikey=${config.lol}&nomor=${nomor}`)
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam6?apikey=${config.lol}&nomor=${nomor}`)
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam7?apikey=${config.lol}&nomor=${nomor}`)
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam8?apikey=${config.lol}&nomor=${nomor}`)
                zn.reply(from, "Success", id)
            break
            // End Of Spammer

            case 'art':
            case 'bts':
            case 'exo':
            case 'elf':
            case 'neko':
            case 'shota':
            case 'husbu':
            case 'sagiri':
            case 'shinobu':
            case 'megumin':
            case 'wallnime':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                zn.sendFileFromUrl(from, `http://api.lolhuman.xyz/api/random/${command}?apikey=${config.lol}`,`${command}`,`_Pencarian : ${command}_`, id)
            break
            case 'wallpaper2': //// aman
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                zn.sendFileFromUrl(from, `http://api.lolhuman.xyz/api/random2/wallpaper?apikey=${config.lol}`,`${command}`,`_Pencarian : ${command}_`, id)
            break
            case 'yuri2':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isNsfw) return await zn.reply(from, msg.notNsfw(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                zn.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/random_yuri`,`${command}`,`_Pencarian : ${command}_`, id)
            break


            // NSFW
            case 'realnsfw':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isNsfw) return await zn.reply(from, msg.notNsfw(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
            const response1 = await axios.get('https://meme-api.herokuapp.com/gimme/nsfw');
            hasil = `Judul : ${response1.data.title}\nAuthor : ${response1.data.author}`
            await zn.sendFileFromUrl(from, `${response1.data.url}`, 'sr.jpg', hasil, id)
            break

            case 'ecchi':
            case 'ahegao':
            case 'homekewd':
            case 'sideoppai':
            case 'animefeets':
            case 'animebooty':
            case 'animethighss':
            case 'hentaiparadise':
            case 'animearmpits':
            case 'hentaifemdom':
            case 'lewdanimegirls':
            case 'biganimetiddies':
            case 'animebellybutton':
            case 'hentai4everyone':
            case 'chiisaihentai':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isNsfw) return await zn.reply(from, msg.notNsfw(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                zn.sendFileFromUrl(from, `http://api.lolhuman.xyz/api/random/nsfw/${command}?apikey=${config.lol}`,`${command}`,`_Pencarian : ${command}_`, id)
            break
            case 'yaoi18':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isNsfw) return await zn.reply(from, msg.notNsfw(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                zn.sendFileFromUrl(from, `http://api.lolhuman.xyz/api/random/nsfw/yaoi?apikey=${config.lol}`,`${command}`,`_Pencarian : ${command}_`, id)
            break
            case 'yuri18':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isNsfw) return await zn.reply(from, msg.notNsfw(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                zn.sendFileFromUrl(from, `http://api.lolhuman.xyz/api/random2/yuri?apikey=${config.lol}`,`${command}`,`_Pencarian : ${command}_`, id)
            break
            case 'loli18':
                if (!isNsfw) return await zn.reply(from, msg.notNsfw(), id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                zn.sendFileFromUrl(from, `http://api.lolhuman.xyz/api/random/loli?apikey=${config.lol}`,`${command}`,`_Pencarian : ${command}_`, id)
            break
            case 'ero':
            case 'feet':
            case 'trap':
            case 'lewd':
            case 'eron':
            case 'solo':
            case 'gasm':
            case 'poke':
            case 'holo': 
            case 'tits':
            case 'erok':
            case 'lewdk':
            case 'futanari':
            case 'femdom':
            case 'hentai':
            case 'eroyuri':
            case 'cum_jpg':
            case 'blowjob':
            case 'erofeet':
            case 'holoero':
            case 'erokemo':
            case 'fox_girl':  ///aman
            case 'lewdkemo':
            case 'pussy_jpg':
            case 'kemonomimi':
            case 'nsfw_avatar':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isNsfw) return await zn.reply(from, msg.notNsfw(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                zn.sendFileFromUrl(from, `http://api.lolhuman.xyz/api/random2/${command}?apikey=${config.lol}`,`${command}`,`_Pencarian : ${command}_`, id)
            break

            // LIB SFW
            case 'neko2':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                console.log('Getting neko image...')
                await zn.sendFileFromUrl(from, (await neko.sfw.neko()).url, 'neko.jpg', '', null, null, true)
                    .then(() => console.log('Success sending neko image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'kemono':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                console.log('Getting kemonomimi image...')
                await zn.sendFileFromUrl(from, (await neko.sfw.kemonomimi()).url, 'kemono.jpg', '', null, null, true)
                    .then(() => console.log('Success sending kemonomimi image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'wallpaper':
            case 'wp1':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                console.log('Getting wallpaper image...')
                await zn.sendFileFromUrl(from, (await neko.sfw.wallpaper()).url, 'wallpaper.jpg', '', null, null, true)
                    .then(() => console.log('Success sending wallpaper image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id )
                    })
            break


            // LIB NSFW
            case 'yurin':
				if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await zn.reply(from, msg.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    await zn.sendFileFromUrl(from, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '', id)
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    await zn.sendFileFromUrl(from, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '', id)
                }
            break
            case 'pussyart':
				if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await zn.reply(from, msg.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    await zn.sendFileFromUrl(from, (await neko.nsfw.pussyArt()).url, 'pussyArt.jpg', '', id)
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    await zn.sendFileFromUrl(from, (await neko.nsfw.pussyArt()).url, 'pussyArt.jpg', '', id)
                }
            break
            case 'lesbian':
				if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await zn.reply(from, msg.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    await zn.sendFileFromUrl(from, (await neko.nsfw.lesbian()).url, 'lesbian.jpg', '', id)
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    await zn.sendFileFromUrl(from, (await neko.nsfw.lesbian()).url, 'lesbian.jpg', '', id)
                }
            break
            case 'nekogif':
			if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
            if (!isNsfw) return await zn.reply(from, msg.notNsfw(), id)
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
            await zn.reply(from, msg.wait(), id)
			ranp = getRandom('.gif')
			rano = getRandom('.webp')
			buffer = (await neko.nsfw.nekoGif()).url
			exec(`wget ${buffer} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=30 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
				if (err) return zn.reply(from, 'error!', id)
                fs.unlinkSync(ranp)
				buff = fs.readFileSync(rano)
				zn.sendImageAsSticker(from, buff, { author: 'setiker', pack: 'zen' }, id)
				fs.unlinkSync(rano)
			})
		    break
            case 'feetgif':
			if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
            if (!isNsfw) return await zn.reply(from, msg.notNsfw(), id)
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
            await zn.reply(from, msg.wait(), id)
			ranp = getRandom('.gif')
			rano = getRandom('.webp')
			buffer = (await neko.nsfw.feetGif()).url
			exec(`wget ${buffer} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=30 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
				if (err) return zn.reply(from, 'error!', id)
                fs.unlinkSync(ranp)
				buff = fs.readFileSync(rano)
				zn.sendImageAsSticker(from, buff, { author: 'setiker', pack: 'zen' }, id)
				fs.unlinkSync(rano)
			})
		    break

            // WEB
            case 'wattpad':
            if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (!q) return zn.reply(from, `*FORMAT SALAH*\nBeri caption *${prefix}wattpad judul*\n\nContoh: ${prefix}wattpad aldebaran`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                console.log('Sending wattpad Profile') 
                await zn.reply(from, msg.wait(), id)
                const wattpad = await axios.get(`https://lolhuman.herokuapp.com/api/wattpadsearch?apikey=${config.lol}&query=${q}`)
                hasil = `*_Wattpad Search_*\n\n*Title :* ${wattpad.data.result[0].title}\n*Parts :* ${wattpad.data.result[0].parts}\n\n*Author :* ${wattpad.data.result[0].author.name}\n*Link :* ${wattpad.data.result[0].url}\n\n*Description :* ${wattpad.data.result[0].description}\n`
                await zn.sendFileFromUrl(from, `${wattpad.data.result[0].cover}`, 'wattpad.jpg', hasil, id)
                    .then(() => console.log('Success sending quotes..'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'ID Tidak Ketemu', id)
                    })
            break
            case 'jurnal':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
                    if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                    if (!q) return zn.reply(from, `*FORMAT SALAH*\nBeri caption *${prefix}jurnal waifumu*\n\nContoh: ${prefix}jurnal sagiri`, id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    console.log('Sending Jurnal Profile') 
                    await zn.reply(from, msg.wait(), id)
                    const jurnal = await axios.get(`https://docs-jojo.herokuapp.com/api/jurnalotaku_search?q=${q}`)
                    hasil = `*_JURNAL OTAKU_*\n\n*Title :* ${jurnal.data.result[0].title}\n*Category :* ${jurnal.data.result[0].category}\n\n*Author :* ${jurnal.data.result[0].author}\n*Uploaded :* ${jurnal.data.result[0].uploaded}\n\n*Desc :* ${jurnal.data.result[0].desc}\n`
                    await zn.sendFileFromUrl(from, `${jurnal.data.result[0].img}`, 'jurnal.jpg', hasil, id)
                        .then(() => console.log('Success sending quotes..'))
                        .catch(async (err) => {
                            console.error(err)
                            await zn.reply(from, 'ID Tidak Ketemu', id)
                        })
            break
            case 'kusosearch':
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                if (args.length == 0) return zn.reply(from, `Usage: ${prefix + command} query\nExample: ${prefix + command} naruto`, id)
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/kusonimesearch?apikey=${config.lol}&query=${query}`)
                get_result = get_result.result
                txt = `Title : ${get_result.title}\n`
                txt += `Japanese : ${get_result.japanese}\n`
                txt += `Genre : ${get_result.genre}\n`
                txt += `Seasons : ${get_result.seasons}\n`
                txt += `Producers : ${get_result.producers}\n`
                txt += `Type : ${get_result.type}\n`
                txt += `Status : ${get_result.status}\n`
                txt += `Total Episode : ${get_result.total_episode}\n`
                txt += `Score : ${get_result.score}\n`
                txt += `Duration : ${get_result.duration}\n`
                txt += `Released On : ${get_result.released_on}\n`
                txt += `Desc : ${get_result.desc}\n`
                link_dl = get_result.link_dl
                for (var x in link_dl) {
                    txt += `\n${x}\n`
                    for (var y in link_dl[x]) {
                        txt += `${y} - ${link_dl[x][y]}\n`
                    }
                }
                zn.sendFileFromUrl(from, get_result.thumbnail, 'kuso.jpg', txt, id)
            break
            case 'lk21':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                if (args.length == 0) return zn.reply(from, `Usage: ${prefix + command} query\nExample: ${prefix + command} Transformer`, id)
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/lk21?apikey=${config.lol}&query=${query}`)
                get_result = get_result.result
                tx = `Title : ${get_result.title}\n`
                tx += `Link : ${get_result.link}\n`
                tx += `Genre : ${get_result.genre}\n`
                tx += `Views : ${get_result.views}\n`
                tx += `Duration : ${get_result.duration}\n`
                tx += `Tahun : ${get_result.tahun}\n`
                tx += `Rating : ${get_result.rating}\n`
                tx += `Desc : ${get_result.desc}\n`
                tx += `Actors : ${get_result.actors.join(", ")}\n`
                tx += `Location : ${get_result.location}\n`
                tx += `Date Release : ${get_result.date_release}\n`
                tx += `Language : ${get_result.language}\n`
                tx += `Link Download : ${get_result.link_dl}`
                zn.sendFileFromUrl(from, get_result.thumbnail, 'lk.jpg', tx, id)
            break
            case 'ssweb':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
			if (args.length == 0) return zn.reply(from, `Membuat bot men-screenshot sebuah web\n\nPemakaian: ${prefix}ss [url]\n\ncontoh: ${prefix}ss http://google.com`, id)
            const ss = body.slice(4)
            await zn.reply(from, msg.wait(), id)
			const scrinshit = await fetch(`https://api.zeks.xyz/api/ssweb?url=${ss}&apikey=apivinz`)
            const ssweb = await scrinshit.json()
		    zn.sendFile(from, ssweb.result, 'ss.jpg', 'cekrek', id)
            break
            case 'drakor':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
            try {
                const drakor = await axios.get(`http://api.lolhuman.xyz/api/drakorongoing?apikey=${config.lol}`)
                const { result } = drakor.data
                let drk = 'Drakor Ongoing 2020-2021'
                for (let i = 0; i < drakor.data.result.length; i++)
                drk += `\n═════════════════\n\n*Judul* : ${result[i].title}\n*Genre* : ${result[i].genre}\n*Kategori* : ${result[i].category}\n*Tahun* : ${result[i].year}\n*Total Episode* : ${result[i].total_episode}\n*Link* : ${result[i].link}\n`
                zn.sendFileFromUrl(from, result[0].thumbnail, 'thumb.jpg', drk, id)
                //console.log(result[0].thumbnail)
            } catch (err) {
                zn.reply(from, 'Ada error sistem!', id)
            }
            break
            case 'xnxx':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                if (args.length == 0) return zn.reply(from, `Usage: ${prefix + command} link\nExample: ${prefix + command} linknya`, id)
                //
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/xnxx?apikey=${config.lol}&url=${query}`)
                get_result = get_result.result
                tx = ""
                tx = `Title : ${get_result.title}\n`
                tx += `Duration : ${get_result.duration}\n`
                tx += `View : ${get_result.title}\n`
                tx += `Rating : ${get_result.rating}\n`
                tx += `Like : ${get_result.like}\n`
                tx += `Dislike : ${get_result.dislike}\n`
                tx += `Comment : ${get_result.comment}\n`
                tx += `Tag : ${get_result.tag.join(", ")}\n`
                tx += `Description : ${get_result.description}\n`
                tx += "Link :\n\n"
                link = get_result.link
                for (var x in link) {
                    tx += `${link[x].type} - ${link[x].link}\n\n`
                }
                zn.sendFileFromUrl(from, get_result.thumbnail, 'thumb.jpg', tx, id)
            break
            case 'xnxxsearch':
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
            if (args.length == 0) return zn.reply(from, `Usage: ${prefix + command} query\nExample: ${prefix + command} Japanese`, id)
            get_result = await fetchJson(`http://api.lolhuman.xyz/api/xnxxsearch?apikey=${config.lol}&query=${query}`)
            get_result = get_result.result
            tx = ``
            for (var x in get_result) {
                tx += `Title : ${get_result[x].title}\n`
                tx += `Views : ${get_result[x].views}\n`
                tx += `Duration : ${get_result[x].duration}\n`
                tx += `Uploader : ${get_result[x].uploader}\n\n`
                tx += `Link : ${get_result[x].link}\n\n`
                tx += `Thumbnail : ${get_result[x].thumbnail}\n\n`
                tx += `═════════════════\n\n`
            }
            zn.reply(from, tx, id)
            break
            case 'xhsearch':
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
            if (args.length == 0) return zn.reply(from, `Usage: ${prefix + command} query\nExample: ${prefix + command} Japanese`, id)
            get_result = await fetchJson(`https://lolhuman.herokuapp.com/api/xhamstersearch?apikey=${config.lol}&query=${query}`)
            get_result = get_result.result
            tx = ``
            for (var x in get_result) {
                tx += `Title : ${get_result[x].title}\n`
                tx += `Views : ${get_result[x].views}\n`
                tx += `Duration : ${get_result[x].duration}\n`
                tx += `rating : ${get_result[x].rating}\n`
                tx += `Link : ${get_result[x].link}\n\n`
                tx += `═════════════════\n\n`
            }
            zn.reply(from, tx, id)
            break
            case 'xhamster':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                if (args.length == 0) return zn.reply(from, `Usage: ${prefix + command} link\nExample: ${prefix + command} linknya`, id)
                //
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/xhamster?apikey=${config.lol}&url=${query}`)
                get_result = get_result.result
                tx = ""
                tx = `Title : ${get_result.title}\n`
                tx += `View : ${get_result.views}\n`
                tx += `Duration : ${get_result.duration}\n`
                tx += `Rating : ${get_result.rating}\n`
                tx += `Like : ${get_result.likes}\n`
                tx += `Dislike : ${get_result.dislikes}\n`
                tx += `Comment : ${get_result.comments}\n\n`
                tx += `Link : ${get_result.download[1]}`
                zn.sendFileFromUrl(from, get_result.thumbnail, 'thumb.jpg', tx, id)
            break
            case 'source':
            case 'sauce':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    try {
                        const imageLink = await uploadImages(mediaData, `sauce.${senderr}`)
                        console.log('Searching for source...')
                        const results = await saus(imageLink)
                        for (let i = 0; i < results.length; i++) {
                            let teks = ''
                            if (results[i].similarity < 80.00) {
                                teks = 'Low similarity. 🤔\n\n'
                            } else {
                                teks += `*Link*: ${results[i].url}\n*Site*: ${results[i].site}\n*Author name*: ${results[i].authorName}\n*Author link*: ${results[i].authorUrl}\n*Similarity*: ${results[i].similarity}%`
                                await zn.sendLinkWithAutoPreview(from, results[i].url, teks)
                                    .then(() => console.log('Source found!'))
                            }
                        }
                    } catch (err) {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    }
                } else {
                    await zn.reply(from, 'kirim gambarnya..', id)
                }
            break
            case 'what':
            if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
            if (isMedia && type === 'image' || isQuotedImage) {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${senderr}`)
                await zn.reply(from, msg.wait(), id)
                const what = await axios.get(`https://lolhuman.herokuapp.com/api/wait?apikey=${config.lol}&img=${fotoWtNya}`)
                hasil = `*Title Romaji :* ${what.data.result.title_romaji}\n*Title Native :* ${what.data.result.title_native}\n*Similarity :* ${what.data.result.similarity}`
                await zn.sendFileFromUrl(from, `${what.data.result.video}`, 'what.mp4', hasil, id)
                    } else {
                    await zn.reply(from, 'Mana gambarnya?', id)
                    }
            break
            case 'character':  //byAnto
            case 'chara':
                if (!q) return await zn.reply(from, 'masukan nama karakter yang ingin di cari', id) 
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
            try{
                await zn.reply(from, msg.wait(), id)
                const chara_key = await axios.get(`https://lolhuman.herokuapp.com/api/character?apikey=${config.lol}&query=${q}`)
                const { name, description, favourites, media, image } = chara_key.data.result
                let text_1 = `Pencarian : ${q}\n\n*Nama :* ${name.full}\n*Kanji :* ${name.native}\n*Id :* ${chara_key.data.result.id}\n*Favorite :* ${favourites}\n\n`
                        for (let i = 0; i < media.nodes.length; i++) {
                const { id, idMal, title, type } = media.nodes[i]
                    text_1 += `_________________\n\n*Judul :* ${title.romaji}\n*Type :* ${type}\n*Kanji :* ${title.native}\n*CharId :* ${idMal}\n*Id :* ${id}\n_________________\n\n`
                        }
                    text_1 += `*Description :*\n${description}\n`

                    await zn.sendFileFromUrl(from, image.large, `${q}.jpg`, `${text_1}`, id)
                    } catch {
                        zn.reply(from, 'Character Not Found', id)
                    }
            break
			case 'doujin':
			if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
			if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
			if (!q) return await zn.reply(from, msg.wrongFormat(), id)
			if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
			if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
			if (!isNsfw) return await zn.reply(from, msg.notNsfw(), id)
            if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
			await zn.reply(from, `*Doujin :* ${q} Sedang dikirim\nMohon Tunggu..`, id)
            const dojins = await axios.get(`https://api.vhtear.com/nhentaipdfdownload?query=${q}&apikey=HSBDBD72738949BBBBWHS7`)
            const dojina = dojins.data.result
            zn.sendFileFromUrl(from, dojina.pdf_file, `${q}.pdf`,'', id)
			break
            case 'doujin2':
                if (!isGroupMsg) return zn.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, `Doujin : ${q} Sedang dikirim..`, id)
                const doujin_ = await axios.get(`http://lolhuman.herokuapp.com/api/nhentai/${q}?apikey=${config.lol}`)
                try {
                    const { title_romaji, title_native, file_pdf, info } = doujin_.data.result
                    const kntl_ = doujin_.data.result.image
                    const randem = kntl_[Math.floor(Math.random() * kntl_.length)]
                    const cepete = `*DOUJIN DOWNLOADER*\n\nSedang dikirim mohon tunggu`
                    await zn.sendFileFromUrl(from, randem, 'duji.jpg', `${cepete}`, id)
                    await zn.sendFileFromUrl(from, file_pdf, `${q}.pdf`, `${title_native}`, id)
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, 'Error! Tidak ditemukan', id)
                }
            break
            // END OF WEB
            
            case 'readmore':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
				await zn.reply(from, msg.wait(), id)
			if (args.length < 1) return zn.reply(from, 'teks nya mana om?', id)
            has = q.substring(0, q.indexOf('|') - 1)
            kas = q.substring(q.lastIndexOf('|') + 2)
			if (args.length < 1) return zn.reply(from, 'mana textnya', id)
			zn.sendText(from, `${has}‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎${kas}`)
		    break
            case 'quran':
		    try {
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
				anu = await fetchJson(`https://api.banghasan.com/quran/format/json/acak`, {method: 'get'})
				quran = `${anu.acak.ar.teks}\n\n${anu.acak.id.teks}\nQ.S ${anu.surat.nama} ayat ${anu.acak.id.ayat}`
				zn.reply(from, quran, id)
			} catch {
			zn.reply(from, 'error!', id)
			}
		    break
            case 'creditcard': // devil slay
            case 'cc':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await axios.get(`https://videfikri.com/api/ccgenerator/`)
                .then(async function (response) {
                const fcc = response.data;
                //console.log(fcc)
                fk =``
                fk += `*CC GENERATOR*\n\n`
                fk += `• Network: ${fcc.result.card.network}\n`
                fk += `• Number: ${fcc.result.card.number}\n`
                fk += `• Cvv: ${fcc.result.card.cvv}\n`
                fk += `• Pin: ${fcc.result.card.pin}\n`
                fk += `• Balance: ${fcc.result.card.balance}\n`
                fk += `• Expiration month: ${fcc.result.card.expiration_month}\n`
                fk += `• Expiration year: ${fcc.result.card.expiration_year}`
                zn.reply(from, fk, id)
                }) .catch(err => { throw err });
            break
            case 'fakeidentity':
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
            const fekk = await axios.get(`https://docs-jojo.herokuapp.com/api/fake_identity`)
            await zn.reply(from, `「 ACCOUNT INFO 」\n\nName : ${fekk.data.name} \nGender : ${fekk.data.gender} \nAge : ${fekk.data.age}\nBirthday : ${fekk.data.birtday}\nOccupation : ${fekk.data.occupation}\nAddress : ${fekk.data.address}\nZipCode : ${fekk.data.zip_code}\nState : ${fekk.data.state}\nCountry : ${fekk.data.country}\nEmail : ${fekk.data.email}\nPassword : ${fekk.data.password}\nPhone : ${fekk.data.phone}\nCard : ${fekk.data.card}\nCode : ${fekk.data.code}\nDate : ${fekk.data.date}\nPinCode : ${fekk.data.pin_code}\nWeight : ${fekk.data.weight}\nHeight : ${fekk.data.height}\nBloodType : ${fekk.data.blood_type}\nStatus : ${fekk.data.status}\n`, id)
            break

            // MEDIA
            case 'trash':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                try {
                    await zn.reply(from, msg.wait(), id)
                    for (let i = 0; i < mentionedJidList.length; i++) {
                        const ypic = await zn.getProfilePicFromServer(mentionedJidList[i])
                        if (ypic === undefined) {
                            var ypfps = errorImg
                        } else {
                            ypfps = ypic
                        }
                    }
                    canvas.Canvas.trash(ypfps)
                        .then(async (buffer) => {
                            canvas.write(buffer, `./temp/${senderr}_trash.png`)
                            await zn.sendFile(from, `./temp/${senderr}_trash.png`, `${senderr}_trash.png`, '', id)
                            fs.unlinkSync(`./temp/${senderr}_trash.png`)
                        })
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                }
            break
            case 'hitler':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                try {
                    await zn.reply(from, msg.wait(), id)
                    for (let i = 0; i < mentionedJidList.length; i++) {
                        const ypics = await zn.getProfilePicFromServer(mentionedJidList[i])
                        if (ypics === undefined) {
                            var ypf = errorImg
                        } else {
                            ypf = ypics
                        }
                    }
                    canvas.Canvas.hitler(ypf)
                        .then(async (buffer) => {
                            canvas.write(buffer, `./temp/${senderr}_hitler.png`)
                            await zn.sendFile(from, `./temp/${senderr}_hitler.png`, `${senderr}_hitler.png`, '', id)
                            fs.unlinkSync(`./temp/${senderr}_hitler.png`)
                        })
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                }
            break
            case 'blackpink':
            case 'neon':
            case 'greenneon':
            case 'advanceglow':
            case 'futureneon':
            case 'sandwriting':
            case 'sandsummer':
            case 'sandengraved':
            case 'metaldark':
            case 'neonlight':
            case 'holographic':
            case 'text1917':
            case 'minion':
            case 'deluxesilver':
            case 'newyearcard':
            case 'bloodfrosted':
            case 'halloween':
            case 'jokerlogo':
            case 'fireworksparkle':
            case 'natureleaves':
            case 'bokeh':
            case 'strawberry':
            case 'box3d':
            case 'roadwarning':
            case 'breakwall':
            case 'icecold':
            case 'luxury':
            case 'cloud':
            case 'summersand':
            case 'horrorblood':
            case 'thunder':
            //case 'christmas':
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
				await zn.reply(from, msg.wait(), id)
                if (args.length == 0) return zn.reply(from, `*FORMAT SALAH*\n\nGunakan: ${prefix + command} text\nContoh: ${prefix + command} zenuwu`, id)
                zn.sendFileFromUrl(from, `http://api.lolhuman.xyz/api/textprome/${command}?apikey=${config.lol}&text=${query}`,`${query}`,`_Nih sudah jadi ${query}_`, id)
            break
            case 'shadow':
            case 'cup':
            case 'cup1':
            case 'romance':
            case 'smoke':
            case 'burnpaper':
            case 'lovemessage':
            case 'undergrass':
            case 'love':
            case 'coffe':
            case 'woodheart':
            case 'flowerheart':
            case 'woodenboard':
            case 'summer3d':
            case 'wolfmetal':
            case 'nature3d':
            case 'underwater':
            case 'golderrose':
            case 'summernature':
            case 'letterleaves':
            case 'glowingneon':
            case 'fallleaves':
            case 'flamming':
            case 'harrypotter':
            case 'carvedwood':
                if (args.length == 0) return zn.reply(from, `*FORMAT SALAH*\n\nGunakan: ${prefix + command} text\nContoh: ${prefix + command} zenuwu`, id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
				await zn.reply(from, msg.wait(), id)
                zn.sendFileFromUrl(from, `http://api.lolhuman.xyz/api/photooxy1/${command}?apikey=${config.lol}&text=${query}`,`${query}`,`_Nih sudah jadi ${query}_`, id)
            break
            case 'wetglass':
            case 'multicolor3d':
            case 'watercolor':
            case 'luxurygold':
            case 'galaxywallpaper':
            case 'lighttext':
            case 'beautifulflower':
            case 'puppycute':
            case 'royaltext':
            case 'heartshaped':
            case 'birthdaycake':
            case 'galaxystyle':
            case 'hologram3d':
            case 'glossychrome':
            case 'greenbush':
            case 'metallogo':
            case 'noeltext':
            case 'glittergold':
            case 'textcake':
            case 'starsnight':
            case 'wooden3d':
            case 'textbyname':
            case 'writegalacy':
            case 'galaxybat':
            case 'snow3d':
            case 'birthdayday':
            case 'goldplaybutton':
            case 'silverplaybutton':
            case 'freefire':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
				await zn.reply(from, msg.wait(), id)
                if (args.length == 0) return zn.reply(from, `*FORMAT SALAH*\n\nGunakan: ${prefix + command} text\nContoh: ${prefix + command} zenuwu`, id)
                zn.sendFileFromUrl(from, `http://api.lolhuman.xyz/api/ephoto1/${command}?apikey=${config.lol}&text=${query}`,`${query}`,`_Nih sudah jadi ${query}_`, id)
            break
            case 'greenneons':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
				await zn.reply(from, msg.wait(), id)
                if (args.length == 0) return zn.reply(from, `*FORMAT SALAH*\n\nGunakan: ${prefix + command} text\nContoh: ${prefix + command} zenuwu`, id)
                zn.sendFileFromUrl(from, `http://api.lolhuman.xyz/api/ephoto1/greenneon?apikey=${config.lol}&text=${query}`,`${query}`,`_Nih sudah jadi ${query}_`, id)
            break
            case 'logomafia': //Hithit
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
            limit.addLimit(senderr, _limit, isPremium, isOwner)
            await zn.reply(from, msg.wait(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                try {
                    console.log(`Creating logo...`)
                    const lmf = await axios.get(`https://api.zeks.xyz/api/mafialogo?text=${q}&apikey=apivinz`)
                    if (lmf.data.error) return zn.reply(from, lmf.data.error, id)
                    await zn.sendFile(from, lmf.data.result, 'mafialogo.jpg', 'Nih', id)
                    console.log('Success!')
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                }
            break
            case 'imgtopdf':
            case 'pdf':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
            if (!q) return await zn.reply(from, `*FORMAT SALAH*\n\nKirim/Reply gambar dengan caption *${prefix}pdf nama file*\n\nContoh: ${prefix}pdf zein`, id)
               if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    const encryptMediat = isQuotedImage ? quotedMsg : message
                    const mediaDataqq = await decryptMedia(encryptMediat, uaOverride)
                    const linkImgu = await uploadImages(mediaDataqq, `${senderr}_img`)
					console.log(linkImgu)
					convertapi.convert('pdf', {
					File: linkImgu
					}, 'jpg').then(function(result) {
					result.saveFiles('./temp/hasil.pdf')
					})
				await sleep(10000)
                await zn.sendFile(from, './temp/hasil.pdf', `${q}.pdf`,null,id)
				await fs.unlinkSync('./temp/hasil.pdf')
				} else {
                    await zn.reply(from, 'Bukan Gambar Itu Hyung', id)
                }
                console.log('success...')
            break
            case 'wanted': 
				if (type === 'chat') return zn.reply(from, `*FORMAT SALAH*\n\nKirim/Reply gambar dengan caption *${prefix}wanted atas | bawah*\n\nContoh: ${prefix}wanted zein | uwu`, id)
				if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
				await zn.reply(from, msg.wait(), id)
                if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageUrl13 = await uploadImages(mediaData, false)
				const teeks1 = q.substring(0, q.indexOf('|') - 1)
                const teeks12 = q.substring(q.lastIndexOf('|') + 2)
                const whanthed = `https://videfikri.com/api/textmaker/wanted/?urlgbr=${imageUrl13}&text1=${teeks1}&text2=${teeks12}`
                await zn.sendFileFromUrl(from, whanthed, 'SPLBOT.jpg', '', id)
				console.log('Success!')
				} else {
                await zn.reply(from, 'Wrong Format!', id)
                }
            break		
			case 'gtav': 
			case 'gta5': 
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
				await zn.reply(from, msg.wait(), id)
                if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageUrl14 = await uploadImages(mediaData, false)
                const gtav = `https://videfikri.com/api/textmaker/gtavposter/?urlgbr=${imageUrl14}`
                await zn.sendFileFromUrl(from, gtav, 'gtav.jpg', '', id)
				console.log('Success!')
                } else {
                await zn.reply(from, 'Mana Gambarnya?', id)
                }
            break	
			case 'ttefek': 
				if (!q) return await zn.reply(from, `*FORMAT SALAH*\n\nBerikan caption *${prefix}ttefek atas | bawah*\n\nContoh: ${prefix}ttefek zein | uwu`, id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
				const teeks11 = q.substring(0, q.indexOf('|') - 1)
                const teeks13 = q.substring(q.lastIndexOf('|') + 2)
                const whanthed = `https://videfikri.com/api/textmaker/tiktokeffect/?text1=${teeks11}&text2=${teeks13}`
                await zn.sendFileFromUrl(from, whanthed, 'SPLBOT.jpg', '', id)
				console.log('Success!')
            break
            case 'getpic':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (mentionedJidList.length !== 0) {
                    const userPic = await zn.getProfilePicFromServer(mentionedJidList[0])
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    if (userPic === undefined) {
                        var pek = errorImg
                    } else {
                        pek = userPic
                    }
                    await zn.sendFileFromUrl(from, pek, 'pic.jpg', '', id)
                } else if (args.length !== 0) {
                    const userPic = await zn.getProfilePicFromServer(args[0] + '@c.us')
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    if (userPic === undefined) {
                        var peks = errorImg
                    } else {
                        peks = userPic
                    }
                    await zn.sendFileFromUrl(from, peks, 'pic.jpg', '', id)
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'trump':
			    if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				    if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    if (args.length == 0) return zn.reply(from, `*FORMAT SALAH*\n\nBerikan textnya *${prefix}trump text*\n\nContoh: ${prefix}trump Zein Ganteng`, id)
                    zn.reply(from, msg.wait(), id)
                const tump = body.slice(7)
                const trumj = await axios.get(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${tump}`)
                const tumh = trumj.data
                if (tumh.message.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
            zn.sendFileFromUrl(from, tumh.message, `Nekonime${ext}`, `${tump}`, id)
            break
            case 'hartatahta':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                console.log('Creating harta tahta text...')
                await zn.sendFileFromUrl(from, `https://api.zeks.xyz/api/hartatahta?text=${q}&apikey=apivinz`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'write':
            case 'nulis':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                console.log('Creating writing...')
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/nulis?apikey=${config.lol}&text=${q}`, 'nulis.jpg', '', id)
                    .then(() => console.log('Success sending write image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'write2':
            case 'nulis2':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                console.log('Creating writing...')
                await zn.sendFileFromUrl(from, `https://api.zeks.xyz/api/nulis?text=${q}&apikey=apivinz`, 'nulis.jpg', '', id)
                    .then(() => console.log('Success sending write image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'write3':
            case 'nulis3':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                try {
                const nulis = await axios.get(`https://videfikri.com/api/nulis/?query=${query}`)
                const datanulis = nulis.data.result
                await zn.sendFileFromUrl(from, datanulis.image, `nulisVFBOT.jpg`, '', id)
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                }
            break
            case 'quotemaker':
            case 'qmaker':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                console.log('Creating writing...')
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/quotemaker?apikey=${config.lol}&text=${q}`, 'nulis.jpg', '', id)
                    .then(() => console.log('Success sending write image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'playbutton':     		           
			if (args.length === 0) return zn.reply(from, `Kirim perintah #playbutton teks, contoh #playbutton Zein`, id)              
			zn.reply(from, msg.wait(), id) 
			if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
			limit.addLimit(senderr, _limit, isPremium, isOwner)
			const btnp = body.slice(12)           
			try {           
			const swrt2 = await axios.get('https://api.zeks.xyz/api/gplaybutton?text=' + btnp + '&apikey=apivinz')                 
			const { result } = swrt2.data            
			const swrt3 = `Neh ngab`             
			const pictk = await bent("buffer")(result)           
			const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`         
				zn.sendImage(from, base64, swrt3)  
				} catch (err) {              
				console.error(err.message)             
			await zn.sendFileFromUrl(from, errorur121, 'error.png', '💔 Sedang error ')                      
			}           
			break
            case 'phlogo':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const kiri = q.substring(0, q.indexOf('|') - 1)
                const kanan = q.substring(q.lastIndexOf('|') + 2)
                await zn.reply(from, msg.wait(), id)
                console.log('Creating Pornhub text...')
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/textprome2/pornhub?apikey=${config.lol}&text1=${kiri}&text2=${kanan}`, 'ph.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'phcomment':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q.includes('|')) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const usernamePh = q.substring(0, q.indexOf('|') - 1)
                const commentPh = q.substring(q.lastIndexOf('|') + 2)
                const ppPhRaw = await zn.getProfilePicFromServer(senderr)
                if (ppPhRaw === undefined) {
                    var ppPh = errorImg
                } else {
                    ppPh = ppPhRaw
                }
                const dataPpPh = await bent('buffer')(ppPh)
                const linkPpPh = await uploadImages(dataPpPh, `${senderr}_ph`)
                await zn.reply(from, msg.wait(), id)
                const preprocessPh = await axios.get(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${linkPpPh}&text=${commentPh}&username=${usernamePh}`)
                await zn.sendFileFromUrl(from, preprocessPh.data.message, 'ph.jpg', '', id)
                console.log('Success creating image!')
            break
            case 'ytc':
            case 'ytcomment':
                if (!q.includes('|')) return await zn.reply(from, `*FORMAT SALAH*\n\nReply dengan caption *${prefix}ytc username | comment*\n\nContoh: ${prefix}ytc zenuwu | meresahkan`, id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const ppytc = await zn.getProfilePicFromServer(senderr)
                if (ppytc === undefined) {
                    var ppyt = errorImg
                } else {
                    ppyt = ppytc
                }
                const datappyt = await bent('buffer')(ppyt)
                const linkppyt = await uploadImages(datappyt, `${senderr}_ph`)
				await zn.reply(from, msg.wait(), id)
				const ytc1 = q.substring(0, q.indexOf('|') - 1)
                const ytc2 = q.substring(q.lastIndexOf('|') + 2)
                const ytcom = `https://lolhuman.herokuapp.com/api/ytcomment?apikey=${config.lol}&username=${ytc1}&comment=${ytc2}&img=${linkppyt}`
                zn.sendFileFromUrl(from, ytcom, `ytc.jpg`, `${ytc1} ${ytc2}`, id)
				console.log('Success!')
            break
            case 'tolol':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}tolol nama*\n\nContoh: ${prefix}tolol zenuwu`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                console.log('Creating Tolol text...')
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/toloserti?apikey=${config.lol}&name=${q}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break 
            case 'lol':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}lol nama*\n\nContoh: ${prefix}lol zenuwu`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.reply(from, msg.wait(), id)
                console.log('Creating LOL text...')
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/photooxy3/bannerlol?apikey=${config.lol}&text=${q}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'pubg': 
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q.includes('|')) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}pubg atas | bawah*\n\nContoh: ${prefix}pubg zein | uwu`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const pubgatas = q.substring(0, q.indexOf('|') - 1)
                const pubgbawah = q.substring(q.lastIndexOf('|') + 2)
                await zn.reply(from, msg.wait(), id)
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/photooxy2/pubg?apikey=${config.lol}&text1=${pubgatas}&text2=${pubgbawah}`)
                console.log('Success creating image!')
            break
            case 'juventus':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q.includes('|')) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}juventus nama | nomor*\n\nContoh: ${prefix}juventus zein | 09`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const juvea = q.substring(0, q.indexOf('|') - 1)
                const juveb = q.substring(q.lastIndexOf('|') + 2)
                await zn.reply(from, msg.wait(), id)
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/ephoto2/juventusshirt?apikey=${config.lol}&text1=${juvea}&text2=${juveb}`)
                console.log('Success creating image!')
            break
            case 'battlefield': 
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q.includes('|')) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}battlefield atas | bawah*\n\nContoh: ${prefix}battlefield zein | uwu`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const batatas = q.substring(0, q.indexOf('|') - 1)
                const batbawah = q.substring(q.lastIndexOf('|') + 2)
                await zn.reply(from, msg.wait(), id)
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/photooxy2/battlefield4?apikey=${config.lol}&text1=${batatas}&text2=${batbawah}`)
                console.log('Success creating image!')
            break
            case 'cod': 
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q.includes('|')) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}cod atas | bawah*\n\nContoh: ${prefix}cod zein | uwu`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const coda = q.substring(0, q.indexOf('|') - 1)
                const codb = q.substring(q.lastIndexOf('|') + 2)
                await zn.reply(from, msg.wait(), id)
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/ephoto2/codwarzone?apikey=${config.lol}&text1=${coda}&text2=${codb}`)
                console.log('Success creating image!')
            break
            case 'ninjalogo': 
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q.includes('|')) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}ninjalogo atas | bawah*\n\nContoh: ${prefix}ninjalogo zein | uwu`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const ninjaa = q.substring(0, q.indexOf('|') - 1)
                const ninjab = q.substring(q.lastIndexOf('|') + 2)
                await zn.reply(from, msg.wait(), id)
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/textprome2/ninjalogo?apikey=${config.lol}&text1=${ninjaa}&text2=${ninjab}`)
                console.log('Success creating image!')
            break
            case 'marvel': 
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q.includes('|')) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}marvel atas | bawah*\n\nContoh: ${prefix}marvel zein | uwu`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const marva = q.substring(0, q.indexOf('|') - 1)
                const marvb = q.substring(q.lastIndexOf('|') + 2)
                await zn.reply(from, msg.wait(), id)
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/textprome2/marvelstudio?apikey=${config.lol}&text1=${marva}&text2=${marvb}`)
                console.log('Success creating image!')
            break
            case 'lionlogo': 
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q.includes('|')) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}lionlogo atas | bawah*\n\nContoh: ${prefix}lionlogo zein | uwu`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const liona = q.substring(0, q.indexOf('|') - 1)
                const lionb = q.substring(q.lastIndexOf('|') + 2)
                await zn.reply(from, msg.wait(), id)
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/textprome2/lionlogo?apikey=${config.lol}&text1=${liona}&text2=${lionb}`)
                console.log('Success creating image!')
            break
            case 'wallgravity': 
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q.includes('|')) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}wallgravity atas | bawah*\n\nContoh: ${prefix}wallgravity zein | uwu`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const grava = q.substring(0, q.indexOf('|') - 1)
                const gravb = q.substring(q.lastIndexOf('|') + 2)
                await zn.reply(from, msg.wait(), id)
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/textprome2/wallgravity?apikey=${config.lol}&text1=${grava}&text2=${gravb}`)
                console.log('Success creating image!')
            break
            case 'wolflogo': 
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!q.includes('|')) return await zn.reply(from, `*FORMAT SALAH*\n\nBeri caption *${prefix}wolflogo atas | bawah*\n\nContoh: ${prefix}wolflogo zein | uwu`, id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const wolfa = q.substring(0, q.indexOf('|') - 1)
                const wolfb = q.substring(q.lastIndexOf('|') + 2)
                await zn.reply(from, msg.wait(), id)
                await zn.sendFileFromUrl(from, `https://lolhuman.herokuapp.com/api/textprome2/wolflogo?apikey=${config.lol}&text1=${wolfa}&text2=${wolfb}`)
                console.log('Success creating image!')
            break

            case 'fisheye':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isGroupMsg) return await zn.reply(from, msg.wait(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (isMedia && type === 'image' || isQuotedImage) {
                await zn.reply(from, msg.wait(), id)
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageLinkk = await uploadImages(mediaData, `fisheye.${senderr}`)
                const eye = await axios.get(`https://naufalhoster.xyz/tools/fisheye?apikey=sB70Q7-OfZkIl-ugrRH3&url=${imageLinkk}`)
                await zn.sendFileFromUrl(from, eye.data.result.image , 'fish.jpg' , '' , id)}
            break
            case 'whatis':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (isGroupMsg) return await zn.reply(from, msg.wait(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                if (isMedia && type === 'image' || isQuotedImage) {
                await zn.reply(from, msg.wait(), id)
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageLinks = await uploadImages(mediaData, `fisheye.${senderr}`)
                const wat = await axios.get(`https://lolhuman.herokuapp.com/api/wait?apikey=${config.lol}&img=${imageLinks}`)
                await zn.sendFileFromUrl(from, wat.data.result.video , 'fish.mp4' , '' , id)}
            break
            // END OF MEDIA

            // Player Menu
            case 'bal':
            case 'balance':
            if (!isRegistered) return  zn.reply(from, msg.notRegistered(pushname), id)
            const kantong = checkATMuser(senderr)
            const kantongs = checkSaldouser(senderr)
            zn.reply(from, `*UANG PENGGUNA*\n\n*Nama :* ${pushname}\n*Nomor :* ${senderr.split("@")[0]}\n*Balance :* Rp.${kantongs}\n*Coin :* Rp.${kantong}`, id)
            break
            case 'buylimit':
            if (!isRegistered) return  zn.reply(from, msg.notRegistered(pushname), id)
             if (args.length == 0) return zn.reply(from, `Berapa limit yang mau di beli?\n\nHarga 1 Limit : Rp.500`, id)
             payout = body.slice(10)
             const koinPerlimit = 500 //Silahkan Custom Sendiri Price BuyLimit
             const total = koinPerlimit * payout
             if ( checkATMuser(senderr) <= total) return zn.reply(from, `maaf uang kamu belum cukup..`, id)
             if ( checkATMuser(senderr) >= total ) {
             confirmATM(senderr, total)
             bayarLimit(senderr, payout)
             await zn.reply(from, `*Pembelian Berhasil*\n\n*Penerima :* ${pushname}\n*Jumlah Limit :* ${payout}\n*Sisa Balance :* ${checkATMuser(senderr)}`, id)
                }
            break
            case 'profile': //Cek Player Profile
            case 'me':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(pushname), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (quotedMsg) {
                    const getQuoted = quotedMsgObj.senderr
                    const profilePic = await zn.getProfilePicFromServer(getQuoted)
                    const username = quotedMsgObj.sender.name
                    const statuses = await zn.getStatus(getQuoted)
                    const benet = _ban.includes(getQuoted) ? 'Yes' : 'No'
                    const adm = groupAdmins.includes(getQuoted) ? 'Yes' : 'No'
                    const cekExp = ms(premium.getPremiumExpired(senderr, _premium) - Date.now())
                    const premi = premium.checkPremiumUser(getQuoted, _premium) ? `-${cekExp.days} Days` : 'No'
            
                    const levelMe = level.getLevelingLevel(getQuoted, _level)
                    const xpMe = level.getLevelingXp(getQuoted, _level)
                    const req = 10 * Math.pow(levelMe, 2) + 50 * levelMe + 100
                    const kantongs = checkATMuser(senderr)
                    const limitnya = limit.getLimit(senderr, _limit, limitCount)
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfp = errorImg
                    } else {
                        pfp = profilePic
                    }
                    await zn.sendFileFromUrl(from, pfp, `${username}.jpg`, msg.profile(username, status, premi, benet, adm, levelMe, req, xpMe, kantongs, limitnya), id)
                } else {
                    const profilePic = await zn.getProfilePicFromServer(senderr)
                    const username = pushname
                    const statuses = await zn.getStatus(senderr)
                    const benet = isBanned ? 'Yes' : 'No'
                    const adm = isGroupAdmins ? 'Yes' : 'No'
                    const cekExp = ms(premium.getPremiumExpired(senderr, _premium) - Date.now())
                    const premi = isPremium ? `-${cekExp.days} Days` : 'No'
                    const levelMe = level.getLevelingLevel(senderr, _level)
                    const xpMe = level.getLevelingXp(senderr, _level)
                    const req = 10 * Math.pow(levelMe, 2) + 50 * levelMe + 100
                    const kantongs = checkATMuser(senderr)
                    const limitnya = isPremium || isOwner ? 'Unlimited' : `${limit.getLimit(senderr, _limit, limitCount)}`
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfps = errorImg
                    } else {
                        pfps = profilePic
                    }
                    await zn.sendFileFromUrl(from, pfps, `${username}.jpg`, msg.profile(username, status, premi, benet, adm, levelMe, req, xpMe, kantongs, limitnya), id)
                }
            break
            case 'limit': //Cek Player Limit
                if (isPremium || isOwner) return await zn.reply(from, 'Limit left: 999999\n\n*_Limit direset setiap menit_*', id)
                await zn.reply(from, `\n_*Limit : ${limit.getLimit(senderr, _limit, limitCount)} (25max)*_\n*_Limit direset tiap pukul 00:00 WIB_*\n`, id)
            break
            case 'level': //Cek Player Level
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isLevelingOn) return await zn.reply(from, `gomenasai onii chan!\nFitur leveling belum diaktifkan! Suruh admin group ini untuk mengaktifkan dengan mengetik *${prefix}leveling enable*`, id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                const userLevel = level.getLevelingLevel(senderr, _level)
                const userXp = level.getLevelingXp(senderr, _level)
                const ppLink = await zn.getProfilePicFromServer(senderr)
                if (ppLink === undefined) {
                    var pepe = errorImg
                } else {
                    pepe = ppLink
                }
                const requiredXp = 10 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                const rank = new canvas.Rank()
                .setAvatar(pepe)
                    .setLevel(userLevel)
                    .setLevelColor('#ffffff', '#5ebdd8')
                    .setRank(Number(level.getUserRank(senderr, _level)))
                    .setRankColor('#ffffff', '#5ebdd8')
                    .setCurrentXP(userXp)
                    .setOverlay('#000000', 100, false)
                    .setRequiredXP(requiredXp)
                    .setProgressBar('#62d3f5', 'COLOR')
                    //.setProgressBar(["#ffffff", "#ff007f"], "GRADIENT")
                    .setCustomStatusColor('#000000', 'COLOR')
                    .setBackground('COLOR', '#000000')
                    .setUsername(pushname)
                    .setDiscriminator(senderr.substring(9, 13))
                rank.build()
                    .then(async (buffer) => {
                        canvas.write(buffer, `${senderr}_card.png`)
                        await zn.sendFile(from, `${senderr}_card.png`, `${senderr}_card.png`, '', id)
                        fs.unlinkSync(`${senderr}_card.png`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await zn.reply(from, 'Error!', id)
                    })
            break
            case 'leaderboard': //Cek Leaderboard
            case 'leaderboards':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isLevelingOn) return await zn.reply(from, `gomenasai onii chan!\nFitur leveling belum diaktifkan! Suruh admin group ini untuk mengaktifkan dengan mengetik *${prefix}leveling enable*`, id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                const resp = _level
                _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let leaderboard = '*TOP 10 LEADERBOARD*\n\n'
                try {
                    for (let i = 0; i < 10; i++) {
                        var roles = 'Warrior III'
                        if (resp[i].level <= 5) {
                            roles = 'Warrior II'
                        } else if (resp[i].level <= 10) {
                            roles = 'Warrior I'
                        } else if (resp[i].level <= 15) {
                            roles = 'Elite III'
                        } else if (resp[i].level <= 20) {
                            roles = 'Elite II'
                        } else if (resp[i].level <= 25) {
                            roles = 'Elite I'
                        } else if (resp[i].level <= 30) {
                            roles = 'Master III'
                        } else if (resp[i].level <= 35) {
                            roles = 'Master II'
                        } else if (resp[i].level <= 40) {
                            roles = 'Master I'
                        } else if (resp[i].level <= 45) {
                            roles = 'GrandMaster III'
                        } else if (resp[i].level <= 50) {
                            roles = 'GrandMaster II'
                        } else if (resp[i].level <= 55) {
                            roles = 'GrandMaster I'
                        } else if (resp[i].level <= 60) {
                            roles = 'Epic III'
                        } else if (resp[i].level <= 65) {
                            roles = 'Epic II'
                        } else if (resp[i].level <= 70) {
                            roles = 'Epic I'
                        } else if (resp[i].level <= 75) {
                            roles = 'Legend III'
                        } else if (resp[i].level <= 80) {
                            roles = 'Legend II'
                        } else if (resp[i].level <= 85) {
                            roles = 'Legend I'
                        } else if (resp[i].level <= 90) {
                            roles = 'Mythic'
                        } else if (resp[i].level <= 95) {
                            roles = 'Mythical Glory'
                        } else if (resp[i].level >= 100) {
                            roles = 'Immortal'
                        } 
                        leaderboard += `${i + 1}. wa.me/${_level[i].id.replace('@c.us', '')}\n\n*Role :* ${roles}\n*Level :* ${_level[i].level}\n*XP :* ${_level[i].xp}\n━━━━━━━━━━━━━━━━━━\n`
                    }
                    await zn.reply(from, leaderboard, id)
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, msg.minimalDb(), id)
                }
            break
            case 'belipremium':
			case 'beliprem' :
            case 'donate' :
			const beliprem = `
╭──「 I N F O 」
│
├ • Premium
│
│ ⤷ Price : 15k / 30 day
│ ⤷ Khusus Pulsa Jadi : 20k
│
├ • Feature
│
│ ⤷ Unlimited Limit
│ ⤷ Unlock All Command
│ ⤷ Join Private Group
│ ⤷ 24h Online
│ ⤷ Get XP
│
├ • Pembayaran
│
│ ⤷ Dana ( Diutamakan )
│ ⤷ OvO
│ ⤷ Gopay
│ ⤷ Pulsa Telkomsel
│
├ • Nomor : 081288339373
│
├ • Contact owner :
│   wa.me/6281288339373
│
╰──「 Arigathanks 」
` 
            await zn.sendText(from, beliprem)
			break
            case 'premiumlist':
            case 'listpremium':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                let listPremi = '「 *PREMIUM USER LIST* 」\n\n'
                const deret = premium.getAllPremiumUser(_premium)
                const arrayPremi = []
                for (let i = 0; i < deret.length; i++) {
                    const checkExp = ms(premium.getPremiumExpired(deret[i], _premium) - Date.now())
                    arrayPremi.push(await zn.getContact(premium.getAllPremiumUser(_premium)[i]))
                    listPremi += `${i + 1}. wa.me/${premium.getAllPremiumUser(_premium)[i].replace('@c.us', '')}\n*Expired :* ${checkExp.days} day(s) ${checkExp.hours} hour(s) ${checkExp.minutes} minute(s)\n\n`
                }
                await zn.reply(from, listPremi, id)
            break
            case 'premiumcheck':
            case 'cekpremium':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                const cekExp = ms(premium.getPremiumExpired(senderr, _premium) - Date.now())
                await zn.reply(from, `*PREMIUM EXPIRE*\n\n*Nomor :* ${senderr}\n*Sisa Premium :* ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)`, id)
            break
            case 'daftar':
			if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
		    const jumlahUsers = _registered.length
			await zn.sendText (from, `*Teman BOT yg sudah mendaftar* : ${jumlahUsers}`,'', id)
            break
            case 'listblock':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                let block = msg.listBlock(blockNumber)
                for (let i of blockNumber) {
                    block += `@${i.replace('@c.us', '')}\n`
                }
                await zn.sendTextWithMentions(from, block)
            break
            case 'afk':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (isAfkOn) return await zn.reply(from, msg.afkOnAlready(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const reason = q ? q : 'Nothing.'
                afk.addAfkUser(senderr, time, reason, _afk)
                await zn.reply(from, msg.afkOn(pushname, reason), id)
            break
            
            // Premium
            case 'getsticker':
            case 'getstik':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (args.length === 0) return zn.reply(from, 'Berikan Nama Stickernya', id)
                await zn.reply(from, msg.wait(), id)
                namastc = args[0]
                try {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                result = fs.readFileSync(`./temp/stickers/${namastc}.webp`)
                zn.sendImageAsSticker(from, result, { author: 'setiker', pack: 'zen' })
                } catch {
                zn.reply(from, 'Sticker Name tidak terdaftar', id)
                }
            break
            case 'delsticker':
            case 'delstick':
            if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (args.length === 0) return zn.reply(from, 'Berikan Nama Stickernya', id)
                let svsta = args[0]
                _setiker.splice(svsta)
                fs.unlinkSync(`./temp/stickers/${svsta}.webp`)
                fs.writeFileSync('./database/data/sticker.json', JSON.stringify(_setiker))
                await zn.reply(from, `Sukses Menghapus Sticker *${svsta}*`, id)
            break
            case 'addsticker':
			if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (isQuotedSticker) {
                if (args.length === 0) return zn.reply(from, 'Berikan Nama Stickernya', id)
                svst = args[0]
                boij = JSON.parse(JSON.stringify(quotedMsg))
                delb = await decryptMedia(boij)
                _setiker.push(`${svst}`) 
                fs.writeFileSync(`./temp/stickers/${svst}.webp`, delb)
                fs.writeFileSync(`./database/data/sticker.json`, JSON.stringify(_setiker))
                await zn.reply(from, `Sukses Menambahkan Sticker *${svst}*`, id)
                } else {
                await zn.reply(from, 'Kirimkan Stickernya', id)
                }
            break
            case 'stickerlist':
            case 'liststicker':
                teks = `*Sticker List*\nTotal : ${_setiker.length}\n\n`
                for (let awokwkwk of _setiker) {
                teks += `nama : ${awokwkwk}\n`}
                zn.sendText(from, teks)
            break
            
            case 'addvideo':
            if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (isQuotedVideo) {
                if (args.length === 0) return zn.reply(from, 'Berikan Nama Videonya', id)
                svst = args[0]
                boij = JSON.parse(JSON.stringify(quotedMsg))
                delb = await decryptMedia(boij)
                _videonye.push(`${svst}`)
                fs.writeFileSync(`./temp/video/${svst}.mp4`, delb)
                fs.writeFileSync('./database/data/video.json', JSON.stringify(_videonye))
                await zn.reply(from, `Sukses Menambahkan Video *${svst}*`, id)
                } else {
                await zn.reply(from, 'Kirimkan Videonya', id)
                }
            break
            case 'delvideo':
            if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (args.length === 0) return zn.reply(from, 'Berikan Nama Videonya', id)
                let svstb = args[0]
                _videonye.splice(svstb)
                fs.unlinkSync(`./temp/video/${svstb}.mp4`)
                fs.writeFileSync('./database/data/video.json', JSON.stringify(_videonye))
                await zn.reply(from, `Sukses Menghapus Video *${svstb}*`, id)
            break
            case 'getvideo':
				if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (args.length === 0) return zn.reply(from, 'Berikan Nama Videonya', id)
                await zn.reply(from, msg.wait(), id)
                namastc = args[0]
                try {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
				zn.sendFile(from, `./temp/video/${namastc}.mp4`,'', `${namastc}`, id)
                } catch {
                zn.reply(from, 'Video Name tidak terdaftar', id)
                }
			break
            case 'videolist':
            case 'listvideo':
                teks = `*Video List*\nTotal : ${_videonye.length}\n\n`
                for (let awokwkwk of _videonye) {
                teks += `nama : ${awokwkwk}\n`}
                zn.sendText(from, teks)
            break
            
            case 'addaudio':
            if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (isMedia && isAudio || isQuotedAudio || isVoice || isQuotedVoice) {
                if (args.length === 0) return zn.reply(from, 'Berikan Nama Audionya', id)
                svst = args[0]
                boij = JSON.parse(JSON.stringify(quotedMsg))
                delb = await decryptMedia(boij)
                _audionye.push(`${svst}`)
                fs.writeFileSync(`./temp/audio/${svst}.mp3`, delb)
                fs.writeFileSync('./database/data/audio.json', JSON.stringify(_audionye))
                await zn.reply(from, `Sukses Menambahkan Audio *${svst}*`, id)
                } else {
                await zn.reply(from, 'Kirimkan Audionya', id)
                }
            break
            case 'delaudio':
            if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (args.length === 0) return zn.reply(from, 'Berikan Nama Audionya', id)
                let svstc = args[0]
                _audionye.splice(svstc)
                fs.unlinkSync(`./temp/audio/${svstc}.mp3`)
                fs.writeFileSync('./database/data/audio.json', JSON.stringify(_audionye))
                await zn.reply(from, `Sukses Menghapus Audio *${svstc}*`, id)
            break
            case 'getaudio':
				if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (args.length === 0) return zn.reply(from, 'Berikan Nama Videonya', id)
                await zn.reply(from, msg.wait(), id)
                namastc = args[0]
                try {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
				zn.sendFile(from, `./temp/audio/${namastc}.mp3`,'', `${namastc}`, id)
                } catch {
                zn.reply(from, 'Video Name tidak terdaftar', id)
                }
            break
            case 'audiolist':
            case 'listaudio':
                teks = `*Audio List*\nTotal : ${_audionye.length}\n\n`
                for (let awokwkwk of _audionye) {
                teks += `nama : ${awokwkwk}\n`}
                zn.sendText(from, teks)
            break

            case 'addimage':
            if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                if (args.length === 0) return zn.reply(from, 'Berikan Nama Gambarnya', id)
                svst = args[0]
                boij = JSON.parse(JSON.stringify(quotedMsg))
                delb = await decryptMedia(boij)
                _imagenye.push(`${svst}`)
                fs.writeFileSync(`./temp/image/${svst}.jpeg`, delb)
                fs.writeFileSync('./database/data/image.json', JSON.stringify(_imagenye))
                await zn.reply(from, `Sukses Menambahkan Gambar *${svst}*`, id)
                } else {
                await zn.reply(from, 'Kirimkan Gambarnya', id)
                }
            break
            case 'delimage':
            if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (args.length === 0) return zn.reply(from, 'Berikan Nama Gambarnya', id)
                let svstd = args[0]
                _imagenye.splice(svstd)
                fs.unlinkSync(`./temp/image/${svstd}.jpeg`)
                fs.writeFileSync('./database/data/image.json', JSON.stringify(_imagenye))
                await zn.reply(from, `Sukses Menghapus Gambar *${svstd}*`, id)
            break
            case 'getimage':
            if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (args.length === 0) return zn.reply(from, 'Berikan Nama Videonya', id)
                await zn.reply(from, msg.wait(), id)
                namastc = args[0]
                try {
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                zn.sendFile(from, `./temp/image/${namastc}.jpeg`,'',`${namastc}`, id)
                } catch {
                zn.reply(from, 'Video Name tidak terdaftar', id)
                }
            break
            case 'imagelist':
            case 'listimage':
                teks = `*Image List*\nTotal : ${_imagenye.length}\n\n`
                for (let awokwkwk of _imagenye) {
                teks += `nama : ${awokwkwk}\n`}
                zn.sendText(from, teks)
            break

            // Owner Menu
			case 'restart':
                if (!isOwner) return await zn.reply(from, msg.ownerOnly(), id)
                await zn.sendText(from, 'BOT RESTARTING...')
                    .then(async () => await zn.kill())
                    .catch(() => new Error('Target closed.'))
            break
			case 'give':
                if (!isOwner) return await zn.reply(from, msg.ownerOnly(), id)
                if (args.length !== 2) return await zn.reply(from, msg.wrongFormat(), id)
                if (mentionedJidList.length !== 0) {
                    for (let give of mentionedJidList) {
                        level.addLevelingXp(give, Number(args[1]), _level)
                        await zn.reply(from, `Sukses menambah XP kepada: ${give}\nJumlah ditambahkan: ${args[1]}`, id)
                    }
                } else {
                    level.addLevelingXp(args[0] + '@c.us', Number(args[1]), _level)
                    await zn.reply(from, `Sukses menambah XP kepada: ${args[0]}\nJumlah ditambahkan: ${args[1]}`, id)
                }
            break

            case 'premium': // Untuk Menambah Premium User
                if (!isOwner) return await zn.reply(from, `*Format salah!*\n\nKetik ${prefix}belipremium`, id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let prem of mentionedJidList) {
                            if (prem === botNumber) return await zn.reply(from, msg.wrongFormat(), id)
                            premium.addPremiumUser(prem, args[2], _premium)
                            await zn.reply(from, `*「 PREMIUM ADDED 」*\n\n*ID :* ${prem}\n*Expired :* ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                        }
                    } else {
                        premium.addPremiumUser(args[1] + '@c.us', args[2], _premium)
                        await zn.reply(from, `*「 PREMIUM ADDED 」*\n\n*ID :* ${args[1]}@c.us\n*Expired :* ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await zn.reply(from, msg.wrongFormat(), id)
                        _premium.splice(premium.getPremiumPosition(mentionedJidList[0], _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await zn.reply(from, msg.doneOwner(), id)
                    } else {
                        _premium.splice(premium.getPremiumPosition(args[1] + '@c.us', _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await zn.reply(from, msg.doneOwner(), id)
                    }
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'unregister':
                if (!isOwner) return await zn.reply(from, msg.ownerOnly(), id)
                if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await zn.reply(from, msg.wrongFormat(), id)
                        _registered.splice(register.getRegisteredPosition(mentionedJidList[0], _registered), 1)
                        fs.writeFileSync('./database/bot/registered.json', JSON.stringify(_registered))
                        await zn.reply(from, msg.doneOwner(), id)
                    } else {
                        _registered.splice(register.getRegisteredPosition(args[1] + '@c.us', _registered), 1)
                        fs.writeFileSync('./database/bot/registered.json', JSON.stringify(_registered))
                        await zn.reply(from, msg.doneOwner(), id)
                    }
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'zn':
            case 'eval':
                if (!isOwner) return await zn.reply(from, msg.ownerOnly(), id)
                if (!q) return await zn.reply(from, msg.wrongFormat(), id)
                try {
                    let evaled = await eval(q)
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await zn.sendText(from, evaled)
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, 'Error!', id)
                }
            break
            case 'limits':
                if (!isOwner) return await zn.reply(from, 'Format Salah', id)
                if (args.length !== 2) return await zn.reply(from, msg.wrongFormat(), id)
                if (mentionedJidList.length !== 0) {
                    for (let give of mentionedJidList) {
                        limit.limitAdd(give, Number(args[1]), _limit)
                        await zn.reply(from, `Sukses menambah LIMIT kepada: ${give}\nJumlah ditambahkan: ${args[1]}`, id)
                    }
                } else {
                    limit.limitAdd(args[0] + '@c.us', Number(args[1]), _limit)
                    await zn.reply(from, `Sukses menambah LIMIT kepada: ${args[0]}\nJumlah ditambahkan: ${args[1]}`, id)
                }
            break
            case 'getses':
                if (!isOwner) return await zn.reply(from, msg.ownerOnly(), id)
                const ses = await zn.getSnapshot()
                await zn.sendFile(from, ses, 'session.png', msg.doneOwner())
            break
            case 'mute':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return await zn.reply(from, msg.adminOnly(), id)
                if (ar[0] === 'on') {
                    if (isMute) return await zn.reply(from, `Mute telah diaktifkan pada group ini sebelumnya!`, id)
                    _mute.push(groupId)
                    fs.writeFileSync('./database/bot/mute.json', JSON.stringify(_mute))
                    await zn.reply(from, `Berhasil mute bot pada grup ini!`, id)
                } else if (ar[0] === 'off') {
                    _mute.splice(groupId, 1)
                    fs.writeFileSync('./database/bot/mute.json', JSON.stringify(_mute))
                    await zn.reply(from, `Berhasil unmute bot pada grup ini!`, id)
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            // End Of Owner

            // Admin Menu
            
            case 'delete':
            case 'del':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupAdmins) return zn.reply(from, msg.adminOnly(), id)
                if (!quotedMsg) return await zn.reply(from, msg.wrongFormat(), id)
                if (!quotedMsgObj.fromMe) return await zn.reply(from, msg.wrongFormat(), id)
                await zn.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
            case 'revoke':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return zn.reply(from, msg.adminOnly(), id)
                if (!isBotGroupAdmins) return zn.reply(from, msg.botNotAdmin(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.revokeGroupInviteLink(groupId);
                zn.sendTextWithMentions(from, `Group link revoked by @${senderr.replace('@c.us', '')}`)
            break
            case 'linkgroup':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return await zn.reply(from, msg.adminOnly(), id)
                if (!isBotGroupAdmins) return await zn.reply(from, msg.botNotAdmin(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const gcLink = await zn.getGroupInviteLink(groupId)
                const linkGc = `Group: *${formattedTitle}*\n\nLink: ${gcLink}`
                zn.reply(from, linkGc, id)
            break
            case 'ownergroup':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                const ownerGc = chat.groupMetadata.owner
                await zn.sendTextWithMentions(from, `Owner Group : @${ownerGc}`)
            break
            case 'mutegc':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return zn.reply(from, msg.adminOnly(), id)
                if (!isBotGroupAdmins) return zn.reply(from, msg.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.setGroupToAdminsOnly(groupId, true)
                    await zn.sendText(from, msg.gcMute())
                } else if (ar[0] === 'disable') {
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.setGroupToAdminsOnly(groupId, false)
                    await zn.sendText(from, msg.gcUnmute())
                } else {
                    await zn.reply(from, 'pilih enable atau disable', id)
                }
            break
            case 'add':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return await zn.reply(from, msg.adminOnly(), id)
                if (!isBotGroupAdmins) return await zn.reply(from, msg.botNotAdmin(), id)
                if (args.length !== 1) return await zn.reply(from, msg.wrongFormat(), id)
                try {
                    await zn.addParticipant(from, `${args[0]}@c.us`)
                    await zn.sendText(from, '*_Selamat Datang Sayang_*')
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, 'Gagal menambahkan target, mungkin karena di private!', id)
                }
            break
            case 'kick':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return await zn.reply(from, msg.adminOnly(), id)
                if (!isBotGroupAdmins) return await zn.reply(from, msg.botNotAdmin(), id)
                if (mentionedJidList.length === 0) return await zn.reply(from, msg.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await zn.reply(from, msg.wrongFormat(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.sendTextWithMentions(from, `Good bye~\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i of mentionedJidList) {
                    if (groupAdmins.includes(i)) return await zn.sendText(from, msg.wrongFormat())
                    await zn.removeParticipant(groupId, i)
                }
            break
            case 'promote':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return await zn.reply(from, msg.adminOnly(), id)
                if (!isBotGroupAdmins) return await zn.reply(from, msg.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await zn.reply(from, msg.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await zn.reply(from, msg.wrongFormat(), id)
                if (groupAdmins.includes(mentionedJidList[0])) return await zn.reply(from, msg.adminAlready(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.promoteParticipant(groupId, mentionedJidList[0])
                await zn.reply(from, 'Siap Sudah Selesai', id)
            break
            case 'demote':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return await zn.reply(from, msg.adminOnly(), id)
                if (!isBotGroupAdmins) return await zn.reply(from, msg.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await zn.reply(from, msg.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await zn.reply(from, msg.wrongFormat(), id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await zn.reply(from, msg.notAdmin(), id)
                if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(senderr, _limit, isPremium, isOwner)
                await zn.demoteParticipant(groupId, mentionedJidList[0])
                await zn.reply(from, 'Siap Sudah Selesai', id)
            break
            case 'leave':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return await zn.reply(from, msg.adminOnly(), id)
                await zn.sendText(from, 'Sayounara~ 👋')
                await zn.leaveGroup(groupId)
            break
            case 'groupicon':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return await zn.reply(from, msg.adminOnly(), id)
                if (!isBotGroupAdmins) return zn.reply(from, msg.botNotAdmin(), id)
                if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    await zn.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await zn.setGroupIcon(groupId, imageBase64)
                    await zn.sendText(from, 'Siap Sudah Selesai')
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break
            case 'leveling':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return await zn.reply(from, msg.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isLevelingOn) return await zn.reply(from, msg.levelingOnAlready(), id)
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await zn.reply(from, msg.levelingOn(), id)
                } else if (ar[0] === 'disable') {
                    if (limit.isLimit(senderr, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(senderr, _limit, isPremium, isOwner)
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await zn.reply(from, msg.levelingOff(), id)
                } else {
                    await zn.reply(from, 'Pilih enable atau disable!', id)
                }
            break
            case 'nsfw':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return await zn.reply(from, msg.adminOnly(), id)
                if (args.length === 0) return zn.reply(from, 'Pilih enable atau disable!', id)
                if (ar[0] === 'enable') {
                    if (isNsfw) return await zn.reply(from, msg.nsfwAlready(), id)
                    _nsfw.push(groupId)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await zn.reply(from, msg.nsfwOn(), id)
                } else if (ar[0] === 'disable') {
                    var anu = _nsfw.indexOf(groupId)
                    _nsfw.splice(anu, 1)
                    //_nsfw.splice(nsfw.getNsfwPosition(groupId, _nsfw), 1)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await zn.reply(from, msg.nsfwOff(), id)
                }
            break
            case 'antilink':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return await zn.reply(from, msg.adminOnly(), id)
                if (!isBotGroupAdmins) return await zn.reply(from, msg.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (isDetectorOn) return await zn.reply(from, msg.detectorOnAlready(), id)
                    _antilink.push(groupId)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await zn.reply(from, msg.detectorOn(name, formattedTitle), id)
                } else if (ar[0] === 'disable') {
                    var anu = _antilink.indexOf(groupId)
                    _antilink.splice(anu, 1)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await zn.reply(from, msg.detectorOff(), id)
                } else {
                    await zn.reply(from, 'Pilih enable atau disable!', id)
                }
            break
            
            // Menu BOT
            case 'status':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                await zn.sendText(from, `*RAM :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem / 1024 / 1024)} MB\n*CPU :* ${os.cpus()[0].model}`)
            break
            case 'ownerbot':
			case 'owner':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                await zn.sendContact(from, owner)
            break
            case 'runtime': // BY HAFIZH
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                const formater = (seconds) => {
                    const pad = (s) => {
                        return (s < 10 ? '0' : '') + s
                    }
                    const hrs = Math.floor(seconds / (60 * 60))
                    const mins = Math.floor(seconds % (60 * 60) / 60)
                    const secs = Math.floor(seconds % 60)
                    return ' ' + pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
                }
                const uptime = process.uptime()
            await zn.reply(from, `*_${formater(uptime)}_*`, id)
            break
            case 'ping':
            case 'p':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                await zn.sendText(from, `*Bot speed :* ${processTime(t, moment())} secs`)
            break
            // End Of BOT

        }
    } catch (err) {
        console.error(err)
    }
}
