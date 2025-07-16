import { Github, Linkedin, Mail, Heart ,MessageCircle} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/NRJ900", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/mani-s-neeraj", label: "LinkedIn" },
    { icon: Mail, href: "mailto:manisneeraj13@gmail.com", label: "Email" }
  ];

  return (
    <footer className="py-12 bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              Building projects with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-smooth">
                About
              </a>
              <a href="#projects" className="text-muted-foreground hover:text-primary transition-smooth">
                Projects
              </a>
              <a href="#skills" className="text-muted-foreground hover:text-primary transition-smooth">
                Skills
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-smooth">
                Contact
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary hover:glow-electric transition-smooth hover:scale-110"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <span>Made by MSN ©{currentYear}</span>
            <span></span>
          </div>
          
          <div className="mt-4 md:mt-0">
            <span>Powered by React, Tailwind CSS & AI ✨</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
