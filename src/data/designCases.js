export const designCases = [
  {
    slug: 'remodeling-website',
    title: 'Remodeling Website',
    primaryTag: 'UI/UX',
    teaserLead:
      'A modern website designed to make the service easier to understand, support new homeowner clients, and provide a scalable component-based foundation.',
    teaserImage: '/img/Case-Studies/Remodeling-Website/Homepage-hero.webp',

    hero: {
      eyebrow: 'Case Study',
      title: 'Designing a Modern Remodeling Website',
      lead:
        'I designed and built a new website in Vue to clearly explain the remodeling process, improve usability, and support the company as it expanded beyond its investor-focused audience.',
      tags: ['Vue', 'UX Design', 'Component System'],
      primaryCta: {
        label: 'Prototype',
        href: 'https://www.figma.com/proto/OdjuF3ifil0rduLaP8dcyG/Remodeling-Website?node-id=2-2&starting-point-node-id=2%3A2&t=1mKHeELfb0BcLTuL-1',
      },
      secondaryCta: { label: 'View Live Site', href: '#' },
      image: '/img/Case-Studies/Remodeling-Website/Homepage-hero.webp',
    },

    overview: {
      label: 'Overview',
      title: 'Building a clearer and more modern experience',
      paragraphs: [
        'The company originally focused on turnkey rental renovations for real estate investors and did not yet have a website.',
        'I designed and built a new platform using Figma and Vue.js with a clearer structure, modern visual system, and reusable components that made the service easier to understand for a broader audience.',
      ],
    },

    problem: {
      label: 'Problem',
      title: 'An investor-focused business needed its first website to reach homeowners',
      bullets: [
        'The company primarily worked with real estate investors',
        'Most new projects came through word of mouth',
        'They needed a website that would also appeal to homeowners',
        'The remodeling process needed to be explained clearly online',
      ],
      image1: '/img/Case-Studies/Remodeling-Website/Homeowners-hero.webp',
      image2: '/img/Case-Studies/Remodeling-Website/Investors-hero.webp',
    },

    strategy: {
      label: 'Strategy',
      title: 'Design a site that feels modern, clear, and flexible',
      cards: [
        {
          title: 'Clear structure',
          body:
            'Organized pages so visitors could quickly understand the service and how projects move forward.',
        },

        {
          title: 'Modern visual system',
          body:
            'Created consistent layouts, spacing, and typography to give the site a more current and professional feel.',
        },

        {
          title: 'Process visibility',
          body:
            'Explained the remodeling process step by step so visitors knew what to expect before reaching out.',
        },

        {
          title: 'Reusable components',
          body:
            'Built shared Vue components so the site could expand easily as new services were added.',
        },
      ],
    },

    productManagement: {
      label: 'Build Approach',
      title: 'Planning for clarity and long-term use',
      paragraphs: [
        'Because the site was being built from scratch, I focused first on creating a structure that explained the service clearly and worked for both existing investor clients and newer homeowner projects.',
        'I designed reusable layouts and components so the experience stayed consistent across pages and could support future growth.',
        'This approach made the site easier to maintain and reduced the effort required to add new content later.',
        'Each section was designed with a clear purpose: explain the service, answer common questions, or support quote requests.',
      ],

      highlights: [
        'Designed the site structure from the ground up',
        'Balanced messaging across investor and homeowner projects',
        'Improved clarity around the remodeling process',
        'Built reusable components for future expansion',
      ],

      image: '/img/Case-Studies/Remodeling-Website/Components.webp',
    },

    components: {
      label: 'Components',
      title: 'Reusable sections designed for clarity',
      paragraphs: [
        'I built the site using modular sections that can be reused across pages.',
        'This keeps the experience consistent and makes it easier to expand the site as the business grows.',
      ],

      rows: [
        {
          title: 'Homepage structure',
          body:
            'Introduces the service clearly and helps visitors quickly understand what the company offers.',
          image:
            '/img/Case-Studies/Remodeling-Website/Homepage.webp',
        },

        {
          title: 'Process section',
          body:
            'Shows the remodeling process step by step so customers know what to expect before requesting a quote.',
          image:
            '/img/Case-Studies/Remodeling-Website/process.webp',
        },

        {
          title: 'Persistent quote button',
          body:
            'Keeps the quote request easy to find throughout the site.',
          image:
            '/img/Case-Studies/Remodeling-Website/About%20Page.webp',
        },

        {
          title: 'Component system',
          body:
            'Keeps layouts consistent and makes future pages faster to build.',
          image:
            '/img/Case-Studies/Remodeling-Website/Components.webp',
        },
      ],
    },

    cta: {
      title: 'Your website should make your service easy to understand.',
      lead:
        'I design modern websites with clear structure, reusable components, and practical user-focused layouts.',
      buttonLabel: 'Start a Project',
      buttonHref: '/contact',
    },
  },
]

export function getDesignCaseBySlug(slug) {
  return designCases.find((c) => c.slug === slug) || null
}