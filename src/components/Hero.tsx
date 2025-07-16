import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const roles = [
    "AI Enthusiast.",
    "Prompt Engineer.",
    "Cybersecurity Enthusiast.",
    "Full-Stack Developer.",
    "Real-World Problem Solver.",
    "Open-Source Contributor.",
    "UI/UX Developer.",
    "Creative Technologist.",
    "Edge AI Developer.",
    "Multilingual Communicator.",
    "Ethical Hacker.",
    "Deployment Explorer.",
    "Tech Storyteller.",
    "Resilient Learner.",
    "Cross-Platform Builder.",
    "Automation Engineer.",
    "Performance Optimizer."
  ];

  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const fullLength = currentRole.length;

    const typeSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 1500;

    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex <= fullLength) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, typeSpeed);
    } 
    else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, charIndex));
        setCharIndex((prev) => prev - 1);
      }, typeSpeed);
    } 
    else if (!isDeleting && charIndex > fullLength) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    }
    else if (isDeleting && charIndex < 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);


  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden animated-bg pt-16 md:pt-24 lg:pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-electric-blue/40 rounded-full blur-3xl float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-electric-purple/20 rounded-full blur-3xl float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'animate-slideUp' : 'opacity-0'}`}>
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-primary p-1 pulse-glow group overflow-hidden">
              <img 
                src="https://nhdkmxwtsmwmbazqcvqc.supabase.co/storage/v1/object/public/images/Public/msn-removebg-preview.png" 
                alt="Profile Image" 
                className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
          </div>

          {/* Main Content */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'animate-slideUp' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient-primary">Mani S Neeraj</span>
            </h1>
            
            <div className="text-2xl md:text-3xl font-medium mb-6 h-12 flex items-center justify-center">
              <span className="text-muted-foreground">I'm a </span>
              <span className="text-gradient-electric ml-2 flex items-center">
                {displayText}
                <span className="ml-1 w-1.5 h-6 bg-muted-foreground animate-pulse" />
              </span>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              I'm a final-year Computer Science engineering student with a keen interest in AI, prompt engineering, and cybersecurity.
              I've developed hands-on skills in Python, C++, and React—building everything from secure systems to user-friendly interfaces.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:glow-electric transition-bounce font-semibold"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
              
              <a href="/Mani-S-Neeraj-Resume.pdf" download>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-bounce"
                  as="a"
                  href="https://2hqa8icvn7t46syi.public.blob.vercel-storage.com/Mani-S-Neeraj-Resume.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-3">
              {[
                { icon: Github, href: "https://github.com/NRJ900", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/mani-s-neeraj", label: "LinkedIn" },
                { icon: Mail, href: "mailto:manisneeraj13@gmail.com", label: "Email" }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full border border-border hover:border-primary hover:glow-electric transition-smooth hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
