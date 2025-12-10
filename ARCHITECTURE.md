# معماری پروژه

یک اپلیکیشن React با SSR سفارشی که ترکیبی از SSR + SPA behavior + API است.

---

## 🧰 Tech Stack

- Node.js + Express
- React 19 (SSR + Hydration)
- React Router v7
- Vite
- TypeScript
- Tailwind CSS v4

---

## 📁 ساختار پروژه

```
src/
├── shared/types.ts          # Typeهای مشترک
├── server/                  # SSR + API
│   ├── index.ts
│   ├── db.ts
│   ├── ssr.tsx
│   └── etag.ts
└── client/                  # React Client
    ├── main.tsx
    ├── App.tsx
    ├── components/
    ├── context/
    ├── hooks/
    ├── pages/
    └── Routes/
```

---

## معماری کلی

سه لایه اصلی:

**Shared:** Typeهای مشترک بین سرور و کلاینت  
**Server:** SSR با `ReactDOMServer.renderToString`، API endpoints، ETag  
**Client:** Hydration با `hydrateRoot`، React Router، استفاده از InitialData

---

## جریان SSR → Hydration

1. کاربر URL را باز می‌کند → سرور داده را می‌خواند
2. React با `StaticRouter` رندر می‌شود → HTML + InitialData تولید می‌شود
3. مرورگر HTML کامل را می‌بیند
4. JS کلاینت لود می‌شود → `hydrateRoot` UI را فعال می‌کند

---

## ETag

برای هر پاسخ SSR:
- Hash از HTML تولید می‌شود → در `ETag` header قرار می‌گیرد
- درخواست مجدد با `If-None-Match` → اگر برابر باشد `304 Not Modified`، در غیر این صورت `200` + HTML جدید

---

## InitialData

**SSR:** داده در سرور fetch می‌شود، در HTML تزریق می‌شود، کلاینت بدون fetch دوباره hydrate می‌کند.

**SPA Navigation:** React Router route را عوض می‌کند. اگر InitialData مناسب نباشد → fetch از API.

---

## Design Patterns

### 1. Separation of Concerns
سه لایه مجزا: Server, Client, Shared

### 2. Single Source of Truth
Typeها فقط یک‌بار در `shared/types.ts` تعریف شده‌اند

### 3. Context Provider Pattern
`InitialDataContext` برای جلوگیری از props drilling و double-fetch

### 4. Factory/Builder Pattern
`renderHtml` HTML را step-by-step می‌سازد: JSX → HTML → تزریق InitialData → اضافه کردن assets

### 5. Strategy Pattern
- Server: `StaticRouter`
- Client: `BrowserRouter`
هر دو از `AppRoutes` استفاده می‌کنند

### 6. Cache Validation Pattern
ETag برای content-based caching

### 7. Progressive Enhancement
HTML کامل اول (SSR) → سپس Hydration برای تعامل

---

## UI

Mobile-first با TailwindCSS. روی دسکتاپ به صورت centered mobile-view نمایش داده می‌شود.

---

## قابل بهبود

- Vite manifest برای production
- Client-side caching (React Query)
- Unit tests
- Error boundaries و skeleton loaders
