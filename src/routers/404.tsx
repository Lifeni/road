import { Layout } from '../components/Layout'
import { Error } from '../components/base/Icons'

export const NotFound = () => (
  <Layout
    children={(() => (
      <div class="flash flash-error py-2">
        <section class="d-flex flex-items-center my-1">
          {Error}
          <code class="h6">404 Page Not Found</code>
        </section>
      </div>
    ))()}
  />
)
