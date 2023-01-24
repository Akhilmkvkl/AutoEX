 import  './app.css'
 import React from 'react'
import Homepage from './pages/User/Home/Homepage';
 import { Route,Routes } from 'react-router-dom';
import Authpage from './pages/User/AuthPage/Authpage.jsx';
// import ActivateEmail  from './components/User/Auth/ActivateEmail.jsx'
import Mailactivation from './pages/User/Mailactivation/Mailactivation';
import Admin_Login from '../src/components/Admin/Admin_login/Admin_login.jsx';
import NewsPage from './pages/User/News/NewsPage';
import VehiclesPage from './pages/User/Vehicles/VehiclesPage';
import CommunityPage from './pages/User/Communities/CommunityPage';
import ExpertPage from './pages/User/Experts/ExpertPage';
import VehicleViewPage from './pages/User/VehicleView/VehicleViewPage';
import ViewNewspage from './pages/User/News/ViewNewspage';
import AdminHomepage from  './pages/Admin/Home/AdminHomepage.jsx'
import UserManagement from './pages/Admin/UserManagement/UserManagement';
import NewsManagement from './pages/Admin/NewsManagement/NewsManagement';
import AdminAddnewsManagement from './pages/Admin/NewsManagement/AdminAddnews';
import VehicleManagement from './pages/Admin/VehicleManagement/VehicleManagement';
import AddVehicle from './components/Admin/AdminVehicles/AddVehicle';
import Communitymanagement from './pages/Admin/CommunityManagement/Communitymanagement';
import Expertsmanagement from './pages/Admin/ExxpertsManagement/Expertsmanagement';
import ApplyExperts from './components/User/Experts/ApplyExperts';
import Forgot from './components/User/Auth/Forgot';
import SuccessPage from './pages/User/SuccessPage/SuccessPage';
import FailedPage from './pages/User/FailedPage/FailedPage';
import Chatpage from './pages/User/Chatpage/Chatpage';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Homepage/>}  ></Route>
      <Route path='/auth' element={<Authpage/>}></Route>
      <Route path='/users/activate/:activation_Token' element={<Mailactivation/>}></Route>
      <Route path='/admin' element={<Admin_Login/>}></Route>
      <Route path='/admin' element={<Admin_Login/>}></Route>
      <Route path='/news' element={<NewsPage/>}></Route>
      <Route path='/vehicles' element={<VehiclesPage/>}></Route>
      <Route path='/communities' element={<CommunityPage/>}></Route>
      <Route path='/experts' element={<ExpertPage/>}></Route>
      <Route path='/VehicleView' element={<VehicleViewPage/>}></Route>
      <Route path='/ViewNews' element={<ViewNewspage/>}></Route>
      <Route path='/Admin-home' element={<AdminHomepage/>}></Route>
      <Route path='/Admin-Users' element={<UserManagement/>}></Route>
      <Route path='/Admin-news' element={<NewsManagement/>}></Route>
      <Route path='/Admin-Addnews' element={<AdminAddnewsManagement/>}></Route>
      <Route path='/Admin-Vehicles' element={<VehicleManagement/>}></Route>
      <Route path='/AddVehicle' element={<AddVehicle/>}></Route>
      <Route path='/Admin-Community' element={<Communitymanagement/>}></Route>
      <Route path='Admin-Experts' element={<Expertsmanagement/>}></Route>
      <Route path='/applyexpert' element={<ApplyExperts/>}></Route>
      <Route path='/forgott' element={<Forgot/>}></Route>
      <Route path='/payment-succes' element={<SuccessPage/>}></Route>
      <Route path='/payment-failed' element={<FailedPage/>}></Route>
      <Route path='/chat' element={<Chatpage/>}></Route>






           

      
      </Routes>
      </div>
  );
}

export default App;
