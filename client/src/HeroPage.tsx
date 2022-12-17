import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';

const Test = () => {
  return (<p>Working on something...</p>);
};

const HeroPage: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <h1 style={{ fontSize: '50px', width: '100%', textAlign: 'center', marginTop: '2rem' }}>WesleyLeMahieu.com</h1>

      <Footer />
    </div>
  )
};

export default HeroPage;
