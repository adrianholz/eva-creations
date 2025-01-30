# Ultimate Quick Stack

This is a Next.js boilerplate project that integrates Next.js, Tailwind CSS, MongoDB (with Mongoose), Auth0, and Stripe. It is a great starting point for building full-stack applications with Next.js.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Auth0](https://auth0.com/)
- [Stripe](https://stripe.com/)

## Getting Started

First, clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd ultimate-quick-stack
```

Next, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Next, create a `.env.local` file in the root of the project and add the following environment variables:

```bash
# Auth0
AUTH0_SECRET=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_REDIRECT_URI=

# MongoDB
MONGODB_URI=

# Stripe

STRIPE_SECRET_KEY=
STRIPE_PRICE=

# Frontend Variables

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```


Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```



## Watch the video

Watch the YouTube video to learn how this project was put together:

[![The Best Tech Stack for Web Development in 2025](https://img.youtube.com/vi/BoUVIhtqjAw/0.jpg)](https://youtu.be/BoUVIhtqjAw)

If you like the video, please subscribe to the channel!

## License

This project is licensed under the MIT License.

## Credit

This project was created by [Tom Shaw](https://tomshaw.dev)
