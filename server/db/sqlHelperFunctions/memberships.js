const client = require('../client');

// GET - /api/memberships - get all memberships
async function getAllMemberships() {
    try {
        const { rows: memberships } = await client.query(`
        SELECT * FROM memberships;
        `);
        return memberships;
    } catch (error) {
        throw new Error('Get request for memberships did not work, try again :(')
    }
}

// GET - /api/memberships/:id - get a single membership by id
async function getMembershipsById(id) {
    try {
        const { rows: [memberships] } = await client.query(`
        SELECT * FROM memberships
        WHERE id = $1;
        `, [id]);
        return memberships;
    } catch (error) {
        throw new Error('GET membership by id did not work, try again :(')
    }
}

module.exports = {
    getAllMemberships,
    getMembershipsById
}