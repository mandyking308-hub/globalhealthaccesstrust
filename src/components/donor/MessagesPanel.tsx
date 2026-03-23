import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    
    // Subscribe to real-time updates
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
    return <div>Loading messages...</div>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* Message List */}
      <div className="md:col-span-1 space-y-2">
        <h3 className="font-semibold mb-4">Your Messages</h3>
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages yet</p>
        ) : (
          messages.map((message) => (
            <Card
              key={message.id}
              className={`cursor-pointer transition-colors hover:bg-accent ${
                selectedMessage?.id === message.id ? 'border-primary' : ''
              }`}
              onClick={() => handleMessageClick(message)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {message.status === 'unread' ? (
                        
                      ) : (
                        
                      )}
                      <p className="font-medium text-sm">{message.subject}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(message.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {message.status === 'unread' && (
                    <Badge variant="default" className="ml-2">New</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Message Content */}
      <div className="md:col-span-2">
        {selectedMessage ? (
          <Card>
            <CardHeader>
              <CardTitle>{selectedMessage.subject}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(selectedMessage.created_at).toLocaleString()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                {selectedMessage.body}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              Select a message to read
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
