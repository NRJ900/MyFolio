import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AISidekick = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Neeraj's AI assistant. I can help answer questions about his skills, projects, and experience. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI-powered responses using OpenAI
  const getAIResponse = async (input: string): Promise<string> => {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: input }
      });

      if (error) {
        console.error('Error calling AI function:', error);
        return "I'm having trouble connecting to my AI brain right now. Please try asking again, or feel free to contact Neeraj directly through the contact form!";
      }

      return data.response || "I didn't quite understand that. Could you rephrase your question?";
    } catch (error) {
      console.error('Error in AI response:', error);
      return "I'm experiencing some technical difficulties. Please try again or contact Neeraj directly through the contact form below!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    const currentInput = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await getAIResponse(currentInput);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble right now. Please try again or contact Neeraj directly!",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-primary shadow-lg hover:glow-electric transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-80 h-96 transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        <Card className="h-full bg-card border-border glow-electric flex flex-col">
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-gradient-primary rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground text-sm">AI Assistant</h3>
                <p className="text-xs text-primary-foreground/80">Ask me about Neeraj</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot ? 'bg-primary' : 'bg-accent'
                  }`}>
                    {message.isBot ? (
                      <Bot className="h-3 w-3 text-primary-foreground" />
                    ) : (
                      <User className="h-3 w-3 text-accent-foreground" />
                    )}
                  </div>
                  <div className={`rounded-lg px-3 py-2 text-sm ${
                    message.isBot 
                      ? 'bg-secondary text-secondary-foreground' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <div className="bg-secondary rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-tech-gray border-border focus:border-primary"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-gradient-primary hover:glow-electric"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AISidekick;