import { Hono } from 'hono'
import { prettyJSON as pretty } from 'hono/pretty-json'
import { logger } from 'hono/logger'
import { redirect } from './libs/redirect'


const app = new Hono()
app.use('*', pretty())
app.use('*', logger())

app.route('/', redirect)
export default app
