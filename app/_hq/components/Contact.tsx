'use client'

import { useState } from 'react'
import { TOPICS, useInquiry, type Topic } from './Inquiry'
import { Eyebrow, btn, h2, section } from './ui'

const EMAIL = 'aghasaad@wagmihq.com'

const field = 'flex flex-col gap-[7px]'
const label = 'text-[14px] text-[#bdc8b8]'
const input =
  'w-full rounded-[10px] border border-[#f4f1d628] bg-[#15241b] p-3 text-[16px] text-[#f4f1d6] outline-none focus:border-[#c1cbb1]'

// No backend yet: the form opens a pre-filled draft in the visitor's email app.
export default function Contact() {
  const { topic, setTopic } = useInquiry()
  const [status, setStatus] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const body = [
      'Name: ' + f.get('name'),
      'Email: ' + f.get('email'),
      'Website / portfolio: ' + f.get('business'),
      'Interest: ' + topic,
      '',
      'Message: ' + f.get('challenge'),
    ].join('\n')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('WAGMI HQ LLC — ' + topic)}&body=${encodeURIComponent(body)}`
    setStatus(`Your email app has been requested. Review and send the draft there. If it does not open, email ${EMAIL} directly.`)
  }

  return (
    <section
      id="inquiry"
      className={`${section} grid grid-cols-[1fr_1.1fr] gap-[90px] border-b-0 max-[800px]:grid-cols-1 max-[800px]:gap-7`}
    >
      <div>
        <Eyebrow>Let’s talk</Eyebrow>
        <h2 className={h2}>
          Let’s talk about
          <br />
          your next clients.
        </h2>
        <p className="my-4 text-[#a9b7a7]">
          Tell us what you sell and where content is holding you back. For careers, share your role and a link to your
          work.
        </p>
        <p id="contact-setup" className="my-[14px] text-[14px] text-[#a9b7a7]">
          This form opens a draft in your email app. Review and send it to {EMAIL}.
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-2 gap-[17px] max-[800px]:grid-cols-1">
        <div className={field}>
          <label htmlFor="name" className={label}>Name</label>
          <input id="name" name="name" autoComplete="name" required className={input} />
        </div>
        <div className={field}>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required className={input} />
        </div>
        <div className={`${field} col-span-full`}>
          <label htmlFor="business" className={label}>Website or social profile</label>
          <input id="business" name="business" required className={input} />
        </div>
        <div className={`${field} col-span-full`}>
          <label htmlFor="package" className={label}>What do you need?</label>
          <select
            id="package"
            name="package"
            value={topic}
            onChange={(e) => setTopic(e.target.value as Topic)}
            className={input}
          >
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className={`${field} col-span-full`}>
          <label htmlFor="challenge" className={label}>Your message or content challenge</label>
          <textarea id="challenge" name="challenge" required className={`${input} min-h-[90px] resize-y`} />
        </div>
        <button type="submit" aria-describedby="contact-setup" className={`${btn()} col-span-full cursor-pointer`}>
          Open email draft <span>↗</span>
        </button>
        <p role="status" className="col-span-full m-0 text-[14px] text-[#c5d0ba]">{status}</p>
      </form>
    </section>
  )
}
