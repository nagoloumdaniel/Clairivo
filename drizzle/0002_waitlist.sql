CREATE TABLE "waitlist_signups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"universes" text[] DEFAULT '{}'::text[] NOT NULL,
	"consent_at" timestamp with time zone DEFAULT now() NOT NULL,
	"consent_version" text NOT NULL,
	"confirmed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_signups_email_len" CHECK (char_length("waitlist_signups"."email") <= 254)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "waitlist_signups_email_uq" ON "waitlist_signups" USING btree (lower("email"));
--> statement-breakpoint
ALTER TABLE "waitlist_signups" ENABLE ROW LEVEL SECURITY;
