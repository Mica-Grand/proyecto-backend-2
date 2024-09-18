# Proyecto Backend Coderhouse

Esta app es el proyecto del curso de Backend de Coderhouse. En esta ocasión se encuentra actualizada con los requerimientos de la Preentrega N° 1 correspondiente al Bloque II.

## Información del Proyecto

- ### Nombre:  
   proyecto-backend-2

- ### Autora:
   Micaela Grandoso
   
- ### Descripción:

  Es una aplicación desarrollada en Node.js utilizando el framework Express, diseñada para gestionar productos y carritos mediante el uso de persistencia en Mongo Db Atlas. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos almacenados en la database y también gestionar carritos de compra. En esta última entrega se implementó un CRUD de usuarios y autenticación. 
  

- ### Características:
  - Eliminar y agregar productos del catálogo y ver la vista en tiempo real. 
  - Crear, obtener, actualizar y eliminar productos del catálogo.
  - Crear carritos de compra.
  - Agregar productos a los carritos existentes.
  - Obtener el contenido de los carritos.
  - Eliminar productos de los carritos.
  - Vistas:
   Cuenta con vistas desarrolladas con handlebars. Las mismas permiten navegar hacia el catálogo de products y vista de cart. 
   La vista de products incluye funcionalidades de filtrado, ordenamiento y paginación para la visualización de productos del catálogo. 
   La vista de cart permite al usuario agregar productos al carrito y eliminarlos. La misma recupera el cartId del usuario logueado mediante el uso de la estrategia currennt. A su vez, se actualizó la lógica de los botones de agregar productos al carrito y de eliminar productos del mismo, para que los productos se agreguen y se eliminen del cart asociado al usuario autenticado.

- ### Tecnologías utilizadas:
  - Node.js
  - Express.js
  - Handlebars.
  - Socket.IO.
  - Sweet Alert.
  - Persistencia: Mongo Db Atlas.
  - Mongoose.
  - Mongoose-paginate-v2.
  - Bootstrap.
  - Passport.js.
  - Passport-jwt
  - Bcrypt.
  - Jsonwebtoken.
  - cokkie-parser
  - dotenv


## Instalación

1. Clona este repositorio.
2. Instala las dependencias con `npm install`.

## Uso

Para ejecutar la aplicación:

```bash
npm start

```

## Vistas

### CART

- **Visualizar el cart del user que se encuentra logueado**
- URL: `http://localhost:3000/cart`
En esta vista se pueden ver los productos agregados y eliminarlos del carrito mediante un botón.
Si no se encuentra un jwt o el mismo expiró (no se reconoce el user logueado), arroja un error 401 y renderiza una vista para que el usuario pueda registrarse o iniciar sesión.

### PROFILE

- **Visualizar el perfil del user que se encuentra logueado**
- URL: `http://localhost:3000/profile`
En esta vista se puede ver el perfil del usuario logueado, incluyendo su información de registro (excepto datos sensibles).
También cuenta con un botón funcional para cerrar sesión (all cerrar sesión redirige a la vista login)
Si no se encuentra un jwt o el mismo expiró (no se reconoce el user logueado), arroja un error 401 y renderiza una vista para que el usuario pueda registrarse o iniciar sesión.

### LOGIN
- **Iniciar sesión en la aplicación**
- URL: `http://localhost:3000/login`
En esta vista se puede iniciar sesión con un usuario existente.

### REGISTER
- **Registrarse en la aplicación**
- URL: `http://localhost:3000/register`
En esta vista puede registrarse un nuevo usuario.


### PRODUCTS

- **Navegar a la lista de productos (catálogo):**
- URL: `http://localhost:3000/products`
- Muestra una lista de todos los productos disponibles.
  Cuenta con un botón de agregar al carrito, que agrega 1 unidad del producto.
  Por el momento no se implementó la vista de los detalles de cada producto.
- Mediante un form con opciones desplegables para seleccionar, permite filtrar por category,  status (true o false), ordenar por precio asc o desc y elegir cuantros resultados mostrar por página. IMPORTANTE: LOS FILTROS NO TIENEN "PERSISTENCIA" CUANDO SE HACE CLICK EN APPLY FILTERS, NAVEGA HACIA LA URL DEFINIDA MEDIANTE QUERY PARAMS, Y SI SE HACE UNA MODIFICACIÓN EN UN FILTRO, LA URL SE GENERA DE CERO.
  - Filtro category, debe seleccionar nombre de categoría, por ejemplo, makeup, y hacer click en el botón "apply filters". Esto genera esta url:
    URL:`http://localhost:3000/products?category=makeup&limit=10`
  - Filtro availability, debe seleccionar "in stock" (true) o "out of stock" (false), filtrando de acuerdo a la propiedad "status" del producto.Esto genera esta url:
    URL:`http://localhost:3000/products?status=true&limit=10`
  - Sort by: Debe seleccionar Default (sin orden), Price: low to high (asc) o Price: High to low (desc). Esto genera esta url:
    URL:`http://localhost:3000/products?sort=asc&limit=10`
  - Show, para hacer un limit en la cantidad de items por página (por default es 10). Se puede seleccionar del menú "5" o "20", o cambiarlo en la url.
    URL:`http://localhost:3000/products?limit=5`
  - Page: No se creó botón para seleccionar, pero puede cambiarse en la url. Si no se proporciona, por default  es 1.
    URL:`http://localhost:3000/products?page=3`
  - Aplicando múltiples query params. Por ejemplo, aplicamos category=makeup, status=true, sort=desc, limit=5, page=2
    URL: `http://localhost:3000/products?page=2&category=makeup&status=true&sort=desc&limit=5`
