import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';
import Header from '../components/home/Header';
import HomeList from '../components/home/HomeList';
import Footer from '../components/footer/Footer';
import '../styles/Footer.css';
import MapBox from '../components/home/MapBox';
import ManagerFooter from '../components/footer/ManagerFooter';
const Home: React.FC = () => {
  const images = ['/test/home1.png', '/test/home2.png', '/test/home3.png'];

  return (
    <div className="main-page">
      <Header />
      <MapBox />
      <HomeList />
      <br />
      <br />
      <Footer />
      {/*<ManagerFooter />*/}
    </div>
  );
};

export default Home;
