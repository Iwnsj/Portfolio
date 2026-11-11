import { useState } from 'react'
import { ImageOff } from 'lucide-react'

/**
 * LazyImage — native lazy-loading image with a solid 90s status placeholder
 * while loading and a flat fallback if it fails (zero gradients).
 */
export default function LazyImage({ src, alt, className = '', wrapperClassName = '', ...rest }) {
  const [status, setStatus] = useState('loading') // loading | loaded | error

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {status === 'loading' && (
        <div
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center bg-surface-alt font-mono text-xs font-bold tracking-widest text-muted uppercase"
        >
          [ LOADING_BMP... ]
        </div>
      )}
      {status === 'error' ? (
        <div className="absolute inset-0 grid place-items-center bg-surface-alt text-ink">
          <div className="flex flex-col items-center gap-1 font-mono text-xs font-bold uppercase">
            <ImageOff className="h-6 w-6 text-accent" aria-hidden="true" />
            <span>IMG_NOT_FOUND</span>
          </div>
          <span className="sr-only">{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`transition-opacity duration-300 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...rest}
        />
      )}
    </div>
  )
}
