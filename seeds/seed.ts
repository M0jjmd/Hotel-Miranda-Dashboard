import mysql, { ResultSetHeader } from 'mysql2/promise'
import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'
import { RoomInterface } from '../src/interfaces/roomInterface'
import { BookingInterface } from '../src/interfaces/bookingInterface'
import { UserInterface } from '../src/interfaces/userInterface'
import { ContactInterface } from '../src/interfaces/contactInterface'
import connectDB from '../src/config/db'

async function createTables(connection: mysql.Connection) {
    await connection.query(`CREATE DATABASE IF NOT EXISTS dashboardDB`)

    await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            FullName VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL,
            Email VARCHAR(100) NOT NULL UNIQUE,
            Photo VARCHAR(255),
            EntryDate DATETIME NOT NULL,
            PositionDescription VARCHAR(100) NOT NULL,
            Phone VARCHAR(15) NOT NULL,
            State ENUM('active', 'inactive') NOT NULL,
            position VARCHAR(50) NOT NULL
        )
    `)

    await connection.query(`
        CREATE TABLE IF NOT EXISTS rooms (
            id INT AUTO_INCREMENT PRIMARY KEY,
            Photo VARCHAR(255) NOT NULL,
            RoomNumber INT NOT NULL,
            BedType ENUM('Single', 'Double', 'Queen', 'King') NOT NULL,
            Rate INT NOT NULL,
            OfferPrice INT NOT NULL,
            Status ENUM('available', 'booked') NOT NULL
        )
    `)

    await connection.query(`
        CREATE TABLE IF NOT EXISTS facilities (
            id INT AUTO_INCREMENT PRIMARY KEY,
            FacilityName VARCHAR(100) NOT NULL
        )
    `)

    await connection.query(`
        CREATE TABLE IF NOT EXISTS room_facilities (
            room_id INT NOT NULL,
            facility_id INT NOT NULL,
            FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
            FOREIGN KEY (facility_id) REFERENCES facilities(id) ON DELETE CASCADE,
            PRIMARY KEY (room_id, facility_id)
        )
    `)

    await connection.query(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            UserId INT NOT NULL,
            RoomId INT NOT NULL,
            OrderDate DATETIME NOT NULL,
            CheckIn DATETIME NOT NULL,
            CheckOut DATETIME NOT NULL,
            SpecialRequest TEXT,
            RoomType ENUM('Single', 'Double', 'Suite') NOT NULL,
            RoomNumber INT NOT NULL,
            Status ENUM('checked-in', 'checked-out') NOT NULL,
            FOREIGN KEY (UserId) REFERENCES users(id),
            FOREIGN KEY (RoomId) REFERENCES rooms(id)
        )
    `)

    await connection.query(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            date DATETIME NOT NULL,
            userId INT NOT NULL,
            subject VARCHAR(255) NOT NULL,
            comment TEXT NOT NULL,
            archive BOOLEAN NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id)
        )
    `)
}


async function seedDatabase() {
    const connection = await connectDB()

    try {
        console.log('Conectado a MySQL')

        await createTables(connection)

        const insertedUserIds = await seedUsers(connection)
        const insertedRoomIds = await seedRooms(connection)
        await seedBookings(connection, insertedUserIds, insertedRoomIds)
        await seedContacts(connection, insertedUserIds)

        console.log('Datos ficticios añadidos exitosamente')
    } catch (error) {
        console.error('Error al añadir datos', error)
    } finally {
        await connection.end()
    }
}

async function seedUsers(connection: mysql.Connection) {
    const users: UserInterface[] = []
    const saltRounds = 10
    const password = 'miContraseñaSegura'
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    users.push({
        id: 0,
        username: 'johndoe',
        FullName: 'John Doe',
        password: hashedPassword,
        Email: 'johndoe@example.com',
        Photo: faker.image.avatar(),
        EntryDate: new Date(),
        PositionDescription: 'Manager',
        Phone: '1234567890',
        State: 'active',
        position: 'manager',
    })

    const insertedUserIds: number[] = []

    for (let i = 0; i < 10; i++) {
        const hashedUserPassword = await bcrypt.hash(faker.internet.password(), saltRounds)
        const number = faker.phone.number().split(' ')
        console.log(number)
        const newUser: UserInterface = {
            username: faker.internet.userName(),
            FullName: faker.person.fullName(),
            password: hashedUserPassword,
            Email: faker.internet.email(),
            Photo: faker.image.avatar(),
            EntryDate: faker.date.past(),
            PositionDescription: faker.lorem.sentence(),
            Phone: number[0],
            State: faker.helpers.arrayElement(['active', 'inactive']),
            position: faker.helpers.arrayElement(['receptionist', 'manager', 'cleaner']),
        }

        const [result] = await connection.query<ResultSetHeader>(
            'INSERT INTO users (username, FullName, password, Email, Photo, EntryDate, PositionDescription, Phone, State, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                newUser.username,
                newUser.FullName,
                newUser.password,
                newUser.Email,
                newUser.Photo,
                newUser.EntryDate,
                newUser.PositionDescription,
                newUser.Phone,
                newUser.State,
                newUser.position,
            ]
        )

        insertedUserIds.push(result.insertId)
    }

    console.log('IDs de usuarios insertados:', insertedUserIds)
    return insertedUserIds
}

async function seedRooms(connection: mysql.Connection) {
    const facilities = [
        { name: 'WiFi' },
        { name: 'TV' },
        { name: 'Minibar' },
        { name: 'Air Conditioning' },
        { name: 'Safe' },
    ]

    await connection.query('INSERT INTO facilities (FacilityName) VALUES ?', [
        facilities.map(facility => [facility.name])
    ])

    const rooms: RoomInterface[] = []
    for (let i = 0; i < 10; i++) {
        const room = {
            Photo: faker.image.url(),
            RoomNumber: faker.number.int({ min: 100, max: 500 }),
            BedType: faker.helpers.arrayElement(['Single', 'Double', 'Queen', 'King']),
            Rate: faker.number.int({ min: 5000, max: 20000 }),
            OfferPrice: faker.number.int({ min: 0, max: 100 }),
            Status: faker.helpers.arrayElement(['available', 'booked']),
        }
        rooms.push(room)
    }

    const [result] = await connection.query<mysql.ResultSetHeader>(
        'INSERT INTO rooms (Photo, RoomNumber, BedType, Rate, OfferPrice, Status) VALUES ?',
        [rooms.map(room => [room.Photo, room.RoomNumber, room.BedType, room.Rate, room.OfferPrice, room.Status])]
    )

    const firstRoomId = result.insertId

    const roomIds = Array.from({ length: rooms.length }, (_, index) => firstRoomId + index)

    const [facilitiesRows] = await connection.query('SELECT id FROM facilities')
    const facilityIds = facilitiesRows as { id: number }[]

    const roomFacilities: [number, number][] = []
    for (let i = 0; i < rooms.length; i++) {
        const randomFacilities = faker.helpers.arrayElements(facilityIds, 2)
        randomFacilities.forEach(facility => {
            roomFacilities.push([roomIds[i], facility.id])
        })
    }

    await connection.query('INSERT INTO room_facilities (room_id, facility_id) VALUES ?', [roomFacilities])
    return roomIds
}

async function seedBookings(connection: mysql.Connection, userIds: number[], roomIds: number[]) {
    for (let i = 0; i < 10; i++) {
        const booking: BookingInterface = {
            UserId: faker.helpers.arrayElement(userIds),
            RoomId: faker.helpers.arrayElement(roomIds),
            OrderDate: faker.date.past(),
            CheckIn: faker.date.future(),
            CheckOut: faker.date.future(),
            SpecialRequest: faker.lorem.sentence(),
            RoomType: faker.helpers.arrayElement(['Single', 'Double', 'Suite']),
            RoomNumber: faker.number.int({ min: 100, max: 500 }),
            Status: faker.helpers.arrayElement(['checked-in', 'checked-out']),
        }

        await connection.query<ResultSetHeader>(
            'INSERT INTO bookings (UserId, RoomId, OrderDate, CheckIn, CheckOut, SpecialRequest, RoomType, RoomNumber, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [booking.UserId, booking.RoomId, booking.OrderDate, booking.CheckIn, booking.CheckOut, booking.SpecialRequest, booking.RoomType, booking.RoomNumber, booking.Status]
        )
    }
}

async function seedContacts(connection: mysql.Connection, userIds: number[]) {
    for (let i = 0; i < 5; i++) {
        const contact: ContactInterface = {
            date: new Date(),
            userId: faker.helpers.arrayElement(userIds),
            subject: faker.lorem.sentence(),
            comment: faker.lorem.paragraph(),
            archive: faker.datatype.boolean(),
        }

        await connection.query<ResultSetHeader>(
            'INSERT INTO contacts (date, userId, subject, comment, archive) VALUES (?, ?, ?, ?, ?)',
            [contact.date, contact.userId, contact.subject, contact.comment, contact.archive]
        )
    }
}

seedDatabase()