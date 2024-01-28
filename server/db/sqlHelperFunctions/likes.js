const client = require('../client');
const util = require('util');

async function addLike(userId, exerciseId) {
    try{
        const { rows: likes } = await client.query(`
        INSERT INTO likes (userId, exerciseId)
        VALUES($1, $2)
        RETURNING *;
        `, [userId, exerciseId]);
        return likes;
    } catch (error) {
        throw new Error(`adding like to exercise did not work because: ${error.message}`);
    }
}

async function removeLike(userId, exerciseId) {
    try {
        console.log(userId, exerciseId)
        const { rows: likes } = await client.query(`
        DELETE FROM likes 
        WHERE userId=$1 AND exerciseId=$2 
        RETURNING *
        `, [userId, exerciseId]);
        return likes;
    } catch (error) {
        throw new Error('removing like from exercise did not work, try again :(');
    }
}

async function getLikesByUserId(userId) {
    try {
        const returnList = [] 
        const { rows: likes } = await client.query(`
        SELECT * FROM likes WHERE userId=$1
        `, [userId]);
        const { rows: exercises } = await client.query(`
        SELECT * FROM exercises
        `, []);
        for(const like of likes ) { 
            const exercise = exercises.find(it => it.id === like.exerciseid)           
            returnList.push({likeId: like.id, ...exercise})
        }
        return returnList;
    } catch (error) {
        console.log(error)
        throw new Error('fetching all liked exercises did not work, try again :(');
    }
}

module.exports = {
    addLike,
    removeLike,
    getLikesByUserId
}