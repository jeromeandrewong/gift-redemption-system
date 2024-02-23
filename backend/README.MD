# Backend

## Deployed URL

https://govtechoa.onrender.com

## Endpoints

### Get all staff

- Method: `GET`
- URL: `/staff`
- Description: query from supabase to get all staff
- Response:
  ```json
  [
    {
        "staff_pass_id": "BOSS_6FDFMJGFV6YM",
        "team_name": "GRYFFINDOR",
        "created_at": 1620761965320
    },
    {
        "staff_pass_id": "MANAGER_P49NK2CS3B5G",
        "team_name": "GRYFFINDOR",
        "created_at": 1614784710249
    },
  }
  ```

### Redeem gift

- Method: `POST`
- URL: `/redeem`
- Description: query to supabase to update `redeemed` table in supabase
- Request:
  ```json
  {
    "staff_pass_id": "BOSS_6FDFMJGFV6YM",
    "team_name": "GRYFFINDOR"
  }
  ```
- Response:
  ```json
  {
    "message": "Gift redeemed successfully"
  }
  ```

## Running Locally

1. clone the repo
2. `cd backend`
3. `pnpm i`
4. `pnpm run dev`
5. `pnpm run test` to run tests
   ![tests](<CleanShot 2024-02-24 at 00.20.26@2x.png>)