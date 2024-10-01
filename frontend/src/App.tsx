import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthPage from './components/AuthPage';
import Body from './components/Body';
import { createBrowserRouter ,Outlet,RouterProvider } from 'react-router-dom';
import ErrorElement from './components/ErrorElement';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import BlogPage from './components/BlogPage';
import Publish from './components/Publish';
import store from './Redux/store';
import { Provider } from 'react-redux';
const AppLayout : React.FC = ()=>{
    return (
       <Provider store={store}>
         <Header/>
         {/* <HeroSection/> */}
         <Outlet/>
         <Footer/>
       </Provider>
    )
}

const appRouter = createBrowserRouter([
    {
        path : '/',
        element : <Body/>,
        errorElement : <ErrorElement/>
    },
    {
        path : '/auth/:param',
        element : <Provider store={store}><AuthPage/></Provider> ,
    },
    {
        path : "/dashboard",
        element : <AppLayout/>,
        children : [
            {
                path : '/dashboard/',
                element : <HeroSection/>,
            },
            {
                path : '/dashboard/blog/:blogId',
                element : <BlogPage/>,
            },
            {
                path : '/dashboard/blog/publish',
                element : <Publish/>,
            }
        ]
    }
])


const rootElement = ReactDOM.createRoot(document.getElementById('root')!);

rootElement.render(<RouterProvider router={appRouter}/>);