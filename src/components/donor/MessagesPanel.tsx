import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  subject: string;
  body: string;
  status: string;
  created_at: string;
  read_at: string | null;
  from_user_id: string | null;
}

interface MessagesPanelProps {
  userId: string;
}

export const MessagesPanel = ({ userId }: MessagesPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `to_user_id=eq.${userId}`
        },
        () => loadMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('to_user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading messages",
        description: error.message
      });
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const markAsRead = async (messageId: string) => {
    const { error } = await supabase
      .from('messages')
      .update({ status: 'read', read_at: new Date().toISOString() })
      .eq('id', messageId);

    if (!error) {
      loadMessages();
    }
  };

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      markAsRead(message.id);
    }
  };

  if (loading) {
    return <div className="portal-panel text-muted-foreground">Loading messages...</div>;
  }

  return (
    <div className="portal-panel p-0">
      <div className="px-8 py-6 border-b border-foreground/10">
        <span className="portal-eyebrow">Messages</span>
        <h2 className="text-foreground mt-2" style={{ fontSize: "clamp(22px, 2vw, 30px)", fontWeight: 500 }}>Your Messages</h2>
      </div>

      <div className="grid md:grid-cols-[320px_1fr] min-h-[400px]">
        {/* List */}
        <div className="border-b md:border-b-0 md:border-r border-foreground/10 divide-y divide-foreground/10 max-h-[560px] overflow-y-auto">
          {messages.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">No messages yet</p>
          ) : (
            messages.map((message) => (
              <button
                key={message.id}
                onClick={() => handleMessageClick(message)}
                className={`w-full text-left px-6 py-4 hover:bg-secondary/50 transition-colors ${
                  selectedMessage?.id === message.id ? 'bg-secondary/60 border-l-2 border-primary' : 'border-l-2 border-transparent'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    message.status === 'unread' ? 'bg-primary' : 'bg-foreground/25'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-[14px] truncate ${message.status === 'unread' ? 'font-semibold text-foreground' : 'text-foreground/80'}`}>
                        {message.subject}
                      </p>
                      {message.status === 'unread' && (
                        <span className="text-[9.5px] uppercase tracking-[0.16em] font-bold text-primary flex-shrink-0">New</span>
                      )}
                    </div>
                    <p className="text-[11.5px] uppercase tracking-[0.14em] font-semibold text-muted-foreground mt-1">
                      {new Date(message.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail */}
        <div className="p-8">
          {selectedMessage ? (
            <>
              <span className="portal-eyebrow mb-3">Message</span>
              <h3 className="text-foreground mt-2 mb-2" style={{ fontSize: "clamp(20px, 1.8vw, 26px)", fontWeight: 600 }}>
                {selectedMessage.subject}
              </h3>
              <p className="text-[11.5px] uppercase tracking-[0.14em] font-semibold text-muted-foreground mb-6">
                {new Date(selectedMessage.created_at).toLocaleString()}
              </p>
              <div className="text-[15.5px] text-foreground/85 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.body}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              Select a message to read
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
