CREATE TYPE "public"."status_enum" AS ENUM('PENDING', 'GENERATED', 'FAILED');--> statement-breakpoint
ALTER TABLE "model" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "output_images" ADD COLUMN "prompt" text NOT NULL;--> statement-breakpoint
ALTER TABLE "output_images" ADD COLUMN "status" "status_enum" DEFAULT 'PENDING' NOT NULL;--> statement-breakpoint
ALTER TABLE "output_images" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "output_images" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;