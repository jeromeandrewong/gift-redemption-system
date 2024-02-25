# Gift Redemption System

![demo image](/public/demo.png)
[Live Demo Link](https://govtech-oa.vercel.app/)
Instructions to run locally are within each folder's README (will need `env` variables from me)

## Disclaimer

If the site takes a while to render, it is due to [Render's free tier](https://docs.render.com/free#spinning-down-on-idle) which puts the server to sleep after 15 minutes of inactivity and requires a cold start.

## Description

Gift Redemption System that helps to track the redemption of gifts by the employees of the company.

## User Flow

1. Admin searches for staff by `staff_pass_id`, table will filter relevant rows based on the search query.
2. Admin can view of team/staff has redeemed gifts already.
3. For staff of teams that have not redeemed gifts, admin can redeem can click on the `redeem` action button to track the redemption of the gift.
4. toast notification will appear to indicate successful redemption of the gift.

## Features

- caching and invalidation of API queries using `React Query`
- sorting, filtering and pagination of table data
- unit tests

## Built with

- TypeScript
- Express.js (Backend)
- Next.js (Frontend)
- Supabase (PostgreSQL database)
- React Query (client-side API fetching)
- Vitest (unit tests)
- Tailwind CSS (styling)
- Vercel (Frontend deployment)
- Render (Backend deployment)

## Roadmap

- Authentication (because we don't want anyone to be able to redeem gifts)
- Ability to upload csv of staff data and generate rows in supabase (because christmas is a yearly event and we want to reuse this service)
- Ability to undo redemption (because mistakes happen)
