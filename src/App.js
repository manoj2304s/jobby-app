import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './component/Home'
import Jobs from './component/Jobs'
import Login from './component/Login'
import ProtectedRoute from './component/ProtectedRoute'
import JobsWithDetails from './component/JobsWithDetails'
import NotFound from './component/NotFound'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobsWithDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
