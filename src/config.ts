export const SITE = {
  website: "https://zetazero.me/",
  author: "zetazero",
  profile: "https://zetazero.me/",
  desc: "Programmer, photographer, cyclist.",
  title: "zetazero",
  ogImage: "ben-drucker-sq.png",
  lightAndDarkMode: true,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  viewSource: {
    text: "View Source",
    url: "https://github.com/zetazero1/zetazero1.me/blob/HEAD/",
  },
  dynamicOgImage: false,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/Los_Angeles", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  githubUsername: "zetazero1",
} as const;
