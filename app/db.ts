// db.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { usersTable } from '@/app/schema'; // Import the schema

let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

export async function getUser(email: string) {
  // Query using the imported usersTable schema
  return await db.select().from(usersTable).where(eq(usersTable.email, email));
}

export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  // Insert using the imported usersTable schema
  return await db.insert(usersTable).values({ email, password: hash });
}

export async function updateUser(email: string, updateData: Partial<typeof usersTable.$inferInsert>) {
  // If the update includes a password, hash it before updating
  if (updateData.password) {
    let salt = genSaltSync(10);
    updateData.password = hashSync(updateData.password, salt);
  }

  // Update the user data
  return await db.update(usersTable)
    .set(updateData)
    .where(eq(usersTable.email, email));
}