import { html } from 'hono/html'
import { Docs } from '../components/Docs'
import { Messages } from '../components/Messages'
import { Bookmark } from '../components/base/Icons'

export interface IndexProps {
  type?: 'ok' | 'error'
  url?: string
  host?: string
}

export const Index = (props: IndexProps) => html`<!DOCTYPE html>
  <html
    lang="zh-hans"
    data-color-mode="auto"
    data-light-theme="light"
    data-dark-theme="dark"
  >
    ${Head()} ${Body(props)}
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

const Body = ({ type, url, host }: IndexProps) => (
  <body class="d-flex flex-column flex-items-center flex-justify-center">
    <main class="flex-1 px-6 py-5 width-full clearfix d-flex flex-column flex-items-center flex-justify-center">
      <form class="Box width-full" action="/" method="post" autocomplete="off">
        <section class="Box-header d-flex flex-items-start py-3">
          <div class="d-flex flex-column flex-items-start flex-1">
            <div class="d-flex flex-items-center">
              {Bookmark}
              <h1 class="Box-title px-2">
                <a href="/" class="color-fg-default">
                  随意链接
                </a>
              </h1>
            </div>
            <span class="text-small color-fg-subtle pt-1">
              简单重定向指定链接
            </span>
          </div>
          <details class="details-overlay details-overlay-dark">
            <summary class="btn btn-sm">API</summary>
            <aside class="Box color-shadow-extra-large">
              <Docs host={host} />
            </aside>
          </details>
        </section>
        <section class="Box-body border-bottom-0">
          <input
            class="form-control input-block input-lg mb-2 py-2"
            name="url"
            type="url"
            required
            placeholder="要重定向的链接地址 *"
            autofocus
          />
          <section class="pt-1 d-flex flex-items-center">
            <input
              class="form-control input-block input-lg mr-2 py-2"
              name="slug"
              type="text"
              placeholder="自定义后缀"
            />

            <button
              class="btn color-fg-on-emphasis color-bg-accent-emphasis btn-block btn-lg ml-1 py-2"
              type="submit"
            >
              重定向
            </button>
          </section>
        </section>
        <Messages type={type} url={url} />
      </form>
      <p class="w-full f6 text-center color-fg-subtle pt-2 mt-1">
        {'Powered by '}
        <a
          href="https://developers.cloudflare.com/workers/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cloudflare Workers
        </a>
      </p>
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

const Style = html`
  <style>
    body {
      min-height: 100vh;
      font-family: Inter, -apple-system, MiSans, 'HarmonyOS Sans SC', system-ui,
        'Roboto', sans-serif;
      overflow: overlay;
    }

    main {
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
  </style>
`
