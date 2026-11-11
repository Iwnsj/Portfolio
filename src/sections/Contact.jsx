import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, CircleAlert, CircleCheck, Copy, LoaderCircle, Mail, MapPin, Send } from 'lucide-react'
import { contactConfig, personal, socials } from '../data/portfolio'
import Button from '../components/Button'
import Magnetic from '../components/Magnetic'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import SpotlightCard from '../components/SpotlightCard'

const initialForm = { name: '', email: '', message: '' }

/** Simple client-side validation; returns an object of field → error. */
function validate({ name, email, message }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.'
  if (message.trim().length < 10) errors.message = 'Message should be at least 10 characters.'
  return errors
}

/** 90s recessed terminal/form input with a crisp monospace label. */
function Field({ id, label, error, as = 'input', ...props }) {
  const Tag = as
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-xs font-bold tracking-wider text-ink uppercase"
      >
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full border-2 bg-surface-alt px-3.5 py-2.5 font-mono text-sm text-ink transition-colors outline-none placeholder:text-muted/60 focus:bg-surface ${
          error ? 'border-rose-600' : 'border-ink focus:border-accent'
        } ${as === 'textarea' ? 'min-h-36 resize-y' : ''}`}
        {...props}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 font-mono text-xs font-bold text-rose-600 dark:text-rose-400"
          >
            ! {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [copied, setCopied] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (e.currentTarget.botcheck?.checked) return

    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return

    if (!contactConfig.web3formsKey) {
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
      window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(contactConfig.subject)}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contactConfig.web3formsKey,
          subject: contactConfig.subject,
          from_name: form.name,
          ...form,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    } finally {
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${personal.email}`
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="contact-title"
          index={6}
          eyebrow="COMPOSE_MAIL.MSG"
          title="Let's build something together"
          subtitle="Have a project, an opportunity or just want to say hi? My inbox is always open — I'll get back to you as soon as I can."
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* Contact info cards */}
          <Reveal from="left" className="flex flex-col gap-5">
            <SpotlightCard title="address_book.cfg" bodyClassName="p-5">
              <p className="font-mono text-xs font-bold tracking-wider text-muted uppercase">DIRECT_EMAIL</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex min-w-0 items-center gap-2 font-mono text-base font-bold break-all text-ink transition-colors hover:text-accent"
                >
                  <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  {personal.email}
                </a>
                <motion.button
                  type="button"
                  onClick={copyEmail}
                  whileTap={{ x: 1, y: 1 }}
                  aria-label={copied ? 'Email copied' : 'Copy email address'}
                  className="grid h-9 w-9 shrink-0 place-items-center border-2 border-ink bg-accent-3 text-[#141413] retro-shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </motion.button>
              </div>
              <span className="sr-only" aria-live="polite">
                {copied ? 'Email address copied to clipboard' : ''}
              </span>
            </SpotlightCard>

            <SpotlightCard title="location.sys" headerColor="bg-accent-2 text-white" bodyClassName="p-5">
              <p className="font-mono text-xs font-bold tracking-wider text-muted uppercase">COORDINATES</p>
              <p className="mt-2 flex items-center gap-2 font-mono text-sm font-bold text-ink">
                <MapPin className="h-5 w-5 text-accent" aria-hidden="true" /> {personal.location}
              </p>
            </SpotlightCard>

            <SpotlightCard title="webring_links.htm" bodyClassName="p-5">
              <p className="font-mono text-xs font-bold tracking-wider text-muted uppercase">FIND ME ONLINE</p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {socials.map(({ name, url, icon: Icon }) => (
                  <li key={name}>
                    <Magnetic strength={0.4}>
                      <a
                        href={url}
                        target={url.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        aria-label={name}
                        className="grid h-11 w-11 place-items-center border-2 border-ink bg-surface-alt text-ink retro-shadow-sm transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-accent-solid hover:text-white hover:shadow-none"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    </Magnetic>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>

          {/* 90s Email Composer Window */}
          <Reveal from="right" delay={0.08}>
            <SpotlightCard title="compose_mail.exe — Outbox" bodyClassName="p-6 sm:p-8">
              {/* Retro mail header strip */}
              <div className="mb-6 border-2 border-ink bg-surface-alt p-3 font-mono text-xs">
                <p>
                  <span className="font-bold text-muted">TO:</span>{' '}
                  <span className="font-bold text-ink">{personal.email}</span>
                </p>
                <p className="mt-1">
                  <span className="font-bold text-muted">SUBJ:</span>{' '}
                  <span className="text-ink">{contactConfig.subject}</span>
                </p>
              </div>

              <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Contact form">
                {/* Honeypot */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="name"
                    label="FROM_NAME:"
                    placeholder="Jane Doe"
                    autoComplete="name"
                    value={form.name}
                    onChange={onChange}
                    error={errors.name}
                  />
                  <Field
                    id="email"
                    label="RETURN_EMAIL:"
                    type="email"
                    placeholder="jane@example.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={onChange}
                    error={errors.email}
                  />
                </div>
                <Field
                  id="message"
                  as="textarea"
                  label="MESSAGE_BODY:"
                  placeholder="Write your message here..."
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  error={errors.message}
                />

                <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* Status message */}
                  <div aria-live="polite" className="min-h-6 font-mono text-xs font-bold">
                    <AnimatePresence mode="wait">
                      {status === 'success' && (
                        <motion.p
                          key="ok"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400"
                        >
                          <CircleCheck className="h-4 w-4" aria-hidden="true" /> [OK] MESSAGE TRANSMITTED!
                        </motion.p>
                      )}
                      {status === 'error' && (
                        <motion.p
                          key="err"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-rose-600 dark:text-rose-400"
                        >
                          <CircleAlert className="h-4 w-4" aria-hidden="true" /> [ERR] FAILED. PLEASE EMAIL DIRECTLY.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <Magnetic>
                    <Button type="submit" disabled={status === 'sending'} className="min-w-44">
                      {status === 'sending' ? (
                        <>
                          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> SENDING...
                        </>
                      ) : (
                        <>
                          SEND MESSAGE
                          <Send className="h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                    </Button>
                  </Magnetic>
                </div>
              </form>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
