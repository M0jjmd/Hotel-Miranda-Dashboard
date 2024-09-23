import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;

// import express from 'express'
// import cors from 'cors'
// import userRoutes from './src/routes/userRoutes'

// const app = express()

// app.use(cors())

// app.use(express.json())

// app.use(express.urlencoded({ extended: true }))

// app.use('/api/users', userRoutes)

// app.get('/', (req, res) => {
//     res.send('API is running...')
// })

// export default app