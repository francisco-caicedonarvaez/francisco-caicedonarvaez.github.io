import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

const Image = ({ src, ...rest }: ImageProps) => {
  // For static files in /public, always use absolute paths without locale
  let imageSrc = src as string

  if (typeof imageSrc === 'string') {
    // Remove locale prefix if present (shouldn't be, but as safety)
    imageSrc = imageSrc.replace(/^\/(en|es)(\/.*)/, '$2')
    // Add basePath if configured
    imageSrc = `${basePath || ''}${imageSrc}`
  }

  return <NextImage src={imageSrc} unoptimized={true} {...rest} />
}

export default Image
