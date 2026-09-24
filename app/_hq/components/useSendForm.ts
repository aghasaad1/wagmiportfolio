'use client'

import { useCallback, useState } from 'react'

export const CONTACT_EMAIL = 'aghasaad@wagmihq.com'

type State = 'idle' | 'sending' | 'sent' | 'error'

// Posts a form to /api/contact (SMTP) and tracks sending / sent / error for the UI.
export function useSendForm(kind: 'inquiry' | 'careers') {
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState('')

  const send = async (form: HTMLFormElement, extra: Record<string, string> = {}) => {
    setState('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, ...Object.fromEntries(new FormData(form)), ...extra }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'We could not send your message.')
      form.reset()
      setState('sent')
    } catch (err) {
      setError(`${(err as Error).message} Please try again or email ${CONTACT_EMAIL} directly.`)
      setState('error')
    }
  }

  const reset = useCallback(() => {
    setState('idle')
    setError('')
  }, [])

  return { state, error, send, reset }
}
