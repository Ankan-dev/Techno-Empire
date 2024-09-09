import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
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
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path:"/Learning",
        element:<Learning/>
      },
      {
        path: "/Register-Login",
        element: <RegLog />,
        children: [

        ]
      },
      {
        path: "/verify-user",
        element: <VerifyUser />
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
