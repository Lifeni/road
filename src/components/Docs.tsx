import { IndexProps } from '../routers'

const docs = [
  {
    name: '重定向链接',
    apis: [
      {
        method: 'PUT',
        path: '/<CODE>?to=<URL>',
        descriptions: ['创建或替换一个重定向地址，需指定后缀。'],
      },
      {
        method: 'GET',
        path: '/<CODE>?<TYPE>',
        descriptions: [
          '访问指定后缀的重定向链接。',
          '在地址后添加 ?text 或 ?json 获取链接地址文本。',
        ],
      },
      {
        method: 'DELETE',
        path: '/<CODE>',
        descriptions: ['删除指定后缀的重定向地址。'],
      },
      {
        method: 'POST',
        path: '/<CODE>?to=<URL>',
        descriptions: ['修改指定后缀的重定向地址。'],
      },
    ],
  },
  {
    name: '反向代理',
    apis: [
      {
        method: 'GET',
        path: '/-/<URL>',
        descriptions: ['借助 Cloudflare Workers 代理访问某个地址。'],
      },
    ],
  },
  {
    name: '快捷方式',
    apis: [
      {
        method: 'GET',
        path: '/+/<URL>?<TYPE>',
        descriptions: [
          '快捷创建指定地址的重定向链接。',
          '使用 ?json 获取 JSON 格式的链接地址文本。',
        ],
      },
    ],
  },
]

export const Docs = ({ host }: IndexProps) => (
  <article>
    {docs.map(({ name, apis }) => (
      <section class="Box-row">
        <h2 class="h6 mb-2 pb-1">{name}</h2>
        <ul class="list-style-none">
          {apis.map(({ method, path, descriptions }) => (
            <li class="mt-2">
              <h3 class="h6 mb-2">
                <code class="IssueLabel color-bg-accent-emphasis color-fg-on-emphasis mr-1">
                  {method}
                </code>
                <code class="Label mr-1 Label--accent">
                  {host}
                  {path}
                </code>
              </h3>
              {descriptions.map(description => (
                <p class="mb-0 f6 lh-default">{description}</p>
              ))}
            </li>
          ))}
        </ul>
      </section>
    ))}
  </article>
)
