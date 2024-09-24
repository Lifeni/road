import { html } from 'hono/html'
import type { FC } from 'hono/jsx'

export const Container: FC = ({ children }) => (
  <html
    lang="zh-hans"
    data-color-mode="auto"
    data-light-theme="light"
    data-dark-theme="dark"
  >
    <Head />
    <Body>{children}</Body>
  </html>
)

const Head: FC = () => (
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>随意链接</title>
    <meta name="description" content="测试用，简单重定向指定链接。" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://unpkg.com" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/@primer/css/dist/primer.css"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
    <link rel="manifest" href="/manifest.webmanifest" />
    <meta name="theme-color" content="#a183f4"></meta>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=auto"
      rel="stylesheet"
    />
    {Style}
    {Scripts}
  </head>
)

const Body: FC = ({ children }) => (
  <body class="d-flex flex-column flex-items-center flex-justify-center text-medium">
    <main class="flex-1 px-6 py-5 width-full clearfix d-flex flex-column flex-items-center flex-justify-center">
      {children}
    </main>

    <footer class="width-full f6 d-flex flex-row flex-justify-end px-6 py-5">
      <a
        class="Link--onHover Link--secondary"
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="noopener noreferrer"
      >
        鲁ICP备19006085号
      </a>
    </footer>
  </body>
)

const Scripts = html`
  <script>
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator)
        await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        })
    }

    registerServiceWorker()
  </script>
`

export const Style = html`
  <style>
    body {
      min-height: 100vh;
      font-family:
        Inter,
        -apple-system,
        MiSans,
        'HarmonyOS Sans SC',
        system-ui,
        'Roboto',
        sans-serif;
      overflow: overlay;
    }

    tt,
    code,
    samp {
      font-family: 'Cascadia Code', Consolas, MiSans, 'HarmonyOS Sans SC',
        monospace;
    }

    input {
      font-family: inherit;
    }

    main,
    .flash {
      width: 100%;
      max-width: 22rem;
    }

    footer {
      position: fixed;
      bottom: 0;
      left: 0;
    }

    aside {
      position: fixed;
      top: 50%;
      left: 50%;
      width: fit-content;
      max-width: calc(100vw - 4rem);
      min-width: 20rem;
      z-index: 1000;
      transform: translate(-50%, -50%);
    }

    p {
      line-height: 1.75;
    }

    .flash:not(.Banner) .octicon {
      margin-right: 0.5rem;
    }

    @media (max-width: 480px) {
      main,
      .flash {
        max-width: 100%;
      }
    }
  </style>
`
