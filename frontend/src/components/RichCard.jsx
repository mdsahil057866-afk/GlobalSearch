import React from 'react';
import { ExternalLink, CheckCircle, Info, Calendar } from 'lucide-react';

const RichCard = ({ type, data }) => {
  if (type === 'scheme') {
    return (
      <div className="w-full bg-white dark:bg-[#1a1a1c] border border-green-200 dark:border-green-900/50 rounded-2xl overflow-hidden shadow-sm mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 px-6 py-4 border-b border-green-100 dark:border-green-900/30">
          <div className="flex items-center text-green-700 dark:text-green-400 mb-1">
            <CheckCircle size={16} className="mr-2" />
            <span className="text-xs font-bold uppercase tracking-wider">Government Scheme</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{data.title || "PM Kisan Samman Nidhi"}</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            {data.description || "An initiative by the Government of India in which all farmers will get up to ₹6,000 per year as minimum income support."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <Info size={20} className="text-blue-500 mr-3 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Eligibility</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{data.eligibility || "Small and marginal farmers with cultivable land holding up to 2 hectares."}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Calendar size={20} className="text-orange-500 mr-3 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Important Dates</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{data.dates || "Registrations open year-round. Installments credited thrice a year."}</p>
              </div>
            </div>
          </div>
          <a href={data.url || "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
            Official Portal <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
      </div>
    );
  }

  if (type === 'college') {
    return (
      <div className="w-full bg-white dark:bg-[#1a1a1c] border border-blue-200 dark:border-blue-900/50 rounded-2xl overflow-hidden shadow-sm mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 border-b border-blue-100 dark:border-blue-900/30 flex justify-between items-center">
          <div>
            <div className="flex items-center text-blue-700 dark:text-blue-400 mb-1">
              <Info size={16} className="mr-2" />
              <span className="text-xs font-bold uppercase tracking-wider">Educational Institution</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{data.title || "Indian Institute of Technology"}</h2>
          </div>
          <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
             <span className="text-2xl font-bold text-blue-600">IIT</span>
          </div>
        </div>
        <div className="p-6 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Overview</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {data.description || "A premier engineering and technology institute in India, offering undergraduate, postgraduate and doctoral programs."}
            </p>
            <div className="flex gap-4">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 flex-1">
                <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Ranking</span>
                <span className="block font-bold text-gray-900 dark:text-white">#1 NIRF</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 flex-1">
                <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Acceptance Rate</span>
                <span className="block font-bold text-gray-900 dark:text-white">&lt; 1%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default RichCard;
