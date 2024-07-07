import express from "express";
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import __dirname from './utils.js'



const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//app.use(express.static(__dirname+'/public'))
app.use('/static', express.static(__dirname + '/public'));



app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

