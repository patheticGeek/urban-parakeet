# Wisdom Circle

> Take home coding assignment

### Dev setup

1. Install dependencies
   ```
   pnpm i
   ```
2. Setup env
   ```
   touch .env
   ```
3. Start dev
   ```
   pnpm dev
   ```

### Tech used

- `pnpm`: For package management
- `Next.js`: A meta framework for react
- `tRPC`: For creating type-safe api routes in next.js
- `zod`: A runtime schema validation library
- `Prisma`: Database ORM and schema management
- `PlanetScale`: Database provider
- `Vercel`: Hosting

### Decisions made

The first one is using Next.js with tRPC to create the whole project. Here tRPC gets us to type safe routes with react query pre-configured and saves us a lot of time setting up express/nest and react query separately. We can just move the api to a different server with express and deploy backend elsewhere easily when time comes.

Using custom auth over libraries like next auth. While these help implement auth fast, they aren't very flexible and are slow.

Sending mails in api handler itself. When traffic grows we should probably have a queue in which we push mails to be sent, and they get sent from a different service.

For now I have defined only the tokens used in tailwind. If I was implementing this for real, I'd have implemented the whole design system including sizes and stuff.

For emails I have just hand written text mails, if I had to do it in a better way i'd have used `react-email` and made mails using that. Service I am using is SendInBlue with my personal domain (patheticgeek.dev).
