Example of running pre-rendering in a [Cloudflare Worker](https://workers.cloudflare.com/).

Go to `http://localhost:3000/prerender` to see the pre-rendering result.

## Run

To run the example:

1. ```bash
    git clone git@github.com:brillout/vps_prerender-worker
    cd vps_prerender-worker/
    ```

2. Create a Cloudflare account and paste your account id in `wrangler.toml#account_id`.

3. ```bash
   npm install
   ```
   To develop the worker with Miniflare:
   ```bash
   npm run dev:miniflare
   ```
   To build and try the production worker locally:
   ```bash
   npm run prod
   ```
   To build and deploy the worker to Cloudflare Workers:
   ```bash
   npm run deploy
   ```
