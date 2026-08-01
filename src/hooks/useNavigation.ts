import { useState, useEffect, useCallback } from 'react';
import { PagePath } from '../types';

const VALID_PATHS: PagePath[] = [
  '/',
  '/ai-receptionist',
  '/lead-qualification-ai',
  '/appointment-booking-ai',
  '/workflow-automation',
  '/conversation-intelligence',
  '/dental-ai-receptionist',
  '/healthcare-ai-receptionist',
  '/home-services-ai',
  '/business-services-ai',
  '/real-estate-ai',
  '/real-estate-ai-receptionist',
  '/legal-ai-intake',
  '/legal-ai-receptionist',
  '/ecommerce-ai-support',
  '/ecommerce-ai-receptionist',
  '/how-it-works',
  '/deployment',
  '/deployment-process',
  '/managed-deployment',
  '/deployment-blueprints',
  '/integrations',
  '/security',
  '/security-compliance',
  '/pricing',
  '/blog',
  '/roi-calculator',
  '/demo',
  '/about',
  '/founder',
  '/contact',
  '/book-audit',
  '/industry-playbooks',
  '/industries',
  '/case-studies',
  '/ai-phone-answering-service',
  '/ai-receptionist-dental',
  '/ai-receptionist-real-estate',
  '/voice-ai-agents'
];

function getInitialPath(): PagePath {
  const hash = window.location.hash.replace('#', '');
  if (hash && VALID_PATHS.includes(hash as PagePath)) {
    window.history.replaceState({}, '', hash);
    return hash as PagePath;
  }

  const pathname = window.location.pathname as PagePath;
  if (VALID_PATHS.includes(pathname)) {
    return pathname;
  }

  return '/';
}

export function useNavigation() {
  const [currentPath, setCurrentPath] = useState<PagePath>(getInitialPath);

  const navigate = useCallback((path: PagePath) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(getInitialPath());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return {
    currentPath,
    navigate,
  };
}
