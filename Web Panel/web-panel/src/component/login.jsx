import React, { Component } from "react";
import axios from "axios";
class Login extends Component {
  email = React.createRef();
  password = React.createRef();
  state = {
    account: { email: "", password: "" },
  };
  componentDidMount(){
    const jwt=localStorage.getItem('jwt');
    if(jwt){
        this.props.history.push("/");
    }
  }

  handleChange = (obj) => {
    // console.log(obj.currentTarget.id);
    let input = obj.currentTarget.value;
    if (obj.currentTarget.id === "username") {
      let newAccount = { email: input, password: this.state.account.password };
      this.setState({ account: newAccount });
    } else if (obj.currentTarget.id === "password") {
      let newAccount = { email: this.state.account.email, password: input };
      this.setState({ account: newAccount });
    }
  };
   handleSubmit = (e) => {
    e.preventDefault();
    const proxyurl = "https://cors-anywhere.herokuapp.com/";// To get around CORS
    const url = "https://flipkart-sde.herokuapp.com/user/login";
    axios.post(
      proxyurl + url ,
      {
        email: this.state.account.email,
        password: this.state.account.password,
      }
    ).then(res=>{
    console.log(res);
      if (res.data.status === "Success Login") {
        localStorage.setItem('jwt',res.data.token);
        localStorage.setItem('user',JSON.stringify(res.data.user));
        this.props.history.push("/");
    }
    else{
        window.alert("Something went wrong, please check your credentials or connection");
    }
    }).catch(e=>{
      console.log(e);
    });
  };
  render() {
    return (
      <div class="splash-container">
        <div class="card ">
          <div class="card-header text-center">
            <img class="logo-img" src="../favicon.ico" alt="logo"></img>
            <span class="splash-description">
              Please enter your user information.
            </span>
          </div>
          <div class="card-body">
            <form onSubmit={this.handleSubmit}>
              <div class="form-group">
                <input
                  onChange={this.handleChange}
                  class="form-control form-control-lg"
                  id="username"
                  type="text"
                  placeholder="Username"
                  autocomplete="off"
                ></input>
              </div>
              <div class="form-group">
                <input
                  onChange={this.handleChange}
                  class="form-control form-control-lg"
                  id="password"
                  type="password"
                  placeholder="Password"
                ></input>
              </div>
              <button type="submit" class="btn btn-primary btn-lg btn-block">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
