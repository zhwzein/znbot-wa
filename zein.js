/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */

/**
 * This source code below is free, please DO NOT sell this in any form!
 * Source code ini gratis, jadi tolong JANGAN jual dalam bentuk apapun!
 *
 * If you copying one of our source code, please give us CREDITS. Because this is one of our hardwork.
 * Apabila kamu menjiplak salah satu source code ini, tolong berikan kami CREDIT. Karena ini adalah salah satu kerja keras kami.
 *
 * If you want to contributing to this source code, pull requests are always open.
 * Apabila kamu ingin berkontribusi ke source code ini, pull request selalu kami buka.
 *
 * Thanks for the contributions.
 * Terima kasih atas kontribusinya.
 */

/********** MODULES **********/
const { decryptMedia, zn } = require('@open-wa/wa-automate')
const config = require('./config.json')
const fs = require('fs-extra')
const fetch = require('node-fetch')
const emojiUnicode = require('emoji-unicode')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const cron = require('node-cron')
const canvas = require('canvacord')
const ms = require('parse-ms')
const toMs = require('ms')
/********** END OF MODULES **********/


/********** UTILS **********/
const { color, msgFilter, processTime, isUrl} = require('./function')
const { msg } = require('./msg')
const { downloader, stalker, fun } = require('./lib')
const { register, limit, premium, level } = require('./data')
const limitCount = 25
const errorImg = 'https://i.ibb.co/KjSBWx4/Pics-Art-02-07-11-45-03.jpg'
/********** END OF UTILS **********/


