CREATE TABLE "rate_limits" (
	"key" text PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"window_start" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "waitlist_signups" ADD COLUMN "confirm_token_hash" text;--> statement-breakpoint
ALTER TABLE "waitlist_signups" ADD COLUMN "confirm_sent_at" timestamp with time zone;
--> statement-breakpoint
ALTER TABLE "rate_limits" ENABLE ROW LEVEL SECURITY;
