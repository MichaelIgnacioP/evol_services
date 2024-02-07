import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import store from './store';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import AnimatedRoutes from 'hocs/routes/Routes';

function App() {
  return (
      <HelmetProvider>
        <Helmet>
          <title>Evol Services | Dashboard</title>
          <meta name="description" content="Agencia de software y marketing digital. Servicios de creacion de pagina web y desarrollo de aplicaciones." />
          <meta name="keywords" content='agencia de software, agencia de marketing, creacion de pagina web' />
          <meta name="robots" content='all' />
          <link rel="canonical" href="https://www.google.cl/" />
          <meta name="author" content='Evol Services' />
          <meta name="publisher" content='Evol Services' />

          {/* Social Media Tags */}
          <meta property="og:title" content='Evol Services| Dashboard' />
          <meta property="og:description" content='Servicios de creacion de pagina web y desarrollo de aplicaciones.' />
          <meta property="og:url" content="https://www.google.cl/" />
          <meta property="og:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />

          <meta name="twitter:title" content='Evol Services| Dashboard' />
          <meta
            name="twitter:description"
            content='ervicios de creacion de pagina web y desarrollo de aplicaciones.'
          />
          <meta name="twitter:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
        <Provider store={store}>
          <Router>

            <AnimatedRoutes />
          </Router>
        </Provider>
      </HelmetProvider>
  );
}

export default App;
