import express from 'express';
import { TrainModel, GernerateImage,GernerateImagesFromPrompt } from 'common';

const app = express();

const PORT = process.env.PORT || 3000;

app.post('/ai/training', (req, res) => {

});

app.post('/ai/generate', (req, res) => {
    
});

app.post('/pack/generate', (req, res) => {

});

app.get('/pack/bulk', (req, res) => {
    
});

app.get('/image', (req, res) => {
        
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});