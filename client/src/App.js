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

      
      </Routes>
      </div>
  );
}

export default App;
