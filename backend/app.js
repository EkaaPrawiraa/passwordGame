const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 5001;


app.use(cors());


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect("mongodb+srv://mnugrahaekaprawira:ep120623@passwordgame.9j0ecqs.mongodb.net/?retryWrites=true&w=majority&appName=passwordGame")
    .then(() => console.log('monggo ka MongoDB'))
    .catch(err => console.error('tebisaeun ka MongoDB', err));

const CaptchaSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
    filename: String
});

const Captcha = mongoose.model('Captcha', CaptchaSchema);

const CountrySchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
    filename: String
});

const Country = mongoose.model('Country', CountrySchema);

app.get('/', (req, res) => {
    res.send('Bisa nih');
});

app.post('/captchas', upload.single('image'), async (req, res) => {
    try {
        const img = new Captcha();
        img.data = req.file.buffer;
        img.contentType = req.file.mimetype;
        img.filename = req.file.originalname;
        await img.save();
        res.send('Gambar berhasil diupload!');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/countries', upload.single('image'), async (req, res) => {
    try {
        const img = new Country();
        img.data = req.file.buffer;
        img.contentType = req.file.mimetype;
        img.filename = req.file.originalname;
        await img.save();
        res.send('Gambar berhasil diupload!');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/countries', async (req, res) => {
    try {
        const images = await Country.find({});
        res.json(images);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/captchas', async (req, res) => {
    try {
        const images = await Captcha.find({});
        res.json(images);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
