import { Byte, Encoder } from '@nuintun/qrcode'
import type { Props } from '../types'

export const Result = ({ type, url, protocol }: Props) => (
  <div>
    {type === 'ok' ? (
      <div class="flash flash-full pt-2 pb-1 pl-3 pr-2 border-0 border-top">
        <section class="d-flex flex-items-start my-1">
          <span class="octicon">🎉</span>
          <span class="overflow-hidden">
            <span class="mr-1">已重定向到</span>
            <span class="Truncate">
              <a
                class="Link Truncate-text Truncate-text--expandable"
                target="_blank"
                href={`//${url}`}
              >
                <strong class="text-medium">{url}</strong>
              </a>
            </span>
          </span>
        </section>
        <section class="d-flex flex-items-center flex-justify-end my-1">
          <button
            class="btn-octicon btn-sm color-fg-default text-sm"
            type="button"
            aria-label="复制链接"
            onclick={`navigator.clipboard.writeText('${protocol}//${url}')`}
          >
            🖱️ 复制
          </button>

          <details class="details-overlay details-overlay-dark">
            <summary
              class="btn-octicon btn-sm mr-1 color-fg-default text-sm"
              type="button"
              aria-label="二维码"
            >
              📱 二维码
            </summary>
            <aside class="Box color-shadow-extra-large">
              <QRCode url={url} protocol={protocol} />
            </aside>
          </details>
        </section>
      </div>
    ) : type === 'error' ? (
      <div class="flash flash-full flash-error py-2 border-0 border-top">
        <section class="d-flex flex-items-center my-1">
          <span class="octicon">😭</span>
          <span>重定向失败，请稍后再试</span>
        </section>
      </div>
    ) : null}
  </div>
)

export const QRCode = ({ url, protocol }: Props) => {
  if (!url) return null
  const encoder = new Encoder({ level: 'H' })
  const qrcode = encoder.encode(new Byte(`${protocol}//${url}`))

  return (
    <article class="d-flex flex-column flex-items-center flex-justify-center">
      <img
        class="width-full rounded-2"
        src={qrcode.toDataURL(8)}
        title={`${protocol}//${url}`}
      />
    </article>
  )
}
