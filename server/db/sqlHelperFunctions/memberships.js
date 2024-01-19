const client = require('../client');

// GET - /api/memberships - get all memberships
async function getAllMemberships() {
    try {
        const { rows: membership } = await client.query(`
        SELECT * FROM membership;
        `);
        return membership;
    } catch (error) {
        console.error('Error getting membership:', error);
        throw new Error(`Failed to get membership: ${error.message}`);
    }
}

// GET - /api/membership/:id - get a single membership by id
async function getMembershipById(id) {
    try {
        const { rows: [membership] } = await client.query(`
        SELECT * FROM membership
        WHERE id=$1;
        `, [id]);
        return membership;
    } catch (error) {
        throw new Error('GET membership by id did not work, try again :(')
    }
}

module.exports = {
    getAllMemberships,
    getMembershipById
}