# 📋 Panduan Migrasi Frontend ke Next.js

Dokumen ini menjelaskan **seluruh struktur frontend** proyek "Ruang Publik" saat ini (React + Vite + Tailwind CSS) agar bisa dimigrasi ke **Next.js App Router** dengan tampilan **100% identik**.

---

## 📦 Tech Stack Saat Ini

| Teknologi | Versi | Keterangan |
|---|---|---|
| React | ^18.3.1 | UI library |
| Vite | - | Build tool (diganti Next.js) |
| TypeScript | - | Type safety |
| Tailwind CSS | + tailwindcss-animate | Styling |
| shadcn/ui | Default style | UI component library |
| Framer Motion | ^12.34.2 | Animasi |
| React Router DOM | ^6.30.1 | Routing (diganti Next.js App Router) |
| TanStack React Query | ^5.83.0 | Data fetching & caching |
| React Helmet Async | ^2.0.5 | SEO meta tags (diganti Next.js Metadata) |
| Supabase JS | ^2.97.0 | Backend / Database |
| Recharts | ^2.15.4 | Charts (admin insights) |
| React Quill | ^2.0.0 | Rich text editor (admin) |
| Lucide React | ^0.462.0 | Icons |
| date-fns | ^3.6.0 | Date formatting |
| Sonner | ^1.7.4 | Toast notifications |

### Fonts
- **Heading**: `Playfair Display` (weights: 400, 600, 700, 800) via `@fontsource/playfair-display`
- **Body**: `Inter` (weights: 400, 500, 600) via `@fontsource/inter`

---

## 🎨 Design System (KRITIS - Harus 100% Sama)

### CSS Variables (index.css)

```css
:root {
  --background: 40 20% 98%;
  --foreground: 220 20% 10%;
  --card: 40 20% 96%;
  --card-foreground: 220 20% 10%;
  --popover: 0 0% 100%;
  --popover-foreground: 220 20% 10%;
  --primary: 16 80% 52%;
  --primary-foreground: 0 0% 100%;
  --secondary: 40 15% 92%;
  --secondary-foreground: 220 20% 15%;
  --muted: 40 10% 94%;
  --muted-foreground: 220 10% 45%;
  --accent: 16 60% 95%;
  --accent-foreground: 16 80% 40%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 100%;
  --border: 40 15% 88%;
  --input: 40 15% 88%;
  --ring: 16 80% 52%;
  --radius: 0.5rem;
  --sidebar-background: 40 20% 96%;
  --sidebar-foreground: 220 10% 30%;
  --sidebar-primary: 16 80% 52%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent: 40 15% 92%;
  --sidebar-accent-foreground: 220 20% 15%;
  --sidebar-border: 40 15% 88%;
  --sidebar-ring: 16 80% 52%;
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
}

.dark {
  --background: 220 20% 7%;
  --foreground: 40 10% 92%;
  --card: 220 18% 10%;
  --card-foreground: 40 10% 92%;
  --popover: 220 18% 10%;
  --popover-foreground: 40 10% 92%;
  --primary: 16 80% 55%;
  --primary-foreground: 0 0% 100%;
  --secondary: 220 15% 15%;
  --secondary-foreground: 40 10% 90%;
  --muted: 220 15% 15%;
  --muted-foreground: 220 10% 55%;
  --accent: 16 40% 15%;
  --accent-foreground: 16 80% 70%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 100%;
  --border: 220 15% 18%;
  --input: 220 15% 18%;
  --ring: 16 80% 55%;
  --sidebar-background: 220 20% 7%;
  --sidebar-foreground: 40 10% 90%;
  --sidebar-primary: 16 80% 55%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent: 220 15% 15%;
  --sidebar-accent-foreground: 40 10% 90%;
  --sidebar-border: 220 15% 18%;
  --sidebar-ring: 16 80% 55%;
}
```

### Tailwind Config (tailwind.config.ts)

