import { html } from 'hono/html'

export const Favicon = html`
  <svg
    width="1024"
    height="1024"
    viewBox="0 0 1024 1024"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="1024"
      height="1024"
      rx="512"
      fill="url(#paint0_linear_2469_6)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_2469_6"
        x1="0"
        y1="0"
        x2="1024"
        y2="1024"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#CE9FFC" />
        <stop offset="1" stop-color="#7367F0" />
      </linearGradient>
    </defs>
  </svg>
`

export const Bookmark = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="16"
    height="16"
  >
    <path
      fill-rule="evenodd"
      fill="currentColor"
      d="M4.75 2.5a.25.25 0 00-.25.25v9.91l3.023-2.489a.75.75 0 01.954 0l3.023 2.49V2.75a.25.25 0 00-.25-.25h-6.5zM3 2.75C3 1.784 3.784 1 4.75 1h6.5c.966 0 1.75.784 1.75 1.75v11.5a.75.75 0 01-1.227.579L8 11.722l-3.773 3.107A.75.75 0 013 14.25V2.75z"
    ></path>
  </svg>
`

export const Ok = html`
  <svg
    class="octicon octicon-check mr-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
    ></path>
  </svg>
`

export const Error = html`
  <svg
    class="octicon octicon-alert mr-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
    ></path>
  </svg>
`
