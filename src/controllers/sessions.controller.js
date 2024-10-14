import { sessionService } from '../repositories/index.js';
import UserDTO from '../dtos/user.dto.js';


export default class SessionsController {
     async register(req, res) {
        try {
            const { first_name, last_name, email, age, password } = req.body;
            const token = await sessionService.register({ first_name, last_name, email, age, password });
            res.cookie('jwt', token, { httpOnly: true, secure: false });
            res.status(200).json({ message: 'Register successful' });
          } catch (error) {
            res.status(400).json({ errorMessage: error.message });
          }
        }
      
        async login(req, res) {
          try {
            const { email, password } = req.body;
            const token = await sessionService.login({ email, password });
            
            res.cookie('jwt', token, { httpOnly: true, secure: false });
            res.status(200).json({ message: 'Login successful' });
          } catch (error) {
            res.status(401).json({ errorMessage: error.message });
          }
        }
      
        async logout(req, res) {
          try {
            res.clearCookie('jwt', { httpOnly: true, secure: false });
            res.status(200).json({ message: 'Logout successful' });
          } catch (error) {
            res.status(500).json({ errorMessage: 'Server error while logging out' });
          }
        }
      
        async getCurrent(req, res) {
          try {
            const { user, cartId } = await sessionService.getCurrentUser(req.user);
            res.json({ user, cartId });
          } catch (error) {
            res.status(500).json({ message: 'Error retrieving user' });
          }
        }
      }
      