```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

### Prose Article Styles (Custom CSS Class)

```css
.prose-article {
  @apply text-foreground leading-relaxed;
  font-family: var(--font-body);
}
.prose-article h1 { @apply text-4xl font-bold mb-6 mt-10; font-family: var(--font-heading); }
.prose-article h2 { @apply text-2xl font-semibold mb-4 mt-8; font-family: var(--font-heading); }
.prose-article h3 { @apply text-xl font-semibold mb-3 mt-6; font-family: var(--font-heading); }
.prose-article p { @apply mb-4 text-base leading-7; }
.prose-article ul, .prose-article ol { @apply mb-4 pl-6; }
.prose-article li { @apply mb-2; }
.prose-article blockquote { @apply border-l-4 border-primary pl-4 italic my-6 text-muted-foreground; }
.prose-article img { @apply rounded-lg my-6 w-full; }
.prose-article a { @apply text-primary underline underline-offset-2 hover:opacity-80 transition-opacity; }
.prose-article pre { @apply bg-card rounded-lg p-4 overflow-x-auto my-4 text-sm; }
.prose-article code { @apply bg-card px-1.5 py-0.5 rounded text-sm; }
```

### Global Base Styles

```css
* { @apply border-border; }
body { @apply bg-background text-foreground font-body antialiased; }
h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading); }
```

---

## 🗂️ Routing Map (React Router → Next.js App Router)

| React Router Path | Next.js App Router | Page Component | Tipe |
|---|---|---|---|
| `/` | `app/page.tsx` | Index | Public SSR |
| `/article/:slug` | `app/article/[slug]/page.tsx` | ArticleDetail | Public SSR (SEO penting) |
| `/category/:slug` | `app/category/[slug]/page.tsx` | CategoryPage | Public SSR |
| `/tag/:slug` | `app/tag/[slug]/page.tsx` | TagPage | Public SSR |
| `/categories` | `app/categories/page.tsx` | CategoriesList | Public SSR |
| `/tags` | `app/tags/page.tsx` | TagsList | Public SSR |
| `/search` | `app/search/page.tsx` | SearchPage | Public CSR |
| `/admin/login` | `app/admin/login/page.tsx` | AdminLogin | CSR |
| `/admin` | `app/admin/page.tsx` | AdminDashboard | CSR (protected) |
| `/admin/insights` | `app/admin/insights/page.tsx` | AdminInsights | CSR (protected) |
| `/admin/articles` | `app/admin/articles/page.tsx` | AdminArticles | CSR (protected) |
| `/admin/articles/new` | `app/admin/articles/new/page.tsx` | ArticleEditor | CSR (protected) |
| `/admin/articles/:id` | `app/admin/articles/[id]/page.tsx` | ArticleEditor | CSR (protected) |
| `/admin/categories` | `app/admin/categories/page.tsx` | AdminCategories | CSR (protected) |
| `/admin/tags` | `app/admin/tags/page.tsx` | AdminTags | CSR (protected) |
| `/admin/comments` | `app/admin/comments/page.tsx` | AdminComments | CSR (protected) |
| `*` (404) | `app/not-found.tsx` | NotFound | - |

### Layout Structure

```
app/
├── layout.tsx              ← Root layout (fonts, providers, Toaster, Sonner)
├── page.tsx                ← Homepage (Index)
├── not-found.tsx           ← 404 page
├── (public)/               ← Route group untuk public pages
│   ├── layout.tsx          ← PublicLayout (Header + Footer)
│   ├── article/[slug]/page.tsx
│   ├── category/[slug]/page.tsx
│   ├── tag/[slug]/page.tsx
│   ├── categories/page.tsx
│   ├── tags/page.tsx
│   └── search/page.tsx
├── admin/
│   ├── login/page.tsx
│   └── (dashboard)/        ← Route group untuk protected admin
│       ├── layout.tsx       ← AdminLayout (sidebar + auth check)
│       ├── page.tsx         ← AdminDashboard
│       ├── insights/page.tsx
│       ├── articles/page.tsx
│       ├── articles/new/page.tsx
│       ├── articles/[id]/page.tsx
│       ├── categories/page.tsx
│       ├── tags/page.tsx
│       └── comments/page.tsx
```

---

## 🧩 Komponen (Semua Harus Dimigrasi)

### 1. PublicLayout (`src/components/PublicLayout.tsx`)
- Wrapper: `<div className="min-h-screen flex flex-col bg-background">`
- Contains: `<Header />` + `<main className="flex-1">{children}</main>` + `<Footer />`

### 2. Header (`src/components/Header.tsx`)
- **Sticky header**: `border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50`
- **Logo**: `<Link>` dengan class `font-heading text-2xl font-bold text-foreground hover:text-primary transition-colors`, text "Artikel"
- **Desktop nav** (hidden md:flex): items = Beranda `/`, Kategori `/categories`, Tag `/tags`
  - Item class: `text-sm font-medium text-muted-foreground hover:text-foreground transition-colors`
- **Search**: Toggle button → inline `<input>` with form submit navigating to `/search?q=...`
  - Input class: `bg-secondary text-foreground text-sm px-3 py-1.5 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring w-48`
- **Mobile menu**: shadcn `<Sheet>` component, side="right", width w-64
  - Nav items as `<button>` elements with same styling

### 3. Footer (`src/components/Footer.tsx`)
- Container: `border-t border-border bg-card mt-16`
- Inner: `container mx-auto px-4 py-12`
- 3-column grid (md:grid-cols-3):
  - Col 1: Brand "Artikel" + tagline
  - Col 2: Navigation links (Beranda, Kategori, Tag)
  - Col 3: Admin link (Login Admin)
- Bottom: copyright bar `border-t border-border mt-8 pt-8 text-center`

### 4. ArticleCard (`src/components/ArticleCard.tsx`)
- **Props**: `{ article: Article; featured?: boolean }`
- Uses `framer-motion` `<motion.article>` with `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
- **Featured variant** (homepage hero):
  - Grid layout: `grid md:grid-cols-2 gap-6 items-center`
  - Thumbnail: `aspect-[16/10] overflow-hidden rounded-lg bg-muted` + `group-hover:scale-105 transition-transform duration-500`
  - Title: `font-heading text-3xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight`
  - Category badge: `text-xs font-semibold uppercase tracking-wider text-primary`
  - Meta: `<User>` icon + author, `<Calendar>` icon + date (id-ID locale)
