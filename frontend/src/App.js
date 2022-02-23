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
    const user1 = {
        username: "shaggy", email: "shaggyaxel@mail.ru",
        firstName: "Ruslan", lastName: "Korneev"
    }
    const user2 = {
        username: "dia_di", email: "dianakim@mail.ru",
        firstName: "Diana", lastName: "Pavlova"
    }
    const users = [user1, user2]

    const project1 = {
      contributors: users,
      title: "todo-list",
      repository: "https://github.com/shaggy-axel/todo-list/"
    }
    const projects = [project1]
  
    const issue1 = {
        title: "some issue",
        description: "some description",
        project: project1,
        isOpen: true,
        assignees: [user1],
        labels: []
    }
    const issues = [issue1]

    this.state = {
      users: users,
      projects: projects,
      issues: issues
    };
  };

  // componentDidMount() {
  //   axios.get(`${BASE_URL}api/users/`).then(response => {
  //     this.setState({"users": response.data.results})
  //     console.log(response.data)
  //     console.log(response.data.results)
  //   }).catch(error => console.log(error))
  // };

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
