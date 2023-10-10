import User from '../models/usermodel.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';



export const register = async (req, res) => {
    const { name, last_name, phone, email, password, tags } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({ name, last_name, phone, email, password: passwordHash, tags });

        // Save the new user in the database
        const userSaved = await newUser.save();

        const token = await createAccessToken({id:userSaved._id});
        res.json({token: token,
            id:   userSaved._id,
            name: userSaved.name,
            last_name: userSaved.last_name,
            phone: userSaved.phone,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
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
            last_name: userFound.last_name,
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
        last_name: userFound.last_name,
        phone: userFound.phone,
        tags: userFound.tags,
        favorites: userFound.favorites,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,

    });
}
