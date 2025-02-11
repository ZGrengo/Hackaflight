// Accedemos a las variables del fichero ".env" y las añadimos a la lista de variables de entorno.
import 'dotenv/config';

// Importamos las dependencias.
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
            'DROP TABLE IF EXISTS entryVotes, entryPhotos, entries, users',
        );

        console.log('Creando tablas...');

        // Creamos la tabla de usuarios.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                active BOOLEAN DEFAULT FALSE,
                regCode CHAR(30),
                recoverPassCode CHAR(30),
                role ENUM('admin', 'normal') DEFAULT 'normal',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )	
        `);

        // Creamos la tabla de entradas.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS entries (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                place VARCHAR(30) NOT NULL,
                description TEXT NOT NULL,
                userId INT UNSIGNED NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

        // Creamos la tabla de fotos.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS entryPhotos (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                entryId INT UNSIGNED NOT NULL,
                FOREIGN KEY (entryId) REFERENCES entries(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de votos.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS entryVotes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                value TINYINT UNSIGNED NOT NULL,
                userId INT UNSIGNED NOT NULL,
                entryId INT UNSIGNED NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (entryId) REFERENCES entries(id)
            )
        `);

        console.log('¡Tablas creadas!');

        // Encriptamos la contraseña del administrador.
        const hashedPass = await bcrypt.hash('admin', 10);

        // Insertamos el usuario administrador.
        await pool.query(
            `
                INSERT INTO users (username, email, password, role, active, createdAt)
                VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                'admin',
                'admin@example.com',
                hashedPass,
                'admin',
                true,
                new Date(),
            ],
        );

        console.log('¡Usuario administrador insertado!');

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
