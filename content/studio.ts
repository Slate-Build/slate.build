export type Project = {
  index: string
  slug: string
  title: string
  category: string
  year: string
  summary: string
  disciplines: string[]
  visual: 'meridian' | 'lattice' | 'plinth' | 'fieldnote'
  study: {
    premise: string
    approach: string
    demonstrates: string[]
    status: string
  }
}

/**
 * All work shown on the site is self-initiated concept study.
 * No client engagements, commissioned work, or measured results exist yet,
 * so nothing here is presented as a client case study.
 */
export const projects: Project[] = [
  {
    index: '01',
    slug: 'meridian',
    title: 'Meridian',
    category: 'Digital Experience',
    year: '2026',
    summary:
      'A reading experience for institutional archives, where navigation is treated as cartography rather than a menu.',
    disciplines: ['Interaction design', 'Interface engineering', 'Motion system'],
    visual: 'meridian',
    study: {
      premise:
        'Archives hold material that is genuinely hard to browse: correspondence, field notes, marginalia, half-catalogued fragments. The usual response is a filter panel. Meridian starts from the opposite position — that the collection has geography, and that a reader should be able to move through it the way they would move through a map.',
      approach:
        'The interface is built around a single continuous field. Every record sits at a coordinate derived from its subject and date, so relationships appear as proximity rather than as a result of clicking. Panning is the primary gesture; filters are secondary and always reversible. Type, spacing and motion are held to one rhythm so that the reader is never surprised by a second interface appearing underneath the first.',
      demonstrates: [
        'Dense information held in a calm, legible hierarchy',
        'A motion vocabulary that carries meaning instead of decorating',
        'Rendering and input behaviour that stay smooth on modest hardware',
      ],
      status:
        'Self-initiated concept study. No client engagement, and no measured outcome is claimed for it.',
    },
  },
  {
    index: '02',
    slug: 'lattice',
    title: 'Lattice',
    category: 'Creative Technology',
    year: '2026',
    summary:
      'A generative identity system in which the mark, the palette and the rhythm of the layout are all derived from one seed.',
    disciplines: ['Generative design', 'Design systems', 'Front-end engineering'],
    visual: 'lattice',
    study: {
      premise:
        'Most identity systems are static files that have to be re-laid-out by hand every time they meet a new surface. Lattice asks a narrower question: how much of a visual identity can be generated from a single parameter, without the result becoming generic?',
      approach:
        'A seed produces a mark, a two-ink palette, and a set of layout ratios. Those values are written back into the design system as custom properties, so components, dividers, and typographic scale move together. The seed is stable per surface — the identity is consistent within itself but not fixed across every context it appears in. The mark animates from the same parameters that produced it, so the identity is visibly alive without being decorative.',
      demonstrates: [
        'One parameter set driving mark, colour and layout',
        'A component system that restyles without per-surface overrides',
        'Static, print-faithful fallbacks where motion is not wanted',
      ],
      status:
        'Self-initiated concept study. Built as a technical exercise in derived design systems, not as client work.',
    },
  },
  {
    index: '03',
    slug: 'plinth',
    title: 'Plinth',
    category: 'Website Design & Development',
    year: '2025',
    summary:
      'A gallery platform for a furniture maker, where the page is emptied of everything that is not the object.',
    disciplines: ['Art direction', 'Web design', 'Development'],
    visual: 'plinth',
    study: {
      premise:
        'Furniture photography is unforgiving. Any device, chrome, or layout decision competes with a photograph that was composed in a studio. Plinth is an argument for subtraction as a design method rather than as a lack of content.',
      approach:
        'Objects are presented on a measured grid, at a scale that lets proportion do the talking. The interface recedes: type is small and precise, rules are hairline, and the only large element on any screen is the object itself. Pages transition by cutting rather than sliding, which keeps the sequence feeling like a gallery rather than an app.',
      demonstrates: [
        'Restraint as a deliberate, defensible art direction',
        'Image delivery that stays fast at print resolution',
        'Transitions that respect the material on screen',
      ],
      status:
        'Self-initiated concept study. The maker referenced here is fictional and no commission was placed.',
    },
  },
  {
    index: '04',
    slug: 'fieldnote',
    title: 'Fieldnote',
    category: 'Product Development',
    year: '2025',
    summary:
      'A recording tool for conservation teams working offline, in poor light, with gloved hands.',
    disciplines: ['Product design', 'Interface design', 'Offline-first engineering'],
    visual: 'fieldnote',
    study: {
      premise:
        'Most software is designed for a desk with a keyboard, a bright screen and a reliable network. Conservation work happens in cold storage rooms and on unstable ground, where the requirements invert: large targets, high contrast, no typing, and absolutely no dependency on a connection.',
      approach:
        'Every control is a large, unambiguous target placed where a thumb or a gloved hand can reach it. Data is captured locally first and synchronised opportunistically, so a lost signal never loses work. The interface is designed to be read at arm’s length in dim light, with a single accent reserved for the one thing that requires attention: what has not yet been saved.',
      demonstrates: [
        'Product design driven by physical constraints, not assumptions',
        'Reliable offline capture and conflict-aware synchronisation',
        'An interface legible at low light and low attention',
      ],
      status:
        'Self-initiated concept study. No conservation team commissioned or validated this product.',
    },
  },
]

