import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { proxy } from './libs/proxy'
import { redirect } from './libs/redirect'
import { IndexPage } from './routers'

const app = new Hono()
export const reserved = [
  '/',
  '/ids',
  '/+',
  '/-',
  '/robots.txt',
  '/favicon.svg',
  '/favicon.ico',
]

app.use('*', prettyJSON())
app.use('*', logger())

app.use('/robots.txt', serveStatic({ path: './robots.txt' }))
app.use('/favicon.svg', serveStatic({ path: './favicon.svg' }))
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))

app.get('/', c => {
  const host = new URL(c.req.url).host
  return c.html(IndexPage({ host }))
})

app.get('/ids', async c => {
  const routes = c.env?.routes as KVNamespace
  const ids = Number(await routes.get('ids')) || 1
  const json =
    c.req.query('json') !== undefined || c.req.query('j') !== undefined

  if (json) return c.json({ ids })
  else return c.text(`${ids}`)
})

app.post('/', async c => {
  const form = await c.req.formData()
  const routes = c.env?.routes as KVNamespace
  const ids = (Number(await routes.get('ids')) || 1) + 1

  const slug = form.get('slug') || `${ids}`
  const url = form.get('url')
  const host = new URL(c.req.url).host
  const protocol = new URL(c.req.url).protocol

  if (reserved.includes(`/${slug}`) || !url)
    return c.html(IndexPage({ type: 'error', host }))
  try {
    await routes.put(slug, url)
    if (slug === `${ids}`) await routes.put('ids', slug)
    return c.html(
      IndexPage({ type: 'ok', host, url: `${host}/${slug}`, protocol })
    )
  } catch (error) {
    console.error(error)
    return c.html(IndexPage({ type: 'error', host }))
  }
})

app.route('/', redirect)
app.route('/-', proxy)

export default app
