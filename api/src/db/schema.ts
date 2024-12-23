import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  primaryKey,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const products = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  price: integer().notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
});

export const orders = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date: date().defaultNow().notNull(),
  userId: integer("user_id").notNull(),
});

export const productsToOrders = pgTable(
  "order_products",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => products.id),
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.productId, t.orderId] }),
  }),
);

export const productsToOrdersRelations = relations(
  productsToOrders,
  ({ one }) => ({
    product: one(products, {
      fields: [productsToOrders.productId],
      references: [products.id],
    }),
    order: one(orders, {
      fields: [productsToOrders.orderId],
      references: [orders.id],
    }),
  }),
);

export const productsRelations = relations(products, ({ many }) => ({
  productsToOrders: many(productsToOrders),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  productsToOrders: many(productsToOrders),
}));
