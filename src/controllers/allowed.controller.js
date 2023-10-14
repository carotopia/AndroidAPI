import AllowedEmails from "../models/allowed.js";

export const newEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const newAllowedEmail = new AllowedEmails({ email });

        // Save the new email in the database
        const emailSaved = await newAllowedEmail.save();

        res.json(emailSaved);

    } catch (error) {
        console.error('Error registering email:', error);
        res.status(500).json({ message: 'Error registering email' });
    }
};
