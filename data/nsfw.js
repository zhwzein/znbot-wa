const fs = require('fs-extra')
const toMs = require('ms')

/**
 * Add premium user.
 * @param {string} userId 
 * @param {string} expired 
 * @param {object} _dir 
*/

const addNsfwUser = (groupId, _dir) => {
    const obj = { id: userId, expired: Date.now() + toMs(expired) }
    _dir.push(obj)
    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_dir))
}


/**
 * Get premium user index position.
 * @param {string} userId 
 * @param {object} _dir 
 * @returns {Number}
 */
const getNsfwPosition = (groupId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === groupId) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}


module.exports = {
    addNsfwUser,
    getNsfwPosition
}