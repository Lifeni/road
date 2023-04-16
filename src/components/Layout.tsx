import { html } from 'hono/html'

interface LayoutProps {
  children: string
}

export const Layout = ({ children }: LayoutProps) => html`<!DOCTYPE html>
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
    <link rel="icon" href="/favicon.svg" type="image/x-icon" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/@primer/css/dist/primer.css"
    />
    <title>随意链接</title>
    {Style}
  </head>
)

const Body = ({ children }: LayoutProps) => (
  <body class="d-flex flex-column flex-items-center flex-justify-center">
    <main class="flex-1 px-6 py-5 width-full clearfix d-flex flex-column flex-items-center flex-justify-center">
      {children}
    </main>

    <footer class="width-full d-flex flex-row flex-justify-end px-6 py-5">
      <a
        class="color-fg-subtle f6"
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

    main,
    .flash {
      width: 100%;
      max-width: 22rem;
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

    @media (max-width: 480px) {
      main,
      .flash {
        max-width:100%;
      }
  </style>
`
