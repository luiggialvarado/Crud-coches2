# Crud-coches2

Aplicación de gestión de coches y marcas: un backend en Spring Boot con MySQL y una web sencilla en HTML, CSS y JavaScript que se comunica con él. Proyecto de clase del curso de Desarrollo Web Full Stack.

## Qué tecnologías usa
- Java 21 y Spring Boot 4.1.1 (Spring Web, Spring Data JPA)
- MySQL
- HTML, CSS y JavaScript con `fetch`

## Qué puedes hacer en la app
Desde la web (`crud-coches/index.html`) puedes, con los coches:
- Ver todos o buscar uno por su id
- Añadir, modificar y borrar

Cada coche tiene modelo, año, precio y una marca. Una marca puede tener muchos coches (relación uno a muchos). Las marcas no se gestionan desde la web, se crean con la API.

## API
| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/coches` | Lista todos los coches |
| GET | `/coches/{id}` | Devuelve un coche |
| POST | `/coches` | Crea un coche |
| PUT | `/coches/{id}` | Modifica un coche |
| DELETE | `/coches/{id}` | Borra un coche |

`/marcas` tiene las mismas cinco operaciones.

## Cómo arrancarlo
1. Necesitas Java 21 y MySQL en marcha.
2. Crea la base de datos vacía: `CREATE DATABASE concesionario;` (las tablas las crea Spring solas al arrancar).
3. La contraseña de MySQL no está en el código. Se lee de la variable de entorno `DB_PASSWORD`. En la terminal:
   ```
   cd concesionario
   export DB_PASSWORD="tu_contraseña"
   ./mvnw spring-boot:run
   ```
   Usa el usuario `root` de MySQL.
4. Con el backend arrancado en `http://localhost:8080`, abre `crud-coches/index.html` en el navegador.
5. Para añadir un coche con marca, primero crea la marca. Por ejemplo, con `POST /marcas` y el cuerpo `{"nombre": "Seat"}`.

## Estructura
- `concesionario/`: backend (entidades `Coche` y `Marca`, repositorios, controladores y `CocheService`)
- `crud-coches/`: frontend (`index.html`, `style.css`, `script.js`)
