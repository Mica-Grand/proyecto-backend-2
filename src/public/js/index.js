
document.addEventListener('DOMContentLoaded', () => {

 
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

    if (!title || !description || !price || !code || !stock || !category) {
        Swal.fire({
            title: "Error",
            text: "Todos los campos son obligatorios excepto thumbnails",
          });
        return;
    }

    renderProductList(products);
   });

   const renderProductList = (products) => {
     const productList = document.getElementById("product-list");
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



 
});





