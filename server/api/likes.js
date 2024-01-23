const express = require('express');
const router = express.Router();

const { addLike,
    removeLike,
    getLikesByUserId } = require('../db/sqlHelperFunctions/likes');
const { authRequired } = require('./utils');

//POST - /api/likes/:id/add - like an exercise
router.post('/:id/add', async (req, res, next) => {
    try {
        const like = await addLike(req.body.userId, req.params.id);
        res.send(like);
    } catch (error) {
        next(error)
    }
});

//DELETE - /api/likes/:id/delete - remove like from exercise
router.delete('/:id/delete', async (req, res, next) => {
    try {
        const like = await removeLike(req.body.userId, req.params.id);
        res.send(like);
    } catch (error) {
        next(error);
    }
});

//GET - /api/likes/user/:id - list all liked exercises
router.get('/user/:id', async (req, res, next) => {
    try {
        const likes = await getLikesByUserId(req.params.id);
        res.send(likes);
    } catch(error) {
        next(error);
    }
});

module.exports = router;