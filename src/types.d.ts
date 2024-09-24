export interface Props {
  type?: 'ok' | 'error'
  url?: string
  protocol?: string
  host?: string
}

export interface ErrorProps {
  code: 404 | 400 | 403 | 500
}
