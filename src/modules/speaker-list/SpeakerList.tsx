import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useOrganization } from '../../context/OrganizationContext';
import { Speaker } from './types';
import { speakerListService } from './services/SpeakerListService';
import { subjectService } from '../subject/services/SubjectService';
import './SpeakerList.css';

const SpeakerList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { organizationName } = useOrganization();
  const [speakerList, setSpeakerList] = useState<Speaker[]>([]);
  const [message, setMessage] = useState<string>('');
  const [subjectTitle, setSubjectTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Redirect if no organization is selected
  useEffect(() => {
    if (!organizationName) {
      navigate('/');
    }
  }, [organizationName, navigate]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const [speakerData, messageData, subjectData] = await Promise.all([
          speakerListService.getSpeakerList(),
          subjectService.getMessage(),
          subjectService.getSubject()
        ]);

        setSpeakerList(speakerData);
        setMessage(messageData || '');
        setSubjectTitle(subjectData || '');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        clearInterval(intervalId);
      }
    };

    if (organizationName) {
      fetchData();
      intervalId = setInterval(fetchData, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [organizationName]);

  if (!organizationName) {
    return null;
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
    <div className="biggerText">
      {subjectTitle && <h1>{subjectTitle}</h1>}
      
      {speakerList && speakerList.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>{t('NAME')}</th>
              <th>{t('GROUP')}</th>
            </tr>
          </thead>
          <tbody>
            {speakerList.map((speaker, index) => (
              <React.Fragment key={speaker.id || index}>
                <tr className={speaker.speaking ? 'hightlightSpeaker' : ''}>
                  <td>{speaker.number}</td>
                  <td>{speaker.name}</td>
                  <td>{speaker.group}</td>
                </tr>
                {speaker.replies?.map((reply, replyIndex) => (
                  <tr 
                    key={`reply-${replyIndex}`} 
                    className={`reply-row ${reply.speaking ? 'hightlightSpeaker' : ''}`}
                  >
                    <td>
                      <span className="glyphicon glyphicon-arrow-right"></span>
                      {reply.number}
                    </td>
                    <td>{reply.name}</td>
                    <td>{reply.group}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>{t('NO_SPEAKERS_ON_LIST')}</p>
      )}

      {message && (
        <div className="info-text" 
          dangerouslySetInnerHTML={{ __html: message }} 
        />
      )}
    </div>
  );
};

export default SpeakerList; 