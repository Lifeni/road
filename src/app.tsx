import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { Index } from '.'
import { proxy } from './libs/proxy'
import { redirect } from './libs/redirect'

const app = new Hono()
export const reserved = [
  '/',
  '/ok',
  '/error',
  '/ids',
  '/-',
  '/robots.txt',
  '/favicon.svg',
]

app.use('*', prettyJSON())
app.use('*', logger())

app.get('/', c => c.html(<Index />))
app.get('/robots.txt', c => c.text('User-agent: *\nDisallow: /'))
app.get('/favicon.svg', c =>
  c.text(favicon, 200, { 'Content-Type': 'image/svg+xml' })
)

app.get('/ids', async c => {
  const routes = c.env?.routes as KVNamespace
  const ids = await routes.get('ids')
  return c.json({ ids: ids || '1000' })
})

app.post('/', async c => {
  const form = await c.req.formData()
  const routes = c.env?.routes as KVNamespace
  const ids = ((Number(await routes.get('ids')) || 1000) + 1).toString()

  const slug = form.get('slug') || ids
  const url = form.get('url')
  if (reserved.includes(slug)) return c.html(<Index type="error" />)
  if (!url) return c.html(<Index type="error" />)
  try {
    await routes.put(slug, url)
    if (slug === ids) await routes.put('ids', slug)
    console.log(ids, slug)
    return c.html(<Index type="ok" slug={slug} />)
  } catch (error) {
    console.error(error)
    return c.html(<Index type="error" />)
  }
})

app.route('/', redirect)
app.route('/-', proxy)

export default app

const favicon = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1024" height="1024" rx="512" fill="url(#paint0_linear_2469_6)"/>
<defs>
<linearGradient id="paint0_linear_2469_6" x1="0" y1="0" x2="1024" y2="1024" gradientUnits="userSpaceOnUse">
<stop stop-color="#CE9FFC"/>
<stop offset="1" stop-color="#7367F0"/>
</linearGradient>
</defs>
</svg>
`
