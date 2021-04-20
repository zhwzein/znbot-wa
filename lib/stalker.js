const { fetchJson } = require('../function/fetcher.js')
const config = require('../config.json')

const instagram = (username) => new Promise((resolve, reject) => {
    console.log(`Searching for Instagram username: ${username}...`)
    fetchJson(`https://videfikri.com/api/igstalk/?username=${username}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const twitter = (username) => new Promise((resolve, reject) => {
    console.log(`Searching for Twitter username: ${username}...`)
    fetchJson(`https://videfikri.com/api/stalktwit/?username=${username}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const github = (username) => new Promise((resolve, reject) => {
    console.log(`Searching for Github username: ${username}...`)
    fetchJson(`https://videfikri.com/api/github/?username=${username}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const namaml = (server) => new Promise((resolve, reject) => {
    console.log(`Searching for ML username: ${server}...`)
    fetchJson(`https://lolhuman.herokuapp.com/api/mobilelegend/${server}/${server}?apikey=${config.lol}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

module.exports = {
    instagram,
    twitter,
    github,
    namaml
}