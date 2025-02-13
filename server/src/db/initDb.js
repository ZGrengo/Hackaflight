// Accedemos a las variables del fichero ".env" y las añadimos a la lista de variables de entorno.
import 'dotenv/config';

// Importamos dependencias.
import bcrypt from 'bcrypt';

// Importamos la función que nos permite conectarnos a la base de datos.
import getPool from './getPool.js';

// Función principal encargada de crear las tablas.
const main = async () => {
    try {
        // Obtenemos el pool.
        const pool = await getPool();

        console.log('Borrando tablas...');

        // Borramos las tablas.
        await pool.query(
            'DROP TABLE IF EXISTS valorations, itinerary, booking, flies, airports, users',
        );

        console.log('Creando tablas...');

        // Creamos la tabla de usuarios.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                userId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) UNIQUE NOT NULL,
                firstname VARCHAR(50) NOT NULL,
                lastname VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                birthdate DATE,
                avatar VARCHAR(100),
                role ENUM('admin', 'normal') DEFAULT 'normal',
                recPassword
                recCode 
                online ENUM('online','offline') DEFAULT 'offline'.
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
                
               

            )
        `);

             
        // Creamos la tabla de criterios de busqueda favoritos de los Usuarios. (En esta tabla pondremos los criterios de busqueda en columnas)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS favorites (
                favoriteId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                title VARCHAR(100),
                origin VARCHAR(3) NOT NULL,
                destination VARCHAR(3) NOT NULL,
                departureDate DATE ,
                returnDate DATE,
                adults TINYINT(5),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
            )
        `);

        // Tabla de valoraciones.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS valorations (
                valorationId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                rate Enum('1', '2', '3', '4', '5') DEFAULT '5',
                comment VARCHAR(600),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(userId)
            )
        `);

        console.log('¡Tablas creadas!');
          const hashedPassAdmin = await bcrypt.hash('admin', 10);
        /* const hashedPassUser = await bcrypt.hash('user', 10); */
       
        // Insertamos el usuario administrador.
        await pool.query(
            `
                INSERT INTO users (username, firstname, lastname, email, password, birthdate, avatar, role, payMethod, createdAt, modifiedAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                'admin',
                'admin',
                'admin',
                'admin@example.com',
                hashedPassAdmin,
                new Date(),
                'admin',
                'admin',
                'Visa',
                new Date(),
                new Date(),
            ],
        );
*/
        
        // Insertamos un usuario normal.
        await pool.query(
            `
                INSERT INTO users (username, firstname, lastname, email, password, birthdate, avatar, role, payMethod, createdAt, modifiedAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                'user',
                'John',
                'Doe',
                'user@example.com',
                hashedPassUser,
                new Date('1990-01-01'),
                'user_avatar.png',
                'normal',
                'Paypal',
                new Date(),
                new Date(),
            ],
        );

        console.log('¡Usuarios insertados!');

        // Insertamos datos de ejemplo en la tabla de aeropuertos.
        await pool.query(
            `
                INSERT INTO airports (name, city, country, createdAt)
                VALUES (?, ?, ?, ?), (?, ?, ?, ?)
            `,
            [
                'JFK International Airport',
                'New York',
                'USA',
                new Date(),
                'Heathrow Airport',
                'London',
                'UK',
                new Date(),
            ],
        );

        // Insertamos datos de ejemplo en la tabla de vuelos.
        await pool.query(
            `
                INSERT INTO flies (codeFly, airline, origin, destiny, scales, arrivals, departures, price, createdAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                12345,
                1,
                1,
                2,
                0,
                new Date('2023-12-01 10:00:00'),
                new Date('2023-12-01 14:00:00'),
                500,
                new Date(),
            ],
        );

        // Insertamos datos de ejemplo en la tabla de reservas.
        await pool.query(
            `
                INSERT INTO booking (userId, flyId, reserveDate, title, origin, destiny, scales, place, description, luggage, class, extras, createdAt, modifiedAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                2,
                1,
                new Date(),
                'Vacation',
                1,
                2,
                0,
                '12A',
                'Vacation trip',
                1,
                'EconomyClass',
                0,
                new Date(),
                new Date(),
            ],
        );

        // Insertamos datos de ejemplo en la tabla de itinerario.
        await pool.query(
            `
                INSERT INTO itinerary (bookingId, flyId, origin, destiny, scales, duration, createdAt)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [1, 1, 1, 2, null, '4 hours', new Date()],
        );

        // Insertamos datos de ejemplo en la tabla de valoraciones.
        await pool.query(
            `
                INSERT INTO valorations (userId,rate, comment, createdAt)
                VALUES (?, ?, ?, ?, ?, ?)
            `,
            [  , 5, 'Great experience!', new Date()],
        );

        console.log('¡Datos de ejemplo insertados!');
    */
        // Cerramos el proceso con código 0.
        process.exit(0);
    } catch (err) {
        console.error(err);

        // Cerramos el proceso con código 1.
        process.exit(1);
    }
};

// Llamamos a la función principal.
main();
