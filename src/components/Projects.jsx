import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, shopping cart, and secure checkout functionality.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    imageDescription: "Modern e-commerce website with product grid and shopping cart",
    demoLink: "#",
    codeLink: "#",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, task assignment, and progress tracking.",
    tags: ["Vue.js", "Firebase", "Tailwind CSS", "JavaScript"],
    imageDescription: "Task management application with kanban board interface",
    demoLink: "#",
    codeLink: "#",
  },
  {
    title: "Fitness Tracker",
    description:
      "A comprehensive fitness tracking application that allows users to monitor workouts, set goals, and track progress over time.",
    tags: ["React Native", "GraphQL", "TypeScript", "Chart.js"],
    imageDescription: "Fitness tracking mobile app with workout statistics and progress charts",
    demoLink: "#",
    codeLink: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website showcasing projects and skills with smooth animations and intuitive navigation.",
    tags: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    imageDescription: "Creative portfolio website with project showcase and contact form",
    demoLink: "#",
    codeLink: "#",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const Projects = () => {
  return (
    <section id="projects" className="section bg-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects. Each one represents a unique
            challenge and showcases different aspects of my skills and expertise.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="project-card overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  alt={project.title}
                 src="https://images.unsplash.com/photo-1675270714610-11a5cadcc7b3" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-2 hover:bg-secondary"
            asChild
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;