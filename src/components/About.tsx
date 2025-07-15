import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

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

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const skills = [
    "Python", "C++", "C", "JavaScript", "HTML", "YOLOv5", "OpenCV", "CNN", "scikit-learn",
    "Tkinter", "PyQt", "Flask", "SQL", "SQLite", "Supabase", "Git", "GitHub", "VS Code",
    "OSINT", "Ethical Hacking"
  ];

  const highlights = [
    {
      title: "8.37 CGPA",
      description: "B.Tech CSE @ SRM"
    },
    {
      title: "4+ Projects",
      description: "AI & Full-Stack"
    },
    {
      title: "5+ Certifications",
      description: "AI, Networking, Security"
    },
    {
      title: "Multi-lingual",
      description: "English, Tamil, German, French"
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slideUp' : 'opacity-0'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">About Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Bio Section */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'animate-slideUp' : 'opacity-0'}`}>
              <h3 className="text-2xl font-bold mb-6 text-gradient-electric">
                Passionate Developer & AI Innovator
              </h3>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a final-year Computer Science engineering student with a keen interest in AI, prompt engineering, and cybersecurity.
                  I've developed hands-on skills in Python, C++, and React—building everything from secure systems to user-friendly interfaces.
                </p>
                <p>
                  I enjoy solving real-world problems through code—crafting responsive apps, secure architectures, and exploring ethical hacking.
                  I'm also skilled in DevOps tools and UI/UX design.
                </p>
                <p>
                  Beyond tech, I love learning and communicating in multiple languages and exploring how technology simplifies life across platforms.
                </p>
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {highlights.map((item, index) => (
                  <Card key={index} className="p-4 bg-secondary border-border hover:glow-electric transition-smooth">
                    <div className="text-center">
                      <div className="text-xl font-bold text-primary mb-1">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'animate-slideUp' : 'opacity-0'}`}>
              <h3 className="text-2xl font-bold mb-6 text-gradient-electric">
                Technical Expertise
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {skills.map((skill, index) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1 text-sm font-medium bg-tech-gray border-border hover:border-primary hover:glow-electric transition-smooth cursor-default"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Specializations */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Core Specializations:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    AI/ML & Prompt Engineering
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    Cybersecurity & Ethical Hacking
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
                    Software Development & UI/UX
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-electric-purple rounded-full mr-3"></span>
                    DevOps & Secure System Design
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;