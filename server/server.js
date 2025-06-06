const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const reviewRoutes = require('./routes/reviewsRoutes')
const cookieParser = require('cookie-parser');
const appointmentRoutes =require('./routes/appointmentRoutes')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');


dotenv.config();
connectDB();

const corsOptions = {
    origin:true,
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// domain/api/auth/register or login
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/doctors/:doctorId/reviews', reviewRoutes);

// app.use('/api/reviews' , reviewRoutes);
app.use('/api/appointments', appointmentRoutes);





app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
