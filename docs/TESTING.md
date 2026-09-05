# Testing Strategy — SIH26033 Solution

## 1. Testing Pyramid

```text
        E2E
       /   \
   Integration
     /       \
     Unit Tests
```

## 2. Backend Unit Tests

Cover:
- role authorization
- listing validation
- RFQ matching
- quantity aggregation
- order transitions
- route constraints
- forecast response validation

## 3. Integration Tests

Minimum critical flow:

```text
Register
 → Create Listing
 → Create RFQ
 → Match Supply
 → Accept Offer
 → Create Order
 → Generate Route
 → Deliver
 → Settle
```

## 4. AI Tests

Test:
- input schema;
- missing data;
- negative quantities;
- forecast output shape;
- no-data fallback;
- reproducibility for a fixed test dataset.

## 5. Route Tests

Test:
- capacity cannot be exceeded;
- all required stops appear;
- no duplicate/invalid stops;
- output is deterministic for a fixed seed/input where applicable.

## 6. Frontend Tests

Test:
- login;
- listing creation;
- marketplace filtering;
- RFQ creation;
- order status;
- dashboard rendering.

## 7. Manual Demo Checklist

Before every demo:
- seed database;
- verify accounts;
- verify listings;
- verify RFQ;
- run forecast;
- run route optimizer;
- verify order lifecycle;
- test on laptop + mobile viewport;
- confirm no secrets or debug data appear.

## 8. Definition of Done

A feature is done when:
- code works locally;
- validation exists;
- happy path tested;
- important failure path tested;
- documentation updated;
- no secrets committed;
- teammate can run it.
