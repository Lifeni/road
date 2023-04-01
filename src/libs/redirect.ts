import { Hono } from 'hono'
import { reserved } from '../app'

export const redirect = new Hono()

redirect.get('/:slug', async c => {
  const slug = c.req.param('slug')
  if (reserved.includes(slug)) return c.body(null, 403)

  const routes = c.env?.routes as KVNamespace
  const url = await routes.get(slug)
  const text = c.req.query('text')
  const json = c.req.query('json')

  if (!url) return c.body(null, 404)
  if (text !== undefined) return c.text(url)
  if (json !== undefined) return c.json({ slug, url })
  return c.redirect(url, 302)
})

redirect.delete('/:slug', async c => {
  const slug = c.req.param('slug')
  if (reserved.includes(slug)) return c.body(null, 403)

  const routes = c.env?.routes as KVNamespace
  const url = await routes.get(slug)

  if (!url) return c.body(null, 404)
  try {
    await routes.delete(slug)
    return c.body(null, 204)
  } catch (error) {
    return c.body(null, 500)
  }
})

// Create/Replace
redirect.put('/:slug', async c => {
  const slug = c.req.param('slug')
  if (reserved.includes(slug)) return c.body(null, 403)

  const routes = c.env?.routes as KVNamespace
  const target = c.req.query('to')

  if (!target) return c.body(null, 400)
  try {
    await routes.put(slug, target)
    return c.body(null, 204)
  } catch (error) {
    return c.body(null, 500)
  }
})

// Update
redirect.post('/:slug', async c => {
  const slug = c.req.param('slug')
  if (reserved.includes(slug)) return c.body(null, 403)

  const routes = c.env?.routes as KVNamespace
  const url = await routes.get(slug)
  const target = c.req.query('to')

  if (!url) return c.body(null, 404)
  if (!target) return c.body(null, 400)
  try {
    await routes.put(slug, target)
    return c.body(null, 204)
  } catch (error) {
    return c.body(null, 500)
  }
})
