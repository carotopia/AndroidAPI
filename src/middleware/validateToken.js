import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const cookies = req.cookies;
    
    // Check if the token exists in cookies
    if (!cookies.token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token asynchronously
    jwt.verify(cookies.token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        // If verification is successful, you can access the user object
        console.log(user);

        // Attach the user object to the request for further use in your routes
        req.user = user;

        // Call next() inside the callback to ensure it's called after verification
        next();
    });
};
