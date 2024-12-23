import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from './schema';

const db = drizzle(process.env.DRIZZLE_DATABASE_URL!);

async function main() {
  const user: typeof users.$inferInsert = {
    firstName: 'Bruce',
    lastName: 'Wayne',
    email: 'bruce.wayne@dc-comics.com',
    password: 'robin123'
  }

  await db.insert(users).values(user);
  console.log('Created default user');
}

main();
