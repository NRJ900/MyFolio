import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById('skills');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", iconUrl: "https://cdn.simpleicons.org/python" },
        { name: "C++", iconUrl: "https://cdn.simpleicons.org/cplusplus" },
        { name: "C", iconUrl: "https://cdn.simpleicons.org/c" },
        { name: "JavaScript", iconUrl: "https://cdn.simpleicons.org/javascript" },
        { name: "HTML", iconUrl: "https://cdn.simpleicons.org/html5" },
      ],
    },
    {
      title: "AI/ML & Prompt Engineering",
      skills: [
        { name: "YOLOv5", iconUrl: "https://cdn.simpleicons.org/pytorch" },
        { name: "OpenCV", iconUrl: "https://cdn.simpleicons.org/opencv" },
        { name: "CNN", iconUrl: "https://cdn.simpleicons.org/tensorflow" },
        { name: "scikit-learn", iconUrl: "https://cdn.simpleicons.org/scikitlearn" },
      ],
    },
    {
      title: "Software Development & UI/UX",
      skills: [
        { name: "Tkinter", iconUrl: "https://cdn.simpleicons.org/python" },
        { name: "PyQt", iconUrl: "https://cdn.simpleicons.org/qt" },
        { name: "Responsive UI Design", iconUrl: "https://cdn.simpleicons.org/figma" },
        { name: "Flask", iconUrl: "https://cdn.simpleicons.org/flask" },
        { name: "NoCode/LowCode", iconUrl: "https://cdn.simpleicons.org/make" },
      ],
    },
    {
      title: "Database & Backend",
      skills: [
        { name: "SQL", iconUrl: "https://cdn.simpleicons.org/mysql" },
        { name: "SQLite", iconUrl: "https://cdn.simpleicons.org/sqlite" },
        { name: "Supabase", iconUrl: "https://cdn.simpleicons.org/supabase" },
      ],
    },
    {
      title: "DevOps & Tools",
      skills: [
        { name: "Git", iconUrl: "https://cdn.simpleicons.org/git" },
        { name: "GitHub", iconUrl: "https://cdn.simpleicons.org/github" },
        { name: "VS Code", iconUrl: "https://code.visualstudio.com/assets/images/code-stable-white.png" },
      ],
    },
    {
      title: "Cybersecurity & OSINT",
      skills: [
        { name: "OSINT Tools", iconUrl: "https://imgs.search.brave.com/hJosUW7y4XLJAF2QlGGkfUIOyW2x6126KJIsXAy69pM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9vcGVuLXNv/dXJjZS1pY29uLWRv/d25sb2FkLWluLXN2/Zy1wbmctZ2lmLWZp/bGUtZm9ybWF0cy0t/ZGV2ZWxvcG1lbnQt/cHJvZ3JhbW1pbmct/c29mdHdhcmUtdGVj/aG5vbG9neS1lbWJl/ZGRlZC13ZWItY29u/LXNldC03NS1wYWNr/LW1pc2NlbGxhbmVv/dXMtaWNvbnMtMTA3/MDg0OTYucG5nP2Y9/d2VicCZ3PTEyOA"},
        { name: "Ethical Hacking (Python)", iconUrl: "https://cdn.simpleicons.org/python" },
        { name: "Cyber Defense", iconUrl: "https://cdn.simpleicons.org/cloudflare" },
        { name: "Secure System Design", iconUrl: "https://cdn.simpleicons.org/fortinet" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slideUp' : 'opacity-0'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">Skills & Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and proficiency levels
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <Card
                key={category.title}
                className={`bg-card border-border hover:border-primary/50 transition-all duration-500 hover:glow-electric ${
                  isVisible ? 'animate-slideUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${categoryIndex * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <h3 className="text-lg font-bold text-gradient-electric">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center space-x-3 group hover:scale-[1.03] transition-all duration-300"
                      >
                        <img
                          src={skill.iconUrl}
                          alt={skill.name}
                          className="w-5 h-5 group-hover:scale-110 transition-transform"
                          loading="lazy"
                        />
                        <span className="text-sm font-medium text-foreground group-hover:text-primary">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          {/*<div className="mt-16 grid lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-primary/10 border-primary/20 hover:glow-electric transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Courses Completed</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary/10 border-primary/20 hover:glow-electric transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary/10 border-primary/20 hover:glow-electric transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-success mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Certifications</div>
              </CardContent>
            </Card>
          </div>*/}
        </div>
      </div>
    </section>
  );
};

export default Skills;