/********** MESSAGE HANDLER **********/
// eslint-disable-next-line no-undef
module.exports = handler = async (zn = new zn(), message) => {
    try {
        const { from, id, type, caption, chat, t, sender, isGroupMsg, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { owner, prefix } = config
        const { name, formattedTitle } = chat
        let { pushname, formattedName, verifiedName } = sender
        pushname = pushname || formattedName || verifiedName
        const blockNumber = await zn.getBlockedIds()
        const botNumber = await zn.getHostNumber() + '@c.us'
        const ownerNumber = config.ownerBot
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image') && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const ar = args.map((v) => v.toLowerCase())
        const q = args.join(' ')
        const url = args.length !== 0 ? args[0] : ''
        const now = moment(t * 1000).format('DD/MM/YYYY HH:mm:ss')
        const uaOverride = config.uaOverride
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await zn.getGroupAdmins(groupId) : ''
        /********** END OF MESSAGE HANDLER **********/


        /********** DATABASES **********/
        const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
        const _premium = JSON.parse(fs.readFileSync('./database/bot/premium.json'))
        const _ban = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
        let _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
        const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
        const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
        /********** END OF DATABASES **********/


        /********** VALIDATOR **********/
        const ownerBot = config.owner
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isLevelingOn = isGroupMsg ? _leveling.includes(groupId) : false
        const isCmd = body.startsWith(prefix)
        const isBanned = _ban.includes(sender.id)
        const isBlocked = blockNumber.includes(sender.id)
        const isOwner = sender.id === owner
        const isRegistered = register.checkRegisteredUser(sender.id, _registered)
        const isPremium = premium.checkPremiumUser(sender.id, _premium)
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')
        const isImage = type === 'image'
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        /********** END OF VALIDATOR **********/


        // ROLE (Change to what you want, or add) and you can change the role sort based on XP.
        const levelRole = level.getLevelingLevel(sender.id, _level)
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
        } else if (levelRole <= 100) {
            role = 'Exterminator'
        }

        // Leveling [BETA] by Slavyan
        if (isGroupMsg && isRegistered && !level.isGained(sender.id) && !isBanned && isLevelingOn) {
            try {
                level.addCooldown(sender.id)
                const currentLevel = level.getLevelingLevel(sender.id, _level)
                const amountXp = Math.floor(Math.random() * (15 - 25 + 1) + 15)
                const requiredXp = 5 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100
                level.addLevelingXp(sender.id, amountXp, _level)
                if (requiredXp <= level.getLevelingXp(sender.id, _level)) {
                    level.addLevelingLevel(sender.id, 1, _level)
                    const userLevel = level.getLevelingLevel(sender.id, _level)
                    const fetchXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                    await zn.reply(from, `*LEVEL UP*\n\n# *Name*: ${pushname}\n# *XP*: ${level.getLevelingXp(sender.id, _level)} / ${fetchXp}\n# *Level*: ${currentLevel} -> ${level.getLevelingLevel(sender.id, _level)}\n# *Role*: *${role}*\n\nCongrats!!`, id)
                }
            } catch (err) {
                console.error(err)
            }
        }

        premium.expiredCheck(_premium)
        cron.schedule('0 0 * * *', () => {
            const reset = []
            _limit = reset
            console.log('Resetting user limit...')
            fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
            console.log('Success!')
        }, {
            scheduled: true,
            timezone: 'Asia/Jakarta'
        })

        // Ignore banned and blocked users
        if (isCmd && (isBanned || isBlocked) && !isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && (isBanned || isBlocked) && isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Anti-spam
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Log
        if (isCmd && !isGroupMsg) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
            await zn.sendSeen(from)
        }
        if (isCmd && isGroupMsg) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))
            await zn.sendSeen(from)
        }

        switch (command) {

            case 'menu':
            case 'help':
                const jumlahUser = _registered.length
                const levelMenu = level.getLevelingLevel(sender.id, _level)
                const xpMenu = level.getLevelingXp(sender.id, _level)
                const reqXpMenu = 5 * Math.pow(levelMenu, 2) + 50 * 1 + 100
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                await zn.sendText(from, msg.menu(jumlahUser, levelMenu, xpMenu, role, pushname, reqXpMenu, isPremium ? 'YES' : 'NO'))
            break

            case 'register': //By: Slavyam
                if (isRegistered) return await zn.reply(from, msg.registeredAlready(), id)
                if (!q.includes('|')) return await zn.reply(from, msg.wrongFormatreg(), id)
                const namaUser = q.substring(0, q.indexOf('|') - 1)
                const umurUser = q.substring(q.lastIndexOf('|') + 2)
                const serialUser = register.createSerial(10)
                register.addRegisteredUser(sender.id, namaUser, umurUser, time, serialUser, _registered)
                await zn.reply(from, msg.registered(namaUser, umurUser, sender.id, time, serialUser), id)
                console.log(color('REGISTER'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
            break


            // STICKER MAKER 
            case 'takestick':
            case 'take':
                if (!isPremium) return await zn.reply(from, msg.notPremium(), id)
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                    if (quotedMsg && quotedMsg.type == 'sticker') {
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
            case 'stnc':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (isMedia && isImage || isQuotedImage) {
                    await zn.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await zn.sendImageAsSticker(from, imageBase64, { keepScale: true, author: '', pack: 'zenuwu' })
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                    } else {
                    await zn.reply(from, `Untuk membuat sticker no crop\nsilahkan *upload* atau reply foto dengan caption ${prefix}stnc`, id)
                }
            break

            case 'sticker':
            case 'stiker':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(pushname), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)  
                if (isMedia && isImage || isQuotedImage) {
                    await zn.reply(from, msg.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await zn.sendImageAsSticker(from, imageBase64, { author: '', pack: 'zenuwu' })
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                    } else {
                    await zn.reply(from, `Untuk membuat sticker\nsilahkan *upload* atau reply foto dengan caption ${prefix}sticker`, id)
                }
            break

            case 'stickergif':
            case 'sgif':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (isMedia && type === 'video' || mimetype === 'image/gif') {
                    await zn.reply(from, msg.wait(), id)
                    try {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await zn.sendMp4AsSticker(from, videoBase64, { fps: 10, startTime: `00:00:00.0`, endTime : `00:00:06.0`, loop: 0 }, { author: '', pack: 'zenuwu' })
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
                        await zn.sendMp4AsSticker(from, videoBase64, { fps: 10, startTime: `00:00:00.0`, endTime : `00:00:06.0`, loop: 0 }, { author: '', pack: 'zenuwu' })
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

            //END OF STICKER MAKER


            //DOWNLOADER
            
            //END OF DOWNLOADER

            // STALKER
            case 'igstalk':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!q) return await zn.reply(from, `Format salah!\nuntuk meng-stalk akun Instagram seseorang, gunakan ${prefix}stalkig username\n\nContoh: ${prefix}stalkig videfikri`, id)
                await zn.reply(from, msg.wait(), id)
                stalker.instagram(q)
                .then(async ({result}) => {
                    const { full_name, username, bio, followers, following, post_count, profile_hd, is_verified, is_private, external_url, fbid, show_suggested_profile } = await result
                    await zn.sendFileFromUrl(from, profile_hd, 'ProfileIgStalker.jpg', `➸ *Username*: ${username}\n *Full Name*: ${full_name}\n➸ *Biography*: ${bio}\n➸ *Followers*: ${followers}\n➸ *Following*: ${following}\n➸ *Post*: ${post_count}\n➸ *Is_Verified*: ${is_verified}\n➸ *Is_Private*: ${is_private}\n➸ *External URL*: ${external_url}\n➸ *FB ID*: ${fbid}\n➸ *Show Suggestion*: ${show_suggested_profile}`, id)
                })
            break

            case 'twitprof':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!q) return await zn.reply(from, `Format salah!\nuntuk meng-stalk akun Twitter seseorang\ngunakan ${prefix}twtprof username`, id)
                await zn.reply(from, msg.wait(), id)
                stalker.twitter(q)
                .then(async ({result}) => {
                    const { full_name, username, followers, following, tweets, profile, verified, listed_count, favourites, joined_on, profile_banner } = await result
                    await zn.sendFileFromUrl(from, profile, 'ProfileTwitter.jpg', `➸ *Username*: ${username}\n *Full Name*: ${full_name}\n➸ *Followers*: ${followers}\n➸ *Following*: ${following}\n➸ *Tweet*: ${tweets}\n➸ *Is_Verified*: ${verified}\n➸ *Favourites*: ${favourites}\n➸ *Listed Count*: ${listed_count}\n➸ *Joined On*: ${joined_on}\n➸ *Profile Banner*: ${profile_banner}`, id)
                })
            break

            case 'github':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!q) return await zn.reply(from, `Format salah!\nuntuk meng-stalk akun Github\ngunakan ${prefix}github username`, id)
                await zn.reply(from, msg.wait(), id)
                stalker.github(q)
                .then(async ({result}) => {
                    const { username, id, profile_pic, fullname, company, blog, location, email, hireable, biografi, public_repository, public_gists, followers, following, joined_on, last_updated, profile_url} = await result
                    await zn.sendFileFromUrl(from, profile_pic, 'ProfileGithub.jpg', `➸ *Username*: ${username}\n➸ *Full Name*: ${fullname}\n➸ *ID*: ${id}\n➸ *Company*: ${company}\n➸ *Blog*: ${blog}\n➸ *Location*: ${location}\n➸ *Email*: ${email}\n➸ *Hireable*: ${hireable}\n➸ *Biography*: ${biografi}\n➸ *Public Repository*: ${public_repository}\n➸ *Public Gists*: ${public_gists}\n➸ *Followers*: ${followers}\n➸ *Following*: ${following}\n➸ *Joined On*: ${joined_on}\n➸ *Last Updated*: ${last_updated}\n➸ *Profile URL*: ${profile_url}`, id)
                })
            break

            // END OF STALKER

            // FUN MENU

            case 'simi':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!q) return await zn.reply(from, `Gunakan ${prefix}simi teks`, id)
                fun.simsimi(q)
                .then(async ({result}) => {
                    await zn.reply(from, result.jawaban, id)
                })
            break

            // END OF FUN MENU

            // OTHERS
            case 'emot':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(pushname), id)
                if (!q) return await zn.reply(from, `Format salah!\nuntuk meng-stalk akun Github\ngunakan ${prefix}github username`, id)
                await zn.reply(from, msg.wait(), id)
                const emoji = emojiUnicode(q)
                await zn.sendStickerfromUrl(from, `https://videfikri.com/api/emojitopng/?emojicode=${emoji}`)
            break

            
            // END OF OTHERS
            
            // GROUP MENU

            case 'leveling':
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                if (!isGroupAdmins) return await zn.reply(from, msg.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isLevelingOn) return await zn.reply(from, msg.levelingOnAlready(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await zn.reply(from, msg.levelingOn(), id)
                } else if (ar[0] === 'disable') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await zn.reply(from, msg.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await zn.reply(from, msg.levelingOff(), id)
                } else {
                    await zn.reply(from, msg.wrongFormat(), id)
                }
            break

            //Group Menu End

            // User Menu

            case 'profile': //Cek Player Profile
            case 'me':
                if (!isRegistered) return  zn.reply(from, msg.notRegistered(pushname), id)
				if (!isGroupMsg) return zn.reply(from, msg.groupOnly(), id)
                if (quotedMsg) {
                    const getQuoted = quotedMsgObj.sender.id
                    const profilePic = await zn.getProfilePicFromServer(getQuoted)
                    const username = quotedMsgObj.sender.name
                    const statuses = await zn.getStatus(getQuoted)
                    const benet = _ban.includes(getQuoted) ? 'Yes' : 'No'
                    const adm = groupAdmins.includes(getQuoted) ? 'Yes' : 'No'
                    const premi = premium.checkPremiumUser(getQuoted, _premium) ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(getQuoted, _level)
                    const xpMe = level.getLevelingXp(getQuoted, _level)
                    const req = 5 * Math.pow(levelMe, 2) + 50 * levelMe + 100
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfp = errorImg
                    } else {
                        pfp = profilePic
                    }
                    await zn.sendFileFromUrl(from, pfp, `${username}.jpg`, msg.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                } else {
                    const profilePic = await zn.getProfilePicFromServer(sender.id)
                    const username = pushname
                    const statuses = await zn.getStatus(sender.id)
                    const benet = isBanned ? 'Yes' : 'No'
                    const adm = isGroupAdmins ? 'Yes' : 'No'
                    const premi = isPremium ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(sender.id, _level)
                    const xpMe = level.getLevelingXp(sender.id, _level)
                    const req = 5 * Math.pow(levelMe, 2) + 50 * levelMe + 100
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfps = errorImg
                    } else {
                        pfps = profilePic
                    }
                    await zn.sendFileFromUrl(from, pfps, `${username}.jpg`, msg.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                }
            break
            
            case 'limit': //Cek Player Limit
                if (isPremium || isOwner) return await zn.reply(from, 'Limit left: 999999\n\n*_Limit direset setiap menit_*', id)
                await zn.reply(from, `Limit left: ${limit.getLimit(sender.id, _limit, limitCount)} / 25\n\n*_Limit direset pada pukul 00:00 WIB_*`, id)
            break
            
            case 'level': //Cek Player Level
                if (!isRegistered) return await zn.reply(from, msg.notRegistered(), id)
                if (!isLevelingOn) return await zn.reply(from, `gomenasai onii chan!\nFitur leveling belum diaktifkan! Suruh admin group ini untuk mengaktifkan dengan mengetik *${prefix}leveling enable*`, id)
                if (!isGroupMsg) return await zn.reply(from, msg.groupOnly(), id)
                const userLevel = level.getLevelingLevel(sender.id, _level)
                const userXp = level.getLevelingXp(sender.id, _level)
                const ppLink = await zn.getProfilePicFromServer(sender.id)
                if (ppLink === undefined) {
                    var pepe = errorImg
                } else {
                    pepe = ppLink
                }
                const requiredXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                const rank = new canvas.Rank()
                    .setAvatar(pepe)
                    .setLevel(userLevel)
                    .setLevelColor('#ffa200', '#ffa200')
                    .setRank(Number(level.getUserRank(sender.id, _level)))
                    .setCurrentXP(userXp)
                    .setOverlay('#000000', 100, false)
                    .setRequiredXP(requiredXp)
                    .setProgressBar('#ffa200', 'COLOR')
                    .setBackground('COLOR', '#000000')
                    .setUsername(pushname)
                    .setDiscriminator(sender.id.substring(6, 10))
                rank.build()
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_card.png`)
                        await zn.sendFile(from, `${sender.id}_card.png`, `${sender.id}_card.png`, '', id)
                        fs.unlinkSync(`${sender.id}_card.png`)
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
                        } else if (resp[i].level <= 100) {
                            roles = 'Exterminator'
                        }
                        leaderboard += `${i + 1}. wa.me/${_level[i].id.replace('@c.us', '')}\n\n*Role :* ${roles}\n*Level :* ${_level[i].level}\n*XP :* ${_level[i].xp}\n━━━━━━━━━━━━━━━━━━\n`
                    }
                    await zn.reply(from, leaderboard, id)
                } catch (err) {
                    console.error(err)
                    await zn.reply(from, msg.minimalDb(), id)
                }
            break
            
            // Player Menu End

            // Owner Menu

            case 'premium': // Untuk Menambah Premium User
                if (!isOwner) return await zn.reply(from, `Format salah! ketik ${prefix}belipremium`, id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let prem of mentionedJidList) {
                            if (prem === botNumber) return await zn.reply(from, msg.wrongFormat(), id)
                            premium.addPremiumUser(prem, args[2], _premium)
                            await zn.reply(from, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${prem}\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                        }
                    } else {
                        premium.addPremiumUser(args[1] + '@c.us', args[2], _premium)
                        await zn.reply(from, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${args[1]}@c.us\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
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

        }
    } catch (err) {
        console.error(err)
    }
}