export const services = [
  {
    index: '01',
    title: 'Digital Experiences',
    description:
      'Interfaces with a point of view — products, platforms and editorial experiences designed as one continuous system rather than a set of screens.',
    deliverables: ['Experience architecture', 'Interface design', 'Motion systems', 'Design direction'],
  },
  {
    index: '02',
    title: 'Website Design & Development',
    description:
      'Marketing and editorial sites built to the same standard as the product work: art-directed, fast, and maintainable after handover.',
    deliverables: ['Art direction', 'Design systems', 'Front-end build', 'CMS integration'],
  },
  {
    index: '03',
    title: 'Product Development',
    description:
      'Software designed and engineered by the same team, so what gets specified is what gets built — including the states nobody prototypes.',
    deliverables: ['Product definition', 'Interface engineering', 'Platform work', 'Quality assurance'],
  },
  {
    index: '04',
    title: 'Creative Technology',
    description:
      'Generative systems, real-time graphics and unusual interfaces — technology used to make something that could not be templated.',
    deliverables: ['Creative direction', 'Generative systems', 'Real-time graphics', 'Technical prototypes'],
  },
  {
    index: '05',
    title: 'Digital Strategy',
    description:
      'The unglamorous work of establishing what a digital presence is for, who it serves, and how it will be judged.',
    deliverables: ['Positioning', 'Platform choice', 'Content strategy', 'Measurement'],
  },
] as const

export const process = [
  {
    index: '01',
    title: 'Discover',
    description:
      'We interrogate the problem before designing anything: who it serves, what it must change, and what success would actually look like.',
    output: 'Brief and definition of success',
  },
  {
    index: '02',
    title: 'Define',
    description:
      'Constraints, architecture and scope are settled together, so the design that follows is buildable rather than aspirational.',
    output: 'Scope, structure, technical direction',
  },
  {
    index: '03',
    title: 'Design',
    description:
      'Art direction, interface and motion are developed as one thing. Nothing is specified that we cannot deliver.',
    output: 'Art direction and design system',
  },
  {
    index: '04',
    title: 'Develop',
    description:
      'Engineering runs alongside design, not after it. Performance and accessibility are treated as design decisions.',
    output: 'Production build, tested on real devices',
  },
  {
    index: '05',
    title: 'Deliver',
    description:
      'Handover with documentation, training and a system the client’s own team can extend without us.',
    output: 'Launch, documentation, handover',
  },
] as const

export const capabilities = [
  'Design direction',
  'Interface & product design',
  'Design systems',
  'Front-end engineering',
  'Creative technology',
  'Motion & interaction',
  'Accessibility',
  'Performance engineering',
] as const

export const studioPrinciples = [
  {
    index: 'A',
    title: 'Design and engineering are one job',
    body: 'A practice that hands work over a wall produces work that looks designed but behaves like an afterthought. We do not split the two, so what is specified is what ships.',
  },
  {
    index: 'B',
    title: 'Restraint is a decision, not a default',
    body: 'Every element earns its place. Removing something is a design act, and we treat it with the same care as adding it.',
  },
  {
    index: 'C',
    title: 'Speed is part of the experience',
    body: 'A page that loads instantly feels more considered than one that does not. Performance is designed for, measured, and treated as a feature — not deferred to the end of the build.',
  },
  {
    index: 'D',
    title: 'Accessibility is the baseline',
    body: 'Keyboard access, contrast, semantics and reduced motion are requirements of the first sketch, not a compliance pass at the end.',
  },
] as const

export const availability = {
  status: 'Available for select projects',
  detail: 'Enquiries open',
}
