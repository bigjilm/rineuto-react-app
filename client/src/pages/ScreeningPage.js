import React, { useContext, useEffect, useState } from 'react';
import Linkify from 'react-linkify';
import { Link, Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import DateRibbon from '../common/DateRibbon';
import UserContext from '../userContext';
import LoadingPage from './LoadingPage';

export default function ScreeningPage({ screenings, editedObject }) {
  const [selectedScreening, setSelectedScreening] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidId, setIsInvalidId] = useState(false);

  const { user } = useContext(UserContext);
  const loggedIn = Object.keys(user).length !== 0;

  let history = useHistory();

  useEffect(() => {
    if (selectedScreening) {
      document.title = selectedScreening.title + ' | Rineuto Lichtspiele';
    }
  }, [selectedScreening]);

  useEffect(() => {
    const screeningId = window.location.pathname.slice(-24);
    const screening = screenings.find((screening) => screening._id === screeningId);
    if (!screening) {
      setIsInvalidId(true);
    }
    setSelectedScreening(screening);
    setIsLoading(false);
  }, [screenings]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isInvalidId) {
    return <Redirect to="/404" />;
  }

  return (
    <ScreeningPageStyled>
      {editedObject._id === selectedScreening._id && <EditNoteStyled>Änderungen gespeichert</EditNoteStyled>}
      <BackButtonStyled onClick={history.goBack}>Zurück</BackButtonStyled>
      <ScreeningInfoContainerStyled>
        <DateRibbon date={selectedScreening.date} />
        <FilmStillStyled src={selectedScreening.imageUrl} alt={selectedScreening.altText} />
        <ScreeningTitleStyled>{selectedScreening.title}</ScreeningTitleStyled>
        <FilmInfoStyled>
          {selectedScreening.country +
            ' ' +
            selectedScreening.year +
            ' | ' +
            selectedScreening.length +
            ' Min | ' +
            selectedScreening.version}
        </FilmInfoStyled>
        <FilmDirectorStyled>{'Regie: ' + selectedScreening.director}</FilmDirectorStyled>
        <FilmSynopsisStyled>
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a target="blank" href={decoratedHref} key={key}>
                {decoratedText}
              </a>
            )}
          >
            {selectedScreening.synopsis}
          </Linkify>
        </FilmSynopsisStyled>
        <ScreeningSerialStyled>
          Filmreihe: {selectedScreening.serial ? selectedScreening.serial.title : ''}
        </ScreeningSerialStyled>
        {loggedIn && <EditLinkStyled to={'/intern/editScreening/' + selectedScreening._id}>Bearbeiten</EditLinkStyled>}
      </ScreeningInfoContainerStyled>
    </ScreeningPageStyled>
  );
}

const ScreeningPageStyled = styled.article`
  position: relative;
  margin: 0 auto;
  max-width: 600px;
  padding: 60px 20px;
`;

const EditNoteStyled = styled.div`
  margin-bottom: 60px;
  color: green;
  font-size: 1.5em;
  font-weight: bold;
`;

const BackButtonStyled = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 20px;
  padding: 0 5px;
`;

const ScreeningInfoContainerStyled = styled.div`
  position: relative;
  display: grid;
  grid-auto-rows: min-content;
  margin-top: 20px;
`;

const FilmStillStyled = styled.img`
  width: 100%;
`;

const ScreeningTitleStyled = styled.h2`
  margin: 0;
  padding: 10px;
  background-color: white;
`;

const FilmInfoStyled = styled.div`
  padding: 5px 10px 0 10px;
  background-color: black;
  color: white;
`;

const FilmDirectorStyled = styled.div`
  padding: 0 10px 5px 10px;
  background-color: black;
  color: white;
`;

const FilmSynopsisStyled = styled.p`
  overflow: auto;
  margin: 0;
  padding: 10px;
  background-color: white;
  white-space: pre-line;
`;

const ScreeningSerialStyled = styled.div`
  padding: 10px;
  background-color: black;
  color: white;
`;

const EditLinkStyled = styled(Link)`
  padding: 10px;
  background-color: white;
  color: black;
  text-align: right;
`;
