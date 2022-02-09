import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import './App.css';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import UserList from './components/User';


const BASE_URL = "http://127.0.0.1:8001/"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'users': []
    };
  };

  componentDidMount() {
    axios.get(`${BASE_URL}api/users/`).then(response => {
      this.setState({"users": response.data.results})
      console.log(response.data)
      console.log(response.data.results)
    }).catch(error => console.log(error))
  };

  render() {
    return (
      <div className='app'>
          <NavBar/>
          <UserList users={this.state.users}/>
          <Footer/>
      </div>
    );
  };
};

export default App;
