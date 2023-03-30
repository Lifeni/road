import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { Index } from './router'

const app = new Hono()

app.get('/', c => c.html(<Index />))
app.get('/favicon.svg', serveStatic({ path: './favicon.svg' }))

export default app
