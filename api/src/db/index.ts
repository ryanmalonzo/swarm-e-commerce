import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { products, users } from "./schema";

const db = drizzle(process.env.DRIZZLE_DATABASE_URL!);

async function main() {
  await db.delete(users);
  await db.delete(products);

  const user: typeof users.$inferInsert = {
    firstName: "Bruce",
    lastName: "Wayne",
    email: "bruce.wayne@esgi.fr",
    password: "robin123"
  };

  await db.insert(users).values(user);
  console.log("Inserted default user");

  const productsArray: typeof products.$inferInsert[] = [
    { name: "Produit 1", price: 50, imageUrl: "https://picsum.photos/id/183/400/275" },
    { name: "Produit 2", price: 35, imageUrl: "https://picsum.photos/id/133/400/275" },
    { name: "Produit 3", price: 62, imageUrl: "https://picsum.photos/id/514/400/275" },
    { name: "Produit 4", price: 18, imageUrl: "https://picsum.photos/id/551/400/275" },
    { name: "Produit 5", price: 23, imageUrl: "https://picsum.photos/id/605/400/275" },
    { name: "Produit 6", price: 44, imageUrl: "https://picsum.photos/id/655/400/275" },
  ];

  productsArray.forEach(async (product) => {
    await db.insert(products).values(product);
  });
  console.log("Inserted default products");
}

main();
