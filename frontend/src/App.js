import axios from 'axios';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import ResponsiveAppBar from './components/NavBar';

import UserList from './components/User';
import ProjectList from './components/Project';
import IssueList from './components/Issue';
import Login from './components/Login';


const BASE_URL = "http://127.0.0.1:8000/api/"

const pageNotFound404 = ({location}) => {
  return (
    <div>404 Error. Page '{location.pathname}' was not found</div>
  )
}

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      users: [],
      projects: [],
      issues: []
    };
  };

  componentDidMount() {
    axios.get(`${BASE_URL}users/`).then(response => {
      this.setState({"users": response.data.results})
    }).catch(error => console.log(error))

    axios.get(`${BASE_URL}projects/`).then(response => {
      this.setState({"projects": response.data.results})
    }).catch(error => console.log(error))

    axios.get(`${BASE_URL}issues/`).then(response => {
      this.setState({"issues": response.data.results})
    }).catch(error => console.log(error))
  };

  render() {
    return (
      <div className={'App'}>
        <BrowserRouter>
        <ResponsiveAppBar/>
          <Routes>
            <Route path={'/'}
              element={<UserList users={this.state.users}/>}/>
            <Route path={'/projects/'}
              element={<ProjectList projects={this.state.projects}/>}/>
            <Route path={'/issues/'}
              element={<IssueList issues={this.state.issues}/>}/>
            <Route path={'/login/'}
              element={<Login/>}/>
            <Route element={pageNotFound404}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  };
};

export default App;
