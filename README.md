# BookNook — A Small Online Library

**Live design preview:** [BookNook](https://booknook-reading-room-nov.nobonitaniha3.chatgpt.site)  
**Preview:** owner-private; open with the same ChatGPT account. Choose **Try as a reader** to explore the browser-local sample library. Email/Google authentication and MongoDB use the full-stack configuration below. Add your configured Vercel/Render production URL before assignment submission.

BookNook is a reader-powered online library: add a book, borrow a book, return a book. Built with Next.js App Router, Tailwind CSS and JavaScript ES6, with BetterAuth, its MongoDB Adapter and signed JWTs for the separate Express API.

## Features

- A responsive editorial interface with Inter and DM Sans, a white/soft-beige/deep-green palette, an accessible dark/light toggle and Motion scroll reveals.
- A full-width three-slide Swiper hero and 13 homepage sections: latest arrivals, category shelves, community collection, a large fiction banner, available books, three story spotlights, Picks for You, featured authors, reading rituals, borrowing benefits and the reading journal.
- Search by title/author, category and availability filters, sorting and server pagination; three catalog cards per desktop row.
- Email/password registration and login, Google OAuth, persistent BetterAuth sessions and safe return-to-page login redirects.
- Private Add Book, Book Details, My Books, My Borrows and My Profile pages.
- Real imgbb cover uploads, Postimages direct-link support, read-only user identity and validated Total Copies.
- Prefilled book editing, custom delete confirmation, owner-only controls and real MongoDB persistence through Express.
- Seven-day borrowing, due dates, returning, no duplicate active borrow and atomic stock accounting.
- Toast feedback, loading spinners, empty/error states, per-route titles and a custom 404 page.
- Self-hosted fonts and bundled sample covers; no Lorem ipsum, browser alert, browser confirm or fake purchase interface.

## Run locally

Use Node.js 22.20+ or 24 LTS. Copy `.env.example` to `.env.local` and configure MongoDB Atlas, a random BetterAuth secret, the Express API URL, Google OAuth and imgbb. Client and server must use the same MongoDB database. See the parent README for the complete walkthrough.

```bash
npm ci
npm run dev
```

Default client URL: [http://localhost:3000](http://localhost:3000). The Express API runs separately at `http://localhost:5000`.

```bash
npm test
npm run build
npm start
```

## Authentication

BetterAuth runs in Next.js at `/api/auth/[...all]`, persists sessions/users in MongoDB, provides `/api/auth/token` and `/api/auth/jwks`, and signs short-lived Ed25519 JWTs for the Express API. Passwords require at least 6 characters, uppercase and lowercase letters; validation exists in both the form and auth hook. Email sign-up redirects to Login. Google sign-up returns Home. Email verification and password-reset methods are intentionally absent.

Set Google’s redirect URI to `<BETTER_AUTH_URL>/api/auth/callback/google`. Put the two Google secrets on the Next.js host, never in `NEXT_PUBLIC_*` variables. `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true` only enables the UI path; real OAuth credentials must also be configured.

JWTs stay in request memory and are not saved in localStorage. Private page requests validate the database-backed session before rendering. Client-side session loading does not trigger premature Login redirects.

## Routes

| Route                 | Access           |
| --------------------- | ---------------- |
| `/`                   | Public           |
| `/books`              | Public           |
| `/login`, `/register` | Public           |
| `/books/[id]`         | Signed-in reader |
| `/add-book`           | Signed-in reader |
| `/my-books`           | Signed-in reader |
| `/my-books/[id]/edit` | Owner            |
| `/my-borrows`         | Signed-in reader |
| `/profile`            | Signed-in reader |

## Deploy

Import this folder as its own GitHub repository into Vercel, choose Next.js, add `.env.example` keys as environment variables, and deploy. Use the final client origin for `BETTER_AUTH_URL`/`NEXT_PUBLIC_SITE_URL`, the Express host for `NEXT_PUBLIC_API_URL`, and update server CORS and Google callback URLs. Do not use static export. All nested routes are handled by the Next.js server.

After full-stack deployment, add its production live URL above and update footer contact/social destinations. The `.example` email and platform-home links are sample configuration, not verified BookNook accounts.

## Assets

The 26 sample book cover thumbnails use ISBN-linked publisher covers from the Penguin Random House cover CDN. Edition and cover source links are in the server seed data. Author portrait/article source links are in `src/data/authors.js`. Journal photos: Unsplash, with photo IDs credited in the parent README. Fonts: self-hosted Inter and DM Sans via Fontsource npm packages. Icons: Lucide. Original website copy; layout inspired by the supplied Bokifa screenshots.

Validated here: Next.js production build, 8 client tests and sample-data visual review of actual source components at desktop and 320px/375px mobile widths. Live MongoDB integration, Google OAuth and imgbb require a configured environment; see the parent README for exact verification limits.


## Typography and homepage structure

All homepage sections have their own component under `src/components/home/`. Shared shelves reuse `BookShelf`; a shared provider avoids repeated catalog downloads. The six-book New Arrivals query remains independent and uses the required database sort/limit. There are no additional Express routes.

The editorial scale is centralized in Tailwind theme tokens: hero 40–68px, route title 40–56px, section heading 32–44px, book title 21–23px, and body/input/navigation/button/supporting text 16px (announcement bar 14px). The hero background spans the viewport edge to edge. Other content uses a 1360px container, equal cover ratios and section padding of 64px on mobile / 96px on desktop. The header scroll-progress line is removed; Motion reveals, Swiper animation and reduced-motion support remain.
