import { Navigate, useRoutes } from 'react-router-dom';
import { FirebaseAuthConsumer } from '@react-firebase/auth';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
// import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Museum from './pages/Museum';
import ARModel from './pages/Armodel';
import TargetImage from './pages/TargetImage';

import { isUserAdmin } from './pages/request/account';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <PrivateRoute component={Navigate} to="/dashboard/app" replace /> },
        { path: 'app', element: <PrivateRoute component={DashboardApp} /> },
        { path: 'user', element: <PrivateRoute component={User} /> },
        { path: 'blog', element: <PrivateRoute component={Blog} /> },
        { path: 'museums', element: <PrivateRoute component={Museum} /> },
        { path: 'ar-models', element: <PrivateRoute component={ARModel} /> },
        { path: 'target-images', element: <PrivateRoute component={TargetImage} /> },
        { path: 'users', element: <PrivateRoute component={User} /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// eslint-disable-next-line react/prop-types
function PrivateRoute({ component: Component, ...rest }) {
  // if (!localStorage.getItem('access-token')) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user }) => {
        if (isSignedIn) {
          isUserAdmin(user.email).then((res) => {
            console.log('isAdmin', res);
          });
          return <Component {...rest} />;
        }

        return <Navigate to="/login" />;
      }}
    </FirebaseAuthConsumer>
  );
}
