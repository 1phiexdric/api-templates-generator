import User from '../models/user.model.js';

class UserController {

    // getAll recupera todos los recursos.
    async getAll(req, res) {
        try {
            const data = await User.find({});
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // getById recupera un recurso por su ID.
    async getById(req, res) {
        try {
            const data = await User.findById(req.params.id);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: 'Recurso no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // create crea un nuevo recurso.
    async create(req, res) {
        try {
            const newData = new User(req.body);
            const savedData = await newData.save();
            res.status(201).json(savedData);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // update actualiza un recurso existente por su ID.
    async update(req, res) {
        try {
            const updatedData = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedData) {
                res.status(200).json(updatedData);
            } else {
                res.status(404).json({ message: 'Recurso no encontrado' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // delete elimina un recurso por su ID.
    async delete(req, res) {
        try {
            const deletedData = await User.findByIdAndDelete(req.params.id);
            if (deletedData) {
                res.status(200).json({ message: 'Recurso eliminado exitosamente' });
            } else {
                res.status(404).json({ message: 'Recurso no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

// Exporta una única instancia del controlador para mantener la consistencia.
export default new UserController();
