import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { organizationService } from './services/OrganizationService';

const AddOrganization: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await organizationService.addOrganization({ name, shortName });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add organization');
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>{t('ADD_ORGANIZATION')}</Card.Header>
        <Card.Body>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>{t('ORGANIZATION_NAME')}</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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