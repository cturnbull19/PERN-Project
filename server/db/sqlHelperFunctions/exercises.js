const client = require('../client');
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

//POST - /api/exercises - create new exercise
async function createExercises(body) {
    const { name, description, imgURL } = body;
    try {
        const { rows: [exercises] } = await client.query(`
        INSERT INTO exercises(name, description, imgURL)
        VALUES($1, $2, $3)
        RETURNING *;
        `, [name, description, imgURL]);
        return exercises;
    } catch (error) {
        throw new Error('POST request did not work, try again :(')
    }
}

//PUT - /api/exercises/:id - update a single exercise by id
async function updateExercises(id, fields = {}) {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index +1}`).join(', ');
    if(setString.length === 0) {
        return;
    }
    try{
        const { rows: [exercises] } = await client.query(`
        UPDATE exercises
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `, Object.values(fields));
        return exercises;
    } catch (error) {
        throw new Error('PUT request did not work, try again :(');
    }
}

// DELETE - /api/exercises/:id - delete a single exercise by id
async function deleteExercises(id) {
    try {
        const { rows: [exercises] } = await client.query(`
        DELETE FROM exercises
        WHERE id=$1
        RETURNING *;
        `, [id]);
        return exercises;
    } catch (error) {
        throw new Error('DELETE request did not work, try again :(')
    }
}

module.exports = {
    getAllExercises,
    getExercisesById,
    createExercises,
    updateExercises, 
    deleteExercises
}