import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Toaster } from "react-hot-toast";

//Amanda
import Login from './component/IT21022388/UserLogin';
import AdminLogin from './component/IT21022388/AdminLogin';
import VolunteerRegister from './component/IT21022388/VolunteerRegister';
import AddEvent from './component/IT21022388/Event';
import UserViewEvent from './component/IT21022388/Event_User';
import AdminVolunteerView from './component/IT21022388/Admin_Volunteer_View';
import Certificate from './component/IT21022388/E_Certificate';

//Methmal
import Home from './component/IT21003882/Home';
import KnowledgeBase from './component/IT21003882/Knowledge_Base';
import Donation from './component/IT21003882/Donation_Form';
import Admin_Donate from './component/IT21003882/Admin_Donate';
import UpdateDonate from './component/IT21003882/Update_Donate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Toaster position="top-center" reverseOrder={true} />
          <Routes>

                  <Route
                    path="/login"
                    element={<Login />}
                  /> 

                  <Route
                    path="/adminlogin"
                    element={<AdminLogin />}
                  /> 

                  <Route
                    path="/home/:id"
                    element={<Home />}
                  /> 

                  <Route
                    path="/volunteerReg/:id/:eventId"
                    element={<VolunteerRegister />}
                  /> 

                  <Route
                    path="/admin/event/:id"
                    element={<AddEvent />}
                  /> 

                  <Route
                    path="/event/:id"
                    element={<UserViewEvent />}
                  /> 

                  <Route
                    path="/admin/volanteer/:id"
                    element={<AdminVolunteerView />}
                  /> 

                  <Route
                    path="/certificate/:id/:eid"
                    element={<Certificate />}
                  /> 

                  <Route
                    path="/knowldge/:id"
                    element={<KnowledgeBase />}
                  /> 

                  <Route
                    path="/donation/:id"
                    element={<Donation />}
                  /> 

                  <Route
                    path="/admin/donation/:id"
                    element={<Admin_Donate />}
                  /> 

                  <Route
                    path="/admin/updatedonation/:id"
                    element={<UpdateDonate />}
                  /> 

          </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
