const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./src/routes/routes');
const cors = require('cors'); 
const db = require('./src/db/index');
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', routes);

// Prueba la conexión a la base de datos
db.connect()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    app.listen(port, () => {
      console.log(`Servidor API en ejecución en el puerto ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });
