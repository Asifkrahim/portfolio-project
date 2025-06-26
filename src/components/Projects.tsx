import React, { useState } from 'react';
import { QrCode, FileText, Download, Plus, Trash2, Eye } from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator';
import CertificateKeeper from './CertificateKeeper';

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const projects = [
    {
      id: 'qr-generator',
      title: 'QR Code Generator',
      description: 'Generate QR codes for any text, URL, or data with customizable options and instant download.',
      icon: <QrCode size={32} />,
      technologies: ['React', 'TypeScript', 'Canvas API'],
      component: <QRCodeGenerator />
    },
    {
      id: 'certificate-keeper',
      title: 'Certificate Keeper',
      description: 'Organize and manage your certificates, achievements, and important documents in one place.',
      icon: <FileText size={32} />,
      technologies: ['React', 'Local Storage', 'File Management'],
      component: <CertificateKeeper />
    }
  ];

  return (
    <section className="min-h-screen bg-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-emerald-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Here are some of the projects I've built to solve real-world problems and showcase my technical skills.
          </p>
        </div>

        {!activeProject ? (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-emerald-400/50 transition-all duration-300 group hover:transform hover:scale-105"
              >
                <div className="text-emerald-400 mb-6 group-hover:text-emerald-300 transition-colors duration-300">
                  {project.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-emerald-400 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => setActiveProject(project.id)}
                  className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25"
                >
                  <Eye size={20} />
                  View Project
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-2xl border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">
                  {projects.find(p => p.id === activeProject)?.title}
                </h3>
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
                >
                  Back to Projects
                </button>
              </div>
            </div>
            <div className="p-6">
              {projects.find(p => p.id === activeProject)?.component}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;