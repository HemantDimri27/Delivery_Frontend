import React, {createContext, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import Home from './components/Home'

import AllUsers from './components/user/AllUsers'
import CreateUser from './components/user/CreateUser'
import DeleteUser from './components/user/DeleteUser'
import LoginUser from './components/user/LoginUser'
import UpdateUser from './components/user/UpdateUser'

import AllInventory from './components/inventory/AllInventory'
import CreateInventory from './components/inventory/CreateInventory'
import DeleteInventory from './components/inventory/DeleteInventory'
import UpdateInventory from './components/inventory/UpdateInventory'






export const DataContext = createContext();


function App() {
  const [data, setData] = useState(null); //1.blog, 2.user

  return (
    <DataContext.Provider value={{data, setData}}>
      <Router>
        <div>
          <Routes>
            
            <Route path="/" element={<Home />} />


            <Route path="/AllUsers" element={<AllUsers />} />
            <Route path="/AllUsers" element={<AllUsers />} />
            <Route path="/CreateUser" element={<CreateUser />} />
            <Route path="/DeleteUser" element={<DeleteUser />} />
            <Route path="/LoginUser" element={<LoginUser />} />
            <Route path="/UpdateUser" element={<UpdateUser />} />



            <Route path="/AllInventory" element={<AllInventory />} />
            <Route path="/CreateInventory" element={<CreateInventory />} />
            <Route path="/DeleteInventory" element={<DeleteInventory />} />
            <Route path="/UpdateInventory" element={<UpdateInventory />} />
            
          </Routes>
        </div>
      </Router>
    </DataContext.Provider>
  );
}

export default App;

