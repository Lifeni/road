import { Hono } from 'hono'
import useReflare from 'reflare'

export const proxy = new Hono()

proxy.get('/*', async c => {
  let path = c.req.path.replace('/-/', '')
  if (!path) return c.body(null, 400)
  if (!path.startsWith('http://') && !path.startsWith('https://'))
    path = 'https://' + path

  const url = new URL(path)
  console.debug('[Proxy]', path)
  const reflare = await useReflare()

  reflare.push({
    path: '/*',
    cors: { origin: '*' },
    upstream: {
      onRequest: (request: Request, url: string): Request =>
        new Request(path, request),
      domain: url.hostname,
      protocol: url.protocol as 'http' | 'https',
    },
  })

  return reflare.handle(c.req.raw)
})
