const client = require('./client');

// drop tables for clients, membership, exercises
async function dropTables() {
    try {
        console.log('Dropping All Tables...');
        await client.query(`
      DROP TABLE IF EXISTS membership CASCADE;
      DROP TABLE IF EXISTS likes CASCADE;
      DROP TABLE IF EXISTS exercises CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);
    } catch (error) {
        throw error;
    }
}

// build tables for clients, membership, exercises
async function createTables() {
    try {
        console.log('Building All Tables...');
        await client.query(`
        CREATE TABLE membership (
            id SERIAL PRIMARY KEY,
            type VARCHAR(50) NOT NULL,
            expiration DATE,
            price INTEGER NOT NULL
        );
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(300) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            "membershipId" INTEGER REFERENCES membership(id)
        );
        CREATE TABLE exercises (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT NOT NULL,
            "imgURL" VARCHAR(255)
        );
        CREATE TABLE likes (
            id SERIAL PRIMARY KEY,
            exerciseId INTEGER REFERENCES exercises(id),
            userId INTEGER REFERENCES users(id)
        )
    `);
    } catch (error) {
        console.log('error creating tables')
        throw error;
    }
}

// create initial data for clients, exercises, and membership
async function createInitialData() {
    try {
        console.log('Creating Initial Data...');
        await client.query(`
        INSERT INTO membership (type, expiration, price)
        VALUES
            ('ultimate', '2025-01-01', 250),
            ('student', '2024-06-01', 100),
            ('student', '2024-06-01', 100),
            ('ultimate', '2025-01-01', 250),
            ('teacher', '2025-01-01', 0)`
        );

        await client.query(`
        INSERT INTO users (first_name, last_name, email, password)
        VALUES
        ('Caroline', 'Turnbull', 'carolinel@email.com', 'apple'),
        ('Annie', 'Turnbull', 'annie@email.com', 'cheese'),
        ('Elizabeth', 'Tunbull', 'elizabeth@email.com', 'banana'),
        ('Doug', 'Turnbull', 'doug@email.com', 'chocolate'),
        ('MJ', 'Turnbull', 'mj@email.com', 'cherry')`
        );

        await client.query(`
        INSERT INTO exercises (name, description, "imgURL")
        VALUES
            ('squat', 'feet hip distance apart, engage your core, lower down as if sitting in an invisible chair, stop when knees are at about 90 degrees, straighten legs to stand back up.', 'squat.png'),
            ('plank', 'Lying on the ground with the elbows in line with the shoulder and the feet shoulder width apart, Push your body up bearing the weight on the forearms and feet, Keeping your body straight', 'plank.jpeg')`
        );
    } catch (error) {
        console.log('error creating initial data')
        throw error;
    }
}

// build all tables and create initial data
async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialData();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    rebuildDB
};