import { html } from 'hono/html'

interface Props {
  children: string
}

export const Layout = ({ children }: Props) => html`<!DOCTYPE html>
  <html
    lang="zh-hans"
    data-color-mode="auto"
    data-light-theme="light"
    data-dark-theme="dark"
  >
    ${Head()} ${Body({ children })}
  </html>`

const Head = () => (
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="https://file.lifeni.life/assets/primer.css" />
    <script src="https://unpkg.com/iconify-icon"></script>
    <title>随意链接</title>
    <meta name="description" content="简单重定向指定链接。" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=auto"
      rel="stylesheet"
    />
    {Style}
  </head>
)

const Body = ({ children }: Props) => (
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

export const Style = html`
  <style>
    body {
      min-height: 100vh;
      font-family: Inter, -apple-system, MiSans, 'HarmonyOS Sans SC', system-ui,
        'Roboto', sans-serif;
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
