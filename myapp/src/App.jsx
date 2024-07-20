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
          path:"/BoatDetail",
          element:<BoatPage/>
        }
      
        
   
       
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;



/**import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
**/
