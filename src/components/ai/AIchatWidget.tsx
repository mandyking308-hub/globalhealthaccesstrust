import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Minimize2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatWidgetProps {
  title: string;
  subtitle?: string;
  endpoint: string;
  userId: string;
  icon?: React.ReactNode;
  accentColor?: string;
  defaultExpanded?: boolean;
}

export const AIChatWidget = ({
  title,
  subtitle,
  endpoint,
  userId,
  icon,
  accentColor = "primary",
  defaultExpanded = false,
}: AIChatWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    setIsLoading(true);
    setError(null);

    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${endpoint}`;

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          donorId: userId,
          volunteerId: userId,
        }),
      });

      if (!resp.ok) {
        if (resp.status === 429) {
          throw new Error("Rate limit exceeded. Please try again in a moment.");
        }
        if (resp.status === 402) {
          throw new Error("AI credits exhausted. Please contact support.");
        }
        throw new Error("Failed to connect to AI assistant");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: assistantContent,
                };
                return updated;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("AI Chat error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    await streamChat(userMessage);
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          size="lg"
          onClick={() => setIsExpanded(true)}
          className={cn(
            "rounded-full w-14 h-14 sm:w-16 sm:h-16 shadow-lg hover:scale-110 transition-all duration-300",
            `bg-${accentColor} hover:bg-${accentColor}/90`
          )}
          aria-label={`Open ${title}`}
        >
          {icon || <Bot className="w-5 h-5 sm:w-6 sm:h-6" />}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-full max-w-[calc(100vw-2rem)] sm:w-96 sm:max-w-[calc(100vw-3rem)]">
      <Card className="shadow-2xl border-2 animate-in slide-in-from-bottom-4 duration-300">
        <CardHeader className={cn("pb-3 bg-gradient-to-r", `from-${accentColor}/10 to-${accentColor}/5`)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon || <Bot className="w-5 h-5 text-accent" />}
              <div>
                <CardTitle className="text-sm sm:text-base">{title}</CardTitle>
                {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsExpanded(false)}
              className="h-8 w-8 hover:bg-background/50"
              aria-label="Minimize chat"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64 sm:h-80 md:h-96 p-3 sm:p-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                {icon || <Bot className="w-10 h-10 sm:w-12 sm:h-12 mb-3 opacity-50" />}
                <p className="text-xs sm:text-sm px-4">{subtitle || "How can I assist you today?"}</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex gap-2",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        {icon || <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />}
                      </div>
                    )}
                    <div
                      className={cn(
                        "rounded-lg px-3 py-2 sm:px-4 sm:py-2 max-w-[85%] sm:max-w-[80%]",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent animate-spin" />
                    </div>
                    <div className="bg-muted rounded-lg px-3 py-2 sm:px-4 sm:py-2">
                      <p className="text-xs sm:text-sm text-muted-foreground">Thinking...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {error && (
            <div className="px-3 sm:px-4 py-2 bg-destructive/10 text-destructive text-xs sm:text-sm border-t">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 text-sm min-h-[44px]"
                aria-label="Message input"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="flex-shrink-0 min-h-[44px] min-w-[44px]"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};