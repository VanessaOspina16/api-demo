# API REST con Node.js y Express

## IF2003 - Programación Web | Clase 12

API REST para gestionar el inventario de una tienda de tecnología, construida con Node.js y Express.

---

## Integrantes

| Vanessa Ospina | 
| Salomé Caicedo


---

## Tecnologías utilizadas

- Node.js v20+
- Express
- Nodemon

---

## Endpoints disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/productos | Obtener todos los productos |
| GET | /api/productos/:id | Obtener producto por ID |
| POST | /api/productos | Crear nuevo producto |
| PUT | /api/productos/:id | Actualizar producto |
| DELETE | /api/productos/:id | Eliminar producto |

---

## Cómo correr el proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/VanessaOspina16/api-demo.git
cd api-demo
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor
```bash
npm run dev
```

### 4. Abrir en el navegador
```
http://localhost:3000
```