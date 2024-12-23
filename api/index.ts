import cors from "cors";
import express from "express";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./src/db/schema";

const db = drizzle(process.env.DATABASE_URL!, { schema });

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/products", async (_, res) => {
  res.status(200).json(await db.query.products.findMany());
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await db.insert(schema.users).values({
      firstName,
      lastName,
      email,
      password,
    }).returning();

    res.status(201).json(user[0]);
  } catch {
    res.sendStatus(409);
    return;
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db.query.users.findFirst({
    where: (users, { and, eq }) =>
      and(eq(users.email, email), eq(users.password, password)),
  });

  if (!user) {
    res.sendStatus(401);
    return;
  }

  res.status(200).json(user);
});

app.post("/orders", async (req, res) => {
  const { userId, products } = req.body;
  const order = await db.insert(schema.orders).values({
    userId,
  }).returning();

  products.forEach(async (product: typeof schema.products.$inferSelect) => {
    await db.insert(schema.productsToOrders).values({
      orderId: order[0].id,
      productId: product.id,
    });
  });

  res.sendStatus(201);
});

app.get("/orders", async (req, res) => {
  const { user_id: userId } = req.query;
  res.status(200).json(
    await db.query.orders.findMany({
      where: (orders, { eq }) => eq(orders.userId, Number(userId)),
      with: {
        productsToOrders: true,
      },
    }),
  );
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
