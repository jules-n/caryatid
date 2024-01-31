import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/';
import Providers from './pages/providers/';
import Registration from './pages/registration';
import Profile from './pages/profile/user';
import ModeratorPanel from './pages/moderators/new';
import ModerCheck from './services/ModerCheck';
import Approves from './pages/moderators/approves';
import Initiatives from './pages/initiatives/list';
import InitiativeForm from './pages/initiatives/create';
import Initiative from './pages/initiatives/read';
import UserPage from './pages/profile/read';
import Applications from './pages/applications';
import UserListPage from './pages/users';
import Invitations from './pages/invitations';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/providers" element={<Providers />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/moderators' element={<ModerCheck ComponentToDisplay={ModeratorPanel} />} />
        <Route path='/approves' element={<ModerCheck ComponentToDisplay={Approves} />} />
        <Route path='/initiatives' element={<Initiatives/>} />
        <Route path='initiatives/create' element={<InitiativeForm/>}/>
        <Route path='/initiative/:id' element={<Initiative/>}/>
        <Route path='/user/:email' element={<UserPage/>}/>
        <Route path='/applications/:id' element={<Applications/>}/>
        <Route path='/users' element={<UserListPage/>}/>
        <Route path='/invitations' element={<Invitations/>}/>
      </Routes>
    </Router>
  );
}

export default App;