import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { IndexPage } from '../routers'
import { ErrorPage } from '../routers/404'
import { RedirHost } from './const'
// @ts-ignore
import manifest from '__STATIC_CONTENT_MANIFEST'

export const redirect = new Hono()

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
  '/manifest.webmanifest',
]

redirect.use('/favicon.svg', serveStatic({ path: './favicon.svg', manifest }))
redirect.use('/favicon.png', serveStatic({ path: './favicon.png', manifest }))
redirect.use('/favicon.ico', serveStatic({ path: './favicon.ico', manifest }))
redirect.use('/sw.js', serveStatic({ path: './sw.js', manifest }))
redirect.use(
  '/manifest.webmanifest',
  serveStatic({ path: './manifest.webmanifest', manifest }),
)
redirect.use('/robots.txt', serveStatic({ path: './robots.txt', manifest }))

redirect.get('/', c => {
  const host = new URL(c.req.url).host
  return c.html(IndexPage({ host }))
})

redirect.get('/ids', async c => {
  const routes = c.env?.routes as KVNamespace
  const ids = Number(await routes.get('ids')) || 1
  const json =
    c.req.query('json') !== undefined || c.req.query('j') !== undefined

  if (json) return c.json({ ids })
  else return c.text(`${ids}`)
})

redirect.post('/', async c => {
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

  const routes = c.env?.routes as KVNamespace
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

  const routes = c.env?.routes as KVNamespace
  const url = await routes.get(slug)

  if (!url) return c.html(ErrorPage({ code: 404 }), 404)
  try {
    await routes.delete(slug)
    return c.html(IndexPage({ host }), 204)
  } catch (error) {
    return c.html(ErrorPage({ code: 500 }), 500)
  }
})

// Create/Replace
redirect.put('/:slug', async c => {
  const slug = c.req.param('slug')
  const host = new URL(c.req.url).host
  if (reserved.includes(slug)) return c.html(ErrorPage({ code: 403 }), 403)

  const routes = c.env?.routes as KVNamespace
  const target = c.req.query('to')

  if (!target) return c.html(ErrorPage({ code: 400 }), 400)
  try {
    await routes.put(slug, target)
    return c.html(IndexPage({ host }), 204)
  } catch (error) {
    return c.html(ErrorPage({ code: 500 }), 500)
  }
})

// Update
redirect.post('/:slug', async c => {
  const slug = c.req.param('slug')
  const host = new URL(c.req.url).host
  if (reserved.includes(slug)) return c.html(ErrorPage({ code: 403 }), 403)

  const routes = c.env?.routes as KVNamespace
  const url = await routes.get(slug)
  const target = c.req.query('to')

  if (!url) return c.html(ErrorPage({ code: 404 }), 404)
  if (!target) return c.html(ErrorPage({ code: 400 }), 400)
  try {
    await routes.put(slug, target)
    return c.html(IndexPage({ host }), 204)
  } catch (error) {
    return c.html(ErrorPage({ code: 500 }), 500)
  }
})

redirect.get('/+/:url', async c => {
  const url = c.req.param('url')
  const routes = c.env?.routes as KVNamespace
  const ids = (Number(await routes.get('ids')) || 1) + 1
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
