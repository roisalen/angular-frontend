import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useOrganization } from '../../context/OrganizationContext';
import { organizationService } from './services/OrganizationService';
import './Organization.css';

interface Organization {
  name: string;
  shortName: string;
}

const Organization: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setOrganization } = useOrganization();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        setLoading(true);
        const data = await organizationService.getOrganizations();
        setOrganizations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load organizations');
      } finally {
        setLoading(false);
      }
    };

    loadOrganizations();
  }, []);

  const handleOrganizationSelect = async (org: Organization) => {
    try {
      setOrganization(org);
      navigate(`/${org.shortName}/speaker-list`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to select organization');
    }
  };

  const filteredOrganizations = organizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t('LOADING')}</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col md={8}>
          <h2 className="page-title">{t('CHOOSE_ORGANIZATION')}</h2>
        </Col>
        <Col md={4} className="text-end">
          <Button 
            variant="primary"
            size="lg"
            onClick={() => navigate('/add-organisation')}
          >
            {t('ADD_ORGANIZATION')}
          </Button>
        </Col>
      </Row>

      <Card className="main-card">
        <Card.Body>
          <Form.Group className="mb-4">
            <Form.Control
              type="search"
              placeholder={t('SEARCH_ORGANIZATIONS')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="lg"
              className="search-input"
            />
          </Form.Group>

          <Row>
            {filteredOrganizations.map((org) => (
              <Col md={6} lg={4} key={org.shortName} className="mb-3">
                <div 
                  className="organization-item"
                  onClick={() => handleOrganizationSelect(org)}
                >
                  {org.name}
                </div>
              </Col>
            ))}
          </Row>

          {filteredOrganizations.length === 0 && (
            <div className="text-center py-4">
              <p className="no-results">{t('NO_ORGANIZATIONS_FOUND')}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Organization; 