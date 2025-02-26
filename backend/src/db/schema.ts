import {
    text,
    boolean,
    pgTable,
    timestamp,
    serial,
    integer,
  } from "drizzle-orm/pg-core";
  
  export const animals = pgTable("animals", {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    type: text("type"),
    animalType: text("animalType"),
    details: text("details"),
    age: integer("age"),
    ageDate: text("ageDate"),
    image: text("image").notNull(),
    adopted: boolean("adopted").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });
  