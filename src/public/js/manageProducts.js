document.addEventListener('DOMContentLoaded', () => {



  Swal.fire({
    title: "Te damos la bienvenida al manejador de productos",
    text: "Usa el formulario para agregar nuevos productos al catálogo. Si quieres remover un producto, haz click en el botón de 'Eliminar'",
  });

  const addProductForm = document.getElementById("add-product-form");

  addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(addProductForm);
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const thumbnails = formData.get("thumbnails") || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtDExrwaB9Stm_zfRr3TXXpp5njpBzpxeckw&s.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";
    const code = formData.get("code");
    const stock = formData.get("stock");
    const category = formData.get("category");
    const status = formData.get("status");

    if (!title || !description || !price || !code || !stock || !category || !status) {
        Swal.fire({
            title: "Error",
            text: "Todos los campos son obligatorios excepto thumbnails",
        });
        return;
    }

    const productData = { title, description, price, thumbnails, code, stock, category, status };
    Swal.fire({
        title: "¡Producto enviado!",
        text: `El producto ${productData.title} ha sido enviado.`,
    });
  });

    renderProductList(updatedProductList);
    Swal.fire({
      title: "¡Catálogo actualizado!",
      text: `Se ha agregado un nuevo producto al catálogo:
      ${updatedProductList[updatedProductList.length - 1].title}`,
  });

  const renderProductList = (products) => {
    const productList = document.getElementById("rt-product-list");
    productList.innerHTML = "";
    products.forEach(product => {
      const newProductItem = document.createElement("li");
      newProductItem.setAttribute("data-id", `${product._id}`);
      newProductItem.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.thumbnails}">
        <p>${product.description}</p>
        <p>$${product.price}</p>
        <button class="btn btn-danger delete-product" data-id="${product._id}">Eliminar de catálogo</button>
      `;
      productList.appendChild(newProductItem);
    });
  };

  // Escucho el evento del botón de eliminar
  document.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("delete-product")) {
      const productId = event.target.getAttribute("data-id");
    }
  });


    const productItem = document.querySelector(`li[data-id='${productId}']`);
    if (productItem) {
      productItem.remove();
    }
    Swal.fire({
      title: "¡Producto eliminado con éxito!",
      text: `El producto id ${productId} ha sido eliminado ddel catálogo.`,
  });
  });

