import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferredLanguage', lng);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle 
        variant="link" 
        id="language-selector"
        className="navbar-nav nav-link"
      >
        {i18n.language === 'nb' ? 'Bokmål' : 'Nynorsk'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item 
          onClick={() => changeLanguage('nb')}
          active={i18n.language === 'nb'}
          className="navbar-nav nav-link"
        >
          Bokmål
        </Dropdown.Item>
        <Dropdown.Item 
          onClick={() => changeLanguage('nn')}
          active={i18n.language === 'nn'}
          className="navbar-nav nav-link"
        >
          Nynorsk
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector; 