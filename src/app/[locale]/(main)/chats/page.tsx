'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useEffect, useRef, useState } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string }
type ChatHistory = { id: string; title: string; messages: Msg[] }

// Component để highlight syntax giống VS Code
function SyntaxHighlighter({ code, language }: { code: string, language: string }) {
    const highlightJSX = (code: string) => {
        const lines = code.split('\n');

        return lines.map((line, lineIndex) => {
            const tokens = [];
            let currentIndex = 0;

            // Keywords JS/React
            const jsKeywords = /\b(import|export|default|function|const|let|var|return|if|else|from|useState|useEffect)\b/g;
            // Strings
            const strings = /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g;
            // Comments
            const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/g;
            // JSX tags
            const jsxTags = /(<\/?[A-Z][a-zA-Z0-9]*>|<\/?[a-z][a-zA-Z0-9]*[^>]*>)/g;
            // Functions
            const functions = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
            // Numbers
            const numbers = /\b\d+\.?\d*\b/g;

            let processedLine = line;
            const highlights = [];

            // Collect all matches
            let match;

            // Keywords
            jsKeywords.lastIndex = 0;
            while ((match = jsKeywords.exec(line)) !== null) {
                highlights.push({
                    start: match.index,
                    end: match.index + match[0].length,
                    type: 'keyword',
                    text: match[0]
                });
            }

            // Strings
            strings.lastIndex = 0;
            while ((match = strings.exec(line)) !== null) {
                highlights.push({
                    start: match.index,
                    end: match.index + match[0].length,
                    type: 'string',
                    text: match[0]
                });
            }

            // Functions
            functions.lastIndex = 0;
            while ((match = functions.exec(line)) !== null) {
                highlights.push({
                    start: match.index,
                    end: match.index + match[1].length,
                    type: 'function',
                    text: match[1]
                });
            }

            // Numbers
            numbers.lastIndex = 0;
            while ((match = numbers.exec(line)) !== null) {
                highlights.push({
                    start: match.index,
                    end: match.index + match[0].length,
                    type: 'number',
                    text: match[0]
                });
            }

            // Sort by position
            highlights.sort((a, b) => a.start - b.start);

            // Build highlighted line
            const highlightedTokens = [];
            let lastEnd = 0;

            highlights.forEach(highlight => {
                // Add text before highlight
                if (highlight.start > lastEnd) {
                    highlightedTokens.push(
                        <span key={`text-${lastEnd}`} className="text-slate-100">
                            {line.slice(lastEnd, highlight.start)}
                        </span>
                    );
                }

                // Add highlighted text
                const className = {
                    keyword: 'text-purple-400 font-semibold',
                    string: 'text-green-400',
                    function: 'text-yellow-300',
                    number: 'text-blue-300',
                    comment: 'text-gray-500 italic'
                }[highlight.type] || 'text-slate-100';

                highlightedTokens.push(
                    <span key={`highlight-${highlight.start}`} className={className}>
                        {highlight.text}
                    </span>
                );

                lastEnd = highlight.end;
            });

            // Add remaining text
            if (lastEnd < line.length) {
                highlightedTokens.push(
                    <span key={`text-${lastEnd}`} className="text-slate-100">
                        {line.slice(lastEnd)}
                    </span>
                );
            }

            return (
                <div key={lineIndex} className="table-row">
                    <span className="table-cell text-slate-500 text-right pr-4 select-none w-8 text-xs">
                        {lineIndex + 1}
                    </span>
                    <span className="table-cell">
                        {highlightedTokens.length > 0 ? highlightedTokens : <span className="text-slate-100">{line}</span>}
                    </span>
                </div>
            );
        });
    };

    return (
        <div className="table w-full font-mono text-sm leading-relaxed">
            {language === 'jsx' || language === 'js' || language === 'javascript'
                ? highlightJSX(code)
                : code.split('\n').map((line, i) => (
                    <div key={i} className="table-row">
                        <span className="table-cell text-slate-500 text-right pr-4 select-none w-8 text-xs">
                            {i + 1}
                        </span>
                        <span className="table-cell text-slate-100">{line}</span>
                    </div>
                ))
            }
        </div>
    );
}

