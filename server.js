const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

const app = express();

// 1. CLOUDINARY CONFIGURATION (Using your keys)
cloudinary.config({
    cloud_name: 'dspag2aww',
    api_key: '576135641335578',
    api_secret: 'QGBFL9uUfnUGQvlEyKZ6WTCPC3c'
});

// 2. SETTING UP CLOUD STORAGE
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'partnership_forms', // The folder name in your Cloudinary Media Library
        allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
    },
});

const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// 3. THE SUBMIT ROUTE
app.post('/submit', upload.single('idImage'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No image uploaded.');
        }

        const formData = {
            ...req.body,
            idImageUrl: req.file.path // This is the link to the image in the cloud
        };

        // For now, we log the data. In the future, you can save this to a database.
        console.log("New Submission Received:", formData);

        res.send(`
            <div style="text-align:center; font-family:sans-serif; margin-top:50px;">
                <h1 style="color: #A04433;">Submission Successful!</h1>
                <p>The contract information and ID have been saved securely.</p>
                <br>
                <a href="/" style="text-decoration:none; color:white; background:#A04433; padding:10px 20px; border-radius:5px;">Return to Form</a>
            </div>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong with the upload.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));