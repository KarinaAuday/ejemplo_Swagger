// Paso 1: ejecutar este archivo con  node swagger.js
// Genera swagger_output.json y luego inicia el servidor
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API de Alumnos - ORT',
    description: 'Ejemplo didáctico de documentación de APIs REST con Swagger. ' +
                 'CRUD completo de alumnos universitarios con datos en memoria.',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    Alumno: {
      id:       1,
      nombre:   'Ana García',
      legajo:   'ORT001',
      carrera:  'Ingeniería en Sistemas',
      promedio: 8.5,
    },
    AlumnoInput: {
      $nombre:  'Ana García',
      $legajo:  'ORT001',
      $carrera: 'Ingeniería en Sistemas',
      promedio: 8.5,
    },
  },
};

const outputFile      = './swagger_output.json';
const endpointsFiles  = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index');
});