- **Los productos pueden agregarse al cart del usuario autenticado.**


### REALTIMEPRODUCTS (POR EL MOMENTO DESHABILITADO)
- **Navegar a la lista de productos en tiempo real (catálogo):**
- URL: `http://localhost:3000/realtimeproducts`
- Muestra una lista de todos los productos disponibles en tiempo real.
- Cuenta con un form para agregar productos al catálogo.
En un futuro, si se conserva esta función, sólod ebería estar visible para usuarios con rol de admin.

## Endpoints API 

### USERS

**GET:**

- **Obtener todos los usuarios:**
- URL: `http://localhost:3000/api/users`

- **Obtener un usuario por id:**
- URL: `http://localhost:3000/api/users/:uid`
- Reemplaza `:uid` con el id del usuario que se quiere obtener.

**PUT:**
- **Actualizar un usuario por id:**
- URL: `http://localhost:3000/api/users/:uid`
- Reemplaza `:uid` con el id del usuario que se quiere actualizar.
- En el cuerpo de la solicitud, se debe enviar el objeto con los datos actualizados.

**DELETE:**
- **Eliminar un usuario por id:**
- URL: `http://localhost:3000/api/users/:uid`
- Reemplaza `:uid` con el id del usuario que se quiere eliminar.

### SESSIONS

**POST:**

- **Login:**
- URL: `http://localhost:3000/api/sessions/login`
- En el cuerpo de la solicitud, se debe enviar el objeto con los datos de login (email y password)
- Si el login es exitoso, se devuelve un token de autenticación.

- **Register:**
- URL: `http://localhost:3000/api/sessions/register`
- En el cuerpo de la solicitud, se debe enviar el objeto con los datos del usuario a crear
- Si el registro es exitoso, se devuelve un token de autenticación.

- **Logout:**
- URL: `http://localhost:3000/api/sessions/logout`


### PRODUCTS

**GET:**

- **Obtener todos los productos:**
  - URL: `http://localhost:3000/api/products`

- **Filtros opcionales, a solicitar mediante query:**
    -Page (si no se proporciona un valor, se otorga la page 1).
     URL: `http://localhost:3000/api/products?page=2`
    - Limit (si no se proporciona, por default es 10):
     URL:`http://localhost:3000/api/products?limit=4`
    - Sort. Opciones: asc y desc
     URL `http://localhost:3000/api/products?sort=asc`
    - Filter category, debe recibir nombre de categoría, por ejemplo, haircare.
    URL:`http://localhost:3000/api/products?category=haircare`
    - Filter status, recibe true o false que se convierte a boolean y filtra de acuerdo a la propiedad "status" del producto.
    URL:`http://localhost:3000/api/products?status=false`
    - Múltiples params:
    URL: `http://localhost:3000/api/products?sort=asc&status=true&page=2&limit=4`
     URL: `http://localhost:3000/api/products?limit=5&category=makeup&status=true&sort=asc&page=2`

- **Obtener un producto por su ID:**
  - URL: `http://localhost:3000/api/products/:pid`
  - Ejemplo: `http://localhost:3000/api/products/66b41580fddd12e794da120b`

**POST:**

- **Crear un nuevo producto:**
  - URL: `http://localhost:3000/api/products`
  - Ejemplo de Body (JSON):
    
```json
{
    "title": "Oil Control Serum",
    "description": " A high-strength vitamin-and-mineral blemish formula with pure niacinamide.",
    "price": 3000,
    "thumbnails": [
        "https://www.sephora.com/productimages/sku/s2031391-main-zoom.jpg?imwidth=166"
    ],
    "code": "9988776",
    "stock": 20,
    "category": "skincare",
    "status": true

}
```

**PUT:**

- **Actualizar un producto por su ID:**
  - URL: `http://localhost:3000/api/products/:pid`
  - Body (JSON) con campos permitidos: `stock`, `description`, `price`, `category`, `thumbnails`,  `title`, `code`, `status`.
  - Ejemplo: `http://localhost:3000/api/products/66affabf15462968a221eddd`
    ```json
    {
  
      "description": "Está descripción ha sido actualizada"
    }
    ```

**DELETE:**

- **Eliminar un producto por su ID:**
  - URL: `http://localhost:3000/api/products/:pid`
  - Ejemplo: `http://localhost:3000/api/products/66affabf15462968a221eddd`

### CARTS

