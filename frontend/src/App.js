import axios from 'axios';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import UserList from './components/User';
import ProjectList from './components/Project';
import IssueList from './components/Issue';


const BASE_URL = "http://127.0.0.1:8000/"

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
    axios.get(`${BASE_URL}api/users/`).then(response => {
      this.setState({"users": response.data.results})
    }).catch(error => console.log(error))
    axios.get(`${BASE_URL}api/projects/`).then(response => {
      this.setState({"projects": response.data.results})
    }).catch(error => console.log(error))
    axios.get(`${BASE_URL}api/issues/`).then(response => {
      this.setState({"issues": response.data.results})
    }).catch(error => console.log(error))
  };

  render() {
    return (
      <div className={'App'}>
        <NavBar/>
          <BrowserRouter>
            <Routes>
              <Route path={'/'}
                element={<UserList users={this.state.users}/>}/>
              <Route path={'/projects/'}
                element={<ProjectList projects={this.state.projects}/>}/>
              <Route path={'/issues/'}
                element={<IssueList issues={this.state.issues}/>}/>
              <Route element={pageNotFound404}/>
            </Routes>
          </BrowserRouter>
        <Footer/>
      </div>
    );
  };
};

export default App;
