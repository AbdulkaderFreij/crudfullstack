import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      username: "",
      password: ""
    };
  }

  async componentDidMount() {
    fetch("/users")
      .then(res => res.json())
      .then(users =>
        this.setState({ users }, () =>
          console.log("users fetched..", users)
        )
      );
  }


  username(input){
    this.setState(
      {username:input}
    )
  }
  password(input){
    this.setState(
      {password:input}
    )
  }

  addUser(){
    let newList = this.state.users;
    if (this.state.password==='' || this.state.username===''){
      return "error";
    }
   
     fetch(
      `/users/add?id=${this.state.id}&username=${this.state.username}&password=${this.state.password}`
    )
      .then(res => res.json())
      .then(user => {
        newList.push(user);
        this.setState({ users: newList, username:'', password: ''})
      });
  }


  deleteItem(input){
    let arr=this.state.users;
    const result = arr.filter(user => user.id !== input);
    
    fetch(
      `/users/delete/${input}`
    )
      .then(res => res.json())
      .then(users => {
        this.setState({ users: result })
      });
  }


  render() {
    return (
      <>
        <h2>Customers</h2>
        <form
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Enter user name"
            value={this.state.username}
            onChange={e => this.username(e.target.value)} 
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={this.state.password}
            onChange={e=> this.password(e.target.value)} 
          />
          <button type="submit" onClick= {()=> this.addUser()}>
            Add
          </button>
          <ul>
            {this.state.users.map((user,id)=>(
              <li key={id}>
                {user.id}- {user.username}
                <button type="button" onClick={() => this.deleteItem(user.id)}>delete</button>
                <button type="button" onClick={()=>this.editItem(user.id)}>edit</button>
              </li>
            ))}
          </ul>
        </form>
      </>
    );
  }
}

export default App;
