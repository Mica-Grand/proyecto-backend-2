import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {createHash, isValidPassword, passportCall} from '../utils/utils.js'
import userModel from '../models/user.model.js';
import cartModel from '../models/cart.model.js'
import {authorization }  from '../middlewares/auth.js';
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const router = Router();

//registro
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    try {
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'This user already exists' });
        }

        const newCart = await cartModel.create({ products: [] });  

        const newUser = new userModel({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: newCart._id  
        });

        await newUser.save();

        //creación del token
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            JWT_SECRET,
            { expiresIn: "1h" }
          );
        
          //se guarda el token en la cookie      
          res.cookie("jwt", token, { httpOnly: true, secure: false });
          res.redirect('/profile')
            } catch (error) {
        res.status(500).json({ message: 'server error' });
    }
});

router.get('/failregister', async (req, res) => {
    console.log('Estrategia fallida')
    res.send({ error: "Failed" })
})

//login

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user|| !isValidPassword(user, password)) {
           // Si la solicitud es desde un cliente de API, devolver JSON
           if (req.headers['accept'] && req.headers['accept'].includes('application/json')) {
            return res.status(401).json({ message: 'Wrong credentials used for login.' });
        }
        // Si la solicitud es desde un navegador, redirigir con el mensaje de error
        return res.redirect('/login?errorMessage=Wrong%20credentials%20used%20for%20login.');
    }

        //generación del token
        let token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        //guardar el jwt en la cookie
        res.cookie('jwt', token, { httpOnly: true, secure:false });
        res.redirect('/profile');    
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


router.get('/faillogin', (req, res) => {
    res.send("Login fallido")
})

router.post('/logout', (req, res) => {
    try{
        res.clearCookie('jwt', { httpOnly: true, secure:false });
        res.redirect('/login');
        } catch (error) {
            res.status(500).json({ message: 'Error while logging out)' });
        }
});

router.get('/current', passportCall('jwt'), authorization('user'),(req, res) => {        
    try {
        const user = req.user; 
        const cartId = user.cart; 
        res.json({ user, cartId });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user' });
    }
});

export default router;