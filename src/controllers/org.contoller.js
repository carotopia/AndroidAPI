import Organization from '../models/orgamodel.js'; 
import AllowedEmails from "../models/allowed.js";

import bcrypt from 'bcryptjs'; // Import other dependencies
import { createAccessToken } from '../libs/jwt.js';
import { token } from 'morgan';

export const registerOrganization = async (req, res) => {
    const { name, phone, email, street, suburb, city, state, schedule, linkWeb, linkFacebook, linkInstagram, linkTwitter, linkOther, description, image, tags, password } = req.body;

    try {
        // Consulta el modelo AllowedEmails para verificar si el correo está permitido
        const isEmailAllowed = await AllowedEmails.findOne({ email });

        if (!isEmailAllowed) {
            // El correo electrónico no está permitido, responde con un mensaje de error
            return res.status(400).json({ message: 'Email is not allowed' });
        }

        // El correo electrónico está permitido, procede a crear la organización
        const passwordHash = await bcrypt.hash(password, 10);
        const newOrganization = new Organization({ name, phone, email, street, suburb, city, state, schedule, linkWeb, linkFacebook, linkInstagram, linkTwitter, linkOther, description, image, tags, password: passwordHash });

        // Guarda la nueva organización en la base de datos
        const organizationSaved = await newOrganization.save();

        const token = await createAccessToken({ id: organizationSaved._id });
    
        res.json({
            token: token,
            id: organizationSaved._id,
            name: organizationSaved.name,
            // Otros campos específicos de tu esquema de organización
        });

    } catch (error) {
        res.status(500).json({ message: 'Error registering organization' });
    }
};


export const loginOrganization= async (req, res) => {
    const { phone, password } = req.body;

    try {
        const organizationFound = await Organization.findOne({ phone });

        if (!organizationFound) {
            return res.status(400).json({ message: 'Organization not found' });
        }

        const isMatch = await bcrypt.compare(password, organizationFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const token = await createAccessToken({ id: organizationFound._id });

        res.json({
            id: organizationFound._id,
            name: organizationFound.name,
            phone: organizationFound.phone,
            email: organizationFound.email,
            street: organizationFound.street,
            suburb: organizationFound.suburb,
            city: organizationFound.city,
            state: organizationFound.state,
            schedule: organizationFound.schedule,
            linkWeb: organizationFound.linkWeb,
            linkFacebook: organizationFound.linkFacebook,
            linkInstagram: organizationFound.linkInstagram,
            linkTwitter: organizationFound.linkTwitter,
            linkOther: organizationFound.linkOther,
            description: organizationFound.description,
            image: organizationFound.image,
            tags: organizationFound.tags,
            token: token,
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};


export const profileOrganization = async (req, res) => {
    const organizationFound = await Organization.findById(req.user.id);

    if (!organizationFound) return res.status(400).json({ message: 'Organization not found' });
    // Modify the response as needed for the organization schema
    return res.json({
        id: organizationFound._id,
        name: organizationFound.name,
        // Add other fields specific to your organization schema
    });
};

export const logoutOrganization = async (req, res) => {
    res.json({ message: 'Organization logged out' });



};

export const getAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();

        if (!organizations || organizations.length === 0) {
            return res.status(404).json({ message: 'No organizations found' });
        }

        res.json(organizations);
    } catch (error) {
        console.error('Error getting all organizations:', error);
        res.status(500).json({ message: 'Error getting all organizations' });
    }
};

export const findOrganizationsByName = async (req, res, validateToken) => {
    const { name } = req.query;

    try {
        const organizations = await Organization.find({ name: { $regex: name, $options: 'i' } });

        if (!organizations || organizations.length === 0) {
            return res.status(404).json({ message: 'No organizations found with that name' });
        }

        res.json(organizations);
    } catch (error) {
        console.error('Error finding organizations by name:', error);
        res.status(500).json({ message: 'Error finding organizations by name' });
    }
};

export const findOrganizationsByTags = async (req, res) => {
    const { tags } = req.body;
    console.log('Tags:', tags);
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
        return res.status(400).json({ message: 'Invalid or missing tags in the request body' });
    }

    try {
        let organizations = [];

        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i];
            const orgsWithTag = await Organization.find({ tags: { $all: [tag] } });

            // Filtramos las organizaciones que no estén ya en la lista "organizations".
            const newOrgs = orgsWithTag.filter(org => !organizations.some(existingOrg => existingOrg._id.toString() === org._id.toString()));

            // Agregamos las nuevas organizaciones a la lista.
            organizations = organizations.concat(newOrgs);
        }

        if (!organizations || organizations.length === 0) {
            return res.status(404).json({ message: 'No organizations found with those tags' });
        }

        res.json(organizations);
    } catch (error) {
        console.error('Error finding organizations by tags:', error);
        res.status(500).json({ message: 'Error finding organizations by tags' });
    }
};



export const getAllTags = async (req, res) => {
    try {
        const organizations = await Organization.find();
        
        if (!organizations || organizations.length === 0) {
            return res.status(404).json({ message: 'No organizations found' });
        }
        
        const allTags = new Set();
        
        organizations.forEach((org) => {
            if (org.tags && org.tags.length > 0) {
                org.tags.forEach((tag) => {
                    allTags.add(tag);
                });
            }
        });
        
        // Convert the Set to an array
        const uniqueTags = [...allTags];
        
        res.json(uniqueTags);
    } catch (error) {
        console.error('Error getting all tags:', error);
        res.status(500).json({ message: 'Error getting all tags' });
    }
};
