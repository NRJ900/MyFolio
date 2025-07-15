import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save contact submission to Supabase
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "manisneeraj13@gmail.com",
      href: "mailto:manisneeraj13@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 74180 93937",
      href: "tel:+917418093937"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Chennai, India",
      href: "#"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/NRJ900", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/mani-s-neeraj", label: "LinkedIn" },
    { icon: Mail, href: "mailto:manisneeraj13@gmail.com", label: "Email" }
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slideUp' : 'opacity-0'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">Get In Touch</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to collaborate on your next project? Let's discuss how we can bring your ideas to life.
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'animate-slideUp' : 'opacity-0'}`}>
              <h3 className="text-2xl font-bold mb-6 text-gradient-electric">
                Let's Start a Conversation
              </h3>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always interested in hearing about new projects, opportunities, and 
                collaborations. Whether you have a question about my work, want to discuss 
                a potential project, or just want to say hello, I'd love to hear from you.
              </p>

              {/* Contact Information */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={item.title} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center glow-electric">
                      <item.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{item.title}</div>
                      <a 
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-foreground">Follow Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary hover:glow-electric transition-smooth hover:scale-110"
                      aria-label={link.label}
                    >
                      <link.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className={`bg-card border-border hover:glow-electric transition-all duration-1000 delay-500 ${isVisible ? 'animate-slideUp' : 'opacity-0'}`}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gradient-electric">
                  Send Me a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-tech-gray border-border focus:border-primary transition-smooth"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-tech-gray border-border focus:border-primary transition-smooth"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-tech-gray border-border focus:border-primary transition-smooth"
                      placeholder="Project Discussion"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="bg-tech-gray border-border focus:border-primary transition-smooth resize-none"
                      placeholder="Tell me about your project or idea..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:glow-electric transition-bounce font-semibold"
                    size="lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;