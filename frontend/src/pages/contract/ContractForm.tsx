import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { IAddress } from '../../interfaces/AddressInterface';
import styled from 'styled-components';
import { getRoadAddress } from '../../utils/addressUtils';
import { getRent } from '../../utils/moneyUtils';
import { getDay, getMonth, getYear } from '../../utils/timeUtils';
import Footer from '../../components/footer/Footer';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { StyledEngineProvider } from '@mui/styled-engine-sc';
import { Box, Button } from '@mui/material';
import ContractSignatureModal from '../../components/contract/ContractSignatureModal';
import { IContractForm } from '../../interfaces/ContractFormInterface';
import { IHome } from '../../interfaces/HomeInterface';
import { IMember } from '../../interfaces/MemberInterface';
import { IContract, IContractInfo } from '../../interfaces/ContractInterface';
import { useLocation } from 'react-router-dom';
import { getMemberContract } from '../../api/ContractApis';
import { getContractDetail } from '../../api/ManagerApis';

interface ContractFormProps {
  home: IHome;
  member: IMember;
  contract: IContract;
}
const ContractForm = () => {
  const location = useLocation();
  const { home, member, contract, role } = location.state as {
    home: IHome;
    member: IMember;
    contract: IContract;
    role: string;
  };
  const [open, setOpen] = React.useState(false);
  const [contractInfo, setContractInfo] = useState<IContractInfo>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await getContractDetail(contract.contractNo);
      if (!result) return;
      setContractInfo(result);
    };
    fetchData();
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  interface ContractPdfProps {
    person: string;
    name: string;
    registerNo: string;
    phone: string;
    address: IAddress;
  }
  const addPhoneDash = (phone: string) => {
    const first = phone.slice(0, 3);
    const second = phone.slice(3, 7);
    const end = phone.slice(7, 11);
    return first + '-' + second + '-' + end;
  };
  const getContractJSX = ({ person, name, registerNo, phone, address }: ContractPdfProps) => {
    return (
      <View>
        <Text>{person} 정보</Text>
        <PersonInfoTable>
          <RowWrapper>
            <Row>
              <Text>성명</Text>
            </Row>
            <Row>
              <Text>{name}</Text>
            </Row>
            <Row>
              <Text>전화번호</Text>
            </Row>
            <Row>
              <Text>{addPhoneDash(phone)}</Text>
            </Row>
          </RowWrapper>
          <RowWrapper>
            <ColumnOne>
              <Text>주민번호</Text>
            </ColumnOne>
            <Row>
              <Text>{registerNo}</Text>
            </Row>
          </RowWrapper>
          <RowWrapper>
            <ColumnOne>
              <Text>주소</Text>
            </ColumnOne>
            <Row>
              <Text>{getRoadAddress(address)}</Text>
            </Row>
          </RowWrapper>
        </PersonInfoTable>
      </View>
    );
  };
  const signModal = () => {
    if (!contractInfo) return <></>;
    return (
      <>
        <Button onClick={handleOpen}>서명하기</Button>
        <ContractSignatureModal open={open} handleClose={handleClose} contract={contractInfo.contract} role={role} />
      </>
    );
  };
  if (!contractInfo)
    return (
      <>
        <div>조회된 계약이 없습니다.</div>
      </>
    );
  return (
    <>
      <Page>
        <StyledEngineProvider injectFirst>
          <Title>스물다섯 여든하나 룸쉐어링 계약서</Title>
          <Introduce>
            임대인{' '}
            <span className="name" style={{ whiteSpace: 'nowrap' }}>
              {contractInfo.home.home.hostName}
            </span>
            과 임차인{' '}
            <span className="name" style={{ whiteSpace: 'nowrap' }}>
              {contractInfo.member.name}
            </span>
            은 아래와 같이 임대차 계약을 체결한다.
          </Introduce>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />} style={{ fontWeight: 'bold' }}>
              1. 임대주택의 표시
            </AccordionSummary>
            <AccordionDetails>
              <HomeInfoFirstCell>
                <Cell>주소</Cell>
              </HomeInfoFirstCell>
              <HomeInfoSecondCell>
                <Cell className="info">{getRoadAddress(contractInfo.home.home.address)}</Cell>
              </HomeInfoSecondCell>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />} style={{ fontWeight: 'bold' }}>
              2. 계약 내용
            </AccordionSummary>
            <AccordionDetails>
              <ContractContentWrapper>
                <ContractContentTitle>제 1 조 (목적)</ContractContentTitle>
                <Text>
                  위 임대주택의 임대차에 한하여 임대인과 임차인은 합의에 의하여 월세 금
                  <span className="info" style={{ display: 'inline', marginLeft: '6px' }}>
                    {home.rent}
                  </span>
                  만원정을 선불로 매월 1일에 지불한다.
                </Text>
              </ContractContentWrapper>
              <ContractContentWrapper>
                <ContractContentTitle>제 2 조 (존속 기간)</ContractContentTitle>
                <Text>
                  임대인은 위 임대주택을 임대차 목적으로 사용, 수익할 수 있는 상태로{' '}
                  <span className="info" style={{ display: 'inline', marginLeft: '6px' }}>
                    {getYear(contract.startAt)}년 {getMonth(contract.startAt)}월 {getDay(contract.startAt)}일
                  </span>{' '}
                  까지 임차인에게 인도하며, 임대차 기간은 인도일로부터{' '}
                  <span className="info" style={{ display: 'inline', marginLeft: '6px' }}>
                    {getYear(contract.expiredAt)}년 {getMonth(contract.expiredAt)}월 {getDay(contract.expiredAt)}일
                  </span>{' '}
                  까지로 한다.
                </Text>
              </ContractContentWrapper>
              <ContractContentWrapper>
                <ContractContentTitle>제 3 조 (용도변경 및 전대 등)</ContractContentTitle>
                <Text>
                  임차인은 임대인의 동의없이 위 부동산의 용도나 구조를 변경하거나 전대임차권 양도 또는 담보제공을 하지
                  못하며 임대차 목적 이외의 용도로 사용할 수 없다.
                </Text>
              </ContractContentWrapper>
              <ContractContentWrapper>
                <ContractContentTitle>제 4 조 (계약의 해지)</ContractContentTitle>
                <Text>
                  임차인의 월세연체액이 2회 분의 월세액에 달하거나 제3조를 위반하였을 때 임대인은 즉시 본 계약을 해지 할
                  수 있다.
                </Text>
              </ContractContentWrapper>
              <ContractContentWrapper>
                <ContractContentTitle>제 5 조 (계약의 종료)</ContractContentTitle>
                <Text>
                  임대차계약이 종료된 경우에 임차인은 위 부동산을 원상으로 회복하여 임대인에게 반환한다. 이러한 경우
                  임대인은 보증금을 임차인에게 반환하고, 연체 임대료 또는 손해배상금이 있을 때는 이들을 제하고 그 잔액을
                  반환한다.
                </Text>
              </ContractContentWrapper>
              <ContractContentWrapper>
                <ContractContentTitle>제 6 조 (계약의 해제)</ContractContentTitle>
                <Text>
                  임차인이 임대인에게 중도금(중도금이 없을 때는 잔금)을 지불하기 전까지, 임대인은 계약금의 배액을
                  상환하고, 임차인은 계약금을 포기하고 이 계약을 해제할 수 있다.
                </Text>
              </ContractContentWrapper>
              <ContractContentWrapper>
                <ContractContentTitle>제 7 조 (채무 불이행과 손해배상)</ContractContentTitle>
                <Text>
                  임대인 또는 임차인이 본 계약상의 내용에 대하여 불이행이 있을 경우 그 상대방은 불이행한 자에 대하여
                  서면으로 최고하고 계약을 해제 할 수 있다. 그리고 계약 당사자는 계약해제에 따른 손해배상을 각각
                  상대방에 대하여 청구할 수 있다.
                </Text>
              </ContractContentWrapper>
            </AccordionDetails>
          </Accordion>
          <View />
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />} style={{ fontWeight: 'bold' }}>
              3. 계약 당사자 정보
            </AccordionSummary>
            <AccordionDetails>
              {getContractJSX({
                person: '임대인',
                name: contractInfo.home.home.hostName,
                registerNo: contractInfo.home.home.hostRegisterNo,
                phone: contractInfo.home.home.hostPhone,
                address: contractInfo.home.home.address,
              })}
              {getContractJSX({
                person: '임차인',
                name: contractInfo.member.name,
                registerNo: contractInfo.member.registerNo,
                phone: contractInfo.member.phone,
                address: contractInfo.member.address,
              })}
            </AccordionDetails>
          </Accordion>
          <ContractSignWrapper>
            <ContractSignTitle>서명 진행 사항</ContractSignTitle>
            <ContractSignBody>
              <ContractSignStatus>
                <ContractSignPerson>학생</ContractSignPerson>
                <Button>{contractInfo.contract.studentSign ? '서명 완료' : '서명 미완'}</Button>
              </ContractSignStatus>
              <ContractSignStatus>
                <ContractSignPerson>노인</ContractSignPerson>
                <Button>{contractInfo.contract.hostSign ? '서명 완료' : '서명 미완'}</Button>
              </ContractSignStatus>
            </ContractSignBody>
            <IsContractSigned>
              {role === 'USER' && !contractInfo.contract.studentSign && signModal()}
              {role === 'USER' && contractInfo.contract.studentSign && <Box>서명이 완료되었습니다.</Box>}
              {role === 'MANAGER' && !contractInfo.contract.hostSign && signModal()}
              {role === 'MANAGER' && contractInfo.contract.hostSign && <Box>서명이 완료되었습니다.</Box>}
            </IsContractSigned>
          </ContractSignWrapper>
        </StyledEngineProvider>
      </Page>
      <Footer />
    </>
  );
};
const Title = styled.h2`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 20px;
`;
const Document = styled.div``;
const Page = styled.div`
  margin: 2em;
  .name {
    font-weight: bold;
  }
  .info {
    font-weight: bold;
    color: #e07068;
  }
  .MuiAccordionDetails span {
    white-space: nowrap;
  }
`;
const View = styled.div``;
const Text = styled.div`
  span {
    white-space: nowrap;
  }
`;
const Introduce = styled.div`
  text-align: center;
  padding-bottom: 2em;
`;
const Section = styled.div``;
const SectionTitle = styled.div``;
const HomeInfoWrapper = styled.div``;
const HomeInfoFirstCell = styled.div``;
const HomeInfoSecondCell = styled.div``;
const Cell = styled.div``;
const PersonInfoTable = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em 0;
`;
const RowWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Row = styled.div`
  border: 0.5px solid;
  flex-grow: 1;
  text-align: center;
`;
const ColumnOne = styled.div`
  border: 0.5px solid;
  flex-basis: 24%;
  text-align: center;
`;
const ContractSignWrapper = styled.div`
  text-align: center;
`;
const ContractSignBody = styled.div`
  display: flex;
  justify-content: space-around;
`;
const ContractSignTitle = styled.div`
  padding: 1em 0 0;
`;
const ContractSignStatus = styled.div`
  padding: 0.5em;
`;
const ContractSignPerson = styled.div`
  padding: 0.5em 0;
`;
const ContractContentWrapper = styled.div`
  padding: 0.5em 0;
`;
const ContractContentTitle = styled.div`
  font-weight: bold;
  padding: 0.5em 0;
`;
const IsContractSigned = styled.div``;
const SignModal = styled.div``;

export default ContractForm;
