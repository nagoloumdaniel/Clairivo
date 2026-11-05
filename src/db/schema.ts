import { sql } from "drizzle-orm";
import {
  check, index, integer, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid,
} from "drizzle-orm/pg-core";

const id = () => uuid("id").primaryKey().defaultRandom();
const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();

export const roleEnum = pgEnum("role", ["customer", "admin"]);
export const productKindEnum = pgEnum("product_kind", ["guide", "template", "course", "pack"]);
export const productStatusEnum = pgEnum("product_status", ["draft", "published", "archived"]);
export const orderStatusEnum = pgEnum("order_status", ["pending", "paid", "failed", "refunded", "partially_refunded"]);
export const paymentStatusEnum = pgEnum("payment_status", ["requires_action", "succeeded", "failed", "canceled"]);
export const refundStatusEnum = pgEnum("refund_status", ["pending", "succeeded", "failed"]);

export const users = pgTable("users", {
  id: id(),
  email: text("email").notNull(),
  role: roleEnum("role").notNull().default("customer"),
  createdAt: createdAt(),
}, (t) => [uniqueIndex("users_email_uq").on(sql`lower(${t.email})`)]);

export const categories = pgTable("categories", {
  id: id(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
});

export const series = pgTable("series", {
  id: id(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
});

export const products = pgTable("products", {
  id: id(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  kind: productKindEnum("kind").notNull(),
  status: productStatusEnum("status").notNull().default("draft"),
  priceCents: integer("price_cents").notNull(),
  currency: text("currency").notNull().default("EUR"),
  categoryId: uuid("category_id").references(() => categories.id),
  seriesId: uuid("series_id").references(() => series.id),
  createdAt: createdAt(),
}, (t) => [
  check("products_price_nonneg", sql`${t.priceCents} >= 0`),
  index("products_status_idx").on(t.status),
]);

export const productVersions = pgTable("product_versions", {
  id: id(),
  productId: uuid("product_id").notNull().references(() => products.id),
  version: integer("version").notNull(),
  changelog: text("changelog"),
  createdAt: createdAt(),
}, (t) => [uniqueIndex("product_versions_uq").on(t.productId, t.version)]);

export const productFiles = pgTable("product_files", {
  id: id(),
  versionId: uuid("version_id").notNull().references(() => productVersions.id),
  storageKey: text("storage_key").notNull(),
  fileName: text("file_name").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  sha256: text("sha256").notNull(),
}, (t) => [index("product_files_version_idx").on(t.versionId)]);

export const orders = pgTable("orders", {
  id: id(),
  userId: uuid("user_id").references(() => users.id),
  email: text("email").notNull(),
  status: orderStatusEnum("status").notNull().default("pending"),
  totalCents: integer("total_cents").notNull(),
  currency: text("currency").notNull().default("EUR"),
  createdAt: createdAt(),
}, (t) => [
  check("orders_total_nonneg", sql`${t.totalCents} >= 0`),
  index("orders_user_idx").on(t.userId),
]);

// Photographie du prix au moment de l'achat : ne jamais relire products.price_cents.
export const orderItems = pgTable("order_items", {
  id: id(),
  orderId: uuid("order_id").notNull().references(() => orders.id),
  productId: uuid("product_id").notNull().references(() => products.id),
  titleSnapshot: text("title_snapshot").notNull(),
  unitPriceCents: integer("unit_price_cents").notNull(),
  quantity: integer("quantity").notNull().default(1),
}, (t) => [
  check("order_items_qty_pos", sql`${t.quantity} > 0`),
  uniqueIndex("order_items_order_product_uq").on(t.orderId, t.productId),
]);

export const payments = pgTable("payments", {
  id: id(),
  orderId: uuid("order_id").notNull().references(() => orders.id),
  stripePaymentIntentId: text("stripe_payment_intent_id").notNull().unique(),
  status: paymentStatusEnum("status").notNull(),
  amountCents: integer("amount_cents").notNull(),
  currency: text("currency").notNull(),
  createdAt: createdAt(),
}, (t) => [index("payments_order_idx").on(t.orderId)]);

// Idempotence des webhooks : l'identifiant d'événement Stripe est unique.
export const paymentEvents = pgTable("payment_events", {
  id: id(),
  stripeEventId: text("stripe_event_id").notNull().unique(),
  type: text("type").notNull(),
  paymentId: uuid("payment_id").references(() => payments.id),
  payload: jsonb("payload").notNull(),
  processedAt: timestamp("processed_at", { withTimezone: true }),
  receivedAt: createdAt(),
});

export const entitlements = pgTable("entitlements", {
  id: id(),
  userId: uuid("user_id").notNull().references(() => users.id),
  productId: uuid("product_id").notNull().references(() => products.id),
  orderItemId: uuid("order_item_id").notNull().references(() => orderItems.id),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  createdAt: createdAt(),
}, (t) => [uniqueIndex("entitlements_user_product_uq").on(t.userId, t.productId)]);

export const invoices = pgTable("invoices", {
  id: id(),
  orderId: uuid("order_id").notNull().references(() => orders.id).unique(),
  number: text("number").notNull().unique(),
  issuedAt: timestamp("issued_at", { withTimezone: true }).notNull().defaultNow(),
});

export const refunds = pgTable("refunds", {
  id: id(),
  paymentId: uuid("payment_id").notNull().references(() => payments.id),
  stripeRefundId: text("stripe_refund_id").unique(),
  amountCents: integer("amount_cents").notNull(),
  status: refundStatusEnum("status").notNull().default("pending"),
  reason: text("reason"),
  createdAt: createdAt(),
}, (t) => [check("refunds_amount_pos", sql`${t.amountCents} > 0`)]);

export const auditLogs = pgTable("audit_logs", {
  id: id(),
  actorId: uuid("actor_id").references(() => users.id),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: text("entity_id"),
  meta: jsonb("meta"),
  createdAt: createdAt(),
}, (t) => [index("audit_logs_entity_idx").on(t.entity, t.entityId)]);
