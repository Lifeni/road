import { Layout } from '../components/Layout'
import { Error } from '../components/base/Icons'

interface Props {
  code: 404 | 400 | 403 | 500
}

const maps = {
  404: '404 Page Not Found',
  400: '400 Bad Request',
  403: '403 Forbidden',
  500: '500 Internal Server Error',
}

export const ErrorPage = ({ code }: Props) => (
  <Layout
    children={(() => (
      <div class="flash flash-error py-2">
        <section class="d-flex flex-items-center my-1">
          {Error}
          <code class="h6">{maps[code]}</code>
        </section>
      </div>
    ))()}
  />
)
