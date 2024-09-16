import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
import Layout2 from './Layout2.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.jsx'
import RegLog from './routes/RegLog.jsx'
import VerifyUser from './routes/VerifyUser.jsx'
import Profile from './routes/Profile.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import Learning from './routes/Learning.jsx'


const router = createBrowserRouter([
  {
    path:"",
    element:<Layout2/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path: "/Register-Login",
        element: <RegLog />,
      },
      {
        path: "/verify-user",
        element: <VerifyUser />
      },
    ]
  },
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path:"/Learning",
        element:<Learning/>
      },
      {
        path:"/profile",
        element:<Profile/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
