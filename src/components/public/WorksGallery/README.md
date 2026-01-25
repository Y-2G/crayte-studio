# WorksGallery Component

Dark-themed gallery component for displaying featured works and recent achievements.

## Features

- Featured work card (large) + 2 sub work cards (vertical layout)
- Dark background aesthetic (`var(--redesign-bg-dark)`)
- Generative pattern placeholder for works without images
- Hover effects with scale and overlay animations
- Fully responsive (desktop → tablet → mobile)
- Catalog-based UI design

## Usage

```tsx
import { WorksGallery } from "@/components/public/WorksGallery";
import type { Work } from "@/types";

const works: Work[] = [
  {
    id: "1",
    slug: "project-alpha",
    title: "Project Alpha",
    description: "A cutting-edge web application",
    client: "Client Inc.",
    venue: "Tokyo",
    date: "2024-01-15",
    status: "live",
    images: ["/images/works/project-alpha.jpg"],
    tags: ["web", "react", "nextjs"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  // ... more works
];

export default function HomePage() {
  return (
    <main>
      <WorksGallery works={works} />
    </main>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `works` | `Work[]` | Yes | Array of work items to display |
| `className` | `string` | No | Additional CSS class name |

## Layout

### Desktop (>1024px)
```
┌────────────────┐ ┌──────────┐
│                │ │          │
│  Featured Work │ │  Work 2  │
│  (大画像)      │ │          │
│                │ └──────────┘
│  Title         │ ┌──────────┐
│  Client        │ │          │
│  #tags         │ │  Work 3  │
└────────────────┘ └──────────┘
```

### Tablet (768px-1023px)
```
┌────────────────────────┐
│  Featured Work         │
└────────────────────────┘
┌──────────┐ ┌──────────┐
│  Work 2  │ │  Work 3  │
└──────────┘ └──────────┘
```

### Mobile (<768px)
All works stack vertically in a single column.

## Styling

The component uses CSS Modules with these key variables:

- `--redesign-bg-dark`: Section background
- `--redesign-text-light`: Text color
- `--redesign-primary`: Gradient start for placeholders
- `--redesign-accent`: Gradient end, CTA button border

## Accessibility

- Semantic HTML with proper heading hierarchy
- Keyboard navigable links
- Focus states with visible outline
- Descriptive alt text for images
- ARIA-compliant structure

## Image Handling

- Real images: Displayed using Next.js `Image` component with proper sizing
- No images: Generative gradient pattern with radial overlays
- Aspect ratio: 4:3 (75% padding-top)

## Notes

- Component displays up to 3 works (1 featured + 2 others)
- If no works provided, component returns `null`
- Link to `/works` for viewing all works
- Tags are limited to 3 per card
