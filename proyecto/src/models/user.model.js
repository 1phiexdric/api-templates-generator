import mongoose from 'mongoose';

// Define el esquema para el modelo de recursos.
const userSchema = new mongoose.Schema({
    // Define aquí tu esquema basado en el recurso.
    name: { type: String, required: true },
}, {
    // Desactiva la clave de versión (__v) y agrega marcas de tiempo.
    versionKey: false,
    timestamps: true
});

// Crea el modelo de Mongoose a partir del esquema.
const User = mongoose.model('User', userSchema);

export default User;