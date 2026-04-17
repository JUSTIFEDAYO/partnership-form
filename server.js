const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public')); // Put your HTML/CSS in a folder named 'public'
app.use(express.urlencoded({ extended: true }));

app.post('/submit', upload.single('idImage'), (req, res) => {
    const data = {
        ...req.body,
        file: req.file ? req.file.filename : 'No file uploaded'
    };

    // Save data to a simple text file
    fs.appendFileSync('submissions.txt', JSON.stringify(data) + "\n");

    res.send("<h1>Thank you! Your partnership form has been submitted.</h1>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));