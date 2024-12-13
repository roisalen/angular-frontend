import React, { createContext, useContext, useState } from 'react';

interface OrganizationData {
  name: string;
  shortName: string;
}

interface OrganizationContextType {
  organizationName: string | null;
  shortName: string | null;
  setOrganization: (data: OrganizationData | null) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organizationData, setOrganizationData] = useState<OrganizationData | null>(() => {
    const stored = localStorage.getItem('organization');
    return stored ? JSON.parse(stored) : null;
  });

  const setOrganization = (data: OrganizationData | null) => {
    setOrganizationData(data);
    if (data) {
      localStorage.setItem('organization', JSON.stringify(data));
    } else {
      localStorage.removeItem('organization');
    }
  };

  return (
    <OrganizationContext.Provider 
      value={{ 
        organizationName: organizationData?.name || null,
        shortName: organizationData?.shortName || null,
        setOrganization 
      }}
    >
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