import React, { useState, Suspense, lazy } from 'react';
import { PagePath } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { LiveCallDemoModal } from './components/LiveCallDemoModal';
import { AuditBookingModal } from './components/AuditBookingModal';
import { HeroVideoModal } from './components/HeroVideoModal';
import { useNavigation } from './hooks/useNavigation';

// Code Splitting / Lazy Loading for all Page Components
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage').then(m => ({ default: m.IndustriesPage })));
const IndustryPlaybooksPage = lazy(() => import('./pages/IndustryPlaybooksPage').then(m => ({ default: m.IndustryPlaybooksPage })));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BookAuditPage = lazy(() => import('./pages/BookAuditPage').then(m => ({ default: m.BookAuditPage })));
const DemoPage = lazy(() => import('./pages/DemoPage').then(m => ({ default: m.DemoPage })));
const FounderPage = lazy(() => import('./pages/FounderPage').then(m => ({ default: m.FounderPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AIReceptionistPage = lazy(() => import('./pages/landing/AIReceptionistPage').then(m => ({ default: m.AIReceptionistPage })));
const AILeadQualificationPage = lazy(() => import('./pages/landing/AILeadQualificationPage').then(m => ({ default: m.AILeadQualificationPage })));
const AIAppointmentBookingPage = lazy(() => import('./pages/landing/AIAppointmentBookingPage').then(m => ({ default: m.AIAppointmentBookingPage })));
const AIWorkflowAutomationPage = lazy(() => import('./pages/landing/AIWorkflowAutomationPage').then(m => ({ default: m.AIWorkflowAutomationPage })));
const AIReceptionistDentalPage = lazy(() => import('./pages/landing/AIReceptionistDentalPage').then(m => ({ default: m.AIReceptionistDentalPage })));
const AIReceptionistRealEstatePage = lazy(() => import('./pages/landing/AIReceptionistRealEstatePage').then(m => ({ default: m.AIReceptionistRealEstatePage })));
const AIReceptionistHealthcarePage = lazy(() => import('./pages/landing/AIReceptionistHealthcarePage').then(m => ({ default: m.AIReceptionistHealthcarePage })));
const AIReceptionistBusinessServicesPage = lazy(() => import('./pages/landing/AIReceptionistBusinessServicesPage').then(m => ({ default: m.AIReceptionistBusinessServicesPage })));
const AIReceptionistLegalPage = lazy(() => import('./pages/landing/AIReceptionistLegalPage').then(m => ({ default: m.AIReceptionistLegalPage })));
const AIReceptionistEcommercePage = lazy(() => import('./pages/landing/AIReceptionistEcommercePage').then(m => ({ default: m.AIReceptionistEcommercePage })));
const AIPhoneAnsweringServicePage = lazy(() => import('./pages/landing/AIPhoneAnsweringServicePage').then(m => ({ default: m.AIPhoneAnsweringServicePage })));
const VoiceAIAgentsPage = lazy(() => import('./pages/landing/VoiceAIAgentsPage').then(m => ({ default: m.VoiceAIAgentsPage })));
const DeploymentPage = lazy(() => import('./pages/DeploymentPage').then(m => ({ default: m.DeploymentPage })));
const IntegrationsPage = lazy(() => import('./pages/IntegrationsPage').then(m => ({ default: m.IntegrationsPage })));
const SecurityCompliancePage = lazy(() => import('./pages/SecurityCompliancePage').then(m => ({ default: m.SecurityCompliancePage })));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 p-8" role="status" aria-live="polite">
      <div className="w-10 h-10 border-2 border-[#00d4ff]/20 border-t-[#00d4ff] rounded-full animate-spin" />
      <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Loading...</span>
    </div>
  );
}

export default function App() {
  const { currentPath, navigate: handleNavigate } = useNavigation();
  
  // Modal states
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [auditModalSource, setAuditModalSource] = useState('homepage');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoIndustryId, setDemoIndustryId] = useState('dental');
  const [traceModalOpen, setTraceModalOpen] = useState(false);

  const openAuditModal = (sourceName?: string) => {
    setAuditModalSource(sourceName || currentPath.replace('/', '') || 'homepage');
    setAuditModalOpen(true);
  };

  const openDemoWithIndustry = (indId?: string) => {
    if (indId) setDemoIndustryId(indId);
    setDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 flex flex-col font-sans selection:bg-[#00d4ff] selection:text-black">
      {/* Skip to Content Link for WCAG Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#00d4ff] focus:text-black focus:font-bold focus:outline-none focus:ring-2 focus:ring-white rounded-[2px] shadow-2xl"
      >
        Skip to main content
      </a>

      <SEOHead path={currentPath} />
      
      {/* Sticky Global Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenAuditModal={() => setAuditModalOpen(true)}
        onOpenDemoModal={() => openDemoWithIndustry()}
      />

      {/* Main Page Content Router */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Suspense fallback={<PageLoader />}>
          {currentPath === '/' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
            onOpenDemoModal={() => openDemoWithIndustry()}
          />
        )}

        {(currentPath === '/industry-playbooks' || currentPath === '/industries') && (
          <IndustryPlaybooksPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {currentPath === '/how-it-works' && (
          <HowItWorksPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {currentPath === '/pricing' && (
          <PricingPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {currentPath === '/case-studies' && (
          <CaseStudiesPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
            onOpenDemoModal={() => openDemoWithIndustry()}
          />
        )}

        {currentPath === '/blog' && (
          <BlogPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {currentPath === '/book-audit' && (
          <BookAuditPage
            onNavigate={handleNavigate}
            onOpenDemoModal={openDemoWithIndustry}
          />
        )}

        {(currentPath === '/ai-receptionist' || 
          currentPath === '/conversation-intelligence') && (
          <AIReceptionistPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {currentPath === '/workflow-automation' && (
          <AIWorkflowAutomationPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {currentPath === '/appointment-booking-ai' && (
          <AIAppointmentBookingPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {currentPath === '/lead-qualification-ai' && (
          <AILeadQualificationPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {(currentPath === '/ai-receptionist-dental' || currentPath === '/dental-ai-receptionist') && (
          <AIReceptionistDentalPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {currentPath === '/healthcare-ai-receptionist' && (
          <AIReceptionistHealthcarePage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {(currentPath === '/home-services-ai' || currentPath === '/business-services-ai') && (
          <AIReceptionistBusinessServicesPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {(currentPath === '/ai-receptionist-real-estate' || currentPath === '/real-estate-ai' || currentPath === '/real-estate-ai-receptionist') && (
          <AIReceptionistRealEstatePage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {(currentPath === '/legal-ai-intake' || currentPath === '/legal-ai-receptionist') && (
          <AIReceptionistLegalPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {(currentPath === '/ecommerce-ai-support' || currentPath === '/ecommerce-ai-receptionist') && (
          <AIReceptionistEcommercePage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {currentPath === '/ai-phone-answering-service' && (
          <AIPhoneAnsweringServicePage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {currentPath === '/voice-ai-agents' && (
          <VoiceAIAgentsPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {(currentPath === '/deployment' || currentPath === '/deployment-process' || currentPath === '/managed-deployment') && (
          <DeploymentPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {currentPath === '/deployment-blueprints' && (
          <CaseStudiesPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
            onOpenDemoModal={() => openDemoWithIndustry()}
          />
        )}

        {currentPath === '/integrations' && (
          <IntegrationsPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {(currentPath === '/security' || currentPath === '/security-compliance') && (
          <SecurityCompliancePage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {currentPath === '/roi-calculator' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
            onOpenDemoModal={() => openDemoWithIndustry()}
          />
        )}

        {currentPath === '/demo' && (
          <DemoPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => setAuditModalOpen(true)}
          />
        )}

        {currentPath === '/founder' && (
          <FounderPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => openAuditModal('founder')}
          />
        )}

        {currentPath === '/about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => openAuditModal('about')}
          />
        )}

        {currentPath === '/contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenAuditModal={() => openAuditModal('contact')}
          />
        )}
        </Suspense>
      </main>

      {/* Global Modals */}
      <AuditBookingModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
        source={auditModalSource}
      />

      <LiveCallDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialIndustryId={demoIndustryId}
      />

      <HeroVideoModal
        isOpen={traceModalOpen}
        onClose={() => setTraceModalOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAuditModal={() => setAuditModalOpen(true)}
      />

    </div>
  );
}
