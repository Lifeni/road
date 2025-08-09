import { Hono } from 'hono'
import { IndexPage } from '../routers'
import { ErrorPage } from '../routers/404'

// 页面上展示的域名
const RedirHost = 'iokl.link'

type Bindings = {
  road: KVNamespace
  ASSETS: { fetch: (url: string) => Promise<Response> }
}
export const redirect = new Hono<{ Bindings: Bindings }>()

const reserved = [
  '/',
  '/ids',
  '/+',
  '/-',
  '/robots.txt',
  '/favicon.svg',
  '/favicon.png',
  '/favicon.ico',
  '/sw.js',
  '/primer.css',
  '/manifest.webmanifest',
]

redirect.get('/robots.txt', c => {
  c.header('Content-Type', 'text/plain')
  c.header('Content-Encoding', 'gzip')
  return c.env.ASSETS.fetch('/robots.txt')
})

redirect.get('/favicon.svg', c => {
  c.header('Content-Type', 'image/svg+xml')
  return c.env.ASSETS.fetch('/favicon.svg')
})

redirect.get('/favicon.png', c => {
  c.header('Content-Type', 'image/png')
  return c.env.ASSETS.fetch('/favicon.png')
})

redirect.get('/favicon.ico', c => {
  c.header('Content-Type', 'image/x-icon')
  return c.env.ASSETS.fetch('/favicon.ico')
})

redirect.get('/sw.js', c => {
  c.header('Content-Type', 'application/javascript')
  c.header('Content-Encoding', 'gzip')
  return c.env.ASSETS.fetch('/sw.js')
})

redirect.get('/primer.css', c => {
  c.header('Content-Type', 'text/css')
  c.header('Content-Encoding', 'gzip')
  return c.env.ASSETS.fetch('/primer.css')
})

redirect.get('/manifest.webmanifest', c => {
  c.header('Content-Type', 'application/manifest+json')
  c.header('Content-Encoding', 'gzip')
  return c.env.ASSETS.fetch('/manifest.webmanifest')
})

redirect.get('/', c => {
  const host = new URL(c.req.url).host
  return c.html(IndexPage({ host }))
})

redirect.get('/ids', async c => {
  const routes = c.env?.road
  const ids = Number(await routes.get('ids')) || 1
  const json =
    c.req.query('json') !== undefined || c.req.query('j') !== undefined

  if (json) return c.json({ ids })
  else return c.text(`${ids}`)
})

redirect.post('/', async c => {
  const form = await c.req.formData()
  const routes = c.env?.road
  const ids = (Number(await routes.get('ids')) || 0) + 1

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
      IndexPage({
        type: 'ok',
        host,
        url: `${RedirHost || host}/${slug}`,
        protocol,
      }),
    )
  } catch (error) {
    console.error(error)
    return c.html(IndexPage({ type: 'error', host }))
  }
})

redirect.get('/:slug', async c => {
  const slug = c.req.param('slug')
  if (reserved.includes(slug)) return c.html(ErrorPage({ code: 403 }), 403)

  const routes = c.env?.road
  let url = await routes.get(slug)
  if (!url) return c.html(ErrorPage({ code: 404 }), 404)
  if (!url.startsWith('http://') && !url.startsWith('https://'))
    url = 'https://' + url

  const text =
    c.req.query('text') !== undefined || c.req.query('t') !== undefined
  const json =
    c.req.query('json') !== undefined || c.req.query('j') !== undefined

  console.debug('[Redirect]', slug, '-->', url)
  if (text) return c.text(url)
  if (json) return c.json({ slug, url })
  return c.redirect(url, 302)
})

redirect.delete('/:slug', async c => {
  const slug = c.req.param('slug')
  const host = new URL(c.req.url).host
  if (reserved.includes(slug)) return c.html(ErrorPage({ code: 403 }), 403)

  const routes = c.env?.road
  const url = await routes.get(slug)

  if (!url) return c.html(ErrorPage({ code: 404 }), 404)
  try {
    await routes.delete(slug)
    return c.html(IndexPage({ host }), 200)
  } catch (error) {
    return c.html(ErrorPage({ code: 500 }), 500)
  }
})

// Create/Replace
redirect.put('/:slug', async c => {
  const slug = c.req.param('slug')
  const host = new URL(c.req.url).host
  if (reserved.includes(slug)) return c.html(ErrorPage({ code: 403 }), 403)

  const routes = c.env?.road
  const target = c.req.query('to')

  if (!target) return c.html(ErrorPage({ code: 400 }), 400)
  try {
    await routes.put(slug, target)
    return c.html(IndexPage({ host }), 200)
  } catch (error) {
    return c.html(ErrorPage({ code: 500 }), 500)
  }
})

// Update
redirect.post('/:slug', async c => {
  const slug = c.req.param('slug')
  const host = new URL(c.req.url).host
  if (reserved.includes(slug)) return c.html(ErrorPage({ code: 403 }), 403)

  const routes = c.env?.road
  const url = await routes.get(slug)
  const target = c.req.query('to')

  if (!url) return c.html(ErrorPage({ code: 404 }), 404)
  if (!target) return c.html(ErrorPage({ code: 400 }), 400)
  try {
    await routes.put(slug, target)
    return c.html(IndexPage({ host }), 200)
  } catch (error) {
    return c.html(ErrorPage({ code: 500 }), 500)
  }
})

redirect.get('/+/:url', async c => {
  const url = c.req.param('url')
  const routes = c.env?.road
  const ids = (Number(await routes.get('ids')) || 0) + 1
  const host = new URL(c.req.url).host

  const json =
    c.req.query('json') !== undefined || c.req.query('j') !== undefined

  if (!url) return c.html(ErrorPage({ code: 400 }), 400)
  try {
    await routes.put(`${ids}`, url)
    await routes.put('ids', `${ids}`)

    if (json) return c.json({ url: `${host}/${ids}` })
    return c.text(`${host}/${ids}`)
  } catch (error) {
    return c.html(ErrorPage({ code: 500 }), 500)
  }
})