- **Default variant** (grid card):
  - Stack layout: `block space-y-3`
  - Thumbnail: same aspect ratio + hover effect
  - Title: `font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug`
  - Excerpt: `text-sm text-muted-foreground line-clamp-2`
  - Meta: smaller (text-xs)

### 5. SEOHead (`src/components/SEOHead.tsx`)
- Di Next.js: Ganti dengan `export const metadata` atau `generateMetadata()` function
- Props yang harus dipetakan:
  - `title` → `<title>` (format: `"${title} | Ruang Publik"` jika < 55 chars)
  - `description` → meta description
  - `keywords` → meta keywords
  - `ogImage`, `ogImageWidth`, `ogImageHeight`, `ogImageType` → Open Graph image
  - `ogType` → og:type (default "website")
  - `url` → canonical + og:url
  - `article` → article meta tags (author, published_time, section, tags)
  - `jsonLd` → JSON-LD structured data
  - `breadcrumbs` → BreadcrumbList JSON-LD
- Site name: "Ruang Publik"

### 6. NavLink (`src/components/NavLink.tsx`)
- Wrapper around React Router's `<NavLink>` with active/pending class support
- Di Next.js: Ganti dengan `<Link>` + `usePathname()` untuk active state

---

## 📄 Halaman Public (Detail Implementasi)

### Homepage (`/`)
- Fetch: `getPublishedArticles(12)` + `getCategories()`
- Layout:
  1. **Featured article** (first item) → `<ArticleCard featured />`
  2. **Category bar**: `flex flex-wrap gap-2 mb-10` → pills `px-4 py-1.5 text-sm font-medium rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground`
  3. **Article grid**: `grid md:grid-cols-2 lg:grid-cols-3 gap-8`
  4. **Empty state**: "Belum Ada Artikel" + "Artikel akan segera hadir. Nantikan!"
  5. **Loading skeleton**: 6 items with pulse animation
- SEO: Title "Ruang Publik — Opini, Analisis & Tulisan", Blog JSON-LD

### Article Detail (`/article/:slug`)
- Fetch: `getArticleBySlug(slug)` + `getRelatedArticles()` + `getComments()`
- Layout (`container mx-auto px-4 py-12 max-w-3xl`):
  1. **Breadcrumb**: `text-sm text-muted-foreground` → Beranda / Kategori / Title
  2. **Category label**: `text-xs font-semibold uppercase tracking-wider text-primary`
  3. **Title**: `font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4`
  4. **Meta bar**: author + date with icons
  5. **Thumbnail**: `aspect-[16/9] overflow-hidden rounded-lg mb-8 bg-muted`
  6. **Content**: `<div className="prose-article" dangerouslySetInnerHTML={{ __html: content }} />`
  7. **Tags**: pills with `bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground`
  8. **Share buttons**: Facebook, Twitter/X, WhatsApp → `p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground`
  9. **Comments section**: nested comments with reply form
  10. **Related articles**: `grid md:grid-cols-3 gap-6`
