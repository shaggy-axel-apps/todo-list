import axios from 'axios';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Cookies from 'universal-cookie';

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
      cookies: new Cookies(),
      users: [],
      projects: [],
      issues: [],
      profile: {},
    };
  };

  getProfile() {
    const headers = this.getHeaders()
    axios.get('http://127.0.0.1:8000/api/profile/', {headers}).then(
        response => {
            console.log(response)
            this.setState({profile: response.data})
        }
    ).catch(error => {console.log(error.toString())})
  }

  tokenExists() {
    if (this.state.cookies.get('access')) {
      return true
    }
    return false
  }

  tokenExpired() {
    const token = this.state.cookies.get('access')
    axios.post(`${BASE_URL}token/verify/`, {token: token}).then(
      response => {
        const failed = "token_not_valid"
        if (response.data.code === failed) {
          console.log(failed)
          return true
        }
        return false
      }
    )
  }

  refreshToken() {
    const refresh = this.state.cookies.get("refresh")
    console.log("REFRESH", refresh)
    axios.post(`${BASE_URL}token/refresh/`, {refresh: refresh}).then(
      response => {
        this.state.cookies.set('access', response.data.access)
        this.state.cookies.set('refresh', refresh)
        if (response.status === 200) {
          window.location.reload()
        } else {
          alert(response.data.toString())
        }
      }
    ).catch(error => alert(error.toString()))
  }

  getHeaders() {
    let headers = {
        'Content-Type': 'application/json'
    }
    console.log(this.state.cookies.get("access"))
    if (this.tokenExists() && this.tokenExpired()) {
      this.refreshToken()
      headers['Authorization'] = `Bearer ${this.state.cookies.get("access")}`
    } else if (this.tokenExists()) {
      headers['Authorization'] = `Bearer ${this.state.cookies.get("access")}`
    }

    return headers
  }

  componentDidMount() {
    const headers = this.getHeaders()
    axios.get(`${BASE_URL}users/`, {headers}).then(response => {
      this.setState({"users": response.data.results})
    }).catch(error => console.log(error))

    axios.get(`${BASE_URL}projects/`, {headers}).then(response => {
      this.setState({"projects": response.data.results})
    }).catch(error => console.log(error))

    axios.get(`${BASE_URL}issues/`, {headers}).then(response => {
      this.setState({"issues": response.data.results})
    }).catch(error => console.log(error))

    this.getProfile()
  };

  render() {
    return (
      <div className={'App'}>
        <BrowserRouter>
        <ResponsiveAppBar profile={this.state.profile}/>
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
