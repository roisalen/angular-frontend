import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useOrganization } from './context/OrganizationContext';
import Organization from './modules/organisation/Organization';
import AddOrganization from './modules/organisation/AddOrganization';
import LanguageSelector from './modules/internationalization/LanguageSelector';
import './components/navbar/Navbar.css';

const App: React.FC = () => {
  const { t } = useTranslation();
  const { organizationName } = useOrganization();
  
  return (
    <BrowserRouter>
      <Navbar expand="lg" className="navbar-static-top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            {organizationName || 'Ro i salen'}
            <span className="glyphicon glyphicon-bullhorn"></span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            {organizationName && (
              <Nav className="me-auto nav-links">
                <Nav.Link as={Link} to="/speaker-list">
                  {t('SPEAKER_LIST')}
                </Nav.Link>
                <Nav.Link as={Link} to="/admin-representatives">
                  {t('ADMIN_REPRESENTATIVES')}
                </Nav.Link>
                <Nav.Link as={Link} to="/lead-meeting">
                  {t('LEAD_MEETING')}
                </Nav.Link>
                <Nav.Link as={Link} to="/statistics">
                  {t('STATISTICS')}
                </Nav.Link>
              </Nav>
            )}
            <LanguageSelector />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<Organization />} />
          <Route path="/choose-organisation" element={<Organization />} />
          <Route path="/add-organisation" element={<AddOrganization />} />
          {/* Other routes */}
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App; 