// SEO Configuration for Cricket Lovers Global

export const siteConfig = {
  name: "Cricket Lovers Global",
  title: "Cricket Lovers Global - Your Ultimate Cricket Community",
  description: "Join Cricket Lovers Global, the premier cricket community platform. Connect with cricket enthusiasts, attend exclusive events, access premium memberships, and celebrate your passion for cricket.",
  url: "https://www.cricketloversglobal.com",
  ogImage: "/assets/Home/og-image.jpg",
  links: {
    twitter: "https://twitter.com/cricketloversglobal",
    facebook: "https://facebook.com/cricketloversglobal",
    instagram: "https://instagram.com/cricketloversglobal",
  },
  keywords: [
    "cricket",
    "cricket community",
    "cricket events",
    "cricket membership",
    "cricket lovers",
    "cricket news",
    "cricket academy",
    "cricket fans",
    "cricket global community",
    "cricket enthusiasts"
  ]
};

export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@cricketloversglobal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// Page-specific metadata
export const pageMetadata = {
  home: {
    title: "Home",
    description: "Welcome to Cricket Lovers Global - Your ultimate destination for cricket passion, events, and community connections.",
    keywords: ["cricket home", "cricket community home", "cricket lovers"],
  },
  about: {
    title: "About Us",
    description: "Learn about Cricket Lovers Global's story, vision, and mission to unite cricket enthusiasts worldwide. Discover our journey and values.",
    keywords: ["about cricket lovers global", "cricket community story", "cricket vision"],
  },
  events: {
    title: "Cricket Events",
    description: "Discover and book exciting cricket events, matches, and experiences. Join fellow cricket enthusiasts at exclusive gatherings.",
    keywords: ["cricket events", "cricket matches", "cricket gatherings", "cricket experiences"],
  },
  eventHistory: {
    title: "Event History",
    description: "Browse through past cricket events, memorable moments, and highlights from Cricket Lovers Global community.",
    keywords: ["cricket event history", "past cricket events", "cricket memories"],
  },
  gallery: {
    title: "Cricket Gallery",
    description: "Explore our cricket photo gallery featuring memorable moments, events, and highlights from the Cricket Lovers Global community.",
    keywords: ["cricket gallery", "cricket photos", "cricket images", "cricket moments"],
  },
  membership: {
    title: "Membership Plans",
    description: "Join Cricket Lovers Global with exclusive membership plans. Get access to premium events, benefits, and cricket community perks.",
    keywords: ["cricket membership", "cricket club membership", "premium cricket access"],
  },
  membershipHistory: {
    title: "Membership History",
    description: "View your Cricket Lovers Global membership history, transactions, and active subscriptions.",
    keywords: ["membership history", "cricket subscription history"],
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with Cricket Lovers Global. Contact us for inquiries, support, or partnership opportunities.",
    keywords: ["contact cricket lovers global", "cricket support", "cricket inquiries"],
  },
  cares: {
    title: "CLG Cares",
    description: "Discover Cricket Lovers Global's community initiatives, social responsibility programs, and giving back to cricket communities.",
    keywords: ["cricket community care", "cricket social responsibility", "cricket initiatives"],
  },
  academy: {
    title: "CLG Academy",
    description: "Join Cricket Lovers Global Academy for cricket training, coaching, and skill development programs.",
    keywords: ["cricket academy", "cricket training", "cricket coaching", "cricket skills"],
  },
  profile: {
    title: "My Profile",
    description: "Manage your Cricket Lovers Global profile, preferences, and account settings.",
    keywords: ["cricket profile", "user account", "cricket membership profile"],
  },
  login: {
    title: "Login",
    description: "Sign in to your Cricket Lovers Global account to access exclusive cricket events and membership benefits.",
    keywords: ["cricket login", "sign in", "cricket account"],
  },
  signup: {
    title: "Sign Up",
    description: "Create your Cricket Lovers Global account and join the ultimate cricket community today.",
    keywords: ["cricket signup", "register", "join cricket community"],
  },
  ticketDetails: {
    title: "Ticket Details",
    description: "View your cricket event ticket details, booking information, and event access pass.",
    keywords: ["cricket tickets", "event tickets", "booking details"],
  },
  paymentSuccess: {
    title: "Payment Success",
    description: "Your payment was successful. Thank you for your purchase with Cricket Lovers Global.",
    keywords: ["payment success", "booking confirmation"],
  },
};
