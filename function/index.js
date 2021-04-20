const chalk = require('chalk')
const crypto = require('crypto')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const fs = require('fs-extra')

/**
 * Get text with color.
 * @param {string} text 
 * @param {string} [color] 
 */
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

/**
 * Create serial ID.
 * @param {number} size 
 * @returns {string}
 */
const createSerial = (size) => {
    return crypto.randomBytes(size).toString('hex').slice(0, size)
}

/**
 * URL validator.
 * @param {string} url 
 * @returns {boolean}
 */
const isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi))
}

/**
 * Get time duration.
 * @param {Date} timestamp 
 * @param {Date} now 
 * @returns {number}
 */
const processTime = (timestamp, now) => {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

/**
 * Client options.
 * @param {Function} start 
 * @returns {object}
 */
const options = (start) => {
    const options = {
        sessionId: 'zn',
        headless: true,
        qrTimeout: 0,
        authTimeout: 0,
        restartOnCrash: start,
        cacheEnabled: false,
        useChrome: true,
        killProcessOnBrowserClose: true,
        throwErrorOnTosBlock: false,
        chromiumArgs: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disable-offline-load-stale-cache',
            '--disk-cache-size=0'
        ]
    }
    return options
}

// Anti-spam
const usedCommandRecently = new Set()

/**
 * Check is number filtered.
 * @param {string} from 
 * @returns {boolean}
 */
const isFiltered = (from) => {
    return !!usedCommandRecently.has(from)
}

/**
 * Add filter to number.
 * @param {string} from 
 */
const addFilter = (from) => {
    usedCommandRecently.add(from)
    setTimeout(() => {
        return usedCommandRecently.delete(from)
    }, 10000) // 5 seconds delay.
}

// Auto Update

/**
 * Returns an array of files.
 * @param {*} dirPath 
 * @param {string[]} [arrayOfFiles]
 * @returns {string[]}
 */
 const getAllDirFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath)
    arrayOfFiles = arrayOfFiles || []
    files.forEach((f) => {
        if (fs.statSync(dirPath + '/' + f).isDirectory()) {
            arrayOfFiles = getAllDirFiles(dirPath + '/' + f, arrayOfFiles)
        } else {
            arrayOfFiles.push(f)
        }
    })
    return arrayOfFiles
} 

/**
 * Uncache a changes.
 * @param {*} module 
 */
const uncache = (module = '.') => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}

/**
 * Delete file cache.
 * @param {*} module 
 * @param {*} call 
 */
const nocache = (module, call = () => {}) => {
    console.log(color('[WATCH]', 'orange'), color(`=> '${module}'`, 'yellow'), 'file is now being watched by me!')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        call(module)
    })
}


module.exports = {
    msgFilter: {
        isFiltered,
        addFilter
    },
    color,
    isUrl,
    processTime,
    options,
    createSerial,
    getAllDirFiles,
    uncache,
    nocache
}
