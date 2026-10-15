import { Hono } from 'hono'
import { prettyJSON as pretty } from 'hono/pretty-json'
import { logger } from 'hono/logger'
import { redirect } from './libs/redirect'
import { reset } from './libs/reset'
import { Env } from './types'

const app = new Hono()
app.use('*', pretty())
app.use('*', logger())

app.route('/', redirect)

// scheduled 必须挂在 default export 上，否则 Cron 触发器找不到处理器
export default {
  fetch: app.fetch,
  scheduled: reset,
}
