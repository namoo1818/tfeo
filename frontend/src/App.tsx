import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyInfo from './pages/MyInfo';
import ApplyList from './pages/ApplyList';
import ActivityCertification from './pages/ActivityCertification';
import ActivityContent from './pages/ActivityContent';
import ActivityReview from './pages/ActivityReview';
import MakeActivity from './pages/MakeActivity';
import FindHouse from './pages/FindHouse';
import Contract from './pages/contract/Contract';
import ContractForm from './pages/contract/ContractForm';
import './styles/App.css';
import Survey from './pages/Survey';
import ContractApplyButton from './components/contract/ContractApplyButton';
import HomeDetail from './pages/HomeDetail';
import LoginPage from './pages/Login';
import WishList from './pages/WishList';
import ManageStudent from './pages/manager/ManageStudent';
import HomeSmallDetail from './pages/HomeSmallDetail';

import ManagerHome from './pages/manager/ManagerHome';
import ManageActivity from './pages/manager/ManageActivity';
import ManageList from './pages/manager/ManageList';
import ManageStudentDetail from './pages/manager/ManageStudentDetail';
import ManageContract from './pages/manager/ManageContract';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/my-info" element={<MyInfo />} />
          <Route path="/apply-list" element={<ApplyList />} />
          <Route path="/activity-certification" element={<ActivityCertification />} />
          <Route path="/activity-content" element={<ActivityContent />} />
          <Route path="/activity-review" element={<ActivityReview />} />
          <Route path="/make-activity" element={<MakeActivity />} />
          <Route path="/find-house" element={<FindHouse />} />
          <Route path="/home-detail" element={<HomeDetail />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/contract-form" element={<ContractForm />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/home" element={<Home />} />
          {/* ... 여기에 더 많은 라우트를 추가할 수 있습니다 ... */}
          <Route path="/contract-test" element={<ContractApplyButton />} />
          <Route path="/wish-list" element={<WishList />} />
          {/*<Route path="/wish-list" element={<Survey />} />*/}
          <Route path="/home-small-detail" element={<HomeSmallDetail />} />
          {/* 관리자 페이지 추가 */}
          <Route path="/manage-home" element={<ManagerHome />} />
          <Route path="/manage-student" element={<ManageStudent />} />
          <Route path="/manage-activity" element={<ManageActivity />} />
          <Route path="/manage-list" element={<ManageList />} />
          <Route path="/manage-student-detail" element={<ManageStudentDetail />} />
          <Route path="/manage-contract" element={<ManageContract />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
