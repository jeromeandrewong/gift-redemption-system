# Frontend

https://govtech-oa.vercel.app/

## Running Locally

```bash
cd frontend
pnpm i
pnpm dev
```

## Tech Stack

- TypeScript
- Nextjs (app router)
- React Query (client-side API fetching)
  - couldn't use react server components due to the dynamic nature of the table component
  - data fetching needs to be done on the client side
- Shadcn.ui/Tailwind CSS (styling)
- Vercel (Frontend deployment)

## Featurees

- Search, filter, sort and pagination of table data
- Toast notifications
- suspense loading state for better UX
- caching and invalidation of API queries
