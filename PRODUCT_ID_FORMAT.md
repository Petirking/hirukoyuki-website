# Hiruko Yuki - Product ID Format

## Format Structure
```
HY(CategoryCode)-(PriceCode)-(ServiceCode)-(RandomOrderNumber)
```

**Example:** `HY2-100-001-4821`

### Components:
- **HY** = Hiruko Yuki (company prefix)
- **CategoryCode** = 1 digit (product category)
- **PriceCode** = 3 digits (price in RM, zero-padded)
- **ServiceCode** = 3 digits (specific service/product type)
- **RandomOrderNumber** = 4 digits (unique per transaction/customer)

---

## Category Codes

| Code | Category | Description |
|------|----------|-------------|
| HY1 | Premium Apps | Subscription services (Netflix, Spotify, etc.) |
| HY2 | Topup Services | Mobile/Telecom topups |
| HY3 | Preset Editing | Photo/video editing services |
| HY4 | Bundle Printing | Document printing services |

---

## Premium Apps (HY1) Service Codes

| Code | Service | Typical Price |
|------|---------|---------------|
| 001 | Netflix Premium | RM14 |
| 002 | Disney+ Hotstar | RM14 |
| 003 | Spotify Premium | RM14 |
| 004 | YouTube Premium | RM17 |
| 005 | YouTube Music | RM14 |
| 006 | Telegram Premium | RM3 |
| 007 | ChatGPT Plus | RM25 |
| 008 | Canva Pro | RM10 |
| 009 | CapCut Pro | RM10 |
| 010 | Alight Motion Premium | RM10 |

### Examples:
- `HY1-014-001-5872` = Netflix Premium RM14
- `HY1-025-007-4331` = ChatGPT Plus RM25
- `HY1-010-009-4821` = CapCut Pro RM10

---

## Topup Services (HY2) Service Codes

| Code | Provider |
|------|----------|
| 001 | Maxis |
| 002 | Celcom |
| 003 | Digi |
| 004 | XOX |
| 005 | Umobile |
| 006 | Hotlink |

### Examples:
- `HY2-100-001-4821` = Topup Maxis RM100
- `HY2-050-004-1947` = Topup XOX RM50
- `HY2-030-002-7645` = Topup Celcom RM30

---

## Preset Editing (HY3) Service Codes

| Code | Service | Price |
|------|---------|-------|
| 001 | Preset Editing | RM1 |

### Example:
- `HY3-001-001-5518` = Preset Editing RM1

---

## Bundle Printing (HY4) Service Codes

| Code | Service | Price |
|------|---------|-------|
| 001 | Bundle Printing | RM10 |

### Example:
- `HY4-010-001-2104` = Bundle Printing RM10

---

## Key Features

✅ **Clear Category Identification** - First digit shows product category  
✅ **Price Transparency** - Price code visible in every ID  
✅ **Service Type Clarity** - Service/product type is documented  
✅ **Unique Order Tracking** - Random 4-digit number per customer/transaction  
✅ **Professional Format** - Consistent and easy to read  
✅ **Telegram Logging** - Perfect for automated message logging  
✅ **WhatsApp Tracking** - Easy reference for customer support  

---

## Implementation in Code

### Generating Product IDs

```javascript
// For Premium Apps (auto-generated with random order number)
const productId = getProductId('Netflix Premium');
// Returns: HY1-014-001-XXXX (where XXXX is random)

// For Topups (with dynamic price)
const productId = generateTopupProductId('Maxis', '100');
// Returns: HY2-100-001-XXXX (where XXXX is random)

// Manual price code (zero-padded to 3 digits)
const priceCode = String(50).padStart(3, '0'); // "050"
```

### Reference Data

Product ID metadata is available in `productIdReference` object:
```javascript
productIdReference.categories           // All category codes
productIdReference.premiumAppServices   // Premium app service codes
productIdReference.topupServices        // Topup provider codes
productIdReference.presetEditingServices // Preset editing codes
productIdReference.bundlePrintingServices // Bundle printing codes
```

---

## Telegram Logging Integration

When logging to Telegram, include the complete product ID:

```
Order ID: HY2-100-001-4821
Category: Topup Services
Service: Maxis (Code 001)
Price: RM100
Order #: 4821
```

This format makes it easy for support teams to track and reference orders in WhatsApp or Telegram.

---

## Database/CRM Usage

For storing in databases, maintain all four components separately:
- `category`: HY2
- `price_code`: 100
- `service_code`: 001
- `order_number`: 4821

This allows for flexible searching and reporting:
- Find all Maxis topups: `category='HY2' AND service_code='001'`
- Find all RM100+ orders: `price_code>='100'`
- Find customer order: `order_number='4821'`

---

**Last Updated:** May 2026  
**Version:** 1.0
