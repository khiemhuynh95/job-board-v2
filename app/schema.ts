import { pgTable, serial, varchar, text } from 'drizzle-orm/pg-core';

// Define the User table schema
export const usersTable = pgTable('User', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 64 }),
  password: varchar('password', { length: 64 }),
  name: varchar('name', { length: 255 }),
  resumeUrl: text('resumeurl'),
});