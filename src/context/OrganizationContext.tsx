import React, { createContext, useContext, useState } from 'react';
import { BaseService } from '../services/BaseService';

interface OrganizationContextType {
  organizationName: string | null;
  shortName: string | null;
  setOrganization: (org: { name: string; shortName: string }) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organizationName, setOrganizationName] = useState<string | null>(null);
  const [shortName, setShortName] = useState<string | null>(null);

  const setOrganization = (org: { name: string; shortName: string }) => {
    setOrganizationName(org.name);
    setShortName(org.shortName);
    BaseService.setOrganization(org.shortName);
  };

  return (
    <OrganizationContext.Provider value={{ organizationName, shortName, setOrganization }}>
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