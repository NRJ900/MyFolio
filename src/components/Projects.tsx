import { useEffect, useState } from 'react';
import { Github, ExternalLink, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
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
      { threshold: 0.2 }
    );

    const element = document.getElementById('projects');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Image Detection System",
      description: "Built a real-time object detection system using YOLOv5, with high precision on a 5000-image dataset. Integrated CNN for feature extraction and used TensorRT to reduce inference time by 40%.",
      image: "https://nhdkmxwtsmwmbazqcvqc.supabase.co/storage/v1/object/public/images/Public/ImageDetection.jpg",
      tech: ["YOLOv5", "CNN", "TensorRT", "Python"],
      github: "https://github.com/NRJ900/Image-Identification-Using-Yolo",
      demo: "https://github.com/NRJ900/Image-Identification-Using-Yolo",
      featured: false
    },
    {
      title: "MoS – Mouse-to-Steering System",
      description: "Developed a real-time mouse-to-joystick converter enabling analog-style steering. Implemented dynamic sensitivity control with customizable UI.",
      image: "https://nhdkmxwtsmwmbazqcvqc.supabase.co/storage/v1/object/public/images/Public/MoS%20(1).jpg",
      tech: ["Python", "Tkinter", "UI/UX"],
      github: "https://github.com/NRJ900/MoS",
      demo: "https://github.com/NRJ900/MoS",
      featured: false
    },
    {
      title: "FRS – Face Recognition System",
      description: "Built a browser-based face recognition system using face-api.js with real-time webcam input. Responsive React frontend for detection overlays and match indicators.",
      image: "https://nhdkmxwtsmwmbazqcvqc.supabase.co/storage/v1/object/public/images/Public/FRS.jpg",
      tech: ["React", "face-api.js", "JavaScript"],
      github: "https://github.com/NRJ900/FRS-FaceRecognitionSystem",
      demo: "https://github.com/NRJ900/FRS-FaceRecognitionSystem",
      featured: true
    },
    {
      title: "SideKick – AI-Powered Desktop Assistant",
      description: "Floating desktop assistant integrated with multiple AI models (ChatGPT, Claude, Gemini). Supports contextual response across active apps with prompt pipelines for input enhancement.",
      image: "https://nhdkmxwtsmwmbazqcvqc.supabase.co/storage/v1/object/public/images/Public/SideKick.png",
      tech: ["Python", "PyQt", "AI", "API Integration"],
      github: "https://github.com/NRJ900/SideKick?tab=readme-ov-file",
      demo: "https://github.com/NRJ900/SideKick?tab=readme-ov-file",
      featured: true
    },
    {
      title: "UniTrack",
      description: "Responsive, client-side web application built with React and Tailwind CSS to assist students of SRM University in tracking and calculating their academic progress. The app includes intuitive tools for GPA, CGPA, and attendance calculations.",
      image: "https://nhdkmxwtsmwmbazqcvqc.supabase.co/storage/v1/object/public/images/Public/UniTrack.png",
      tech: ["HTML", "Tailwind CSS", "TypeScript","React","UI/UX"],
      github: "https://github.com/NRJ900/UniTrack",
      demo: "https://github.com/NRJ900/UniTrack",
      featured: false
    },
    {
      title: "Stream It",
      description: "Lightweight MVP (Minimum Viable Product) of a music streaming application inspired by Spotify. Built using React, Vite, TypeScript, and ShadCN UI, it demonstrates the core functionality of a streaming platform — browsing, searching, and playing songs from a predefined local library — with a clean and responsive user interface.",
      image: "https://nhdkmxwtsmwmbazqcvqc.supabase.co/storage/v1/object/public/images/Public/Stream_It%20(1).jpg",
      tech: ["React", "Vite", "TypeScript","Shadcn UI"],
      github: "https://github.com/NRJ900/Stream_It",
      demo: "https://github.com/NRJ900/Stream_It",
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slideUp' : 'opacity-0'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">Featured Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my latest work in AI, cybersecurity, system development and more.
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {projects.filter(p => p.featured).map((project, index) => (
              <Card 
                key={project.title}
                className={`group bg-card border-border hover:border-primary/50 transition-all duration-500 hover:glow-electric overflow-hidden ${
                  isVisible ? 'animate-slideUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-fill align-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gradient-electric">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-tech-gray border-border">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1 hover:glow-electric" onClick={() => window.open(project.github, '_blank')}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Other Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <Card 
                key={project.title}
                className={`group bg-card border-border hover:border-primary/50 transition-all duration-500 hover:glow-electric overflow-hidden ${
                  isVisible ? 'animate-slideUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 2) * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2 text-gradient-electric text-sm">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-xs mb-3 leading-relaxed">
                    {project.description.substring(0, 100)}...
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs bg-tech-gray border-border">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs hover:glow-electric">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="hover:glow-electric" onClick={() => window.open('https://github.com/NRJ900?tab=repositories')}>
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
