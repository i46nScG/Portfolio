# Tokioshy — Portfolio

My personal portfolio website for whatever it was... Looks cool, and I have `is-a.dev` subdomain, so why not.
Built with **React**, **Vite**, **TypeScript** and **Tailwind CSS**, with **Radix UI** for accessible components and **Framer Motion** for animation.

## Features

- Dark and light mode (follows the system setting on first visit, remembered afterwards)
- Responsive layout for mobile, tablet and desktop
- Full-screen sections with hash navigation and smooth scrolling
- GitHub profile avatar that follows the current profile image
- Interactive slash-command console in the hero (`/help`, `/about`, `/projects`, `/stack`, `/contact`, `/theme`, `/clear` and the fun ones), with command history on ↑ / ↓ and a `/commands` menu
- Typing animation, spring-driven scroll progress bar, scroll reveals, cursor glow and 3D tilt on cards
- Project filter (All / Discord bots / Web apps) built on Radix Tabs, with an animated pill
- Project and showcase details open in a Radix Dialog
- Radix Tooltips on stack badges, social links and the "Copy email" button
- Mobile navigation with a Radix Dropdown Menu
- Respects `prefers-reduced-motion`

## Project structure

```
.
├── index.html                  # Entry HTML: meta tags, fonts, theme script, loader markup
├── public/
│   ├── favicon.svg
│   ├── google5ecfd878f3b7470c.html
│   ├── robots.txt
│   ├── sitemap.xml
│   └── assets/                 # Showcase images (.webp)
├── src/
│   ├── main.tsx                # React entry (MotionConfig reducedMotion="user")
│   ├── App.tsx                 # Providers and page layout
│   ├── index.css               # Tailwind entry, theme colors, custom styles
│   ├── data/                   # Content: projects, stack, showcase, site info
│   ├── hooks/                  # Theme, typing animation, section navigation, loader
│   └── components/
│       ├── Header.tsx, ThemeToggle.tsx, Loader.tsx
│       ├── ScrollProgress.tsx, CursorGlow.tsx
│       ├── sections/           # Hero, About, Projects, Stack, Showcase, Contact
│       ├── terminal/           # HeroTerminal and the command definitions
│       └── ui/                 # Motion (Reveal/Rise/Stagger), TiltCard, Modal, MotionMenu, Tip
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
├── vercel.json                 # Build settings for Vercel
└── package.json
```

## Customizing

| What                              | Where                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------ |
| Name, bio, contact text           | `src/components/sections/*.tsx`                                                |
| Projects                          | `src/data/projects.ts`                                                         |
| Stack badges, stack cards         | `src/data/stack.ts`                                                            |
| Showcase items                    | `src/data/showcase.ts` (images in `public/assets/`)                            |
| Typed roles, email, social links  | `src/data/site.ts`                                                             |
| Console commands and their output | `src/components/terminal/commands.tsx`                                         |
| Colors (light and dark)           | CSS variables in `src/index.css` (`:root` and `.dark`)                         |
| Fonts                             | Google Fonts `<link>` in `index.html` and `fontFamily` in `tailwind.config.js` |

To add a project, add an object to the `projects` array in `src/data/projects.ts`:

```ts
{
    name: "My Project",
    lang: "JavaScript",
    status: "current focus",
    type: "bots", // "bots" or "web"
    tag: "Discord Bot",
    url: "https://github.com/i46nScG/My-Project",
    desc: "Short description.",
    proof: "What was hard and how it was solved.",
    meta: [{ label: "Engine", value: "Discord.js" }],
    footer: "Short footer text",
    // Web apps can also set: previewUrl, previewBadge
}
```

To add a console command, add an entry to the `commands` object in `src/components/terminal/commands.tsx`. It shows up in the `/commands` menu and in `/help` under "Fun" automatically (unless you also add it to `mainCommands`).

## Run locally

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Other commands:

- `npm run build` — type-check, then create the production build in `dist/`
- `npm run preview` — serve the production build locally
- `npm run typecheck` — run the TypeScript check only

## Deploy

`vercel.json` already sets the framework (Vite), the build command (`npm run build`) and the output directory (`dist`).

## SEO

The canonical site URL is `https://tiko.is-a.dev/`, configured in `index.html`, `public/sitemap.xml`, and `public/robots.txt`. If the primary domain changes, update it in all three files. After deploying, submit `https://tiko.is-a.dev/sitemap.xml` in Google Search Console and request indexing for the canonical homepage. Configure the custom domain as the primary domain in Vercel so its URL is preferred over the `vercel.app` address.
