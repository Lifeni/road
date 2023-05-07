import { Container } from '../components/Container'
import { Docs } from '../components/Docs'
import { Messages } from '../components/Messages'
import { Bookmark } from '../components/base/Icons'

export interface Props {
  type?: 'ok' | 'error'
  url?: string
  host?: string
}

export const IndexPage = ({ type, url, host }: Props) => (
  <Container
    children={(() => (
      <>
        <form
          class="Box width-full"
          action="/"
          method="post"
          autocomplete="off"
        >
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
                <Docs />
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
        <p class="w-full f6 text-center color-fg-subtle pt-2 mt-1 mb-0">
          {'Powered by '}
          <a
            href="https://developers.cloudflare.com/workers/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloudflare Workers
          </a>
        </p>
      </>
    ))()}
  />
)
