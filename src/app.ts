import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { proxy } from './libs/proxy'
import { redirect } from './libs/redirect'

const app = new Hono({
  getPath: req => {
    const host = req.headers.get('host')
    if (host?.endsWith('lifeni.life')) return 'lifeni.life/'
    return req.headers.get('host') + req.url.replace(/^https?:\/\/[^\/]+/, '')
  },
})

const domains = ['dev', 'lab', 'server']
const base = 'https://lifeni.life'

app.all('lifeni.life/', async c => {
  const host = c.req.headers.get('host')
  const name = host?.replace('.lifeni.life', '') || ''
  if (!host || !domains.includes(name)) return c.redirect(`${base}/404`)
  return c.redirect(`${base}/${name}`)
})

app.use('*', prettyJSON())
app.use('*', logger())

app.route('iokl.link/', redirect)
app.route('iokl.link/-', proxy)

export default app
