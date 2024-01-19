const express = require('express');
const router = express.Router();


const {
    getAllMemberships,
    getMembershipById
} = require('../db/sqlHelperFunctions/memberships');

//GET - /api/memberships - get all memberships
router.get('/', async (req, res, next) => {
    try {
        const memberships = await getAllMemberships();
        res.send(memberships);
    } catch(error) {
        next(error);
    }
});

//GET - /api/memberships/:id - get membership by id
router.get('/:id', async (req, res, next) => {
    try {
        const membership = await getMembershipById(req.params.id);
        res.send(membership);
    } catch (error) {
        next(error);
    }
});

module.exports = router;