import React, { createContext, useContext, useState } from 'react';
import { Sparkles, Mic, Image as ImageIcon, Code, Video, ShieldAlert, Bot } from 'lucide-react';

const SearchLabsContext = createContext();

export const useSearchLabs = () => {
  const context = useContext(SearchLabsContext);
  if (!context) {
    return { features: [], toggleFeature: () => {}, isFeatureEnabled: () => false };
  }
  return context;
};

export const SearchLabsProvider = ({ children }) => {
  const [features, setFeatures] = useState([
    {
      id: 'sge',
      title: 'AI Overviews in Search',
      description: 'Get AI-powered summaries, key takeaways, and quick answers directly at the top of your search results.',
      icon: Sparkles,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      enabled: true,
    },
    {
      id: 'voice-pro',
      title: 'Voice Search Pro',
      description: 'Enable real-time translation and multi-lingual query understanding during voice search.',
      icon: Mic,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      enabled: false,
    },
    {
      id: 'lens-ai',
      title: 'Vision AI Search',
      description: 'Deeply analyze uploaded images to identify objects, text, and find similar visual concepts.',
      icon: ImageIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      enabled: true,
    },
    {
      id: 'code-tips',
      title: 'Developer Code Tips',
      description: 'Automatically format and provide AI explanations for programming-related search queries.',
      icon: Code,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      enabled: false,
    },
    {
      id: 'video-summary',
      title: 'Auto-Summary Videos',
      description: 'Get an instant AI-generated summary and key timestamps for any video in your search results without watching it.',
      icon: Video,
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      enabled: false,
    },
    {
      id: 'deepfake-detector',
      title: 'Deepfake & Fake News Detector',
      description: 'Automatically scan images and news articles to detect AI manipulation or unverified sources in real-time.',
      icon: ShieldAlert,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      enabled: true,
    },
    {
      id: 'jarvis-integration',
      title: 'J.A.R.V.I.S Agent Mode',
      description: 'Turn your search engine into a personal assistant. Let Jarvis book tickets, write emails, and execute voice commands autonomously.',
      icon: Bot,
      color: 'text-teal-500',
      bgColor: 'bg-teal-100 dark:bg-teal-900/30',
      enabled: false,
    }
  ]);

  const toggleFeature = (id) => {
    setFeatures(features.map(f => 
      f.id === id ? { ...f, enabled: !f.enabled } : f
    ));
  };

  const isFeatureEnabled = (id) => {
    return features.find(f => f.id === id)?.enabled || false;
  };

  return (
    <SearchLabsContext.Provider value={{ features, toggleFeature, isFeatureEnabled }}>
      {children}
    </SearchLabsContext.Provider>
  );
};
