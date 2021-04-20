const { fetchText, fetchJson } = require('../function/fetcher.js')
const config = require('../config.json')

const simsimi = (query) => new Promise((resolve, reject) => {
    console.log(`Get SimSimi text from: ${query}...`)
    fetchJson(`https://videfikri.com/api/simsimi/?teks=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get hilih text.
 * @returns {Object}
 */
const hilihteks = (query) => new Promise((resolve, reject) => {
    console.log(`Getting Hilih teks from: ${query}...`)
    fetchJson(`https://videfikri.com/api/hilih?query=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get hilih text.
 * @returns {Object}
 */
const balikhuruf = (query) => new Promise((resolve, reject) => {
    console.log(`Getting balikhuruf teks from: ${query}...`)
    fetchJson(`https://videfikri.com/api/hurufterbalik/?query=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get hilih text.
 * @returns {Object}
 */
const hitunghuruf = (query) => new Promise((resolve, reject) => {
    console.log(`Getting hitunghuruf teks from: ${query}...`)
    fetchJson(`https://videfikri.com/api/jumlahhuruf/?query=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get tebakgambar quiz.
 * @returns {Object}
 */
const tbkgmbr = () => new Promise((resolve, reject) => {
    console.log('Getting tebakgambar quiz...')
    fetchJson('http://videfikri.com/api/tebakgambar/')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get weekly zodiac fortune.
 * @param {String} zodiac
 * @returns {Object}
 */
const zodiak = (zodiac) => new Promise((resolve, reject) => {
    console.log(`Get weekly zodiac fortune for ${zodiac}...`)
    fetchJson(`https://api.vhtear.com/zodiak?query=${zodiac}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Chat with SimiSimi.
 * @param {String} chat
 * @returns {Object}
 */
const simi2 = (chat) => new Promise((resolve, reject) => {
    console.log('Get response from SimSumi...')
    fetchJson(`https://lolhuman.herokuapp.com/api/simi?apikey=${config.lol}&text=${chat}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
}) 

/**
 * Getting caklontong quiz.
 */
const caklontong = () => new Promise((resolve, reject) => {
    console.log('Getting caklontong quiz...')
    fetchJson(`https://lolhuman.herokuapp.com/api/tebak/caklontong2?apikey=${config.lol}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Getting caklontong quiz.
 */
const family = () => new Promise((resolve, reject) => {
    console.log('Getting caklontong quiz...')
    fetchJson(`https://lolhuman.herokuapp.com/api/tebak/family100?apikey=${config.lol}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get random cita-cita meme.
 * @returns {String}
 */
const cita = () => new Promise((resolve, reject) => {
    console.log('Get random cita-cita...')
    fetchText('https://raw.githubusercontent.com/AlvioAdjiJanuar/citacita/main/citacita.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get fresh videos from TikTok.
 * @returns {String}
 */
const asupan = () => new Promise((resolve, reject) => {
    console.log('Fetching video...')
    fetchText('http://sansekai.my.id/sansekai.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

module.exports = {
    simsimi,
    hilihteks,
    balikhuruf,
    hitunghuruf,
	tbkgmbr,
	zodiak,
	simi2,
	caklontong,
	family,
	cita,
	asupan
}