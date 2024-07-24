# Proyecto Backend Coderhouse

Esta app es el proyecto del curso de Backend de Coderhouse. En esta ocasión se encuentra actualizada con los requerimientos de la Preentrega N° 2.

## Información del Proyecto

- ### Nombre:  
   proyecto-backend-grandoso

- ### Autora:
   Micaela Grandoso
   
- ### Descripción:

  Es una aplicación desarrollada en Node.js utilizando el framework Express, diseñada para gestionar productos y carritos mediante el uso de persistencia en sistema de archivos (en una futura versión se implementará MongoDb). Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos almacenados en un archivo JSON y también gestionar carritos de compra.
  En esta entrega se han implementado Handlebars y Socket.IO para mejorar la interacción en tiempo real.

- ### Características:
  - Eliminar y agregar carritos y ver la vista en tiempo real.
  - Crear, listar, actualizar y eliminar productos.
  - Crear carritos de compra.
  - Agregar productos a los carritos existentes.
  - Visualizar el contenido de los carritos.
  - Vistas:
    Home ("/"): Página principal, que carga todos los productos guardados con fs en products.json.
    Realtime Products ("/realtimeproducts"): Permite, a través d eun formulario y botones, agregar y eliminar productos y ver los cambios en la vista en tiempo real usando Socket.IO. Además se utiliza Sweet Alert para mostrar mensajes de bienvenida y de confirmación al eliminar y agregar productos

- ### Tecnologías utilizadas:
  - Node.js
  - Express.js
  - Handlebars.
  - Socket.IO.
  - Sweet Alert.


## Instalación

1. Clona este repositorio.
2. Instala las dependencias con `npm install`.

## Uso

Para ejecutar la aplicación:

```bash
npm start

```


## Endpoints API 

### PRODUCTS

**GET:**

- **Obtener todos los productos:**
  - URL: `http://localhost:8080/api/products`
  - Parámetros opcionales: `limit` para limitar el número de productos obtenidos.

- **Obtener un producto por su ID:**
  - URL: `http://localhost:8080/api/products/:pid`
  - Ejemplo: `http://localhost:8080/api/products/1`

**POST:**

- **Crear un nuevo producto:**
  - URL: `http://localhost:8080/api/products`
  - Body (JSON):
    ```json
    {
      "title": "Producto nuevo 2",
      "description": "Producto excelente",
      "price": 5559,
      "thumbnails": [
        "url_thumbnail1.jpg",
        "url_thumbnail2.jpg"
      ],
      "code": "ASFG3",
      "category": "Nueva category",
      "stock": 10
    }
    ```

**PUT:**

- **Actualizar un producto por su ID:**
  - URL: `http://localhost:8080/api/products/:pid`
  - Body (JSON) con campos permitidos: `stock`, `description`, `price`, `category`, `thumbnails`.
  - Ejemplo: `http://localhost:8080/api/products/9`
    ```json
    {
      "stock": 5,
      "description": "Está descripción ha sido actualizada"
    }
    ```

**DELETE:**

- **Eliminar un producto por su ID:**
  - URL: `http://localhost:8080/api/products/:pid`
  - Ejemplo: `http://localhost:8080/api/products/7`

### CARTS

**POST:**

- **Crear un nuevo carrito vacío:**
  - URL: `http://localhost:8080/api/carts`
  - Crea un carrito nuevo con una estructura inicial vacía.

**POST (Agregar producto al carrito):**

- **Agregar un producto al carrito por IDs:**
  - URL: `http://localhost:8080/api/carts/:cid/product/:pid`
  - Ejemplo: `http://localhost:8080/api/carts/2/product/3`
  - Cada solicitud incrementa la cantidad del producto en 1.

**GET:**

- **Obtener un carrito por su ID:**
  - URL: `http://localhost:8080/api/carts/:cid`
  - Ejemplo: `http://localhost:8080/api/carts/1`
  - Lista todos los productos contenidos en el carrito especificado.


## Ejemplos de uso con Postman
### Obtener todos los productos

![Obtener todos los productos](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/public/img/GET-api-products.png?raw=true)

### Obtener un producto por su ID

![Obtener un producto por su ID](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/public/img/GET-api-products-pid.JPG?raw=true)

### Crear un nuevo producto

![Crear un nuevo producto](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/public/img/POST-api-products.JPG?raw=true)

### Actualizar un producto por su ID

![Actualizar un producto por su ID](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/public/img/PUT-api-products-pid.JPG?raw=true)

### Eliminar un producto por su ID

![Eliminar un producto por su ID](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/public/img/DELETE-api-products-pid.JPG?raw=true)

### Crear un nuevo carrito

![Crear un nuevo carrito](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/public/img/POST-api-carts.JPG?raw=true)

### Agregar un producto al carrito por id

![Agregar un producto al carrito](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/public/img/POST-api-carts-cid-product-pid.JPG?raw=true)

### Obtener un carrito por su ID

![Obtener un carrito por su ID](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/public/img/GET-api-carts-cid.JPG?raw=true)





 

