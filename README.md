This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

{
"name": "nft_content",
"version": "0.1.0",
"private": true,
"scripts": {
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint"
},
"dependencies": {
"@biconomy/smart-account": "^0.0.4",
"@biconomy/web3-auth": "^0.0.4",
"@headlessui/react": "^1.7.4",
"@heroicons/react": "^1.0.6",
"@types/node": "18.11.10",
"@types/react": "18.0.26",
"@types/react-dom": "18.0.9",
"crypto-browserify": "^3.12.0",
"eslint": "8.29.0",
"eslint-config-next": "13.0.6",
"ethers": "^5.7.2",
"fs": "^0.0.1-security",
"net": "^1.0.2",
"next": "13.0.6",
"path-browserify": "^1.0.1",
"react": "18.2.0",
"react-dom": "18.2.0",
"react-icons": "^4.7.1",
"tls": "^0.0.1",
"typescript": "4.9.3"
},
"devDependencies": {
"assert": "^2.0.0",
"autoprefixer": "^10.4.13",
"browserify-zlib": "^0.2.0",
"https-browserify": "^1.0.0",
"os-browserify": "^0.3.0",
"postcss": "^8.4.19",
"process": "^0.11.10",
"react-app-rewired": "^2.2.1",
"stream-browserify": "^3.0.0",
"stream-http": "^3.2.0",
"tailwindcss": "^3.2.4",
"url": "^0.11.0"
}
}
