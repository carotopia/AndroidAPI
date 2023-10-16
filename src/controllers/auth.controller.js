import User from '../models/usermodel.js';
import Organization from '../models/orgamodel.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';


export const register = async (req, res) => {
    const { name, lastname, phone, password, description} = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({ name, lastname, phone, password: passwordHash ,description});

        // Save the new user in the database
        const userSaved = await newUser.save();

        const token = await createAccessToken({id:userSaved._id});
        res.json({token: token,
            id:   userSaved._id,
            name: userSaved.name,
            lastname: userSaved.lastname,
            phone: userSaved.phone,
            description: userSaved.description,
        });

       

    } catch (error) {
        
        res.status(500).json({ message: 'Error registering user lol' })
    }
};
export const login = async (req, res) => {
    const { phone, password } = req.body;

    try {
        const userFound = await User.findOne({ phone });

        if (!userFound) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

        const token = await createAccessToken({ id: userFound._id });
        
        res.json({
            id: userFound._id,
            name: userFound.name,
            lastname: userFound.lastname,
            phone: userFound.phone,
            tags: userFound.tags,
            favorites: userFound.favorites,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            token: token, // Puedes enviar el token en la respuesta si lo necesitas en el cliente
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

export const logout = async (req, res) => {
    return res.status(200).json({ message: 'Logged out' });
}
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: 'User not found' });
    return res.json({

        id: userFound._id,
        name: userFound.name,
        lastname: userFound.lastname,
        phone: userFound.phone,
        tags: userFound.tags,
        favorites: userFound.favorites,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,

    });
}

export const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

export const addFavorite = async (req, res) => {
    const { userId, organizationId } = req.body; // Obtiene los IDs del usuario y la organización desde el cuerpo de la solicitud

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Agrega el ID de la organización a la lista de favoritos del usuario
        user.favorites.push(organizationId);

        await user.save(); // Guarda los cambios en la base de datos

        return res.status(200).json({ message: 'Organización agregada a favoritos' });
    } catch (error) {
        console.error('Error al agregar organización a favoritos:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getFavorites = async (req, res) => {
    const userId = req.params.userId; // Obtiene el userId de los parámetros de la URL
  
    try {
      // Busca al usuario por su userId
      const user = await User.findById(userId).populate('favorites'); // Usa "populate" para obtener los detalles de las organizaciones favoritas
  
      if (!user) {
        return res.status(404).json([]);
      }
  
      const favorites = user.favorites; // Obtiene la lista de organizaciones favoritas
  
      // Crear un arreglo que contenga solo los objetos de organizaciones (sin el tag "favorites")
      const organizations = favorites.map(favorite => ({
        _id: favorite._id,
        name: favorite.name,
        phone: favorite.phone,
        email: favorite.email,
        image: favorite.image,
        // Agrega otras propiedades que desees incluir
      }));
  
      return res.status(200).json(organizations);
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
      return res.status(500).json([]);
    }
  };
  