import { Encoder, ErrorCorrectionLevel } from '@nuintun/qrcode'
import { type Props } from '../routers'

export const QRCode = ({ url, protocol }: Props) => {
  if (!url) return null
  const qrcode = new Encoder()
  qrcode.setEncodingHint(true)
  qrcode.setErrorCorrectionLevel(ErrorCorrectionLevel.H)
  qrcode.write(`${protocol}//${url}`)
  qrcode.make()

  return (
    <article class="d-flex flex-column flex-items-center flex-justify-center">
      <img
        class="width-full rounded-2"
        src={qrcode.toDataURL(8)}
        title={`${protocol}//${url}`}
      />
    </article>
  )
}
