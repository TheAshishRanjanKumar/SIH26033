# Project Structure — SIH26033 Solution

```text
agridirect/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── tests/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   │   ├── marketplace/
│   │   │   ├── rfq/
│   │   │   ├── matching/
│   │   │   ├── orders/
│   │   │   ├── logistics/
│   │   │   └── analytics/
│   │   └── main.py
│   └── tests/
│
├── ml/
│   ├── data/
│   ├── notebooks/
│   ├── models/
│   ├── forecasting/
│   └── route_optimizer/
│
├── database/
│   ├── migrations/
│   └── seeds/
│
├── docs/
├── infra/
├── .env.example
├── docker-compose.yml
└── README.md
```

## Rule

Keep business logic out of UI components. Backend services own business rules; ML modules own model logic; route optimization remains testable independently.
