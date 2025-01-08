import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useOrganization } from './context/OrganizationContext';
import Organization from './modules/organisation/Organization';
import AddOrganization from './modules/organisation/AddOrganization';
import SpeakerList from './modules/speaker-list/SpeakerList';
import LanguageSelector from './modules/internationalization/LanguageSelector';
import ErrorPage from './components/error/ErrorPage';
import config from './config/config';
import './components/navbar/Navbar.css';
import LeadMeeting from './modules/lead-meeting/LeadMeeting';
import AdminRepresentatives from './modules/admin-representatives/AdminRepresentatives';
import Statistics from './modules/statistics/Statistics';

const App: React.FC = () => {
  const { t } = useTranslation();
  const { organizationName, shortName } = useOrganization();
  
  return (
    <BrowserRouter>
      <Navbar className="navbar-static-top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            {organizationName || 'Ro i salen'}
            <span className="glyphicon glyphicon-bullhorn"></span>
          </Navbar.Brand>
          
          {organizationName && shortName && (
            <Nav className="me-auto nav-links">
              <Nav.Link as={Link} to={`/${shortName}/speaker-list`}>
                {t('SPEAKER_LIST')}
              </Nav.Link>
              <Nav.Link as={Link} to={`/${shortName}/admin-representatives`}>
                {t('ADMIN_REPRESENTATIVES')}
              </Nav.Link>
              <Nav.Link as={Link} to={`/${shortName}/lead-meeting`}>
                {t('LEAD_MEETING')}
              </Nav.Link>
              <Nav.Link as={Link} to={`/${shortName}/statistics`}>
                {t('STATISTICS')}
              </Nav.Link>
            </Nav>
          )}
          <LanguageSelector />
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<Organization />} />
          <Route path="/choose-organisation" element={<Organization />} />
          <Route path="/add-organisation" element={<AddOrganization />} />
          <Route path="/:shortName" element={<OrganizationLoader />}>
            <Route path="speaker-list" element={<SpeakerList />} />
            <Route path="admin-representatives" element={<AdminRepresentatives />} />
            <Route path="lead-meeting" element={<LeadMeeting />} />
            <Route path="statistics" element={<Statistics />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

// OrganizationLoader component
const OrganizationLoader: React.FC = () => {
  const { shortName } = useParams();
  const { organizationName, setOrganization } = useOrganization();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = React.useState(false);


  React.useEffect(() => {
    if (organizationName && hasLoaded) {
        setIsLoading(false);
        return;
      }
    
    const loadOrganization = async () => {
      if (!shortName) {
        setError('No organization specified');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`${config.apiUrl}/organisations`);
        
        if (!response.ok) {
          throw new Error('Failed to load organizations');
        }

        const organizations = await response.json();
        const organization = organizations.find(
          (org: { shortName: string }) => 
          org.shortName.toLowerCase() === shortName.toLowerCase()
        );

        if (!organization) {
          throw new Error('Organization not found');
        }

        setOrganization({
          name: organization.name,
          shortName: organization.shortName
        });
        setHasLoaded(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrganization();
  }, [shortName, setOrganization, organizationName, hasLoaded]);

  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return <Outlet />;
};

export default App; 