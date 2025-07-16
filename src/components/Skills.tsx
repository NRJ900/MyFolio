import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  SiPython,
  SiCplusplus,
  SiC,
  SiJavascript,
  SiHtml5,
  SiOpencv,
  SiScikitlearn,
  SiFlask,
  SiGit,
  SiGithub,
  SiVscode,
  SiSqlite,
  SiSupabase,
  SiQt,
  SiMysql,
} from 'react-icons/si';
import { FaRobot, FaDatabase, FaPalette, FaShieldAlt, FaTools, FaLaptopCode } from 'react-icons/fa';

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
      icon: "💻",
      skills: [
        { name: "Python", icon: <SiPython className="text-yellow-400" /> },
        { name: "C++", icon: <SiCplusplus className="text-blue-400" /> },
        { name: "C", icon: <SiC className="text-cyan-500" /> },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-300" /> },
        { name: "HTML", icon: <SiHtml5 className="text-orange-500" /> },
      ],
    },
    {
      title: "AI/ML & Prompt Engineering",
      icon: <FaRobot />,
      skills: [
        { name: "YOLOv5", icon: <FaRobot className="text-red-400" /> },
        { name: "OpenCV", icon: <SiOpencv className="text-indigo-500" /> },
        { name: "CNN", icon: <FaRobot className="text-blue-300" /> },
        { name: "scikit-learn", icon: <SiScikitlearn className="text-yellow-300" /> },
      ],
    },
    {
      title: "Software Dev & UI/UX",
      icon: <FaPalette />,
      skills: [
        { name: "Tkinter", icon: <FaLaptopCode className="text-purple-500" /> },
        { name: "PyQt", icon: <SiQt className="text-green-500" /> },
        { name: "Responsive UI Design", icon: <FaPalette className="text-pink-400" /> },
        { name: "Flask", icon: <SiFlask className="text-gray-500" /> },
        { name: "NoCode/LowCode", icon: <FaPalette className="text-yellow-400" /> },
      ],
    },
    {
      title: "Database & Backend",
      icon: <FaDatabase />,
      skills: [
        { name: "SQL", icon: <SiMysql className="text-blue-500" /> },
        { name: "SQLite", icon: <SiSqlite className="text-blue-400" /> },
        { name: "Supabase", icon: <SiSupabase className="text-green-500" /> },
      ],
    },
    {
      title: "DevOps & Tools",
      icon: <FaTools />,
      skills: [
        { name: "Git", icon: <SiGit className="text-orange-500" /> },
        { name: "GitHub", icon: <SiGithub className="text-white" /> },
        { name: "VS Code", icon: <SiVscode className="text-blue-500" /> },
      ],
    },
    {
      title: "Cybersecurity & OSINT",
      icon: <FaShieldAlt />,
      skills: [
        { name: "OSINT Tools", icon: <FaShieldAlt className="text-red-500" /> },
        { name: "Ethical Hacking (Python)", icon: <SiPython className="text-yellow-400" /> },
        { name: "Cyber Defense", icon: <FaShieldAlt className="text-green-500" /> },
        { name: "Secure System Design", icon: <FaShieldAlt className="text-purple-400" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slideUp' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">Skills & Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical skills
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat, idx) => (
              <Card
                key={cat.title}
                className={`bg-card border-border hover:border-primary/50 transition-all duration-500 hover:glow-electric ${
                  isVisible ? 'animate-slideUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{cat.icon}</span>
                    <h3 className="text-lg font-bold text-gradient-electric">{cat.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center space-x-3 group hover:scale-[1.03] transition-all duration-300"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform">{skill.icon}</span>
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

          <div className="mt-16 grid lg:grid-cols-3 gap-8">
            {/* ... Info cards remain unchanged ... */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