- SEO: Article JSON-LD, OG image, breadcrumbs
- Analytics: `trackPageView()` + `setupAutoTrack()` on mount
- Share URL hardcoded: `https://ruangpublik.fun/article/${slug}`

### Category Page (`/category/:slug`)
- Fetch: `getArticlesByCategory(slug)`
- Breadcrumb: Beranda / Kategori / {name}
- Title: `font-heading text-4xl font-bold mb-8`
- Article grid: `grid md:grid-cols-2 lg:grid-cols-3 gap-8`

### Tag Page (`/tag/:slug`)
- Same as Category but with `#` prefix on title
- Fetch: `getArticlesByTag(slug)`

### Categories List (`/categories`)
- Fetch: `getCategories()`
- Grid: `grid-cols-2 md:grid-cols-3 gap-4`
- Card: `p-6 rounded-lg bg-card border border-border hover:border-primary hover:shadow-sm transition-all group`

### Tags List (`/tags`)
- Fetch: `getTags()`
- Pills: `flex flex-wrap gap-3`
- Pill: `px-4 py-2 text-sm font-medium rounded-full bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground`

### Search Page (`/search`)
- Client-side search with URL param `?q=`
- Search form: `flex gap-2 mb-10 max-w-xl`
- Results: article grid same pattern

### 404 Page
- Centered: `flex min-h-screen items-center justify-center bg-muted`
- Title "404" + "Oops! Page not found" + link to home

---

## 🔐 Halaman Admin (Detail Implementasi)

### AdminLayout
- **Auth check**: `supabase.auth.getSession()` → check `user_roles` table for "admin" role
- **Desktop**: sidebar `w-64 border-r border-border bg-card` + content area
- **Mobile**: top bar `h-16 border-b border-border bg-card` + Sheet menu
- **Nav items**: Dashboard, Insight, Artikel, Kategori, Tag, Komentar
  - Active: `bg-primary text-primary-foreground`
  - Inactive: `text-muted-foreground hover:bg-secondary hover:text-foreground`
- **Auth state listener**: redirect to `/admin/login` on sign out

### AdminLogin
- Centered form `max-w-sm`
- Email/password → `supabase.auth.signInWithPassword()`
- Checks admin role after login

### AdminDashboard
- 4 stat cards: Total Artikel, Komentar Pending, Kategori, Tag
- Card: `bg-card border border-border rounded-lg p-5`
- Count uses `select("*", { count: "exact", head: true })`

### AdminArticles
- Table with columns: Judul, Kategori, Status (Badge), Tanggal, Link (copy), Aksi (edit/preview/delete)
- Copy link → `https://ruangpublik.fun/article/${slug}`
- Alert for articles without thumbnails

### ArticleEditor
- Fields: Title, Slug (auto-generated), Author, Excerpt, Content (ReactQuill), Thumbnail (upload or URL), Category (Select), Tags (toggle pills), Status, SEO fields
- ReactQuill toolbar: headers, bold/italic/underline/strike, lists, blockquote, code-block, link, image
- Thumbnail upload to Supabase Storage bucket "thumbnails"

### AdminCategories & AdminTags
- Simple CRUD: input + add button, list with delete
- Uses `slugify()` for auto-slug generation

### AdminComments
- List with approve/delete actions
- Shows article title, commenter name/email, content, status badge (Pending/Approved)

### AdminInsights (691 lines)
- Date range filter: Hari Ini / 7 Hari / 30 Hari / Custom
- Category & Article filters
- 4 stat cards: Total Kunjungan, Total Klik, Total Bagikan, Jangkauan
- Tabs: Ringkasan, Traffic, Konten
  - Ringkasan: Line chart (tren kunjungan), Bar chart (per kategori)
  - Traffic: Pie charts (sumber traffic, tipe perangkat)
  - Konten: Top clicked & shared articles
- Uses Recharts with shadcn ChartContainer

---

## 📡 Data Layer (`src/lib/api.ts`)

### Interfaces
```ts
interface Article {
  id: string; title: string; slug: string; excerpt: string | null;
  content: string | null; author_name: string; thumbnail_url: string | null;
  meta_title: string | null; meta_description: string | null;
  meta_keywords: string | null; category_id: string | null;
  status: string; published_at: string | null;
  created_at: string; updated_at: string; user_id: string;
  category?: Category | null; tags?: Tag[];
}
interface Category { id: string; name: string; slug: string; description: string | null; created_at: string; }
interface Tag { id: string; name: string; slug: string; created_at: string; }
interface Comment { id: string; article_id: string; parent_id: string | null; name: string; email: string; content: string; is_approved: boolean; created_at: string; replies?: Comment[]; }
```

