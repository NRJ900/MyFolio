import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setAnimateProgress(true), 500);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('skills');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: "💻",
      skills: [
        { name: "Python", level: 95 },
        { name: "C++", level: 65 },
        { name: "C", level: 75 },
        { name: "JavaScript", level: 85 },
        { name: "HTML", level: 90 }
      ]
    },
    {
      title: "AI/ML & Prompt Engineering",
      icon: "🤖",
      skills: [
        { name: "YOLOv5", level: 90 },
        { name: "OpenCV", level: 75 },
        { name: "CNN", level: 75 },
        { name: "scikit-learn", level: 80 }
      ]
    },
    {
      title: "Software Development & UI/UX",
      icon: "🎨",
      skills: [
        { name: "Tkinter", level: 85 },
        { name: "PyQt", level: 90 },
        { name: "Responsive UI Design", level: 90 },
        { name: "Flask", level: 80 },
        { name: "NoCode/LowCode", level: 85 }
      ]
    },
    {
      title: "Database & Backend",
      icon: "🗃️",
      skills: [
        { name: "SQL", level: 85 },
        { name: "SQLite", level: 80 },
        { name: "Supabase", level: 75 }
      ]
    },
    {
      title: "DevOps & Tools",
      icon: "🔧",
      skills: [
        { name: "Git", level: 90 },
        { name: "GitHub", level: 95 },
        { name: "VS Code", level: 95 }
      ]
    },
    {
      title: "Cybersecurity & OSINT",
      icon: "🛡️",
      skills: [
        { name: "OSINT Tools", level: 85 },
        { name: "Ethical Hacking (Python)", level: 80 },
        { name: "Cyber Defense", level: 90 },
        { name: "Secure System Design", level: 85 }
      ]
    }
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
                    <h3 className="text-lg font-bold text-gradient-electric">
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress 
                          value={animateProgress ? skill.level : 0} 
                          className="h-2 bg-tech-gray"
                          style={{
                            transition: `all 1s ease-out ${(categoryIndex * 150 + skillIndex * 100)}ms`
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid lg:grid-cols-3 gap-8">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;