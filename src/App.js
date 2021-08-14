import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthProvider } from '@react-firebase/auth';

// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import config from './config';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <FirebaseAuthProvider firebase={firebase} {...config}>
        <ScrollToTop />
        <Router />
      </FirebaseAuthProvider>
    </ThemeConfig>
  );
}