// Component để format tin nhắn đẹp hơn
function FormattedMessage({ content }: { content: string }) {
    const formatText = (text: string) => {
        // Xử lý code blocks trước
        const codeBlockPattern = /```(\w+)?\n([\s\S]*?)```/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = codeBlockPattern.exec(text)) !== null) {
            // Thêm text trước code block
            if (match.index > lastIndex) {
                const beforeText = text.slice(lastIndex, match.index);
                parts.push({ type: 'text', content: beforeText });
            }

            // Thêm code block
            parts.push({
                type: 'code',
                language: match[1] || 'text',
                content: match[2].trim()
            });

            lastIndex = match.index + match[0].length;
        }

        // Thêm text còn lại
        if (lastIndex < text.length) {
            parts.push({ type: 'text', content: text.slice(lastIndex) });
        }

        // Nếu không có code block, chỉ có text
        if (parts.length === 0) {
            parts.push({ type: 'text', content: text });
        }

        return parts.map((part, partIndex) => {
            if (part.type === 'code') {
                return (
                    <div key={partIndex} className="my-1 md:my-2">
                        <div className="bg-[#0d1117] rounded-lg overflow-hidden border border-slate-700 shadow-lg">
                            <div className="flex items-center justify-between px-3 py-2 md:px-4 md:py-2 bg-[#161b22] border-b border-slate-700">
                                <span className="text-xs font-medium text-slate-300 uppercase tracking-wide">
                                    {part.language}
                                </span>
                                <button
                                    onClick={() => navigator.clipboard.writeText(part.content)}
                                    className="text-xs text-slate-400 hover:text-blue-400 transition-colors px-2 py-1 rounded hover:bg-slate-700"
                                >
                                    Copy
                                </button>
                            </div>
                            <div className="p-2 md:p-4 overflow-x-auto bg-[#0d1117]">
                                <SyntaxHighlighter code={part.content} language={part.language || 'text'} />
                            </div>
                        </div>
                    </div>
                );
            }            // Xử lý text thông thường
            const lines = part.content.split('\n');

            return lines.map((line, index) => {
                const lineKey = `${partIndex}-${index}`;

                // Header patterns
                if (line.match(/^\d+\.\s\*\*.*\*\*:/)) {
                    const title = line.replace(/^\d+\.\s\*\*(.*)\*\*:/, '$1');
                    const content = line.replace(/^\d+\.\s\*\*.*\*\*:\s*/, '');
                    return (
                        <div key={lineKey} className="my-3">
                            <h3 className="font-semibold text-base mb-1">{title}</h3>
                            {content && <p className="text-sm leading-relaxed ml-4">{content}</p>}
                        </div>
                    );
                }

                // Ví dụ headers
                if (line.match(/^Ví dụ \d+:/)) {
                    return (
                        <div key={lineKey} className="my-1 mt-4 mb-1">
                            <h4 className="font-semibold text-sm text-primary">{line}</h4>
                        </div>
                    );
                }

                // Numbered list items
                if (line.match(/^\d+\.\s\*\*/)) {
                    const match = line.match(/^\d+\.\s\*\*(.*?)\*\*:\s*(.*)/);
                    if (match) {
                        return (
                            <div key={lineKey} className="my-2 ml-4">
                                <span className="font-semibold">{match[1]}</span>
                                {match[2] && <span className="ml-2">{match[2]}</span>}
                            </div>
                        );
                    }
                }

                // Inline code
                if (line.includes('`') && !line.includes('```')) {
                    const parts = line.split(/(`[^`]+`)/g);
                    return (
                        <p key={lineKey} className="my-2 leading-relaxed">
                            {parts.map((part, i) =>
                                part.startsWith('`') && part.endsWith('`')
                                    ? <code key={i} className="bg-slate-800 text-blue-300 px-2 py-1 rounded text-xs font-mono border border-slate-600">{part.slice(1, -1)}</code>
                                    : part
                            )}
                        </p>
                    );
                }

                // Bold text
                if (line.includes('**')) {
                    const parts = line.split(/(\*\*.*?\*\*)/g);
                    return (
                        <p key={lineKey} className="my-2 leading-relaxed">
                            {parts.map((part, i) =>
                                part.startsWith('**') && part.endsWith('**')
                                    ? <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
                                    : part
                            )}
                        </p>
                    );
                }

                // Bullet points
                if (line.match(/^\*\s/)) {
                    return (
                        <div key={lineKey} className="my-1 ml-4 flex items-start">
                            <span className="mr-2 mt-2 w-1 h-1 bg-current rounded-full flex-shrink-0"></span>
                            <span className="text-sm leading-relaxed">{line.replace(/^\*\s/, '')}</span>
                        </div>
                    );
                }

                // Regular paragraphs
                if (line.trim()) {
                    return <p key={lineKey} className="my-1 text-sm leading-relaxed">{line}</p>;
                }

                // Empty lines - only render if not near code blocks
                const nextLine = lines[index + 1];
                const prevLine = lines[index - 1];

                // Skip empty lines that are right before/after code blocks
                if ((nextLine && nextLine.includes('```')) ||
                    (prevLine && prevLine.includes('```'))) {
                    return null;
                }

                // Skip multiple consecutive empty lines
                if (!line.trim() && !prevLine?.trim()) {
                    return null;
                }

                return <div key={lineKey} className="h-2" />;
            });
        });
    };

    return <div className="formatted-message">{formatText(content)}</div>;
} export default function ChatPage() {
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
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
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
            // Chỉ gửi 5 tin nhắn gần nhất để giảm tải
            const recentMessages = next.slice(-5);

            // gọi API proxy với cấu hình tối ưu cho server yếu
            const res = await fetch('/api/ollama/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "llama3.2:1b-instruct-q4_0",
                    messages: recentMessages.map(m => ({ role: m.role, content: m.content })),
                    stream: true,
                    options: {
                        // Cấu hình tối ưu cho 1 nhân 1 luồng
                        num_ctx: 512,           // Context vừa phải
                        num_predict: -1,        // Không giới hạn độ dài output
                        temperature: 0.5,       // Độ sáng tạo vừa phải
                        top_p: 0.9,            // Giảm độ phức tạp tính toán
                        top_k: 40,             // Giảm số lựa chọn token
                        repeat_penalty: 1.1,    // Tránh lặp từ
                        num_thread: 1,         // Chỉ dùng 1 luồng
                        num_batch: 1,          // Xử lý từng token một
                        mirostat: 2,           // Tự động điều chỉnh độ khó
                        mirostat_tau: 5.0,     // Ngưỡng perplexity mục tiêu
                        mirostat_eta: 0.1      // Tốc độ học adaptive
                    }
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
        <div className="flex h-full w-full bg-background overflow-hidden relative">
            {/* Mobile Backdrop */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Chat Header */}
                <div className="flex items-center justify-between p-3 md:p-4 border-b bg-card/50 backdrop-blur-sm">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="md:hidden p-2 hover:bg-secondary rounded-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <h1 className="text-base md:text-lg font-semibold text-foreground truncate">
                        {chatHistory.find(c => c.id === currentChatId)?.title || 'Chat'}
                    </h1>
                    <div className="text-xs md:text-sm text-muted-foreground hidden sm:block">
                        {messages.length} tin nhắn
                    </div>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto p-3 md:p-6">
                    <div className="space-y-3 md:space-y-4 max-w-none">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`flex items-start gap-2 md:gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                {/* Avatar */}
                                <Avatar className="w-7 h-7 md:w-8 md:h-8 shrink-0">
                                    {m.role === "user" ? (
                                        <AvatarFallback className="bg-primary text-primary-foreground text-xs md:text-sm">
                                            U
                                        </AvatarFallback>
                                    ) : (
                                        <>
                                            <AvatarImage src="/next.svg" alt="Assistant" />
                                            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs md:text-sm">
                                                AI
                                            </AvatarFallback>
                                        </>
                                    )}
                                </Avatar>

                                {/* Message Bubble */}
                                <div
                                    className={`max-w-[90%] md:max-w-[85%] rounded-lg px-3 py-2 md:px-4 md:py-3 ${m.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary text-secondary-foreground"
                                        }`}
                                >
                                    {m.role === "assistant" ? (
                                        <FormattedMessage content={m.content} />
                                    ) : (
                                        <div className="text-xs md:text-sm whitespace-pre-wrap break-words">
                                            {m.content}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Loading Indicator */}
                        {loading && (
                            <div className="flex items-start gap-2 md:gap-3">
                                <Avatar className="w-7 h-7 md:w-8 md:h-8 shrink-0">
                                    <AvatarImage src="/next.svg" alt="Assistant" />
                                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs md:text-sm">
                                        AI
                                    </AvatarFallback>
                                </Avatar>
                                <div className="bg-secondary/50 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3 border border-border/20">
                                    <div className="flex items-center gap-1">
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                            <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                                        </div>
                                        <span className="text-xs text-muted-foreground ml-2 font-medium">Đang suy nghĩ</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={bottomRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="border-t bg-card/50 backdrop-blur-sm p-3 md:p-4">
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
                            className="flex-1 text-sm md:text-base"
                        />
                        <Button
                            type="submit"
                            disabled={loading || !input.trim()}
                            size="icon"
                            className="shrink-0 h-9 w-9 md:h-10 md:w-10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="md:w-4 md:h-4"
                            >
                                <path d="m22 2-7 20-4-9-9-4Z" />
                                <path d="M22 2 11 13" />
                            </svg>
                        </Button>
                    </form>
                </div>
            </div>

            {/* Sidebar - Desktop: right side, Mobile: overlay */}
            <div className={`
                fixed md:relative top-0 right-0 h-full w-80 md:w-72 lg:w-80 
                border-l bg-card/95 md:bg-card/50 backdrop-blur-sm flex flex-col shrink-0 z-50
                transform transition-transform duration-300 ease-in-out
                ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            `}>
                {/* Sidebar Header */}
                <div className="p-3 md:p-4 border-b relative">
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className="absolute top-3 left-3 p-1 hover:bg-secondary rounded-lg md:hidden"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <h2 className="font-semibold text-base md:text-lg mb-3 ml-8 md:ml-0">TRỢ LÝ ENJOY SPORT</h2>
                    <Button
                        onClick={() => {
                            createNewChat();
                            setIsMobileSidebarOpen(false);
                        }}
                        className="w-full text-sm"
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
                    <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-2 px-2">Lịch sử chat</h3>
                    <div className="h-full overflow-y-auto">
                        <div className="space-y-1">
                            {chatHistory.map((chat) => (
                                <Button
                                    key={chat.id}
                                    variant={currentChatId === chat.id ? "secondary" : "ghost"}
                                    className="w-full justify-start h-auto p-2 md:p-3 text-left"
                                    onClick={() => {
                                        switchChat(chat.id);
                                        setIsMobileSidebarOpen(false);
                                    }}
                                >
                                    <div className="flex flex-col items-start w-full">
                                        <span className="font-medium text-xs md:text-sm truncate w-full">
                                            {chat.title}
                                        </span>
                                        <span className="text-xs text-muted-foreground truncate w-full">
                                            {chat.messages[chat.messages.length - 1]?.content.slice(0, 40)}...
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
