import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Layout from './components/Layout'
import EventList from './components/EventList'
import EventDetail from './components/EventDetail'
import './css/App.css'

// Configurar Apollo Client para GraphQL
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/evento/:id" element={<EventDetail />} />
          </Routes>
        </Layout>
      </Router>
    </ApolloProvider>
  )
}

export default App
