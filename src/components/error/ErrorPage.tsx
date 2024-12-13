import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ErrorPageProps {
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  const { t } = useTranslation();
  
  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <Alert.Heading>{t('ERROR_OCCURRED')}</Alert.Heading>
        <p>{message || t('ORGANIZATION_NOT_FOUND')}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button as={Link} to="/" variant="outline-danger">
            {t('BACK_TO_HOME')}
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default ErrorPage; 