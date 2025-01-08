import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useOrganization } from '../../context/OrganizationContext';
import { statisticsService } from './services/StatisticsService';
import './Statistics.css';
import { createColumnChart, createPieCharts } from './charts';
import { addDays, createPythonDate, extractValues, formatDate } from './utils';

const Statistics: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { organizationName } = useOrganization();
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [endDate, setEndDate] = useState(formatDate(addDays(new Date(), 1)));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!organizationName) {
      navigate('/');
      return;
    }
    loadStatistics();
  }, [organizationName, navigate]);

  const loadStatistics = async () => {
    try {
      await Promise.all([
        getStatisticsByType('sex', ['firstSexChartContainer', 'secondSexChartContainer'], 'Kjønn', 'pie'),
        getStatisticsByType('group', 'groupChartContainer', 'Fraksjon', 'column'),
        getStatisticsByType('name', 'nameChartContainer', 'Representant', 'column')
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load statistics');
    }
  };

  const getStatisticsByType = async (
    sortType: string, 
    containerId: string | string[], 
    typeLabel: string, 
    chartType: 'pie' | 'column'
  ) => {
    const data = await statisticsService.getStatistics(
      sortType, 
      createPythonDate(startDate), 
      createPythonDate(endDate)
    );
    
    const extractedValues = extractValues(data);
    
    if (chartType === 'column') {
      createColumnChart(extractedValues, containerId as string, typeLabel);
    } else if (chartType === 'pie') {
      createPieCharts(extractedValues, containerId as string[], typeLabel);
    }
  };

  return (
    <Container>
      <h1>{t('STATISTICS')}</h1>
      
      <Form onSubmit={(e) => {
        e.preventDefault();
        loadStatistics();
      }}>
        <Form.Control
          type="date"
          className="display-inline-quarter-width"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Form.Control
          type="date"
          className="display-inline-quarter-width"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Form.Control type="submit" style={{ display: 'none' }} />
      </Form>

      <div id="firstSexChartContainer" className="display-inline-half-width" />
      <div id="secondSexChartContainer" className="display-inline-half-width" />
      <div id="groupChartContainer" />
      <div id="nameChartContainer" />

      <p>{t('ABOUT_HIGHCHARTS')}</p>
    </Container>
  );
};

export default Statistics; 