CREATE TABLE "events" (
	"id" uuid PRIMARY KEY NOT NULL,
	"action_id" varchar(255) NOT NULL,
	"action" varchar(255),
	"resource_type" varchar(255),
	"resource_id" varchar(255) NOT NULL,
	"before_state" varchar,
	"after_state" varchar,
	"ip_address" varchar,
	"user_agent" varchar
);
