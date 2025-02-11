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

        console.log("Borrando tablas...");

        // Borramos las tablas.
        await pool.query(
            "DROP TABLE IF EXISTS users, booking, flies, airports, itinerary "
        );

        console.log("Creando tablas...");

        // Creamos la tabla de usuarios.
        await pool.query(`
         CREATE TABLE IF NOT EXISTS users (
                userId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) UNIQUE NOT NULL,
                firstname VARCHAR (50) NOT NULL,
                lastname VARCHAR (100) NOT NULL ,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                birthdate DATE,
                avatar VARCHAR(100),
                role ENUM('admin', 'normal') DEFAULT 'normal',
                payMethod ENUM('Visa ','Paypal', 'wallet') DEFAULT 'Visa',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )	
        `);

        // Creamos la tabla de registros.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS booking (
                bookingId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                flyId INT UNSIGNED NOT NULL,
                reserveDate DATETIME,
                title VARCHAR(50) NOT NULL,
                origin INT UNSIGNED NOT NULL,
                destiny INT UNSIGNED NOT NULL,
                scales INT UNSIGNED NOT NULL,
                place VARCHAR(30) NOT NULL,
                description TEXT NOT NULL,
                luggage TINYINT(30) NOT NULL,
                class ENUM('FirstClass','EconomyClass', 'SecondClass') DEFAULT 'SecondClass',
                extras TINYINT(1) NOT NULL DEFAULT 0,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (bookingId) REFERENCES users(userId),
                FOREIGN KEY (userId) REFERENCES users(userId)
            )
        `);

        // Tabla de aeropuertos.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS airports (
                airportId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(70) NOT NULL,                
                city VARCHAR(70) NOT NULL,
                country VARCHAR(70) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (flyId) REFERENCES id(id)
            )
        `);

        // Creamos la tabla de vuelos.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS flies (
                flyId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                codeFly INT UNSIGNED NOT NULL,
                airline INT UNSIGNED NOT NULL,
                origin INT UNSIGNED NOT NULL,
                destiny INT UNSIGNED NOT NULL,
                scales INT UNSIGNED NOT NULL,
                arrivals DATETIME NOT NULL,
                departures DATETIME NOT NULL,
                price SMALLINT NOT NULL, 
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (codeFly) REFERENCES users(userId),
				FOREIGN KEY (origin) REFERENCES airports(airportId),
                FOREIGN KEY (destiny) REFERENCES airports(airportId),
                FOREIGN KEY (scales) REFERENCES airports(airportId)
                
            )
        `);

        // Tabla de itinerario.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS itinerary (
                itineraryId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
                flyId INT UNSIGNED NOT NULL,
                origin INT UNSIGNED NOT NULL,
                destiny INT UNSIGNED NOT NULL,
                scales INT UNSIGNED NOT NULL,
                duration VARCHAR(100) NOT NULL, 
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (itineraryId) REFERENCES users(userId),
                FOREIGN KEY (flyId) REFERENCES flies(flyId)
            )
        `);

        

        // Tabla de valoraciones.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS valorations (
                valorationId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,          
                valoration TINYINT(10) NOT NULL,
                comment VARCHAR(600) ,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (valorationId) REFERENCES users(userId)
            )
        `);

        console.log("¡Tablas creadas!");
        const hashedPass = await bcrypt.hash("admin", 10);

        // Insertamos el usuario administrador.
        await pool.query(
            `
                INSERT INTO users (username, firstname, lastname, email, password, birthdate, avatar, role, payMetod, createdAt,  modifiedAt)
                VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?)
            `,
            [
                "admin",
                "admin",
                "admin",
                "admin@example.com",
                hashedPass,
                new Date(),
                "admin",
                ,
                true,
            ]
        );

        console.log("¡Usuario administrador insertado!");

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
