import userModel from "../models/schemas/usuarios.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../helpers/autenticacion.js";

// userControllers maneja la lógica de autenticación y registro de usuarios.
class userControllers {

    // register maneja el registro de un nuevo usuario.
    async register(req, res) {
        try {
            const { email, nombre, telefono, clave } = req.body;
            // Verifica si el usuario ya existe en la base de datos.
            const usuarioExist = await userModel.findOne({ email });
            if (usuarioExist) {
                return res.status(400).json({ error: 'El usuario ya existe' });
            }
            // Encripta la clave antes de guardarla.
            const claveEncriptada = await bcrypt.hash(clave, 10);
            // Crea el nuevo usuario en la base de datos.
            const data = await userModel.create({
                email, nombre, telefono, clave: claveEncriptada
            });
            res.status(201).json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // login maneja el inicio de sesión de un usuario.
    async login(req, res) {
        try {
            const { email, clave } = req.body;
            // Busca al usuario por su email.
            const usuarioExist = await userModel.findOne({ email });
            if (!usuarioExist) {
                return res.status(400).json({ error: 'El usuario no existe' });
            }
            // Compara la clave proporcionada con la clave encriptada en la base de datos.
            const claveValida = await bcrypt.compare(clave, usuarioExist.clave);
            if (!claveValida) {
                return res.status(400).json({ error: 'Clave no valida' });
            }
            // Genera un token JWT para el usuario autenticado.
            const token = generateToken(email);
            return res.json({ msg: 'usuario authenticado', token });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // getProfile obtiene el perfil del usuario autenticado.
    async getProfile(req, res) {
        try {
            // Busca al usuario por el email extraído del token.
            const data = await userModel.findOne({ email: req.emailConectado });
            res.json({ data });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

// Exporta una única instancia del controlador.
export default new userControllers();
