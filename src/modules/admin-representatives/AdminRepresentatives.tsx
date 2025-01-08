import React, { useState, useEffect, useCallback } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useOrganization } from '../../context/OrganizationContext';
import { Representative } from './types';
import { representativeService } from './services/RepresentativeService';
import './AdminRepresentatives.css';
import parse from 'html-react-parser';

const AdminRepresentatives: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { organizationName } = useOrganization();
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const [formData, setFormData] = useState<Representative>({
    number: '',
    name: '',
    group: '',
    sex: ''
  });
  const [error, setError] = useState<string | null>(null);

  const loadRepresentatives = useCallback(async () => {
    try {
      const data = await representativeService.getRepresentatives();
      setRepresentatives(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load representatives');
    }
  }, []);

  useEffect(() => {
    if (!organizationName) {
      navigate('/');
      return;
    }
    loadRepresentatives();
  }, [organizationName, navigate, loadRepresentatives]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await representativeService.registerRepresentative([
        formData.number,
        formData.name,
        formData.group,
        formData.sex
      ]);
      await loadRepresentatives();
      setFormData({ number: '', name: '', group: '', sex: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add representative');
    }
  };

  const handleRemove = async (number: string) => {
    try {
      await representativeService.removeRepresentative(number);
      await loadRepresentatives();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove representative');
    }
  };

  const handleChange = (representative: Representative) => {
    setFormData(representative);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const csvText = event.target?.result as string;
        const array = csvText.csvToArray({ trim: true, rSep: '\n' });
        await representativeService.registerRepresentativesFromArray(array);
        await loadRepresentatives();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to process CSV file');
      }
    };

    reader.onerror = () => {
      setError('Failed to read file');
    };

    try {
      reader.readAsText(file, 'utf-8');
    } catch {
      reader.readAsText(file, 'iso-8859-1');
    }
  };

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
    <Container>
      <h1>{t('REGISTERED_REPRESENTATIVES')}</h1>
      
      {representatives.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>{t('NAME')}</th>
              <th>{t('GROUP')}</th>
              <th>{t('SEX')}</th>
              <th>{t('CHANGE')}</th>
              <th>{t('DELETE')}</th>
            </tr>
          </thead>
          <tbody>
            {representatives.map((rep) => (
              <tr key={rep.number}>
                <td>{rep.number}</td>
                <td>{rep.name}</td>
                <td>{rep.group}</td>
                <td>{rep.sex}</td>
                <td>
                  <Button 
                    variant="info" 
                    size="sm"
                    onClick={() => handleChange(rep)}
                  >
                    ✎
                  </Button>
                </td>
                <td>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleRemove(rep.number)}
                  >
                    X
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>{t('NO_REPRESENTATIVES')}</p>
      )}

      <h2>{t('REGISTER_REPRESENTATIVES')}</h2>
      <p>{parse(t('TERMS_ORGANISATION'))}</p>
      
      <Form.Group>
        <Form.Label>{t('UPLOAD_FILE')}</Form.Label>
        <Form.Control 
          type="file" 
          accept=".csv"
          onChange={handleFileUpload}
        />
        <Form.Text>{t('UPLOAD_FILE_HELPER')}</Form.Text>
        <pre>
          1,Torkil Vederhus,Realistlista,M{'\n'}
          2,Greta Svenske,Venstrealliansen,K{'\n'}
          3,Stian Lågstad,Realistlista,M{'\n'}
          4,Ingunn Inge Nordmann,Grønn liste,T
        </pre>
      </Form.Group>

      <h2>{t('ADD_OR_CHANGE_REPRESENTATIVE')}</h2>
      <p className="help">{t('ADD_OR_CHANGE_REPRESENTATIVE_HELPER')}</p>

      <Form onSubmit={handleSubmit} className="form-horizontal">
        <Form.Group className="row">
          <Form.Label className="col-xs-2">{t('NUMBER')}</Form.Label>
          <div className="col-xs-10">
            <Form.Control
              type="text"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            />
          </div>
        </Form.Group>

        <Form.Group className="row">
          <Form.Label className="col-xs-2">{t('NAME')}</Form.Label>
          <div className="col-xs-10">
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </Form.Group>

        <Form.Group className="row">
          <Form.Label className="col-xs-2">{t('LIST_OR_GROUP')}</Form.Label>
          <div className="col-xs-10">
            <Form.Control
              type="text"
              value={formData.group}
              onChange={(e) => setFormData({ ...formData, group: e.target.value })}
            />
          </div>
        </Form.Group>

        <Form.Group className="row">
          <Form.Label className="col-xs-2">{t('SEX')}</Form.Label>
          <div className="col-xs-10">
            <Form.Control
              type="text"
              value={formData.sex}
              onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
            />
          </div>
        </Form.Group>

        <div className="text-right">
          <Button type="submit">{t('SUBMIT')}</Button>
        </div>
      </Form>
    </Container>
  );
};

export default AdminRepresentatives; 