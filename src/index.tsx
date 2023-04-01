import { html } from 'hono/html'

interface LayoutProps {
  name: string
  children?: string
}

const Layout = ({ name, children }: LayoutProps) => html`<!DOCTYPE html>
  <html
    lang="zh-hans"
    data-color-mode="auto"
    data-light-theme="light"
    data-dark-theme="dark"
  >
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="noindex" />
      <link rel="icon" href="/favicon.svg" type="image/x-icon" />
      <link
        href="https://unpkg.com/@primer/css/dist/core.css"
        rel="stylesheet"
      />
      <link
        href="https://unpkg.com/@primer/css/dist/alerts.css"
        rel="stylesheet"
      />
      <link
        href="https://unpkg.com/@primer/css/dist/color-modes.css"
        rel="stylesheet"
      />
      <title>${name}</title>
      <style>
        body {
          font-family: Inter, -apple-system, MiSans, 'HarmonyOS Sans SC',
            system-ui, 'Roboto', sans-serif;
        }
      </style>
    </head>
    <body
      class="d-flex flex-justify-center flex-items-center p-4"
      style="min-height: 100vh"
    >
      ${children}
    </body>
  </html>`

interface IndexProps {
  type?: 'ok' | 'error'
  slug?: string
}

export const Index = ({ type, slug }: IndexProps) => (
  <Layout name="随意链接">
    <form action="/" method="post">
      <main class="Box" style="width: 100%; max-width: 280px">
        <div class="Box-header d-flex flex-items-start py-3">
          <div class="d-flex flex-column flex-items-start flex-1">
            <div class="d-flex flex-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="16"
                height="16"
              >
                <path
                  fill-rule="evenodd"
                  fill="currentColor"
                  d="M4.75 2.5a.25.25 0 00-.25.25v9.91l3.023-2.489a.75.75 0 01.954 0l3.023 2.49V2.75a.25.25 0 00-.25-.25h-6.5zM3 2.75C3 1.784 3.784 1 4.75 1h6.5c.966 0 1.75.784 1.75 1.75v11.5a.75.75 0 01-1.227.579L8 11.722l-3.773 3.107A.75.75 0 013 14.25V2.75z"
                ></path>
              </svg>
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
          <a
            class="btn btn-sm"
            href="https://github.com/Lifeni/workers"
            target="_blank"
            rel="noopener noreferrer"
          >
            代码
          </a>
        </div>
        <div class="Box-body">
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
              class="btn btn-primary btn-block btn-lg ml-1 py-2"
              type="submit"
            >
              重定向
            </button>
          </section>
        </div>
        {type === 'ok' ? (
          <div class="flash flash-full flash-success py-2 pl-3 pr-2 border-0 border-top">
            <section class="d-flex flex-items-center">
              <svg
                class="octicon octicon-check mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                ></path>
              </svg>
              <span style="line-height: 2; flex: 1">
                已重定向到
                <a
                  class="Link"
                  target="_blank"
                  href={`https://iokl.link/${slug}`}
                >
                  <strong> iokl.link/{slug} </strong>
                </a>
              </span>

              <button
                class="btn-octicon mx-1"
                type="button"
                aria-label="Copy"
                onclick={`navigator.clipboard.writeText('https://iokl.link/${slug}')`}
              >
                <svg
                  class="octicon mr-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"
                  ></path>
                </svg>
              </button>
            </section>
          </div>
        ) : type === 'error' ? (
          <div class="flash flash-full flash-warn py-2 border-0 border-top">
            <section class="d-flex flex-items-center">
              <svg
                class="octicon octicon-alert mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
                ></path>
              </svg>
              <span style="line-height: 2">重定向失败，请稍后再试</span>
            </section>
          </div>
        ) : null}
      </main>
      <p class="w-full text-small text-center color-fg-subtle pt-2 mt-1">
        Powered by
        <a
          href="https://developers.cloudflare.com/workers/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cloudflare Workers
        </a>
      </p>
    </form>
    <div class="position-fixed bottom-0 right-0 px-6 py-5">
      <a
        class="color-fg-subtle text-small"
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="noopener noreferrer"
      >
        鲁ICP备19006085号
      </a>
    </div>
  </Layout>
)
