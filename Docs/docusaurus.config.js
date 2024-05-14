// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VRChat Creation',
  tagline: 'Learn, create and share using our tools and documentation.',
  url: 'https://creators.vrchat.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'vrchat', // Usually your GitHub org/user name.
  projectName: 'CreatorDocs', // Usually your repo name.

  scripts: [
    {
      defer: true,
      src: 'https://plausible.io/js/script.js',
      'data-domain': 'creators.vrchat.com'
    },
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: ({versionDocsDirPath, docPath}) =>
              `https://github.com/vrchat-community/creator-docs/edit/main/Docs/docs/${docPath}`,
          showLastUpdateTime: true
        },
        blog: {
          path: 'releases',
          routeBasePath: 'releases',
          blogTitle: 'VRChat SDK Releases',
          blogDescription: 'The latest VRChat SDK releases and patch notes.',
          showReadingTime: false,
          blogSidebarTitle: 'History',
          blogSidebarCount: 'ALL'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'VRChat Creation',
        logo: {
          alt: 'VRChat Logo',
          src: 'img/logo.png',
        },
        items: [
          {to: 'worlds', label: 'Worlds', position: 'left'},
          {to: 'avatars', label: 'Avatars', position: 'left'},
          {to: 'economy', label: 'Creator Economy', position: 'left'},
          {to: 'releases', label: 'Releases', position: 'left'},
          {to: 'https://udonsharp.docs.vrchat.com', label: 'UdonSharp', position: 'right'},
          {to: 'https://vcc.docs.vrchat.com', label: 'Creator Companion', position: 'right'},
          {to: 'https://clientsim.docs.vrchat.com', label: 'ClientSim', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {to: 'worlds', label: 'Worlds'},
              {to: 'avatars', label: 'Avatars'},
              {to: 'economy', label: 'Creator Economy'},
            ],
          },
          {
            title: 'Tools',
            items: [
              {to: 'https://udonsharp.docs.vrchat.com', label: 'UdonSharp'},
              {to: 'https://vcc.docs.vrchat.com', label: 'Creator Companion'},
              {to: 'https://clientsim.docs.vrchat.com', label: 'ClientSim'},
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/invite/vrchat',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/vrchat',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Releases',
                to: '/releases',
              },
              {
                label: 'Roadmap',
                to: '/roadmap',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} VRChat Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp']
      },
      algolia: {
        appId: 'NQHMNOH2YO',
        apiKey: '292dfc501d73d6fa1352744ce4620735',
        indexName: 'VRChat_Docs',
        contextualSearch: true,
        externalUrlRegex: 'https:\/\/(?!creators)' // Results that don't come from this site should redirect using their absolute URL, rather than redirecting relative to the current site
      },
    }),
};

module.exports = config;
