import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import greenPerlImage from '../assets/perls/darkGreenPerl.png';
import favicon from '../assets/favicon.png';
import rightCurtainImage from '../assets/rightCurtain.jpg';
import leftCurtainImage from '../assets/leftCurtain.jpg';
import UserContext from '../userContext';
import { setToStorage } from '../utils/storage';

export default function Navigation({ isNavOpen, setIsNavOpen }) {
  const { user, setUser } = useContext(UserContext);
  const loggedIn = Object.keys(user).length !== 0;

  return (
    <>
      <NavigationStyled loggedIn={loggedIn} isNavOpen={isNavOpen}>
        <NavLinkStyled exact to="/" onClick={() => setIsNavOpen(false)}>
          News
        </NavLinkStyled>
        <NavLinkStyled to="/program" onClick={() => setIsNavOpen(false)}>
          Programm
        </NavLinkStyled>
        <NavLinkStyled to="/archive" onClick={() => setIsNavOpen(false)}>
          Archiv
        </NavLinkStyled>
        <NavLinkStyled to="/posters" onClick={() => setIsNavOpen(false)}>
          Plakate
        </NavLinkStyled>
        <NavLinkStyled to="/about" onClick={() => setIsNavOpen(false)}>
          Über uns
        </NavLinkStyled>
        <NavLinkStyled to="/contact" onClick={() => setIsNavOpen(false)}>
          Kontakt
        </NavLinkStyled>
        {loggedIn && (
          <>
            <HorizontalLineStyled />
            <NavLinkStyled to="/intern/addNotice" onClick={() => setIsNavOpen(false)}>
              Neue News
            </NavLinkStyled>
            <NavLinkStyled to="/intern/addSerial" onClick={() => setIsNavOpen(false)}>
              Neue Reihe
            </NavLinkStyled>
            <NavLinkStyled to="/intern/addScreening" onClick={() => setIsNavOpen(false)}>
              Neuer Film
            </NavLinkStyled>
            <NavLinkStyled exact to="/logout" onClick={handleLogout}>
              Logout
            </NavLinkStyled>
          </>
        )}
        <Cushion />
      </NavigationStyled>
      <LeftCurtainStyled isNavOpen={isNavOpen}>
        <PerlLinkStyled target="_blank" href="https://youtu.be/hKBfQdKvyXc">
          <PerlStyled src={favicon} />
          <PerlStyled src={favicon} />
        </PerlLinkStyled>
      </LeftCurtainStyled>
    </>
  );

  function handleLogout() {
    setToStorage('rineuto-token', null);
    setUser({});
    setIsNavOpen(false);
  }
}

const NavigationStyled = styled.nav`
  position: absolute;
  right: 0;
  top: 60px;
  z-index: 1000;
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 20px;
  overflow: auto;
  width: 50%;
  height: 100%;
  padding: 20px;
  background-image: url(${rightCurtainImage});
  background-size: cover;
  transform: ${(props) => (props.isNavOpen ? 'translateX(0)' : 'translateX(101%)')};
  transition: all 2.3s linear;

  @media (min-width: 900px) {
    position: static;
    grid-column-start: 1;
    display: grid;
    grid-auto-rows: min-content;
    grid-gap: 16px;
    width: 100%;
    height: auto;
    padding: 20px 20px;
    background-image: url(${greenPerlImage});
    background-size: auto;
    transform: translateX(0);
  }
`;

const NavLinkStyled = styled(NavLink)`
  justify-self: right;
  width: max-content;
  text-decoration: none;
  color: white;
  font-size: 1.5em;
  font-weight: bold;

  :hover {
    text-decoration: underline;
  }

  &.active {
    transform: skew(0deg, -13deg);
  }

  @media (min-width: 900px) {
    justify-self: left;
    font-size: 2em;
  }
`;

const HorizontalLineStyled = styled.hr`
  visibility: hidden;
`;

const PerlLinkStyled = styled.a`
  position: absolute;
  left: 20px;
  top: 20px;
  height: 20px;

  @media (min-width: 900px) {
    display: none;
  }
`;

const PerlStyled = styled.img`
  height: 20px;
  width: 20px;
`;

const Cushion = styled.div`
  height: 30px;
`;

const LeftCurtainStyled = styled.div`
  position: absolute;
  left: 0;
  top: 60px;
  z-index: 1000;
  width: 50%;
  height: 100%;
  background-image: url(${leftCurtainImage});
  background-size: cover;
  transform: ${(props) => (props.isNavOpen ? 'translateX(0)' : 'translateX(-101%)')};
  transition: all 2.3s linear;

  @media (min-width: 900px) {
    display: none;
  }
`;
