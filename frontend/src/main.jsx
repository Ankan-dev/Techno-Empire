import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layouts/Layout.jsx'
import Layout2 from './Layouts/Layout2.jsx'
import TeacherLayout from './Layouts/TeacherLayout.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.jsx'
import RegLog from './routes/RegLog.jsx'
import VerifyUser from './routes/VerifyUser.jsx'
import Profile from './routes/Profile.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import Learning from './routes/Learning.jsx'
import TeacherHome from './routes/TeacherHome.jsx'

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
  },
  {
    path:"",
    element:<TeacherLayout/>,
    children:[
      {
        path:"/Educator",
        element:<TeacherHome/>
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
