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
export default app

export const scheduled = reset
