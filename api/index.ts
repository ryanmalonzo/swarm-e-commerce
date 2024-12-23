import cors from "cors";
import express, { Request, Response } from "express";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./src/db/schema";

const db = drizzle(process.env.DATABASE_URL!, { schema });

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/products", async (_, res: Response) => {
  res.status(200).json(await db.query.products.findMany());
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await db.query.users.findFirst({
    where: (users, { eq }) =>
      eq(users.email, email) && eq(users.password, password),
  });

  if (!user) {
    res.sendStatus(401);
    return;
  }

  res.status(200).json(user);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
