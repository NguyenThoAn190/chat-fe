'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState, useCallback } from 'react'
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

type Msg = { id: string; role: 'user' | 'assistant'; content: string }

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setInput('');
    setLoading(true);

    const userMsg: Msg = { id: Date.now().toString(), role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    const assistantMsgId = (Date.now() + 1).toString();

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      
      const assistantMsg: Msg = {
        id: assistantMsgId,
        role: 'assistant',
        content: data.text || 'Không có phản hồi'
      };

      setMessages([...newMessages, assistantMsg]);
      inputRef.current?.focus();
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        return;
      }

      const errorMsg: Msg = {
        id: assistantMsgId,
        role: 'assistant',
        content: `Xin lỗi, đã có lỗi xảy ra: ${(error as Error).message}`
      };

      setMessages([...newMessages, errorMsg]);
      toast.error('Có lỗi xảy ra khi gọi AI');
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [input, loading, messages]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }, [send]);

  return (
    <>
      <div className="flex flex-col h-screen w-full bg-background relative overflow-hidden">
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col min-h-0">
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b bg-card/50 backdrop-blur-sm shrink-0">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <h1 className="text-base md:text-lg font-semibold truncate">Trợ lý AI</h1>

            <div className="flex items-center gap-1 md:gap-2">
              {loading && (
                <button
                  onClick={() => abortControllerRef.current?.abort()}
                  className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors"
                  title="Hủy"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMessages([]);
                  inputRef.current?.focus();
                }}
                className="hidden sm:flex"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Xóa
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-3 md:p-6"
          >
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.length === 0 && !loading && (
                <div className="text-center py-8 md:py-12">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 mb-3 md:mb-4">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Bắt đầu cuộc trò chuyện</h2>
                  <p className="text-muted-foreground text-sm">Đặt câu hỏi để bắt đầu</p>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    'flex items-start gap-2 md:gap-3',
                    m.role === 'user' && 'flex-row-reverse'
                  )}
                >
                  <Avatar className="w-7 h-7 md:w-8 md:h-8 shrink-0">
                    {m.role === 'user' ? (
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        U
                      </AvatarFallback>
                    ) : (
                      <>
                        <AvatarImage src="/next.svg" alt="AI" />
                        <AvatarFallback className="bg-secondary text-xs">
                          AI
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>

                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3 py-2 md:px-4 md:py-3',
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    )}
                  >
                    {m.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none
                        prose-headings:mt-2 prose-headings:mb-1
                        prose-p:my-1
                        prose-ul:my-1 prose-ol:my-1
                        prose-li:my-0
                        prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:bg-muted prose-code:text-xs
                        prose-pre:p-0 prose-pre:bg-transparent
                        prose-a:text-blue-500
                      ">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                        >
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap break-words">{m.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-start gap-2 md:gap-3">
                  <Avatar className="w-7 h-7 md:w-8 md:h-8 shrink-0">
                    <AvatarImage src="/next.svg" alt="AI" />
                    <AvatarFallback className="bg-secondary text-xs">AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-secondary rounded-2xl px-3 py-2 md:px-4 md:py-3">
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-muted-foreground/60 rounded-full animate-bounce" />
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">Đang xử lý...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} className="h-px" />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t bg-card/50 backdrop-blur-sm p-3 md:p-4 shrink-0">
            <form
              className="max-w-3xl mx-auto flex gap-2"
              onSubmit={e => {
                e.preventDefault();
                void send();
              }}
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập tin nhắn..."
                disabled={loading}
                className="flex-1"
                autoComplete="off"
              />
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                size="icon"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Sidebar - Desktop only
        <div className="hidden md:flex w-72 lg:w-80 border-l bg-card/95 backdrop-blur-sm flex-col shrink-0">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-center">TRỢ LÝ AI</h2>
          </div>

          <div className="flex-1 px-4 pt-4 overflow-hidden">
            <div className="text-center text-sm text-muted-foreground">
              {messages.length > 0 && (
                <p>{messages.length} tin nhắn</p>
              )}
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
