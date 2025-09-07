'use client'

import { useEffect, useRef, useState } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string }

export default function ChatPage() {
    const [messages, setMessages] = useState<Msg[]>([
        { role: 'assistant', content: 'Xin chào! Hỏi mình bất cứ điều gì 👋' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    async function send() {
        const text = input.trim()
        if (!text) return
        setInput('')

        const next = [...messages, { role: 'user' as const, content: text }]
        setMessages(next)
        setLoading(true)

        // Tạo khung cho assistant để append dần token vào
        setMessages(prev => [...prev, { role: 'assistant', content: '' }])
        const assistantIndex = next.length // vị trí assistant mới

        try {
            // gọi API proxy (stream = true)
            const res = await fetch('/api/ollama/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: next.map(m => ({ role: m.role, content: m.content })),
                    stream: true,
                })
            })

            if (!res.body) throw new Error('No response body')

            const reader = res.body.getReader()
            const decoder = new TextDecoder()

            let acc = ''
            while (true) {
                const { value, done } = await reader.read()
                if (done) break
                const chunk = decoder.decode(value, { stream: true })
                acc += chunk

                // Ollama stream = NDJSON (mỗi dòng 1 JSON)
                const lines = acc.split('\n')
                acc = lines.pop() || ''

                for (const line of lines) {
                    if (!line.trim()) continue
                    try {
                        const json = JSON.parse(line)
                        // mỗi chunk có dạng: { message: { content: "..." }, done: boolean, ... }
                        const token = json?.message?.content ?? ''
                        if (token) {
                            setMessages(prev => {
                                const copy = [...prev]
                                copy[assistantIndex] = {
                                    role: 'assistant',
                                    content: (copy[assistantIndex]?.content || '') + token
                                }
                                return copy
                            })
                        }
                    } catch {
                        // bỏ qua dòng parse lỗi (nếu có)
                    }
                }
            }
        } catch (e) {
            setMessages(prev => [
                ...prev.slice(0, assistantIndex),
                { role: 'assistant', content: `Lỗi: ${(e as Error).message}` }
            ])
        } finally {
            setLoading(false)
        }
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            void send()
        }
    }

    return (
        <main style={{ width: '100%', margin: '24px', padding: '0 16px', fontFamily: 'system-ui, sans-serif' }}>
            <h1>TRỢ LÝ ENJOY SPORT </h1>

            <div
                style={{
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    padding: 16,
                    minHeight: 360,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12
                }}
            >
                {messages.map((m, i) => (
                    <div
                        key={i}
                        style={{
                            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                            background: m.role === 'user' ? '#e7f1ff' : '#f4f4f5',
                            borderRadius: 8,
                            padding: '8px 12px',
                            maxWidth: '85%',
                            whiteSpace: 'pre-wrap'
                        }}
                    >
                        <strong style={{ display: 'block', color: '#555', fontSize: 12 }}>
                            {m.role === 'user' ? 'You' : 'Assistant'}
                        </strong>
                        <span>{m.content}</span>
                    </div>
                ))}
                {loading && <div style={{ color: '#888' }}>Assistant đang trả lời…</div>}
                <div ref={bottomRef} />
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Nhập tin nhắn và nhấn Enter…"
                    style={{
                        flex: 1,
                        padding: '10px 12px',
                        border: '1px solid #ddd',
                        borderRadius: 8
                    }}
                />
                <button
                    onClick={() => void send()}
                    disabled={loading || !input.trim()}
                    style={{ padding: '10px 14px', borderRadius: 8 }}
                >
                    Gửi
                </button>
            </div>
        </main>
    )
}
