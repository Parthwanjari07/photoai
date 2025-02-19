import express from 'express';
import { db } from 'db';
import { models } from './db/schema'; 
import { TrainModel, GernerateImage, GernerateImagesFromPrompt } from 'common';


const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post('/ai/training', async(req, res) => {
    const parsedBody = TrainModel.safeParse(req.body);

    if (!parsedBody.success) {
        res.status(400).json({
            message: 'Input incorrect',
        });
        return;
    }

    await db.insert(model).values({
        name : parsedBody.data.name,
        type : parsedBody.data.type,
        age : parsedBody.data.age,
        ethinicity : parsedBody.data.ethinicity,


        // Add your model values here based on parsedBody.data
    });

    res.json({ success: true });
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