Example of running pre-rendering in a [Cloudflare Worker](https://workers.cloudflare.com/).

Go to `localhost:3000/prerender` to see the pre-rendering result.


## Run

To run the example:

1. ```bash
    git clone git@github.com:brillout/vite-plugin-ssr
    cd vite-plugin-ssr/examples/cloudflare-workers-prerender/
    ```

2. Create a Cloudflare account and paste your account id in `wrangler.toml#account_id`.

3. ```bash
   npm install # (do not use yarn, as yarn installs the entire monorepo)
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
