CREATE TABLE `day_markers` (
	`date` text PRIMARY KEY,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` integer PRIMARY KEY DEFAULT 1,
	`minWalkDurationMins` integer NOT NULL,
	`startDate` text NOT NULL,
	CONSTRAINT "settings_single_row" CHECK("id" = 1)
);
--> statement-breakpoint
CREATE TABLE `workouts` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`date` text NOT NULL,
	`type` text NOT NULL,
	`durationMins` integer NOT NULL,
	`miles` real,
	`steps` integer,
	`volumeLbs` integer
);
