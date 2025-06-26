import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, Download, Calendar, Award } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: string;
  fileUrl?: string;
}

const CertificateKeeper: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [newCertificate, setNewCertificate] = useState<Omit<Certificate, 'id'>>({
    title: '',
    issuer: '',
    date: '',
    description: '',
    category: 'Technical',
    fileUrl: ''
  });

  const categories = ['Technical', 'Academic', 'Professional', 'Achievement', 'Other'];

  useEffect(() => {
    const savedCertificates = localStorage.getItem('certificates');
    if (savedCertificates) {
      setCertificates(JSON.parse(savedCertificates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('certificates', JSON.stringify(certificates));
  }, [certificates]);

  const addCertificate = () => {
    if (newCertificate.title && newCertificate.issuer && newCertificate.date) {
      const certificate: Certificate = {
        ...newCertificate,
        id: Date.now().toString()
      };
      setCertificates([...certificates, certificate]);
      setNewCertificate({
        title: '',
        issuer: '',
        date: '',
        description: '',
        category: 'Technical',
        fileUrl: ''
      });
      setShowAddForm(false);
    }
  };

  const deleteCertificate = (id: string) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewCertificate({
          ...newCertificate,
          fileUrl: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Technical: 'bg-blue-500',
      Academic: 'bg-green-500',
      Professional: 'bg-purple-500',
      Achievement: 'bg-yellow-500',
      Other: 'bg-gray-500'
    };
    return colors[category as keyof typeof colors] || colors.Other;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Certificate Keeper</h3>
          <p className="text-gray-400">Manage your achievements and certifications</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Certificate
        </button>
      </div>

      {/* Add Certificate Form */}
      {showAddForm && (
        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <h4 className="text-lg font-semibold text-white mb-4">Add New Certificate</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-emerald-400 mb-2">
                Certificate Title *
              </label>
              <input
                type="text"
                value={newCertificate.title}
                onChange={(e) => setNewCertificate({ ...newCertificate, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-emerald-400 focus:outline-none"
                placeholder="e.g., React Developer Certification"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-400 mb-2">
                Issuer *
              </label>
              <input
                type="text"
                value={newCertificate.issuer}
                onChange={(e) => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-emerald-400 focus:outline-none"
                placeholder="e.g., Microsoft, Google, Coursera"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-400 mb-2">
                Date Issued *
              </label>
              <input
                type="date"
                value={newCertificate.date}
                onChange={(e) => setNewCertificate({ ...newCertificate, date: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-emerald-400 mb-2">
                Category
              </label>
              <select
                value={newCertificate.category}
                onChange={(e) => setNewCertificate({ ...newCertificate, category: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-emerald-400 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-emerald-400 mb-2">
                Description
              </label>
              <textarea
                value={newCertificate.description}
                onChange={(e) => setNewCertificate({ ...newCertificate, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-emerald-400 focus:outline-none resize-none"
                rows={3}
                placeholder="Brief description of the certificate or skills gained..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-emerald-400 mb-2">
                Upload Certificate (Optional)
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-emerald-400 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={addCertificate}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-300"
            >
              Add Certificate
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Certificates Grid */}
      {certificates.length === 0 ? (
        <div className="text-center py-12">
          <Award className="text-gray-500 mx-auto mb-4" size={48} />
          <p className="text-gray-400 text-lg">No certificates added yet</p>
          <p className="text-gray-500">Click "Add Certificate" to get started</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-gray-700 rounded-lg p-6 border border-gray-600 hover:border-emerald-400/50 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(certificate.category)}`}>
                  {certificate.category}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCertificate(certificate)}
                    className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => deleteCertificate(certificate.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-white mb-2">{certificate.title}</h4>
              <p className="text-emerald-400 font-medium mb-2">{certificate.issuer}</p>
              
              <div className="flex items-center text-gray-400 text-sm mb-3">
                <Calendar size={14} className="mr-1" />
                {new Date(certificate.date).toLocaleDateString()}
              </div>
              
              {certificate.description && (
                <p className="text-gray-300 text-sm line-clamp-3">{certificate.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-white">{selectedCertificate.title}</h3>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-emerald-400 font-semibold text-lg">{selectedCertificate.issuer}</p>
                <p className="text-gray-400">Issued on {new Date(selectedCertificate.date).toLocaleDateString()}</p>
              </div>
              
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${getCategoryColor(selectedCertificate.category)}`}>
                {selectedCertificate.category}
              </div>
              
              {selectedCertificate.description && (
                <div>
                  <h4 className="text-white font-semibold mb-2">Description</h4>
                  <p className="text-gray-300">{selectedCertificate.description}</p>
                </div>
              )}
              
              {selectedCertificate.fileUrl && (
                <div>
                  <h4 className="text-white font-semibold mb-2">Certificate File</h4>
                  <div className="bg-gray-700 rounded-lg p-4">
                    {selectedCertificate.fileUrl.startsWith('data:image') ? (
                      <img
                        src={selectedCertificate.fileUrl}
                        alt="Certificate"
                        className="max-w-full h-auto rounded-lg"
                      />
                    ) : (
                      <p className="text-gray-400">PDF file attached</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateKeeper;