import User from '../models/usermodel.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';



export const register = async (req, res) => {
    const { name, lastname, phone, password,description} = req.body;

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
