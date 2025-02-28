import express from 'express';
import { db, outputImages, models, packPrompts, packs } from 'db';
import { TrainModel, GernerateImage, GernerateImagesFromPrompt } from 'common';
import { eq, inArray, and } from 'drizzle-orm';

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

    await db.insert(models).values({
        name : parsedBody.data.name,
        type : parsedBody.data.type.toUpperCase() as "MAN" | "WOMEN" | "OTHERS",
        age : parsedBody.data.age,
        ethnicity : parsedBody.data.ethnicity.toUpperCase() as "WHITE" | "BLACK" | "ASIAN_AMERICAN" | "EAST_ASIAN" | "SOUTH_ASIAN" | "SOUTH_EAST_ASIAN" | "MIDDLE_EASTERN" | "HISPANIC" | "PACIFIC" | "OTHER",
        eyeColor: parsedBody.data.eyeColor.toUpperCase() as "BROWN" | "BLUE" | "GREEN" | "HAZEL" | "GREY",
        bald: parsedBody.data.bald,
        userId:"user-id"
    });

    res.json({ success: true });
});

app.post('/ai/generate', async(req, res) => {
    const parsedBody = GernerateImage.safeParse(req.body);

    if (!parsedBody.success) {
        res.status(411).json({
            message: 'Input incorrect',
        });
        return;
    }

    const data = await db.insert(outputImages).values({
        imageUrl: "",
        modelId: parsedBody.data.modelId,
        userId: "user-id",
        prompt: parsedBody.data.prompt,
    }).returning();

    res.json({
        imageId: data[0].id,
    });
});

app.post('/pack/generate', async (req, res) => {
    const parsedBody = GernerateImagesFromPrompt.safeParse(req.body);

    if (!parsedBody.success) {
        res.status(400).json({
            message: 'Input incorrect',
        });
        return;
    }

    const prompts = await db
        .select()
        .from(packPrompts)
        .where(eq(packPrompts.packId, parsedBody.data.packId));

    const imageRecords = prompts.map(prompt => ({
        imageUrl: "", // Will be populated later
        modelId: parsedBody.data.modelId,
        userId: "user-id",
        prompt: prompt.prompt // Adjust field name based on your schema
    }));
    
    // Insert all records and return the inserted data
    const images = await db.insert(outputImages)
        .values(imageRecords)
        .returning();
    
    res.json({
        success: true,
        images: images
    });
});

app.get('/pack/bulk', async(req, res) => {
    const pack = await db
        .select()
        .from(packs);

    res.json({
        pack: pack
    });
});

app.get('/image/bulk', async(req, res) => {
    const images = req.query.images as string;
    const offset = req.query.offset as string ?? "0";
    const limit = req.query.limit as string ?? "10";
    const imageIds = images ? images.split(',') : [];

    const offsetValue = parseInt(offset, 10);
    const limitValue = parseInt(limit, 10);

    const imagesData = await db
        .select()
        .from(outputImages)
        .where(
            and(
                inArray(outputImages.id, imageIds),
                eq(outputImages.userId, "user-id")
            )
        )
        .offset(offsetValue)
        .limit(limitValue);

    res.json({
        images: imagesData
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});