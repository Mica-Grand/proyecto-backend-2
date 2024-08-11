
document.addEventListener('DOMContentLoaded', () => {

  const socket = io();

  console.log("Socket.IO client initialized");

  Swal.fire({
    title: "Te damos la bienvenida a Realtimeproducts",
    text: "Usa el formulario para agregar nuevos productos al catálogo. Si quieres remover un producto, haz click en el botón de 'Eliminar'",
  });

 
  const addProductForm = document.getElementById("add-product-form");

  addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(addProductForm);
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const thumbnails = formData.get("thumbnails");
    const code = formData.get("code");
    const stock = formData.get("stock");
    const category = formData.get("category");
    const status = formData.get("status");

    if (!title || !description || !price || !code || !stock || !category) {
        Swal.fire({
            title: "Error",
            text: "Todos los campos son obligatorios excepto thumbnails",
          });
        return;
    }

    const productData = { title, description, price, thumbnails, code, stock, category, status };
//envío datos para que app agregue el producto

socket.emit("addProduct", productData);
Swal.fire({
    title: "¡Producto enviado!",
    text: `el producto ${title} ha sido enviado.`,
});
})

//escucho evento de lista actualizada

socket.on("productListUpdated", (updatedProductList) => {
console.log('La lista de productos ha sido actualizada:', updatedProductList)
//actualizar el render para que se vea la lista actualizada
renderProductList(updatedProductList);
});


   const renderProductList = (products) => {
     const productList = document.getElementById("rt-product-list");
     productList.innerHTML = "";
     products.forEach(product => {
       const newProductItem = document.createElement("li");
       newProductItem.setAttribute("data-id", `${_id}`);
       newProductItem.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.thumbnails}">
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <form action="/carts/66affd4bc723a31ad3519e85/products/{{_id}}" method="POST">
              <input type="hidden" name="pid" value="{{_id}}">
              <input type="hidden" name="quantity" value="1">
              <button type="submit">Agregar</button>
            </form>

        `;
       productList.appendChild(newProductItem);
     });
   };

//escuchar el evento del botón de eliminar

document.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("delete-product")) {
      const productId = event.target.getAttribute("data-id");
      socket.emit("deleteProduct", productId);
  }
});



  // Escuchar el evento productDeleted para eliminar el producto de la lista en tiempo real
  socket.on('productDeleted', (productId) => {
      console.log('Producto eliminado:', productId);
      Swal.fire({
          title: "¡Producto eliminado con éxito!",
          text: `El producto id ${productId} ha sido eliminado de la lista.`,
        });
      const productItem = document.querySelector(`li[id='product-${productId}']`);
      if (productItem) {
          productItem.remove();
      }
  });
  


 
});





