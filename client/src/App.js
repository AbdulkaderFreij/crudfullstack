import React, { Component } from "react";
import "./App.css";
import Userslist from "./Components/Userslist";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      username: "",
      password: "",
      editing: false,
      editingIndex: -1
    };
  }

  async componentDidMount() {
    fetch("/users")
      .then(res => res.json())
      .then(users =>
        this.setState({ users }, () => console.log("users fetched..", users))
      );
  }

  username = e => {
    e.preventDefault();
    this.setState({ username: e.target.value });
  };
  password = e => {
    e.preventDefault();
    this.setState({ password: e.target.value });
  };

  addUser() {
    let newList = this.state.users;
    if (this.state.password === "" || this.state.username === "") {
      return "error";
    }

    fetch(
      `/users/add?id=${this.state.id}&username=${this.state.username}&password=${this.state.password}`
    )
      .then(res => res.json())
      .then(users => {
        newList.push(users);
        this.setState({ users: newList, username: "", password: "" });
      });
  }

  deleteItem(id) {
    let arr = this.state.users;
    const result = arr.filter(user => user.id !== id);

    fetch(`/users/delete/${id}`)
      .then(res => res.json())
      .then(users => {
        this.setState({ users: result });
      });
  }

  editItem = id => {
    const user = this.state.users.find(user => user.id === id);
    this.setState({
      editing: true,
      username: user.username,
      editingIndex: id
    });
  };

  updateItem = async () => {
    const res = await fetch(
      `/users/update/${this.state.editingIndex}?username=${this.state.username}&password=${this.state.password}`
    );
    const users = await res.json();

    this.setState({
      users: this.state.users.map(user =>
        user.id === this.state.editingIndex
          ? { ...user, username: this.state.username }
          : user
      ),
      editing: false,
      username: "",
      password: ""
    });
  };

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
            onChange={e => this.username(e)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={this.state.password}
            onChange={e => this.password(e)}
          />
          <input
            type="submit"
            value={this.state.editing ? "Update" : "Add"}
            onClick={
              this.state.editing ? e => this.updateItem() : e => this.addUser()
            }
          />
          <ul>
            {this.state.users.map((user, index) => {
              return (
                // <li key={index}>
                //   {user.id}- {user.username}
                //   <button type="button" onClick={() => this.deleteItem(user.id)}>delete</button>
                //   <button type="button" onClick={()=>this.editItem(user.id)}>edit</button>
                // </li>
                <Userslist
                  key={index}
                  id={index}
                  value={user}
                  deleteItem={this.deleteItem}
                  editItem={this.editItem}
                />
              );
            })}
          </ul>
        </form>
      </>
    );
  }
}

export default App;
