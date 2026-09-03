# Ejemplo Swagger — API de Alumnos ORT

Ejemplo didáctico de una API REST documentada con **Swagger / OpenAPI**.  
Basado en la presentación *Documentación de APIs* de la cátedra.

## Stack

- **Node.js** + **Express** — servidor HTTP
- **swagger-autogen** — genera `swagger_output.json` a partir de las annotations en el código
- **swagger-ui-express** — sirve la interfaz web interactiva en `/api-docs`

## Instalación y uso

```bash
# 1. Instalar dependencias
npm install

# 2. Generar la documentación y arrancar el servidor
node swagger.js

# O bien, si swagger_output.json ya existe:
npm start
```

Luego abrir en el navegador:  
- **API:** `http://localhost:3000/alumnos`  
- **Documentación interactiva:** `http://localhost:3000/api-docs`

## Endpoints

| Método   | Ruta             | Descripción                    |
|----------|------------------|--------------------------------|
| GET      | `/alumnos`       | Listar todos los alumnos       |
| GET      | `/alumnos/:id`   | Obtener un alumno por ID       |
| POST     | `/alumnos`       | Crear un nuevo alumno          |
| PUT      | `/alumnos/:id`   | Actualizar datos de un alumno  |
| DELETE   | `/alumnos/:id`   | Eliminar un alumno             |

## Ejemplo de body para POST / PUT

```json
{
  "nombre":  "Carlos Ruiz",
  "legajo":  "ORT004",
  "carrera": "Ingeniería en Sistemas",
  "promedio": 7.8
}
```

## Archivos clave

| Archivo              | Rol                                                         |
|----------------------|-------------------------------------------------------------|
| `swagger.js`         | Configuración de swagger-autogen (ejecutar para regenerar)  |
| `swagger_output.json`| Especificación OpenAPI generada automáticamente             |
| `index.js`           | Servidor + endpoints con annotations `#swagger.*`           |

## Conceptos que ilustra

1. **¿Por qué documentar?** — la interfaz `/api-docs` es la respuesta visual
2. **Annotations** — los comentarios `#swagger.tags`, `#swagger.summary`, etc. en `index.js`
3. **Generación automática** — `node swagger.js` sincroniza código y documentación
4. **Sandbox interactivo** — el botón *Try it out* en Swagger UI permite probar los endpoints sin Postman
