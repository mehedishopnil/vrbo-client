import { createBrowserRouter } from "react-router";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import HostingDashboard from "../pages/HostingDashboard/HostingDashboard";
import List from "daisyui/components/list";
import Earnings from "../pages/Earnings/Earnings";
import Reservations from "../pages/Reservations/Reservations";
import IndividualEarnings from "../components/IndividualEarnings/IndividualEarnings";
import Listings from "../pages/Listings/Listings";
import Resorts from "../pages/Resorts/Resorts";


export const router = createBrowserRouter([
     {
          path: '/',
          element: <Main/>,
          children: [
               {
                    path: '/',
                    element: <Home/>
               },
               {
                    path: '/login',
                    element: <Login/>
               },
               {
                    path: '/registration',
                    element: <Registration/>
               },
               {
                    path: '/resorts',
                    element: <Resorts/>
               }
          ]
     },

     {
          path: 'hosting-dashboard',
          element: <HostingDashboard/>,
          children: [
               {
                    path: 'earnings',
                    element: <Earnings/>
               },
               {
                    path: 'individual-earnings/:id',
                    element: <IndividualEarnings/>
               },
               {
                    path: 'reservation',
                    element: <Reservations/>
               },
               {
                    path: 'listings',
                    element: <Listings/>
               }
          ]
     }
])