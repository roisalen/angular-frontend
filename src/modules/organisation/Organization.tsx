import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Card, Button, Row, Col, Alert, Form } from 'react-bootstrap';
import { useOrganization } from '../../context/OrganizationContext';
import './organisation.css';

interface OrganizationType {
  name: string;
  shortName: string;
}

const Organization: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setOrganizationName } = useOrganization();
  
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/organisations`);
      if (!response.ok) {
        throw new Error('Failed to fetch organizations');
      }
      const data = await response.json();
      setOrganizations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOrganization = (org: OrganizationType) => {
    setOrganizationName(org.name);
    localStorage.setItem('organizationName', org.name);
    localStorage.setItem('organizationShortName', org.shortName);
    navigate('/speaker-list');
  };

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container className="mt-4">
        <Card>
          <Card.Body>
            {t('LOADING')}...
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>{t('CHOOSE_ORGANIZATION')}</Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Row>
            <Col xs={12}>
              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  placeholder={t('SEARCH_ORGANIZATIONS')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoComplete="off"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-4">
            {filteredOrganizations.map((org, index) => (
              <Col key={index} xs={12} md={6} lg={4}>
                <div
                  className="organization-item"
                  onClick={() => handleSelectOrganization(org)}
                >
                  {org.name}
                </div>
              </Col>
            ))}
          </Row>

          <div className="mt-4">
            <Button 
              variant="primary" 
              onClick={() => navigate('/add-organisation')}
            >
              {t('ADD_NEW_ORGANIZATION')}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Organization; 