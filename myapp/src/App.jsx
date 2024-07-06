import './App.scss';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";

import Home from "./pages/Home/Home"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";



function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
        
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
