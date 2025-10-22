CREATE TABLE IF NOT EXISTS "advocates" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"city" text NOT NULL,
	"degree" text NOT NULL,
	"payload" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"years_of_experience" integer NOT NULL,
	"phone_number" bigint NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "city_idx" ON "advocates" USING btree ("city");
CREATE INDEX IF NOT EXISTS "degree_idx" ON "advocates" USING btree ("degree");
CREATE INDEX IF NOT EXISTS "years_of_experience_idx" ON "advocates" USING btree ("years_of_experience");
CREATE INDEX IF NOT EXISTS "specialties_idx" ON "advocates" USING gin ("payload");
CREATE INDEX IF NOT EXISTS "first_name_idx" ON "advocates" USING btree ("first_name");
CREATE INDEX IF NOT EXISTS "last_name_idx" ON "advocates" USING btree ("last_name");