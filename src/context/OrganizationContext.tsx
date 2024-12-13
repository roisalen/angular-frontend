import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OrganizationContextType {
  organizationName: string;
  setOrganizationName: (name: string) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const OrganizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [organizationName, setOrganizationName] = useState('Ro i salen');

  return (
    <OrganizationContext.Provider value={{ organizationName, setOrganizationName }}>
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