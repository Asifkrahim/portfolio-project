import React from 'react';
import { GraduationCap, Code, Target, Heart } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java',
    'HTML/CSS', 'Git', 'Database Design', 'Problem Solving'
  ];

  const interests = [
    { icon: <Code size={24} />, title: 'Software Development', description: 'Passionate about creating efficient and scalable applications' },
    { icon: <GraduationCap size={24} />, title: 'Continuous Learning', description: 'Always eager to learn new technologies and methodologies' },
    { icon: <Target size={24} />, title: 'Problem Solving', description: 'Love tackling complex challenges and finding innovative solutions' },
    { icon: <Heart size={24} />, title: 'Open Source', description: 'Contributing to the developer community and collaborative projects' }
  ];

  return (
    <section className="min-h-screen bg-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-emerald-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Personal Info */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-emerald-400/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">My Journey</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm currently pursuing my engineering degree at <span className="text-emerald-400 font-semibold">KMEA Engineering College</span>, 
                where I'm developing a strong foundation in technology and engineering principles.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                My passion lies in software development and creating digital solutions that make a real impact. 
                I believe in the power of technology to solve complex problems and improve people's lives.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, working on personal projects, 
                or contributing to open-source initiatives. I'm always excited to collaborate and learn from others in the tech community.
              </p>
            </div>

            {/* Skills Section */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-emerald-400/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-emerald-400 mb-6">Technical Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-700 text-emerald-400 rounded-full text-sm font-medium hover:bg-emerald-400 hover:text-gray-900 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Interests */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">What Drives Me</h3>
            {interests.map((interest, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-emerald-400/50 transition-all duration-300 group hover:transform hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
                    {interest.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{interest.title}</h4>
                    <p className="text-gray-300 text-sm">{interest.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 border border-gray-600">
            <GraduationCap className="text-emerald-400 mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-bold text-white mb-2">Education</h3>
            <p className="text-emerald-400 text-lg font-semibold">KMEA Engineering College</p>
            <p className="text-gray-300 mt-2">Pursuing Engineering Degree</p>
            <p className="text-gray-400 text-sm mt-1">Building strong foundations in technology and innovation</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;