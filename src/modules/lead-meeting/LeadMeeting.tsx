import React, { useState, useEffect, useCallback } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import parse from 'html-react-parser'; 
import { Stopwatch } from './Stopwatch';
import { speakerListService } from '../speaker-list/services/SpeakerListService';
import { subjectService } from '../subject/services/SubjectService';
import { useOrganization } from '../../context/OrganizationContext';
import { Speaker } from '../../types/speaker.types';
import { representativeService } from '../admin-representatives/services/RepresentativeService';

const LeadMeeting: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { organizationName } = useOrganization();
  const [subjectTitle, setSubjectTitle] = useState('');
  const [speakerNumber, setSpeakerNumber] = useState('');
  const [speakerList, setSpeakerList] = useState<Speaker[]>([]);
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const [message, setMessage] = useState('');
  const [showEstimateParams, setShowEstimateParams] = useState(false);
  const [estimateParams, setEstimateParams] = useState({
    speechLength: 3,
    replyLength: 1,
    numberOfReplies: 1
  });
  const [doneEstimate, setDoneEstimate] = useState(moment());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!organizationName) {
      navigate('/');
      return;
    }

    const loadInitialData = async () => {
      try {
        const [speakerData, subjectData, messageData, representativesData] = await Promise.all([
          speakerListService.getSpeakerList(),
          subjectService.getSubject(),
          subjectService.getMessage(),
          representativeService.getRepresentatives()
        ]);

        setSpeakerList(speakerData);
        setSubjectTitle(subjectData);
        setMessage(messageData);
        setRepresentatives(representativesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      }
    };

    loadInitialData();
    const intervalId = setInterval(loadInitialData, 5000);
    return () => clearInterval(intervalId);
  }, [organizationName, navigate]);

  const loadSpeakerList = useCallback(async () => {
    try {
      const data = await speakerListService.getSpeakerList();
      setSpeakerList(data);
      estimateTime(); // Call estimate time when speaker list updates
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load speaker list');
    }
  }, []);

  useEffect(() => {
    if (!organizationName) {
      navigate('/');
      return;
    }

    // Initial load
    loadSpeakerList();

    // Set up polling
    const intervalId = setInterval(loadSpeakerList, 5000);
    return () => clearInterval(intervalId);
  }, [organizationName, navigate, loadSpeakerList]);

  const estimateTime = useCallback(() => {
    const newEstimate = moment();
    if (speakerList.length > 0) {
      newEstimate.add(speakerList.length * estimateParams.speechLength, 'minutes');
      newEstimate.add(
        speakerList.length * estimateParams.numberOfReplies * estimateParams.replyLength, 
        'minutes'
      );
    }
    setDoneEstimate(newEstimate);
  }, [speakerList.length, estimateParams]);

  const handleSubmitSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await subjectService.setSubject(subjectTitle);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update subject');
    }
  };

  const handleAddSpeaker = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!speakerNumber) {
        const updatedList = await speakerListService.nextSpeaker();
        setSpeakerList(updatedList);
      } else if (speakerNumber.charAt(0) === 'r') {
        const updatedList = await speakerListService.addReply(speakerNumber.slice(1));
        setSpeakerList(updatedList);
      } else {
        const updatedList = await speakerListService.addSpeaker(speakerNumber);
        setSpeakerList(updatedList);
      }
      setSpeakerNumber('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add speaker');
    }
  };

  const handleUpdateMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await subjectService.setMessage(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update message');
    }
  };

  const handleRemoveSpeaker = async (index: number) => {
    try {
      const updatedList = await speakerListService.removeSpeaker(index);
      setSpeakerList(updatedList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove speaker');
    }
  };

  const handleRemoveReply = async (index: number) => {
    try {
      const updatedList = await speakerListService.removeReply(index);
      setSpeakerList(updatedList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove reply');
    }
  };

  const handleMoveUp = async (index: number) => {
    try {
      const updatedList = await speakerListService.moveSpeaker(index, index - 1);
      setSpeakerList(updatedList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to move speaker');
    }
  };

  const handleMoveDown = async (index: number) => {
    try {
      const updatedList = await speakerListService.moveSpeaker(index, index + 1);
      setSpeakerList(updatedList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to move speaker');
    }
  };

  const renderMessage = (text: string) => {
    return parse(text);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmitSubject} className="mb-4">
        <Form.Group className="row">
          <Form.Label className="col-xs-2">{t('SUBJECT')}</Form.Label>
          <div className="col-xs-8">
            <Form.Control
              type="text"
              placeholder={t('SUBJECT_PLACEHOLDER')}
              value={subjectTitle}
              onChange={(e) => setSubjectTitle(e.target.value)}
            />
          </div>
          <div className="col-xs-2">
            <Button type="submit">{t('SAVE')}</Button>
          </div>
        </Form.Group>
      </Form>

      <Form onSubmit={handleAddSpeaker} className="mb-4">
        <Form.Group className="row">
          <Form.Label className="col-xs-2">{t('ADD_NEXT_SPEAKER')}</Form.Label>
          <div className="col-xs-8">
            <Form.Control
              type="text"
              placeholder={t('ADD_NEXT_SPEAKER_PLACEHOLDER')}
              value={speakerNumber}
              onChange={(e) => setSpeakerNumber(e.target.value)}
            />
          </div>
          <div className="col-xs-2">
            <Button type="submit">{t('SUBMIT')}</Button>
          </div>
        </Form.Group>
      </Form>

      <div className="timer-container">
        <div id="stopwatch" className="fontSizeDoubled alignCenter">
          <Stopwatch delay={1000} />
        </div>
        <div id="timeLeft">
          {t('TIME_LEFT')} {doneEstimate.format("H:mm")}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setShowEstimateParams(!showEstimateParams);
            }}
          >
            {showEstimateParams ? t('HIDE_INPUT') : '⚙'}
          </a>
        </div>
      </div>

      {showEstimateParams && (
        <div className="form-horizontal">
          <div className="form-group">
            <Form.Group className="row">
              <Form.Label className="control-label col-xs-2">{t('SPEECH_LENGTH')}</Form.Label>
              <div className="col-xs-1">
                <Form.Control
                  type="text"
                  value={estimateParams.speechLength}
                  onChange={(e) => setEstimateParams({
                    ...estimateParams,
                    speechLength: parseInt(e.target.value) || 0
                  })}
                />
              </div>
            </Form.Group>

            <Form.Group className="row">
              <Form.Label className="control-label col-xs-3">{t('NUMBER_OF_REPLIES')}</Form.Label>
              <div className="col-xs-1">
                <Form.Control
                  type="text"
                  value={estimateParams.numberOfReplies}
                  onChange={(e) => setEstimateParams({
                    ...estimateParams,
                    numberOfReplies: parseInt(e.target.value) || 0
                  })}
                />
              </div>
            </Form.Group>

            <Form.Group className="row">
              <Form.Label className="control-label col-xs-3">{t('REPLY_LENGTH')}</Form.Label>
              <div className="col-xs-1">
                <Form.Control
                  type="text"
                  value={estimateParams.replyLength}
                  onChange={(e) => setEstimateParams({
                    ...estimateParams,
                    replyLength: parseInt(e.target.value) || 0
                  })}
                />
              </div>
            </Form.Group>
          </div>
        </div>
      )}

      {speakerList && speakerList.length > 0 ? (
        <Table className="borderless">
          <thead>
            <tr>
              <th>#</th>
              <th>{t('NAME')}</th>
              <th>{t('GROUP')}</th>
              <th>{t('MOVE')}</th>
              <th>{t('REMOVE')}</th>
            </tr>
          </thead>
          <tbody>
            {speakerList.map((speaker, index) => (
              <React.Fragment key={speaker.id || index}>
                <tr className={speaker.speaking ? 'hightlightSpeaker' : ''}>
                  <td>{speaker.number}</td>
                  <td>{speaker.name}</td>
                  <td>{speaker.group}</td>
                  <td>
                    {!index && (
                      <div 
                        className="cursor-hover" 
                        onClick={() => handleMoveUp(index)}
                      >
                        ↑
                      </div>
                    )}
                    {index !== speakerList.length - 1 && (
                      <div 
                        className="cursor-hover" 
                        onClick={() => handleMoveDown(index)}
                      >
                        ↓
                      </div>
                    )}
                  </td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleRemoveSpeaker(index)}
                    >
                      X
                    </Button>
                  </td>
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
                    <td></td>
                    <td>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleRemoveReply(replyIndex)}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>{t('NO_SPEAKERS_ON_LIST')}</p>
      )}

      <Form onSubmit={handleUpdateMessage} className="form-horizontal">
        <Form.Group className="row">
          <Form.Label className="control-label col-xs-2">{t('GENERAL_INFO')}</Form.Label>
          <div className="col-xs-8">
            <Form.Control
              as="textarea"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <p>{renderMessage(t('GENERAL_INFO_INSTRUCTIONS'))}</p>
          </div>
          <div className="col-xs-2">
            <Button type="submit">{t('UPDATE')}</Button>
          </div>
        </Form.Group>
      </Form>

      <p>{renderMessage(t('TERMS_ORGANISATION'))}</p>

      <h2>{t('REGISTERED_REPRESENTATIVES')}</h2>
      {representatives && representatives.length > 0 ? (
        <Table className="borderless">
          <thead>
            <tr>
              <th>#</th>
              <th>{t('NAME')}</th>
              <th>{t('GROUP')}</th>
              <th>{t('SEX')}</th>
            </tr>
          </thead>
          <tbody>
            {representatives.map((representative, index) => (
              <tr key={index}>
                <td>{representative.number}</td>
                <td>{representative.name}</td>
                <td>{representative.group}</td>
                <td>{representative.sex}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>{t('NO_REPRESENTATIVES')}</p>
      )}
    </Container>
  );
};

export default LeadMeeting; 