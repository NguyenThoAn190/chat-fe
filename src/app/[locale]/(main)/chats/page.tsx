'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useEffect, useRef, useState } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string }
type ChatHistory = { id: string; title: string; messages: Msg[] }

export default function ChatPage() {
    const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
        {
            id: '1',
            title: 'Chat đầu tiên',
            messages: [{ role: 'assistant', content: 'Xin chào! Hỏi mình bất cứ điều gì 👋' }]
        }
    ])
    const [currentChatId, setCurrentChatId] = useState('1')
    const [messages, setMessages] = useState<Msg[]>([
        { role: 'assistant', content: 'Xin chào! Hỏi mình bất cứ điều gì 👋' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    // Tạo chat mới
    function createNewChat() {
        const newChatId = Date.now().toString()
        const newChat: ChatHistory = {
            id: newChatId,
            title: `Chat mới ${chatHistory.length + 1}`,
            messages: [{ role: 'assistant', content: 'Xin chào! Hỏi mình bất cứ điều gì 👋' }]
        }
        setChatHistory(prev => [...prev, newChat])
        setCurrentChatId(newChatId)
        setMessages(newChat.messages)
    }

    // Chuyển đổi chat
    function switchChat(chatId: string) {
        const chat = chatHistory.find(c => c.id === chatId)
        if (chat) {
            setCurrentChatId(chatId)
            setMessages(chat.messages)
        }
    }

    // Cập nhật chat hiện tại
    function updateCurrentChat(newMessages: Msg[]) {
        setChatHistory(prev =>
            prev.map(chat =>
                chat.id === currentChatId
                    ? { ...chat, messages: newMessages }
                    : chat
            )
        )
    }

    async function send() {
        const text = input.trim()
        if (!text) return
        setInput('')

        const next = [...messages, { role: 'user' as const, content: text }]
        setMessages(next)
        updateCurrentChat(next)
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
                                updateCurrentChat(copy)
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
        <div className="flex h-screen w-full bg-background overflow-hidden">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 ">
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b bg-card/50 backdrop-blur-sm">
                    <h1 className="text-lg font-semibold text-foreground">
                        {chatHistory.find(c => c.id === currentChatId)?.title || 'Chat'}
                    </h1>
                    <div className="text-sm text-muted-foreground">
                        {messages.length} tin nhắn
                    </div>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-4 max-w-none">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`flex items-start gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                {/* Avatar */}
                                <Avatar className="w-8 h-8 shrink-0">
                                    {m.role === "user" ? (
                                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                            U
                                        </AvatarFallback>
                                    ) : (
                                        <>
                                            <AvatarImage src="/next.svg" alt="Assistant" />
                                            <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                                                AI
                                            </AvatarFallback>
                                        </>
                                    )}
                                </Avatar>

                                {/* Message Bubble */}
                                <div
                                    className={`max-w-[85%] rounded-lg px-4 py-3 ${m.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary text-secondary-foreground"
                                        }`}
                                >
                                    <div className="text-sm whitespace-pre-wrap break-words">
                                        {m.content}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Loading Indicator */}
                        {loading && (
                            <div className="flex items-start gap-3">
                                <Avatar className="w-8 h-8 shrink-0">
                                    <AvatarImage src="/next.svg" alt="Assistant" />
                                    <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                                        AI
                                    </AvatarFallback>
                                </Avatar>
                                <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-75"></div>
                                        <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-150"></div>
                                        <span className="text-sm ml-2">Đang trả lời...</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={bottomRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="border-t bg-card/50 backdrop-blur-sm p-4">
                    <form
                        className="flex gap-2"
                        onSubmit={e => {
                            e.preventDefault();
                            void send();
                        }}
                    >
                        <Input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            placeholder="Nhập tin nhắn của bạn..."
                            disabled={loading}
                            className="flex-1"
                        />
                        <Button
                            type="submit"
                            disabled={loading || !input.trim()}
                            size="icon"
                            className="shrink-0"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m22 2-7 20-4-9-9-4Z" />
                                <path d="M22 2 11 13" />
                            </svg>
                        </Button>
                    </form>
                </div>
            </div>

            {/* Sidebar - Moved to right */}
            <div className="w-80 border-l bg-card/50 backdrop-blur-sm flex flex-col shrink-0">
                {/* Sidebar Header */}
                <div className="p-4 border-b">
                    <h2 className="font-semibold text-lg mb-3">TRỢ LÝ ENJOY SPORT</h2>
                    <Button
                        onClick={createNewChat}
                        className="w-full"
                        variant="default"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Chat mới
                    </Button>
                </div>

                {/* Chat History */}
                <div className="flex-1 p-2 overflow-hidden">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">Lịch sử chat</h3>
                    <div className="h-full overflow-y-auto">
                        <div className="space-y-1">
                            {chatHistory.map((chat) => (
                                <Button
                                    key={chat.id}
                                    variant={currentChatId === chat.id ? "secondary" : "ghost"}
                                    className="w-full justify-start h-auto p-3 text-left"
                                    onClick={() => switchChat(chat.id)}
                                >
                                    <div className="flex flex-col items-start w-full">
                                        <span className="font-medium text-sm truncate w-full">
                                            {chat.title}
                                        </span>
                                        <span className="text-xs text-muted-foreground truncate w-full">
                                            {chat.messages[chat.messages.length - 1]?.content.slice(0, 50)}...
                                        </span>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
