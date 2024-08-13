document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.dataset.pid;
            const cartId = '66affd4bc723a31ad3519e85'; 
            try {
                const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}), 
                });

                const result = await response.json();

                if (result.result === 'success') {
                    Swal.fire({
                        title: 'Producto agregado!',
                        text: `El producto ha sido agregado al carrito.`,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    });
});
