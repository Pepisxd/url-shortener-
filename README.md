# URL Shortener Project Documentation

## **Descripción**
Este proyecto es una API de acortador de URLs desarrollado con **Node.js**, **Express**, y **MongoDB**. Permite a los usuarios acortar URLs largas en identificadores únicos y administrar estos identificadores para redirecciones, actualizaciones y eliminaciones.

---

## **Características**

- Crear una URL corta a partir de una URL larga.
- Generar automáticamente identificadores únicos para URLs cortas.
- Permitir identificadores personalizados.
- Redirigir a la URL original usando la URL corta.
- Obtener todas las URLs almacenadas en la base de datos.
- Actualizar tanto la URL original como la URL corta.
- Eliminar una URL almacenada.

---

## **Estructura del Proyecto**

```plaintext
project-root/
├── controllers/
│   ├── linkController.js
├── models/
│   ├── Link.js
├── routes/
│   ├── linkRoutes.js
├── config/
│   ├── db.js
├── src/
│   ├── server.js
├── package.json
```

---

## **Instalación**

1. Clona el repositorio:
   ```bash
   git clone <repository-url>
   ```

2. Ve al directorio del proyecto:
   ```bash
   cd project-root
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Asegúrate de que MongoDB esté corriendo localmente o configura una URI remota en `config/db.js`.

5. Inicia el servidor:
   ```bash
   npm start
   ```

---

## **Rutas de la API**

### **1. Crear una URL corta**
- **Endpoint:** `POST /api/shorten`
- **Descripción:** Crea una URL corta a partir de una URL larga.
- **Body (JSON):**
  ```json
  {
    "url": "https://ejemplo.com",
    "customShortUrl": "miurlpersonalizada" // Opcional
  }
  ```
- **Respuesta:**
  ```json
  {
    "message": "Short URL created successfully",
    "data": {
      "id": 1,
      "url": "https://ejemplo.com",
      "shortUrl": "miurlpersonalizada"
    }
  }
  ```

### **2. Redirigir usando una URL corta**
- **Endpoint:** `GET /api/:shortUrl`
- **Descripción:** Redirige a la URL original usando una URL corta.
- **Respuesta:** Redirección 301/302 a la URL original.

### **3. Obtener todas las URLs**
- **Endpoint:** `GET /api/all`
- **Descripción:** Devuelve todas las URLs almacenadas en la base de datos.
- **Respuesta:**
  ```json
  {
    "message": "URLs fetched successfully",
    "data": [
      {
        "id": 1,
        "url": "https://ejemplo.com",
        "shortUrl": "miurlpersonalizada",
        "clicks": 5
      }
    ]
  }
  ```

### **4. Actualizar la URL original usando el shortUrl**
- **Endpoint:** `PUT /api/:shortUrl`
- **Descripción:** Actualiza la URL original asociada a un shortUrl.
- **Body (JSON):**
  ```json
  {
    "newUrl": "https://nueva-url.com"
  }
  ```
- **Respuesta:**
  ```json
  {
    "message": "URL updated successfully",
    "data": {
      "id": 1,
      "url": "https://nueva-url.com",
      "shortUrl": "miurlpersonalizada"
    }
  }
  ```

### **5. Actualizar el shortUrl usando la URL original**
- **Endpoint:** `PUT /api/shorturl`
- **Descripción:** Actualiza el identificador corto asociado a una URL original.
- **Body (JSON):**
  ```json
  {
    "url": "https://ejemplo.com",
    "newShortUrl": "nuevoid"
  }
  ```
- **Respuesta:**
  ```json
  {
    "message": "Short URL updated successfully",
    "data": {
      "id": 1,
      "url": "https://ejemplo.com",
      "shortUrl": "nuevoid"
    }
  }
  ```

### **6. Eliminar una URL**
- **Endpoint:** `DELETE /api/:shortUrl`
- **Descripción:** Elimina una URL almacenada usando el shortUrl.
- **Respuesta:**
  ```json
  {
    "message": "Short URL deleted successfully",
    "data": {
      "id": 1,
      "url": "https://ejemplo.com",
      "shortUrl": "miurlpersonalizada"
    }
  }
  ```

---

## **Modelo de Datos**

El modelo **Link** se define de la siguiente manera:

```javascript
const linkSchema = new mongoose.Schema({
  id: { type: Number },
  url: { type: String, required: true, unique: true },
  shortUrl: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
```

---

## **Requisitos Previos**

- **Node.js** v14 o superior.
- **MongoDB** v4 o superior (local o remoto).

---

## **To-Do y Mejoras**

- [ ] Agregar autenticación para proteger los endpoints.
- [ ] Implementar análisis de uso de URLs (gráficas, estadísticas).
- [ ] Crear una interfaz gráfica para el uso de la API.
- [ ] Mejorar el manejo de errores.

---

## **Licencia**
Este proyecto se distribuye bajo la licencia MIT.

