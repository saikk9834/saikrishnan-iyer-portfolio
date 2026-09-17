# saikrishnan-iyer-portfolio

Personal portfolio site for Saikrishnan Srinivas Iyer, AI Software Engineer.

Four pages (home, work, skills, about), a light and dark theme, and a chat widget
that answers questions about my background using my resume as context.

## Stack

- Next.js 15 (App Router) and React 19
- Tailwind CSS v4, with the palette defined as CSS variables in `app/globals.css`
- Radix primitives via shadcn/ui for the handful of components under `components/ui`
- next-themes for the light/dark toggle
- Anthropic SDK for the chat endpoint
- lucide-react for icons

## Running it

Requires Node 20+ and pnpm.

```bash
pnpm install
cp .env.example .env.local   # then add your Anthropic key
pnpm dev
```

The site runs at http://localhost:3000.

Without `ANTHROPIC_API_KEY` set, every page works but the chat widget returns a 503
and shows an error in the bubble.

## Layout

```
app/                 pages and the /api/chat route
components/          navigation, chat widget, and ui/ primitives
lib/projects.ts      project data, shared by the home and work pages
lib/skills.ts        skill data, grouped by category and tagged by role
public/resume.txt    the text the chat endpoint feeds to the model
```

## Theming

Colors live as CSS variables on `:root` and `.dark` in `app/globals.css`, then get
mapped to Tailwind utilities in the `@theme inline` block. Changing a hex there
changes it everywhere. `--brand` is the single accent color: pine green in light,
sage in dark, because one value cannot hit readable contrast on both grounds.

Components should use the semantic tokens (`bg-background`, `text-body`,
`border-border`) rather than raw Tailwind colors, or dark mode breaks.

## Deployment

Vercel, on push to `main`. Set `ANTHROPIC_API_KEY` in the project's environment
variables.

## Contact

Email: saikrishnaniyerjm@gmail.com
LinkedIn: https://linkedin.com/in/saikk9834
GitHub: https://github.com/saikk9834
