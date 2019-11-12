import React, { Component } from 'react';
import axios from 'axios';

export default class HomePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }
    
    componentDidMount() {
        console.log(this.props.location.state.username)
        const user = {
            username: this.props.location.state.username
        }
        axios.post('http://localhost:3001/users/getCurrentUser', user)
        .then(res => {
            return res.data.user
        })
        .then(data => {
            let users = data.map((u) => {
                return(
                    <div key={u.username}>
                        <h2><b><i>Welcome, {u.firstName} {u.lastName}</i></b></h2>
                    </div>
                )
            })
            this.setState({users: users})
        })
    }
        

    

  render() {
    return (
        <div> 
            <h1> HomePage</h1>
            {this.state.users}
            <h3>What do you want to do today? </h3>
            
        </div>
   
    );
  }
}
