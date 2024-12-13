import React, { createContext, useContext, useState, useEffect } from 'react';

interface OrganizationContextType {
  organizationName: string | null;
  shortName: string | null;
  setOrganization: (org: { name: string; shortName: string }) => void;
  clearOrganization: () => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organizationName, setOrganizationName] = useState<string | null>(null);
  const [shortName, setShortName] = useState<string | null>(null);

  const setOrganization = (org: { name: string; shortName: string }) => {
    setOrganizationName(org.name);
    setShortName(org.shortName);
    localStorage.setItem('organizationShortName', org.shortName);
  };

  const clearOrganization = () => {
    setOrganizationName(null);
    setShortName(null);
    localStorage.removeItem('organizationShortName');
  };

  useEffect(() => {
    const storedShortName = localStorage.getItem('organizationShortName');
    if (storedShortName) {
      // Optionally: Fetch full organization details here
      setShortName(storedShortName);
    }
  }, []);

  return (
    <OrganizationContext.Provider value={{ organizationName, shortName, setOrganization, clearOrganization }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
}; 