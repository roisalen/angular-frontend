import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useOrganization } from '../../context/OrganizationContext';

const AddOrganization: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setOrganizationName } = useOrganization();
  
  const [orgName, setOrgName] = useState('');
  const [shortName, setShortName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/organizations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: orgName,
          shortName: shortName
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create organization');
      }

      // Set the organization name in the global context
      setOrganizationName(orgName);
      
      // Store in localStorage for persistence
      localStorage.setItem('organizationName', orgName);
      localStorage.setItem('organizationShortName', shortName);

      // Navigate to speaker list after successful creation
      navigate('/speaker-list');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>{t('ADD_ORGANIZATION')}</Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>{t('ORGANIZATION_NAME')}</Form.Label>
              <Form.Control
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>{t('ORGANIZATION_SHORT_NAME')}</Form.Label>
              <Form.Control
                type="text"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              {t('SAVE')}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddOrganization; 