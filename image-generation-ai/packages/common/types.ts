import { model } from 'mongoose';
import  {z}  from 'zod';

export const TrainModel = z.object({
    name: z.string(),
    type: z.enum(['man', 'women', 'others']),
    age: z.number(),
    ethinicity: z.enum(['White', 'Black', 'Asian American',"East Asian","South Asian","South East Asian","Middle Eastern","Hispanic","Pacific","Other"]),
    eyeColor: z.enum(['Brown', 'Blue', 'Green', 'Hazel','Grey']),
    bald: z.boolean(),
    images: z.array(z.string()),
});


export const GernerateImage = z.object({
    prompt: z.string(),
    modelId: z.string(),
    num: z.number(),
});

export const GernerateImagesFromPrompt = z.object({
    modelId: z.string(),
    packId: z.string(),
});

