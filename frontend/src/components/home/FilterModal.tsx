import React, { useState, useEffect } from 'react';
import '../../styles/home/Header.css';
import styled from '@emotion/styled';
import { Slider, Box, Typography, Button, Grid } from '@mui/material';
import { RecommendAxios } from '../../api/RecommendAxios';
import { useHomeStore } from '../../store/HomeStore';

interface FilterModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ modalOpen, setModalOpen }) => {
  const [range, setRange] = React.useState<number[]>([0, 1000000]);
  const {
    search_condition,
    filter_condition,
    member_personality,
    setSearchCondition,
    marks,
    options,
    types,
    toggleRentRange,
    toggleOption,
    toggleType,
    setSearchFilterChanged,
    setHomes,
    setHeaderFilterChanged,
  } = useHomeStore();
  const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
  `;

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const handleChange = (event: Event, newRange: number | number[]) => {
    setRange(newRange as number[]);
    toggleRentRange(newRange as number[]);
  };

  const handleButtonClick = () => {
    setSearchCondition(search_condition);
    console.log('간다 : ', search_condition);
    setModalOpen(false);
    setSearchFilterChanged(true);
  };

  const handleOptionClick = (optionName: string, optionChoice: boolean) => {
    toggleOption(optionName);
  };

  const handleTypeClick = (typeName: string, typeChoice: boolean) => {
    toggleType(typeName);
  };

  const fetchData = async () => {
    try {
      const requestData = {
        filter_condition: filter_condition,
        search_condition: search_condition,
        member_personality: member_personality,
      };
      console.log('요청 : ', requestData);
      const response = await RecommendAxios.post('/recommend', requestData);
      setHomes(response.data);
      console.log('응답 : ', response.data);
      setHeaderFilterChanged(false);
    } catch (error) {
      console.error('집 리스트 조회 실패 : ', error);
    }
  };

  useEffect(() => {
    setRange([search_condition.rent_min, search_condition.rent_max]);
    return () => {
      setHeaderFilterChanged(true);
    };
  }, []);

  return (
    <ModalContainer>
      <ModalContent>
        <Box sx={style}>
          <Typography
            sx={{ textAlign: 'left', marginBottom: '35px' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            가격 범위
          </Typography>
          <div style={{ position: 'relative', margin: 'auto', width: '90%' }}>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={range}
              onChange={handleChange}
              marks={marks}
              min={marks[0].value}
              max={marks[1].value}
              valueLabelDisplay="on"
              // getAriaValueText={valuetext}
            />
          </div>
          <Typography
            sx={{ textAlign: 'left', marginTop: '10px', marginBottom: '10px' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            집 옵션
          </Typography>
          <Grid container spacing={1}>
            {options.map((option) => (
              <Grid item xs={4} key={option.option}>
                <Button
                  onClick={() => handleOptionClick(option.value, option.choice)}
                  style={{
                    width: '105px',
                    height: '50px',
                    border: option.choice ? '1px solid #E07068' : '1px solid black',
                    backgroundColor: option.choice ? '#E07068' : 'white',
                    color: option.choice ? 'white' : 'black',
                  }}
                  // variant={option.choice ? 'contained' : 'outlined'}
                >
                  {option.option}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Typography
            sx={{ textAlign: 'left', marginTop: '15px', marginBottom: '10px' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            집 타입
          </Typography>
          <Grid container spacing={1}>
            {types.map((type) => (
              <Grid item xs={4} key={type.type}>
                <Button
                  onClick={() => handleTypeClick(type.value, type.choice)}
                  style={{
                    width: '105px',
                    height: '50px',
                    border: type.choice ? '1px solid #E07068' : '1px solid black',
                    backgroundColor: type.choice ? '#E07068' : 'white',
                    color: type.choice ? 'white' : 'black',
                  }}
                  // variant={type.choice ? 'contained' : 'outlined'}
                >
                  {type.type}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleButtonClick} color="primary">
              확인
            </Button>
          </Box>
        </Box>
      </ModalContent>
    </ModalContainer>
  );
};

export default FilterModal;
