/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: '{|[•_•]|}',
  author: 'Francisco Caicedo Narvaez',
  headerTitle: `Francisco's Blog`,
  description: '',
  language: 'en-us',
  defaultLocale: 'en',
  locales: ['en', 'es'],
  theme: 'dark', // system, dark or light
  siteUrl: 'https://franciscocaicedonarvaez.blog', //'https://francisco-blog.vercel.app',
  siteRepo: 'https://github.com/francisco-caicedonarvaez/francisco-caicedonarvaez.github.io',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/og-image.png',
  mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'address@yoursite.com',
  github: 'https://github.com/francisco-caicedonarvaez',
  x: 'https://twitter.com/_Francisco_CN',
  //twitter: 'https://twitter.com/_Francisco_CN',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com/in/francisco-caicedo-narvaez',
  threads: 'https://www.threads.net',
  instagram: 'https://www.instagram.com',
  medium: 'https://medium.com',
  bluesky: 'https://bsky.app/',
  locale: 'en-US',
  // set to true if you want a navbar fixed to the top
  stickyNav: false,
  // Locale-specific translations
  translations: {
    en: {
      home: 'Home',
      blog: 'Blog',
      about: 'About',
      projects: 'Projects',
      tags: 'Tags',
      allPosts: 'All Posts',
      readMore: 'Read More →',
      notFound: 'Not Found',
      notFoundDescription: 'Sorry, we could not find what you were looking for.',
      back: 'Back',
      previous: 'Previous',
      previousArticle: 'Previous Article',
      next: 'Next',
      nextArticle: 'Next Article',
      latest: 'Latest',
      allContent: 'All Posts →',
      backToBLog: 'Back to Blog',
    },
    es: {
      home: 'Inicio',
      blog: 'Blog',
      about: 'Bio',
      projects: 'Proyectos',
      tags: 'Tags',
      allPosts: 'Mis Publicaciones',
      readMore: 'Leer más →',
      notFound: 'No encontrado',
      notFoundDescription: 'Lo sentimos, no pudimos encontrar lo que buscabas.',
      back: 'Volver',
      previous: 'Anterior',
      previousArticle: 'Artículo Anterior',
      next: 'Siguiente',
      nextArticle: 'Artículo Siguiente',
      latest: 'Recientes',
      allContent: 'Ver todo →',
      backToBLog: 'Volver al Blog',
    },
  },
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      // You may also need to overwrite the script if you're storing data in the US - ex:
      // src: 'https://us.umami.is/script.js'
      // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. francisco-blog.vercel.app
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    googleAnalytics: {
      googleAnalyticsId: 'G-2WNWVD377M',
    },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
}

module.exports = siteMetadata
