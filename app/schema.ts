import { serial, varchar, text, numeric, pgTable } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('User', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 64 }).notNull().unique(),
  password: varchar('password', { length: 64 }).notNull(),
  name: varchar('name', { length: 255 }),
  phoneNumber: varchar('phone_number', { length: 20 }),
  education: varchar('education', { length: 255 }),
  gpa: numeric('gpa', { precision: 3, scale: 2 }),
  skills: text('skills'),  // Stored as JSON string
  experience: numeric('experience', { precision: 4, scale: 1 }),
  resumeUrl: text('resume_url'),
});