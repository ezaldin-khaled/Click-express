import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/layout/Layout'
import Routes from './components/layout/Routes'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App
