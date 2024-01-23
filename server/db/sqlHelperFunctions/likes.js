const client = require('../client');
const util = require('util');

//PATCH (?) 
async function addLike(userId, exerciseId) {
    try{
        const { rows: likes } = await client.query(`
        INSERT INTO likes (userId, exerciseId)
        VALUES($1, $2)
        RETURNING *;
        `, [userId, exerciseId]);
        return likes;
    } catch (error) {
        throw new Error('adding like to exercise did not work, try again :(');
    }
}

async function removeLike(userId, exerciseId) {
    try {
        const { rows: likes } = await client.query(`
        DELETE FROM likes WHERE userId=$1 AND exerciseId=$2 RETURNING *
        `, [userId, exerciseId]);
        return likes;
    } catch (error) {
        throw new Error('removing like from exercise did not work, try again :(');
    }
}

async function getLikesByUserId(userId) {
    try {
        const { rows: likes } = await client.query(`
        SELECT * FROM likes WHERE userId=$1  
        `, [userId]);
        return likes;
    } catch (error) {
        throw new Error('fetching all liked exercises did not work, try again :(');
    }
}

module.exports = {
    addLike,
    removeLike,
    getLikesByUserId
}