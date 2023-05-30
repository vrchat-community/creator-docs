// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VRChat Creation',
  tagline: 'Learn, create and share using our tools and documentation.',
  url: 'https://creator.docs.vrchat.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'vrchat', // Usually your GitHub org/user name.
  projectName: 'CreatorDocs', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl: ({versionDocsDirPath, docPath}) =>
          //     `https://github.com/vrchat-community/CreatorDocs/edit/main/Docs/Source/${docPath}`,
          
        },
        blog: {
          path: 'news',
          routeBasePath: 'news',
          showReadingTime: false,
          // Please change this to your repo.
          // editUrl: 'https://github.com/vrchat-community/CreatorDocs',
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
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      // announcementBar: {
      //   id: 'open_beta',
      //   content:
      //       '<b>This Tool is in an Open Beta, the Docs are not yet complete.</b>',
      //   backgroundColor: '#21af90',
      //   textColor: '#000',
      //   isCloseable: true,
      // },
      navbar: {
        title: 'VRChat Creation',
        logo: {
          alt: 'VRChat Logo',
          src: 'img/logo.png',
        },
        items: [
          {to: 'worlds/worlds', label: 'Worlds', position: 'left'},
          {to: 'avatars/avatars', label: 'Avatars', position: 'left'},
          {to: '/news', label: 'Releases', position: 'left'},
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
              {to: 'worlds/worlds', label: 'Worlds'},
              {to: 'avatars/avatars', label: 'Avatars'},
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
                to: '/news',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} VRChat Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
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
