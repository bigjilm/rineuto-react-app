import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import DateRibbon from './DateRibbon';

export default function ScreeningCard({ screening }) {
  return (
    <ScreeningCardStyled>
      <DateRibbon date={screening.date} />
      <LinkStyled to={'/screening/' + screening._id}>
        <FilmStillStyled src={process.env.PUBLIC_URL + screening.imageUrl} />
        <ScreeningTitleStyled>{screening.title}</ScreeningTitleStyled>
      </LinkStyled>
      <ScreeningSeriesStyled>
        Filmreihe: {screening.series}
      </ScreeningSeriesStyled>
    </ScreeningCardStyled>
  );
}

const ScreeningCardStyled = styled.li`
  display: grid;
`;

const LinkStyled = styled(Link)`
  display: grid;
  color: black;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const FilmStillStyled = styled.img`
  width: 100%;
`;

const ScreeningTitleStyled = styled.h2`
  margin: 0;
  padding: 10px;
  background-color: white;
  color: black;
`;

const ScreeningSeriesStyled = styled.div`
  padding: 10px;
  background-color: black;
  color: white;
`;
