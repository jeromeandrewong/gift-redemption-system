# Frontend

https://govtech-oa.vercel.app/

## Folder Structure

```
├── public                         # Public assets
├── src                            # source code
    ├── app                        # Nextjs app router
    ├── components                 # components
        ├── ui                     # low-level ui components
        ├── exampleComponent.tsx   # high-level abstracted components/features
    ├── lib                        # library for reusable/helper functions
        ├── util.ts                # utility functions

```

## Tech Stack

- TypeScript
- Nextjs (app router)
- React Query (client-side API fetching)
  - couldn't use react server components due to the dynamic nature of the table component
  - data fetching needs to be done on the client side
- Shadcn.ui/Tailwind CSS (styling)
- Vercel (Frontend deployment)

## Features

- Search, filter, sort and pagination of table data
- Toast notifications
- suspense loading state for better UX
- parallel fetching of data for better performance
- caching and invalidation of API queries

## Running Locally

```bash
cd frontend
pnpm i
pnpm dev
```
