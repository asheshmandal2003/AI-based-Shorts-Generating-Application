CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"image_url" varchar,
	"subscription" boolean DEFAULT false,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "video" (
	"id" serial PRIMARY KEY NOT NULL,
	"script" json NOT NULL,
	"audio_url" varchar NOT NULL,
	"captions" json NOT NULL,
	"images" varchar[],
	"author" varchar NOT NULL
);
--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");