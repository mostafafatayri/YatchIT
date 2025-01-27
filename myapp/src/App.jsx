import './App.scss';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from './components/Navbar/Navbar';
import Home from "./pages/Home/Home"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Explore from './pages/Explore/Explore';
import Login from './pages/Login/Login';
import SignUp from './pages/Register/Signup';
import Profile from './pages/Profile/Profile';
import AddType from './pages/AddType/AddType';
//import AddBoat from './pages/AddBoat/AddBoat';
import AddBoat from "./pages/AddBoat/AddBoat";
import Additional from './pages/Register/AdditionInfo';
import VerifyEmail from "./pages/Register/VerifyEmail";
import BoatPage from './pages/BoatPage/BoatPage';
import Dotenv from 'dotenv';
import AddMarina from './pages/AddMarina/AddMarina';
import AddSeller from './pages/AddSeller/AddSeller';
import AddAdmin from './pages/AddAdmin/AddAdmin';
import Dashboard from './pages/Dashboard/Dashboard';
//Dotenv.config();
function App() {
  const queryClient = new QueryClient();
  
 
  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
       
     
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
       
        {
          path: "/",
          element: <Home />,
        },
        {
          path:"/explore",
          element:<Explore/>
        },{
          path:"/login",
          element:<Login/>
        },{
          path:"/registration",
          element:<SignUp/>
        },{
          path:"/myaccount",
          element:<Profile/>
        },{
          path:"/add",
          element:<AddType/>
        },{
          path:"/add/boat",
          element:<AddBoat/>
        },{
          path:"/registration/additional",
          element:<Additional/>
        },{
          path:"/verifyEmail",
          element:<VerifyEmail/>
        },{
          path:"/BoatDetail/:id",
          element:<BoatPage/>
        },{
          path:"/add/marina",
          element:<AddMarina/>
        },{
          path:"/add/seller",
          element:<AddSeller/>
        },{
          path:"/add/Admin",
          element:<AddAdmin/>
        },{
          path:"/dashboard",
          element:<Dashboard/>,
        }
      
        
   
       
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;



