import { pgTable, pgEnum, uuid, text, timestamp, boolean, integer, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const modelTypeEnum = pgEnum('model_type_enum', ['MAN', 'WOMEN', 'OTHERS']);
export const ethnicityEnum = pgEnum('ethnicity_enum', [
  'WHITE',
  'BLACK',
  'ASIAN_AMERICAN',
  'EAST_ASIAN',
  'SOUTH_ASIAN',
  'SOUTH_EAST_ASIAN',
  'MIDDLE_EASTERN',
  'HISPANIC',
  'PACIFIC',
  'OTHER',
]);
export const eyeColorEnum = pgEnum('eye_color_enum', ['BROWN', 'BLUE', 'GREEN', 'HAZEL', 'GREY']);

export const OutputImageStatusEnum = pgEnum('status_enum', ['PENDING', 'GENERATED', 'FAILED']);

// Tables
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').notNull(),
  profilePicture: text('profile_picture'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const models = pgTable('model', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  type: modelTypeEnum('type').notNull(),
  age: integer('age').notNull(),
  userId: text('user_id').notNull(),
  ethnicity: ethnicityEnum('ethnicity').notNull(),
  eyeColor: eyeColorEnum('eye_color').notNull(),
  bald: boolean('bald').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const trainingImages = pgTable('training_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  imageUrl: text('image_url').notNull(),
  modelId: uuid('model_id').notNull().references(() => models.id, { onDelete: 'cascade' }),
}, (table) => ({
  modelIdx: index('training_images_model_idx').on(table.modelId),
}));

export const outputImages = pgTable('output_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  imageUrl: text('image_url').notNull(),
  modelId: uuid('model_id').notNull().references(() => models.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  prompt: text('prompt').notNull(),
  status: OutputImageStatusEnum('status').notNull().default('PENDING'), 
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  modelIdx: index('output_images_model_idx').on(table.modelId),
  userIdx: index('output_images_user_idx').on(table.userId),
}));

export const packs = pgTable('packs', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const packPrompts = pgTable('pack_prompts', {
  id: uuid('id').primaryKey().defaultRandom(),
  prompt: text('prompt').notNull(),
  packId: uuid('pack_id').notNull().references(() => packs.id, { onDelete: 'cascade' }),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  outputImages: many(outputImages),
}));

export const modelsRelations = relations(models, ({ many }) => ({
  trainingImages: many(trainingImages),
  outputImages: many(outputImages),
}));

export const trainingImagesRelations = relations(trainingImages, ({ one }) => ({
  model: one(models, {
    fields: [trainingImages.modelId],
    references: [models.id],
  }),
}));

export const outputImagesRelations = relations(outputImages, ({ one }) => ({
  model: one(models, {
    fields: [outputImages.modelId],
    references: [models.id],
  }),
  user: one(users, {
    fields: [outputImages.userId],
    references: [users.id],
  }),
}));

export const packsRelations = relations(packs, ({ many }) => ({
  prompts: many(packPrompts),
}));

export const packPromptsRelations = relations(packPrompts, ({ one }) => ({
  pack: one(packs, {
    fields: [packPrompts.packId],
    references: [packs.id],
  }),
}));