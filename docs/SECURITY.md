# Security Requirements — SIH26033 Solution

## 1. Authentication

- OTP-based authentication abstraction
- short-lived access tokens
- refresh tokens
- secure password/secret handling where passwords are used

## 2. Authorization

Every protected action must verify:
- authenticated user;
- role;
- ownership/permission.

Never rely on a client-provided role ID.

## 3. Input Validation

Validate:
- quantities;
- prices;
- coordinates;
- dates;
- IDs;
- enum values;
- file uploads if introduced.

## 4. API Security

- HTTPS outside local development
- rate limiting
- CORS allowlist
- request size limits
- consistent errors without sensitive internals

## 5. Data Protection

Do not store unnecessary sensitive identity information.

If KYC/Aadhaar is introduced, use only the minimum required data and appropriate compliance controls. KYC is not necessary for the core prototype.

## 6. Payments

Use sandbox/test credentials for the hackathon.

Do not describe a simulated payment state as a live regulated escrow system.

## 7. Secrets

- `.env` locally
- `.env.example` with placeholders
- no API keys in Git
- rotate exposed keys immediately

## 8. Audit

Record critical events:
- listing creation/update;
- RFQ offer;
- order state change;
- payment state change;
- route generation;
- admin actions.

## 9. Threats to Test

- unauthorized listing edits
- order access by another user
- invalid quantity/price
- replayed OTP
- token misuse
- malicious file input
- API abuse