### API Functions
| Function | Query | Notes |
|---|---|---|
| `getPublishedArticles(limit, offset)` | articles + categories join + article_tags | Returns `{ articles, total }` |
| `getArticleBySlug(slug)` | articles + categories + tags | Single article |
| `getArticlesByCategory(categorySlug)` | categories → articles | Returns `{ articles, category }` |
| `getArticlesByTag(tagSlug)` | tags → article_tags → articles | Returns `{ articles, tag }` |
| `searchArticles(query)` | ilike on title, excerpt, content | Array of articles |
| `getRelatedArticles(articleId, categoryId, tagIds, limit)` | Same category, exclude current | Array |
| `getCategories()` | categories order by name | Array |
| `getTags()` | tags order by name | Array |
| `getComments(articleId)` | comments where approved, with nesting | Threaded comments |
| `postComment(articleId, name, email, content, parentId?)` | Insert into comments | - |
| `slugify(text)` | Utility function | lowercase, replace spaces with dashes |

### Di Next.js:
- Public pages: gunakan **Server Components** dengan Supabase server client
- Admin pages: tetap **Client Components** ("use client") dengan Supabase browser client
- Ganti React Query di server components dengan direct async fetch

---

## 📊 Analytics (`src/lib/analytics.ts`)

- Endpoint: `${SUPABASE_URL}/functions/v1/track-analytics`
- Functions:
  - `trackPageView({ articleId })` → detects traffic source & device type
  - `trackEvent(eventType, articleId, metadata)` → click, share, bookmark, visit_duration
  - `trackShare(articleId, platform)` 
  - `setupAutoTrack(articleId)` → tracks page view + visit duration on unload

---

## 🗄️ Database Schema (Supabase)

### Tables
| Table | Description |
|---|---|
| `articles` | Articles with title, slug, content, author, thumbnail, meta, status, category_id |
| `categories` | Category with name, slug, description |
| `tags` | Tag with name, slug |
| `article_tags` | Many-to-many junction (article_id, tag_id) |
| `comments` | Comments with name, email, content, parent_id, is_approved |
| `user_roles` | Role-based access (user_id, role: admin/moderator/user) |
| `page_views` | Page view analytics (article_id, device_type, traffic_source, referrer, visitor_ip, viewed_at, etc.) |
| `analytics_events` | Event tracking (event_type: click/share/bookmark/visit_duration, article_id, metadata) |
| `daily_analytics` | Aggregated daily stats |
| `category_analytics` | Aggregated category stats |

### Supabase Config
```
URL: https://pglacxrohfpjskdmhjxs.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnbGFjeHJvaGZwanNrZG1oanhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MDI1OTYsImV4cCI6MjA4NzA3ODU5Nn0.tP4hN5eVs43nYfqNTluZs3utqTvriHLAYweUsRCOL04
```

---

## 🔑 Utilitas (`src/lib/utils.ts`)

```ts
// Tailwind class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert relative URL to absolute
export function getAbsoluteUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}${url.startsWith("/") ? "" : "/"}${url}`;
}
```

---

## 🌐 SEO & HTML (`index.html`)

```html
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ruang Publik — Opini, Analisis & Tulisan</title>
  <meta name="description" content="Baca artikel opini, analisis mendalam, dan tulisan pribadi tentang berbagai topik menarik di Ruang Publik." />
  <meta name="author" content="Ruang Publik" />
  <meta property="og:site_name" content="Ruang Publik" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Ruang Publik — Opini, Analisis & Tulisan" />
  <meta property="og:description" content="Baca artikel opini, analisis mendalam, dan tulisan pribadi tentang berbagai topik menarik di Ruang Publik." />
  <meta name="google-adsense-account" content="ca-pub-2758292655171382">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2758292655171382" crossorigin="anonymous"></script>
