import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Routes from './components/layout/Routes'

function App() {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  )
}

export default App
