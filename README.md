# First Class Auto Transport

This project is a React + Vite website for First Class Auto Transport.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create a local `.env` file in the project root:

```env
VITE_FORMSPREE_FORM_ID=meeweerg
```

3. Start the development server:

```bash
npm run dev
```

## Important notes

- Do not commit `.env` or `.env.local`
- The project `.gitignore` already ignores environment files
- Quote requests are sent to Formspree only when `VITE_FORMSPREE_FORM_ID` is set

## Vercel setup

Add the same environment variable in your Vercel project settings:

- Key: `VITE_FORMSPREE_FORM_ID`
- Value: your Formspree form ID, such as `meeweerg`

After adding the variable in Vercel, redeploy the site so the client build can read it.
