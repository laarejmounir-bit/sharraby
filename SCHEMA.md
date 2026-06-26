# Sharraby | شرّابي - Backend Architecture & Database Schema

## Architecture Overview

The application is designed using a modern full-stack Architecture:

- **Frontend**: Next.js (App Router), Tailwind CSS, Zustand, Framer Motion
- **Backend**: Next.js API Routes / Node.js
- **Database**: PostgreSQL (via Prisma ORM)
- **Analytics**: Vercel Analytics + Custom Admin Dashboard

## Database Schema (Prisma ORM)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  role      Role     @default(CUSTOMER)
  name      String
  phone     String   @unique
  email     String?  @unique
  city      String?
  orders    Order[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN
  CUSTOMER
}

model Product {
  id            String   @id @default(cuid())
  name          String
  description   String
  price         Float
  originalPrice Float?
  image         String
  images        String[]
  inStock       Int      @default(0)
  bundles       Bundle[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Bundle {
  id            String   @id @default(cuid())
  productId     String
  product       Product  @relation(fields: [productId], references: [id])
  quantity      Int
  price         Float
  originalPrice Float
  badge         String?
  isPopular     Boolean  @default(false)
}

model Order {
  id            String      @id @default(cuid())
  orderNumber   String      @unique
  userId        String?
  user          User?       @relation(fields: [userId], references: [id])
  customerName  String
  customerPhone String
  city          String
  district      String
  address       String
  totalAmount   Float
  shippingCost  Float       @default(0)
  status        OrderStatus @default(NEW)
  paymentMethod String      @default("COD")
  items         OrderItem[]
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

enum OrderStatus {
  NEW
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  RETURNED
  CANCELLED
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  name      String
  quantity  Int
  price     Float
}
```

## COD Workflow Automation

1. **Order Placed**: Customer fills one-page checkout. Order set to `NEW`.
2. **SMS Confirmation**: System sends automated SMS/WhatsApp API message to verify the address/number.
3. **Confirmed**: If user replies "Yes", status updates to `CONFIRMED` via webhook.
4. **Fulfillment**: Warehouse picks order, changes to `PROCESSING`.
5. **Shipping**: Integrated with local shipping API (e.g. Aramex, SMSA), generates waybill. Status -> `SHIPPED`.
6. **Delivery**: Courier collects cash. Updates system API. Status -> `DELIVERED`.
