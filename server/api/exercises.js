const express = require('express');
const router = express.Router();

const { getAllExercises,
    getExercisesById,
    createExercises,
    updateExercises, 
    deleteExercises } = require('../db/sqlHelperFunctions/exercises');
const { authRequired } = require('./utils');

//GET - /api/exercises - get all exercises
router.get('/', async (req, res, next) => {
    try {
        const exercises = await getAllExercises();
        res.send(exercises);
    } catch(error) {
        next(error);
    }
});

//GET - /api/exercises/:id - get a single exercise by id
router.get('/:id', async (req, res, next) => {
    try {
        const exercise = await getExercisesById(req.params.id);
        res.send(exercise);
    } catch (error) {
        next(error);
    }
});

//POST - /api/exercises - create a new exercise
router.post('/', authRequired, async (req, res, next) => {
    try {
        const exercise = await createExercises(req.body);
        res.send(exercise);
    } catch (error) {
        next(error);
    }
});

//PUT - /api/exercises/:id - update a single exercise by id
router.put('/:id', authRequired, async (req, res, next) => {
    try {
        const exercise = await updateExercises(req.params.id, req.body);
        res.send(exercise);
    } catch (error) {
        next(error);
    }
});

//DELETE - /api/exercises/:id - delete a single exercise by id
router.delete('/:id', authRequired, async (req, res, next) => {
    try {
        const exercise = await deleteExercises(req.params.id);
        res.send(exercise);
    } catch (error) {
        next(error);
    }
});

module.exports = router;