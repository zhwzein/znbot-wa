const { fetchJson } = require('../function/fetcher.js')
const config = require('../config.json')

const ytPlay = (query) => new Promise((resolve, reject) => {
    console.log(`Searching for song in YouTube...`)
    fetchJson(`https://videfikri.com/api/ytplay?query=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const igtv = (url) => new Promise((resolve, reject) => {
    console.log(`Searching Instagram TV for: ${url}...`)
    fetchJson(`https://videfikri.com/api/igtv/?url=${url}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const ytmp3 = (query) => new Promise((resolve, reject) => {
    console.log(`Converting YT to MP3 from ${query}...`)
    fetchJson(`https://videfikri.com/api/ytmp3/?url=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const ytmp4 = (query) => new Promise((resolve, reject) => {
    console.log(`Converting YT to MP4 from ${query}...`)
    fetchJson(`https://videfikri.com/api/ytmp4/?url=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Joox music metadata from title.
 * @param {String} title
 * @returns {Object}
 */
const joox = (query) => new Promise((resolve, reject) => {
    console.log(`Get Joox music from ${query}...`)
    fetchJson(`https://mnazria.herokuapp.com/api/jooxnich?search=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get TikTok video with no WM.
 * @param {String} url 
 * @returns {Object}
 */
const nowm = (url) => new Promise((resolve, reject) => {
    console.log(`Get TikTok with no WM from ${url}`)
    fetchJson(`https://lolhuman.herokuapp.com/api/tiktok?apikey=${config.lol}&url=${url}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Instagram media from URL.
 * @param {String} url
 * @returns {Object}
 */
const insta = (url) => new Promise((resolve, reject) => {
    console.log(`Get Instagram media from ${url}`)
    fetchJson(`https://lolhuman.herokuapp.com/api/twitter?apikey=${config.lol}&url=${url}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Tweet video with no WM.
 * @param {String} url 
 * @returns {Object}
 */
const tweet = (url) => new Promise((resolve, reject) => {
    console.log(`Get TikTok with no WM from ${url}`)
    fetchJson(`https://videfikri.com/api/tiktok/?url=${url}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get media from Facebook.
 * @param {String} url
 * @returns {Object}
 */
const fb = (url) => new Promise((resolve, reject) => { 
    console.log(`Downloading FB Video from ${url}`)
    fetchJson(`https://lolhuman.herokuapp.com/api/facebook?apikey=${config.lol}&url${url}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

module.exports = {
    ytPlay,
    igtv,
    ytmp3,
    ytmp4,
	joox,
	nowm,
    insta,
    tweet,
    fb
	
}