const express = require('express');
const router = express.Router();

const { getAllExercises,
    getExercisesById,
    createExercises,
    updateExercises, 
    deleteExercises } = require('../db/sqlHelperFunctions/exercises');

//GET - /api/exercises - get all exercises
router.get('/', async (req, res, next) => {
    try {
        const exercises = await getAllExercises();
        res.send(exercises);
    } catch(error) {
        next(error);
    }
});


module.exports = router;