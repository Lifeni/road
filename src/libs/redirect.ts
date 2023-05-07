import { Hono } from 'hono'
import { reserved } from '../app'
import { ErrorPage } from '../routers/404'
import { IndexPage } from '../routers'

export const redirect = new Hono()

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
