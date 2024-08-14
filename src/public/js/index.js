document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const productId = event.target.dataset.pid;
      const cartId = "66affd4bc723a31ad3519e85";
      try {
        const response = await fetch(
          `/api/carts/${cartId}/products/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        const result = await response.json();

        if (result.result === "success") {
          Swal.fire({
            title: "Producto agregado!",
            text: `El producto ha sido agregado al carrito.`,
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  });

  //filtros

  const filterForm = document.getElementById("filter-form");

  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const category = document.getElementById("category-select").value;
    const status = document.getElementById("status-select").value;
    const sort = document.getElementById("sort-select").value;
    const limit = document.getElementById("limit-select").value || 10;
    

    


    const queryParams = new URLSearchParams();
    if (category) queryParams.append("query", category);
    if (status) queryParams.append("query", status);
    if (sort) queryParams.append("sort", sort);
    if (limit) queryParams.append("limit", limit);

    window.location.href = `/products?${queryParams.toString()}`;
  });
});
