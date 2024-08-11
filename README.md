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
  - Persistencia: Mongoose.
  - Mongoose-paginate-v2.


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
  - Filtros opcionales, a solicitar mediante query: 
    -Page (si no se proporciona un valor, se otorga la page 1).
     URL: `http://localhost:8080/api/products?page=2`
    - Limit (si no se proporciona, por default es 10):
     URL:`http://localhost:8080/api/products?limit=4`
    - Sort. Opciones: asc y desc
     URL `http://localhost:8080/api/products?sort=asc`
    - Filter query=category, debe recibir nombre de categoría, por ejemplo, makeup.
    URL:`http://localhost:8080/api/products?query=haircare`
    - Filter query=status, recibe true o false que se convierte a boolean y filtra de acuerdo a la propiedad "status" del producto.
    URL:`http://localhost:8080/api/products?query=false`
    - Múltiples queries:
    URL: `http://localhost:8080/api/products?sort=asc&query=true&page=2&limit=4`

 


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

## Vistas

### PRODUCTS

- **Navegar a la lista de productos (catálogo):**
- URL: `http://localhost:8080/products`
- Muestra una lista de todos los productos disponibles.
- Permite filtrar y ordenar mediante queries:
  - Page (si no se proporciona, por default es 1)
    URL:`http://localhost:8080/products?page=2`
  - Limit (si no se proporciona, por default es 10)
    URL:`http://localhost:8080/products?limit=4`
  - Sort: opción "asc", los ordena por precio de manera ascendente, cualquier     otra cosa los ordena de manera descendente.
    URL:`http://localhost:8080/products?sort=asc`
  - Filter query=category, debe recibir nombre de categoría, por ejemplo, makeup.
    URL:`http://localhost:8080/products?query=tools`
  - Filter query=status, recibe true o false que se convierte a boolean y filtra de acuerdo a la propiedad "status" del producto.
    URL:`http://localhost:8080/products?query=false`
  - Aplicando filtros múltiples:
    URL: `http://localhost:8080/products?sort=asc&query=true&page=2&limit=4`






## Ejemplos de uso con Postman
### Obtener todos los productos

![Obtener todos los productos](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/src/public/img/GET-api-products.png)

### Obtener un producto por su ID

![Obtener un producto por su ID](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/src/public/img/GET-api-products-pid.JPG)

### Crear un nuevo producto

![Crear un nuevo producto](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/src/public/img/POST-api-products.JPG)

### Actualizar un producto por su ID

![Actualizar un producto por su ID](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/src/public/img/PUT-api-products-pid.JPG)

### Eliminar un producto por su ID

![Eliminar un producto por su ID](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/src/public/img/DELETE-api-products-pid.JPG)

### Crear un nuevo carrito

![Crear un nuevo carrito](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/src/public/img/POST-api-carts.JPG)

### Agregar un producto al carrito por id

![Agregar un producto al carrito](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/src/public/img/POST-api-carts-cid-product-pid.JPG)

### Obtener un carrito por su ID

![Obtener un carrito por su ID](https://github.com/Mica-Grand/proyecto-backend-grandoso/blob/main/src/public/img/GET-api-carts-cid.JPG)





 

