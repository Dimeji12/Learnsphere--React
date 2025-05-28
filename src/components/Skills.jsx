import React from "react";
import { motion } from "framer-motion";
import { Code, Palette, Lightbulb, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Code className="h-8 w-8 text-blue-600" />,
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React",
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "SASS/SCSS",
    ],
  },
  {
    title: "Design",
    icon: <Palette className="h-8 w-8 text-purple-600" />,
    skills: [
      "UI/UX Design",
      "Figma",
      "Adobe XD",
      "Photoshop",
      "Illustrator",
      "Design Systems",
      "Wireframing",
      "Prototyping",
    ],
  },
  {
    title: "Backend Development",
    icon: <Lightbulb className="h-8 w-8 text-green-600" />,
    skills: [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "RESTful APIs",
      "GraphQL",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="h-8 w-8 text-orange-600" />,
    skills: [
      "React Native",
      "Flutter",
      "iOS Development",
      "Android Development",
      "Mobile UI Design",
      "App Performance",
      "Cross-platform",
      "Native APIs",
    ],
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

const Skills = () => {
  return (
    <section id="skills" className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            I've developed a diverse set of skills throughout my career. Here's
            a comprehensive overview of my technical expertise and capabilities.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full card-hover">
                <CardHeader className="flex flex-row items-center gap-4">
                  {category.icon}
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className="skill-tag"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;