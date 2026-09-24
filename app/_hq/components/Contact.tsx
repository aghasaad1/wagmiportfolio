'use client'

import { TOPICS, useInquiry, type Topic } from './Inquiry'
import { Eyebrow, btn, h2, section } from './ui'
import { CONTACT_EMAIL, useSendForm } from './useSendForm'

const field = 'flex flex-col gap-[7px]'
const label = 'text-[14px] text-[#bdc8b8]'
const input =
  'w-full rounded-[10px] border border-[#f4f1d628] bg-[#15241b] p-3 text-[16px] text-[#f4f1d6] outline-none transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#f4f1d645] focus:border-[#c1cbb1] focus:bg-[#182a1f] focus:shadow-[0_0_0_4px_#c1cbb114]'

// Sends via /api/contact (SMTP), delivered to the inbox set in .env.local
export default function Contact() {
  const { topic, setTopic } = useInquiry()
  const { state, error, send, reset } = useSendForm('inquiry')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await send(e.currentTarget, { topic })
    setTopic(TOPICS[0])
  }

  return (
    <section
      id="inquiry"
      className={`${section} grid grid-cols-[1fr_1.1fr] gap-[90px] border-b-0 max-[800px]:grid-cols-1 max-[800px]:gap-7`}
    >
      <div data-anim="reveal">
        <Eyebrow>Let’s talk</Eyebrow>
        <h2 className={h2}>
          Let’s talk about
          <br />
          your next clients.
        </h2>
        <p className="my-4 text-[#a9b7a7]">
          Tell us what you sell and where content is holding you back.
        </p>
        <p className="my-[14px] text-[14px] text-[#a9b7a7]">
          Prefer email? Write to{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="border-b border-[#6f816b] text-[#f4f1d6] transition-colors duration-200 hover:border-[#f4f1d6]">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>

      <form onSubmit={onSubmit} onInput={() => state === 'sent' && reset()} className="grid grid-cols-2 gap-[17px] max-[800px]:grid-cols-1">
        <div data-anim="reveal" className={field}>
          <label htmlFor="name" className={label}>Name</label>
          <input id="name" name="name" autoComplete="name" required className={input} />
        </div>
        <div data-anim="reveal" className={field}>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required className={input} />
        </div>
        <div data-anim="reveal" className={`${field} col-span-full`}>
          <label htmlFor="business" className={label}>Website or social profile</label>
          <input id="business" name="business" required className={input} />
        </div>
        <div data-anim="reveal" className={`${field} col-span-full`}>
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
        <div data-anim="reveal" className={`${field} col-span-full`}>
          <label htmlFor="challenge" className={label}>Your message or content challenge</label>
          <textarea id="challenge" name="message" required className={`${input} min-h-[90px] resize-y`} />
        </div>
        <button
          data-anim="reveal"
          type="submit"
          disabled={state === 'sending'}
          className={`${btn()} col-span-full cursor-pointer disabled:cursor-wait disabled:opacity-60`}
        >
          {state === 'sending' ? 'Sending…' : 'Send message'} <span>↗</span>
        </button>
        <p role="status" className={`col-span-full m-0 text-[14px] ${state === 'error' ? 'text-[#e8a99a]' : 'text-[#c5d0ba]'}`}>
          {state === 'sent' && 'Thanks — your message has been sent. We’ll get back to you soon.'}
          {state === 'error' && error}
        </p>
      </form>
    </section>
  )
}
