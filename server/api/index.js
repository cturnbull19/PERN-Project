const express = requre('express');
const router = express.Router();

//GET /api/health
router.get('/health', (req, res, next) => {
    res.send('OK');
});

//ROUTER: /api/exercises
router.use('/exercises', require('./exercises'));


module.exports = router;