'use client'

import { createContext, useContext, useState } from 'react'

export const TOPICS = ['Help me choose', 'Paid creative', 'Organic content', 'Both', 'A focused project', 'Careers'] as const
export type Topic = (typeof TOPICS)[number]

const InquiryContext = createContext<{ topic: Topic; setTopic: (t: Topic) => void }>({
  topic: TOPICS[0],
  setTopic: () => {},
})

export const useInquiry = () => useContext(InquiryContext)

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [topic, setTopic] = useState<Topic>(TOPICS[0])
  return <InquiryContext.Provider value={{ topic, setTopic }}>{children}</InquiryContext.Provider>
}

// Jumps to the contact form and preselects what the visitor wants to discuss
export function InquiryLink({ topic, className, children }: { topic: Topic; className?: string; children: React.ReactNode }) {
  const { setTopic } = useInquiry()
  return (
    <a href="#inquiry" className={className} onClick={() => setTopic(topic)}>
      {children}
    </a>
  )
}
