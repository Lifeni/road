import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { Favicon } from './components/base/Icons'
import { proxy } from './libs/proxy'
import { redirect } from './libs/redirect'
import { IndexPage } from './routers'

const app = new Hono()
export const reserved = ['/', '/ids', '/+', '/-', '/robots.txt', '/favicon.svg']

app.use('*', prettyJSON())
app.use('*', logger())

app.get('/', c => {
  const host = new URL(c.req.url).host
  return c.html(IndexPage({ host }))
})

app.get('/robots.txt', c => c.text('User-agent: *\nDisallow: /'))
app.get('/favicon.svg', c =>
  c.html(Favicon, 200, { 'Content-Type': 'image/svg+xml' })
)

app.get('/ids', async c => {
  const routes = c.env?.routes as KVNamespace
  const ids = await routes.get('ids')
  const json =
    c.req.query('json') !== undefined || c.req.query('j') !== undefined

  if (json) return c.json({ ids: ids || '1000' })
  else return c.text(ids || '1000')
})

app.post('/', async c => {
  const form = await c.req.formData()
  const routes = c.env?.routes as KVNamespace
  const ids = ((Number(await routes.get('ids')) || 1000) + 1).toString()

  const slug = form.get('slug') || ids
  const url = form.get('url')
  const host = new URL(c.req.url).host

  if (reserved.includes(slug) || !url)
    return c.html(IndexPage({ type: 'error', host }))
  try {
    await routes.put(slug, url)
    if (slug === ids) await routes.put('ids', slug)
    return c.html(IndexPage({ type: 'ok', host, url: `${host}/${slug}` }))
  } catch (error) {
    console.error(error)
    return c.html(IndexPage({ type: 'error', host }))
  }
})

app.route('/', redirect)
app.route('/-', proxy)

export default app
