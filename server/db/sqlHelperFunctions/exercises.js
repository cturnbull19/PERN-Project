const client = require('./client');
const util = require('util');

// GET - /api/exercises - get all exercises
async function getAllExercises() {
    try {
        const { rows: exercises } = await client.query(`
        SELECT * FROM exercises;
        `);
        return exercises;
    } catch (error) {
        throw new Error('GET request did not work, try again :(')
    }
}

// GET - /api/exercises/:id - get a single exercises by id
async function getExercisesById(id) {
    try {
        const { rows: [exercises] } = await client.query(`
        SELECT * FROM exercises
        WHERE id = $1;
        `, [id]);
        return exercises;
    } catch (error) {
        throw new Error('GET by id request did not work, try again :(')
    }
}

module.exports = {
    getAllExercises,
    getExercisesById
}