</head>
```

### Google AdSense
- Publisher ID: `ca-pub-2758292655171382`
- `ads.txt` sudah ada di `/public/ads.txt`

---

## 📦 shadcn/ui Components yang Digunakan

Semua komponen shadcn/ui berikut harus diinstall di proyek Next.js:

- `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`
- `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`
- `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`
- `hover-card`, `input`, `input-otp`, `label`, `menubar`, `navigation-menu`
- `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`
- `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`
- `switch`, `table`, `tabs`, `textarea`, `toast`, `toaster`, `toggle`, `toggle-group`, `tooltip`

**Yang aktif digunakan di komponen custom:**
- `button`, `input`, `textarea`, `select`, `tabs`, `sheet`, `badge`, `card`, `alert`, `toast/toaster/sonner`, `tooltip`, `chart`

---

## 🔄 Migration Checklist

### Phase 1: Setup
- [ ] `npx create-next-app@latest` dengan TypeScript + Tailwind + App Router
- [ ] Copy `tailwind.config.ts` (update content paths)
- [ ] Copy CSS variables dari `index.css` ke `globals.css`
- [ ] Install fonts: `@fontsource/playfair-display`, `@fontsource/inter`
- [ ] Install: `@supabase/supabase-js`, `@supabase/ssr`
- [ ] Install: `framer-motion`, `lucide-react`, `date-fns`, `recharts`, `react-quill`, `sonner`
- [ ] Setup shadcn/ui: `npx shadcn@latest init`
- [ ] Install semua shadcn components yang dibutuhkan

### Phase 2: Core
- [ ] Setup Supabase client (server + browser) menggunakan `@supabase/ssr`
- [ ] Buat `lib/api.ts` (server version tanpa React Query untuk SSR)
- [ ] Buat `lib/api-client.ts` (client version untuk admin pages)
- [ ] Setup React Query provider (untuk admin pages)
- [ ] Buat root `layout.tsx` dengan fonts + providers

### Phase 3: Public Pages
- [ ] Buat `(public)/layout.tsx` dengan Header + Footer
- [ ] Migrasi Homepage → `app/page.tsx` (Server Component + `generateMetadata`)
- [ ] Migrasi ArticleDetail → `app/article/[slug]/page.tsx` (SSR + metadata)
- [ ] Migrasi CategoryPage, TagPage, CategoriesList, TagsList
- [ ] Migrasi SearchPage (Client Component)
- [ ] Migrasi NotFound → `app/not-found.tsx`
- [ ] Ganti semua `<Link to="">` → `<Link href="">`
- [ ] Ganti `useNavigate()` → `useRouter()`
- [ ] Ganti `useParams()` → page props `params`
- [ ] Ganti `useSearchParams()` → `searchParams` prop atau `useSearchParams()`

### Phase 4: Admin Pages
- [ ] Buat `admin/login/page.tsx` ("use client")
- [ ] Buat `admin/(dashboard)/layout.tsx` ("use client", auth check)
- [ ] Migrasi semua admin pages sebagai Client Components
- [ ] Setup React Query di admin layout

### Phase 5: SEO & Analytics
- [ ] Implementasi `generateMetadata()` untuk setiap public page
- [ ] Implementasi JSON-LD structured data
- [ ] Migrasi analytics tracking (client-side)
- [ ] Setup `robots.txt` dan `sitemap.xml` (Next.js conventions)
- [ ] Setup Google AdSense di root layout

### Phase 6: Deployment
- [ ] Setup environment variables di Vercel
- [ ] Configure `next.config.js` (images, redirects)
- [ ] Test semua routes
- [ ] Verify OG meta tags dengan Facebook Debugger
- [ ] Setup custom domain

---

## ⚠️ Perhatian Khusus

1. **`dangerouslySetInnerHTML`**: ArticleDetail menggunakan ini untuk render HTML content dari ReactQuill. Di Next.js tetap sama, tapi pastikan sanitization.

2. **`window.location`**: Beberapa komponen mengakses `window.location.origin`. Di Next.js Server Components, gunakan header `x-forwarded-host` atau env variable `NEXT_PUBLIC_SITE_URL`.

3. **Share URL**: Hardcoded ke `https://ruangpublik.fun`. Pertimbangkan menggunakan env variable.

4. **Supabase Storage**: Thumbnail upload ke bucket "thumbnails". Pastikan bucket sudah dibuat dan policy RLS sesuai.

5. **Date locale**: Semua tanggal menggunakan `toLocaleDateString("id-ID")` (Bahasa Indonesia).

6. **Framer Motion**: Gunakan `framer-motion` di Client Components saja (tambahkan `"use client"` directive).

7. **React Quill**: Hanya digunakan di admin ArticleEditor, harus lazy-loaded karena tidak support SSR (`dynamic(() => import('react-quill'), { ssr: false })`).
