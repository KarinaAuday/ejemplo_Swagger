const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const app = express();
app.use(express.json());

// Datos en memoria (sin base de datos, para simplicidad didáctica)
let alumnos = [
  { id: 1, nombre: 'Ana García',    legajo: 'ORT001', carrera: 'Ingeniería en Sistemas', promedio: 8.5 },
  { id: 2, nombre: 'Juan Pérez',    legajo: 'ORT002', carrera: 'Diseño Gráfico',         promedio: 7.2 },
  { id: 3, nombre: 'María López',   legajo: 'ORT003', carrera: 'Ingeniería en Sistemas', promedio: 9.1 },
];
let nextId = 4;

// ─── Swagger UI ────────────────────────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// ─── Endpoints ─────────────────────────────────────────────────────────────────

// GET /alumnos — listar todos
app.get('/alumnos', (req, res) => {
  /*  #swagger.tags   = ['Alumnos']
      #swagger.summary = 'Obtiene la lista completa de alumnos'
      #swagger.responses[200] = {
        description: 'Lista de alumnos',
        schema: { $ref: '#/definitions/Alumno' }
      }
  */
  res.json(alumnos);
});

// GET /alumnos/:id — obtener uno por id
app.get('/alumnos/:id', (req, res) => {
  /*  #swagger.tags   = ['Alumnos']
      #swagger.summary = 'Obtiene un alumno por su ID'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico del alumno',
        required: true,
        type: 'integer'
      }
      #swagger.responses[200] = { description: 'Alumno encontrado' }
      #swagger.responses[404] = { description: 'Alumno no encontrado' }
  */
  const alumno = alumnos.find(a => a.id === parseInt(req.params.id));
  if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });
  res.json(alumno);
});

// POST /alumnos — crear nuevo
app.post('/alumnos', (req, res) => {
  /*  #swagger.tags   = ['Alumnos']
      #swagger.summary = 'Crea un nuevo alumno'
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos del alumno a crear',
        required: true,
        schema: { $ref: '#/definitions/AlumnoInput' }
      }
      #swagger.responses[201] = { description: 'Alumno creado exitosamente' }
      #swagger.responses[400] = { description: 'Datos inválidos' }
  */
  const { nombre, legajo, carrera, promedio } = req.body;
  if (!nombre || !legajo || !carrera) {
    return res.status(400).json({ error: 'nombre, legajo y carrera son obligatorios' });
  }
  const nuevo = { id: nextId++, nombre, legajo, carrera, promedio: promedio ?? null };
  alumnos.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT /alumnos/:id — actualizar completo
app.put('/alumnos/:id', (req, res) => {
  /*  #swagger.tags   = ['Alumnos']
      #swagger.summary = 'Actualiza todos los datos de un alumno'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico del alumno',
        required: true,
        type: 'integer'
      }
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Nuevos datos del alumno',
        required: true,
        schema: { $ref: '#/definitions/AlumnoInput' }
      }
      #swagger.responses[200] = { description: 'Alumno actualizado' }
      #swagger.responses[404] = { description: 'Alumno no encontrado' }
  */
  const idx = alumnos.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Alumno no encontrado' });

  const { nombre, legajo, carrera, promedio } = req.body;
  alumnos[idx] = { id: alumnos[idx].id, nombre, legajo, carrera, promedio: promedio ?? null };
  res.json(alumnos[idx]);
});

// DELETE /alumnos/:id — eliminar
app.delete('/alumnos/:id', (req, res) => {
  /*  #swagger.tags   = ['Alumnos']
      #swagger.summary = 'Elimina un alumno por su ID'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico del alumno',
        required: true,
        type: 'integer'
      }
      #swagger.responses[200] = { description: 'Alumno eliminado' }
      #swagger.responses[404] = { description: 'Alumno no encontrado' }
  */
  const idx = alumnos.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Alumno no encontrado' });

  const eliminado = alumnos.splice(idx, 1)[0];
  res.json({ mensaje: 'Alumno eliminado', alumno: eliminado });
});

// ─── Inicio del servidor ───────────────────────────────────────────────────────
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
  console.log('Documentación Swagger en http://localhost:3000/api-docs');
});
