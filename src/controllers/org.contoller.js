import Organization from '../models/orgamodel.js'; // Make sure the filename matches 'orgmodel.js'


import bcrypt from 'bcryptjs'; // Import other dependencies
import { createAccessToken } from '../libs/jwt.js';

export const registerOrganization = async (req, res) => {
    const { name, phone, email, street, suburb, city, state, schedule, linkWeb, linkFacebook, linkInstagram, linkTwitter, linkOther, description, image, tags, password } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newOrganization = new Organization({ name, phone, email, street, suburb, city, state, schedule, linkWeb, linkFacebook, linkInstagram, linkTwitter, linkOther, description, image, tags, password: passwordHash });

        // Save the new organization in the database
        const organizationSaved = await newOrganization.save();

        const token = await createAccessToken({ id: organizationSaved._id });
        res.cookie('token', token);
        res.json({
            id: organizationSaved._id,
            name: organizationSaved.name,
            // Add other fields specific to your organization schema
        });

    } catch (error) {
        res.status(500).json({ message: 'Error registering organization' });
    }
};

export const loginOrganization = async (req, res) => {
    const { phone, password } = req.body;

    try {
        const organizationFound = await Organization.findOne({ phone });

        if (!organizationFound) return res.status(400).json({ message: 'Organization not found' });

        const isMatch = await bcrypt.compare(password, organizationFound.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

        // Modify the response as needed for the organization schema
        res.json({
            id: organizationFound._id,
            name: organizationFound.name,
            // Add other fields specific to your organization schema
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
    try {
        // Clear the token cookie to log out the user
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ message: 'Error logging out' });
    }
};



