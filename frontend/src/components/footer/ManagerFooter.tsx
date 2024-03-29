import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import FavoriteIcon from '@mui/icons-material/Favorite';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

// import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Diversity1Icon from '@mui/icons-material/Diversity1';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { styled, useTheme } from '@mui/material/styles';

const ManagerFooter: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();

  // 현재 경로에 따라 색상 변경을 위한 로직
  const getIconColor = (path: string) => {
    return location.pathname === path ? theme.palette.primary.main : theme.palette.primary.contrastText;
  };

  // 현재 경로에 따른 텍스트 색상 결정
  const getTextStyle = (path: string) => ({
    color: location.pathname === path ? theme.palette.primary.main : theme.palette.primary.contrastText,
  });

  const icons = {
    Home: styled(ManageAccountsIcon)({
      color: getIconColor('/'),
      fontSize: '28px',
    }),
    Heart: styled(VolunteerActivismIcon)({
      color: getIconColor('/wish-list'),
      fontSize: '28px',
    }),
    Contract: styled(Diversity1Icon)({
      color: getIconColor('/contract'),
      fontSize: '28px',
    }),
    Profile: styled(AddHomeIcon)({
      color: getIconColor('/my-info'),
      fontSize: '28px',
    }),
  };

  return (
    <footer className="footer">
      <Link to="/" className="icon-container">
        <icons.Home />
        <span className="icon-description" style={getTextStyle('/')}>
          학생관리
        </span>
      </Link>
      <Link to="/wish-list" className="icon-container">
        <icons.Heart />
        <span className="icon-description" style={getTextStyle('/wish-list')}>
          올리사랑
        </span>
      </Link>
      <Link to="/contract" className="icon-container">
        <icons.Contract />
        <span className="icon-description" style={getTextStyle('/contract')}>
          매칭 관리
        </span>
      </Link>
      <Link to="/my-info" className="icon-container">
        <icons.Profile />
        <span className="icon-description" style={getTextStyle('/my-info')}>
          집등록
        </span>
      </Link>
    </footer>
  );
};

export default ManagerFooter;
