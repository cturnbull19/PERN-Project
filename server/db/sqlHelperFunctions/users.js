const client = require('../client')

//POST - /api/users/register - create new user
async function createUser(body) {
    const { first_name, last_name, email, password } = body;
    try {
        const { rows: [users] } = await client.query(`
        INSERT INTO users(first_name, last_name, email, password)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `, [first_name, last_name, email, password]);
        return users;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error(`Failed to create user: ${error.message}`);
    }
}

async function getAllUsers() {
    try {
        const { rows: users } = await client.query(`
        SELECT * FROM users;
        `);
        return users;
    } catch (error) {
        throw new Error('GET request did not work, try again :(')
    }
}

async function getUserByEmail(email) {
    try {
        const { rows: user } = await client.query(`
        SELECT * FROM users
        WHERE users.email = '${email}'
        `);
        return user;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw new Error(`Failed to login user: ${error.message}`);
    }
};

module.exports = { 
    createUser,
    getAllUsers,
    getUserByEmail
}