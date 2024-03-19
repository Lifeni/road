import { Layout } from '../components/Layout'
import { Result } from '../components/redirect/Result'

export interface Props {
  type?: 'ok' | 'error'
  url?: string
  protocol?: string
  host?: string
}

export const IndexPage = ({ type, url, protocol }: Props) => (
  <Layout
    children={(() => (
      <>
        <form
          class="Box width-full mb-0"
          action="/"
          method="post"
          autocomplete="off"
        >
          <section class="Box-header d-flex flex-items-start py-3">
            <div class="d-flex flex-column flex-items-start flex-1">
              <div class="d-flex flex-items-center">
                <span class="octicon d-flex">
                  <iconify-icon
                    width="16"
                    height="16"
                    icon="octicon:bookmark-16"
                  />
                </span>
                <h1 class="Box-title px-2">
                  <a href="/" class="color-fg-default">
                    随意链接
                  </a>
                </h1>
              </div>
              <span
                class="text-small color-fg-subtle pt-1"
                title="随时删库，请勿使用"
              >
                测试用，简单重定向指定链接
              </span>
            </div>
            <a
              class="btn btn-sm"
              href="https://github.com/Lifeni/road"
              target="_blank"
              rel="noopener noreferrer"
            >
              代码
            </a>
          </section>
          <section class="Box-body border-bottom-0">
            <input
              class="form-control input-block input-lg mb-2 py-2 f5"
              name="url"
              type="url"
              required
              placeholder="要重定向的链接地址 *"
              autofocus
            />
            <section class="pt-1 d-flex flex-items-center">
              <input
                class="form-control input-block input-lg mr-2 py-2 f5"
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
          <Result type={type} url={url} protocol={protocol} />
        </form>
        <p class="w-full f6 text-center color-fg-subtle pt-2 my-0">
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
