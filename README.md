# Motor-Biker API (NestJS)

API REST para un sistema de venta de motos, desarrollada con NestJS.
Utiliza PostgreSQL para datos relacionales mediante TypeORM y MongoDB para comentarios y mensajes mediante Mongoose.

Proyecto integrador universitario.

## Requisitos

- Node.js v18 o superior
- PostgreSQL
- MongoDB

---

## Configuración

## 1.Instalar dependencias

npm install

## 2.Variables de entorno
Crear un archivo .env en la raíz del proyecto:

PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=motor_biker

MongoDB
MONGO_URI=mongodb://localhost:27017/motor_biker

JWT
JWT_SECRET=supersecret
JWT_EXPIRES_IN=1d

## 3. Ejecutar la aplicación

### Desarrollo
npm run start:dev

### Produccion
npm run build
npm run start:prod

## Autenticacion y seguridad 

Mediante JWT y RolesGuard

## 4. Endpoints

Auth

Users

Categorías (estilo de moto: deportiva, scooter, naked, touring, cross...)

Marcas

Motos

Tipo-motor (tipo de motor: 2 tiempos, 4 tiempos, eléctrico, híbrido...)

Estado-moto (nueva, usada, seminueva, reservada, vendida...)

Ventas

Reservas

Comentarios (reseñas ligadas a una moto)

Mensajes
