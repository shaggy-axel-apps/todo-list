import axios from 'axios';
import React from 'react';
import './App.css';

import UserList from './components/User';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'users': []
    };
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8001/api/users/").then(response => {
      this.setState({"users": response.data.results})
      console.log(response.data)
      console.log(response.data.results)
    }).catch(error => console.log(error))
  };

  render() {
    return (
      <div>
        <UserList users={this.state.users}/>
      </div>
    );
  };
};

export default App;
