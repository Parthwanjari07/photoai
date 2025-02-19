CREATE TYPE "public"."ethnicity_enum" AS ENUM('WHITE', 'BLACK', 'ASIAN_AMERICAN', 'EAST_ASIAN', 'SOUTH_ASIAN', 'SOUTH_EAST_ASIAN', 'MIDDLE_EASTERN', 'HISPANIC', 'PACIFIC', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."eye_color_enum" AS ENUM('BROWN', 'BLUE', 'GREEN', 'HAZEL', 'GREY');--> statement-breakpoint
CREATE TYPE "public"."model_type_enum" AS ENUM('MAN', 'WOMEN', 'OTHERS');--> statement-breakpoint
CREATE TABLE "model" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" "model_type_enum" NOT NULL,
	"age" integer NOT NULL,
	"ethnicity" "ethnicity_enum" NOT NULL,
	"eye_color" "eye_color_enum" NOT NULL,
	"bald" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "output_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image_url" text NOT NULL,
	"model_id" uuid NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pack_prompts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prompt" text NOT NULL,
	"pack_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "packs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "training_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image_url" text NOT NULL,
	"model_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"profile_picture" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "output_images" ADD CONSTRAINT "output_images_model_id_model_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."model"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "output_images" ADD CONSTRAINT "output_images_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pack_prompts" ADD CONSTRAINT "pack_prompts_pack_id_packs_id_fk" FOREIGN KEY ("pack_id") REFERENCES "public"."packs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_images" ADD CONSTRAINT "training_images_model_id_model_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."model"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "output_images_model_idx" ON "output_images" USING btree ("model_id");--> statement-breakpoint
CREATE INDEX "output_images_user_idx" ON "output_images" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "training_images_model_idx" ON "training_images" USING btree ("model_id");