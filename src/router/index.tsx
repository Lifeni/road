import { html } from 'hono/html'

interface LayoutProps {
  name: string
  children: JSX.Element
}

export const Layout = ({ name, children }: LayoutProps) => html`<!DOCTYPE html>
  <html lang="zh-hans">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="noindex" />
      <link rel="icon" href="/favicon.svg" type="image/x-icon" />
      <title>${name}</title>
      <style>
        body {
          font-family: Inter, -apple-system, MiSans, 'HarmonyOS Sans SC',
            system-ui, 'Roboto', sans-serif;
        }
      </style>
    </head>
    <body>
      ${children}
    </body>
  </html>`

export const Index = () => (
  <Layout name="随意链接">
    <h1>随意链接</h1>
  </Layout>
)