Atención: Aún ha sido actualizar para recuperar el cartId del usuario logueado, sigue estando configurado para tomarlo de url params.
Sin embargo, en la vista de cart sí puede accederse al cart asociado al user que se encuentra logueado, y los botones de agregar y eliminar son funcionales para agregar y eliminar de dicho carrito.

**GET:**

- **Obtener un carrito por su ID:**
  - URL: `http://localhost:3000/api/carts/:cid`
  - Ejemplo: `http://localhost:3000/api/carts/66affd4bc723a31ad3519e85`
  - Lista todos los productos contenidos en el carrito especificado y realiza populate para traer las propiedades de cada producto.

**POST:**

- **Crear un nuevo carrito vacío:**
  - URL: `http://localhost:3000/api/carts`
  - Crea un carrito nuevo con una estructura inicial vacía. El result es:
  ```json
  {
    "result": "success",
    "payload": {
        "products": [],
        "_id": "66b91cce032e0581cd8b53e9",
        "__v": 0
    }
    }
    ```

**POST (Agregar producto al carrito):**

- **Agregar un producto al carrito por IDs:**
  - URL: `http://localhost:3000/api/carts/:cid/products/:pid`
  - Ejemplo: `http://localhost:3000/api/carts/66affd4bc723a31ad3519e85/products/66b415a9b0607ca7f1a4e9db`
  - La quantity se puede pasar por body:
  ```json
  {
    "quantity": "3"
    }
    ```
Si no se pasa nada por body, la quantity será 1 por default.

**GET:**

- **Obtener un carrito por su ID:**
  - URL: `http://localhost:3000/api/carts/:cid`
  - Ejemplo: `http://localhost:3000/api/carts/66affd4bc723a31ad3519e85`
  - Lista todos los productos contenidos en el carrito especificado y realiza populate para traer las propiedades de cada producto.

**PUT:**

- **actualizar la cantidad de un producto determinado:**
  - URL: `http://localhost:3000/carts/:cid/products/:pid`
  - Ejemplo: `http://localhost:3000/api/carts/66affd4bc723a31ad3519e85/products/66affad715462968a221eddf`
  - Actualiza la cantidad de un producto determinado que ya se encuentra en el carrito.
  La quantity se debe pasar por BODY:
    ```json
  {
    "quantity": "6"
    }
    ```
  
- **actualizar el carrito con un arreglo de productos:**
  - URL: `http://localhost:3000/api/carts/:cid`
  - Ejemplo: `http://localhost:3000/api/carts/66affd4bc723a31ad3519e85`
  - Actualiza el carrito con un arreglo de productos.
  El array de products se envía por body. La solicitud debe tener este formato:
  
  ```json
   {
  "products": [
    { "productId": "66b415d4b0607ca7f1a4e9df", "quantity": 2 },
    { "productId": "66b415e8b0607ca7f1a4e9e1", "quantity": 1 }
  ]
  }

    ```

**DELETE:**

- **Elimina producto seleccionado del carrito:**
  - URL: `http://localhost:3000/api/carts/:cid/products/:pid`
  - Ejemplo: `http://localhost:3000/api/carts/66affd4bc723a31ad3519e85/products/66b415a9b0607ca7f1a4e9db`
  - Elimina del cart pasado por param el producto pasado por param.

- **Vacía el cart del id seleccionado:**
  - URL: `http://localhost:3000/api/carts/:cid`
  - Ejemplo: `http://localhost:3000/api/carts/66affd4bc723a31ad3519e85`
  - Vacía el cart especificado con id por params, en este caso, 66affd4bc723a31ad3519e85






## Capturas de ejemplos de uso con Postman
### Obtener todos los productos

![Obtener todos los productos](src/public/img/GET-api-products.png)

### Obtener un producto por su ID

![Obtener un producto por su ID](src/public/img/GET-api-products-pid.JPG)

### Crear un nuevo producto

![Crear un nuevo producto](src/public/img/POST-api-products.JPG)

### Actualizar un producto por su ID

![Actualizar un producto por su ID](src/public/img/PUT-api-products-pid.JPG)

### Eliminar un producto por su ID

![Eliminar un producto por su ID](src/public/img/DELETE-api-products-pid.JPG)

### Crear un nuevo carrito

![Crear un nuevo carrito](src/public/img/POST-api-carts.JPG)

### Agregar un producto al carrito por id

![Agregar un producto al carrito](src/public/img/POST-api-carts-cid-products-pid.JPG)

### Obtener un carrito por su ID

![Obtener un carrito por su ID](src/public/img/GET-api-carts-cid.JPG)

### Actualizar la quantity de un producto en un carrito

![Actualiza quantity de producto](src/public/img/PUT-api-carts-cid-products-pid.jpg)

### Actualizar un cart específico con un array de productos 

![Actualiza cart con array](src/public/img/PUT-api-carts-cid-array.jpg)

### Eliminar un producto del cart por id

![Elimina del cart](src/public/img/DELETE-api-carts-cid-pid.JPG)

### Vacía el cart especificado por id

![Vacía el cart](src/public/img/DELETE-api-carts-cid.JPG)



 

