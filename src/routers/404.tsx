import { Container } from '../components/Container'
import { ErrorProps } from '../types'

const maps = {
  404: ['404 Page Not Found', '找不到页面'],
  400: ['400 Bad Request', '请求错误'],
  403: ['403 Forbidden', '禁止访问'],
  500: ['500 Internal Server Error', '服务器错误'],
}

export const ErrorPage = ({ code }: ErrorProps) => (
  <Container
    children={(() => (
      <div class="flash py-2">
        <section class="d-flex flex-items-start">
          <span class="octicon my-1">ℹ️</span>
          <div class="d-flex flex-column py-1">
            <span class="f5 mb-1 text-bold">{maps[code][0]}</span>
            <span class="f6 color-fg-subtle">{maps[code][1]}</span>
          </div>
        </section>
      </div>
    ))()}
  />
)
