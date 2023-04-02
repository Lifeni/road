import { IndexProps } from '../routers'
import { Error, Ok } from './base/Icons'

export const Messages = ({ type, url }: IndexProps) => (
  <div>
    {type === 'ok' ? (
      <div class="flash flash-full flash-success py-2 pl-3 pr-2 border-0 border-top">
        <section class="d-flex flex-items-center my-1">
          {Ok}
          <span>
            {'已重定向到 '}
            <a class="Link" target="_blank" href={`//${url}`}>
              <strong>{url}</strong>
            </a>
          </span>
        </section>
      </div>
    ) : type === 'error' ? (
      <div class="flash flash-full flash-warn py-2 border-0 border-top">
        <section class="d-flex flex-items-center my-1">
          {Error}
          <span>重定向失败，请稍后再试</span>
        </section>
      </div>
    ) : null}
  </div>
)
