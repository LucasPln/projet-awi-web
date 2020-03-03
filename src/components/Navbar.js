import React, { Component } from "react";
import { connect } from 'react-redux';


class Navbar extends Component{

    goToLogin(){
        
    }

    render(){
        return (
            <nav>
                <ol>
                    <li>Logo</li>
                    <li>Equal Report</li>
                    {this.props.loggedIn ? 
                    <div>
                        <li>Pseudo</li>
                        <li>Logo My Profile</li>
                    </div> : <li><a href="">Logo login</a></li>}
                    
                    
                </ol>
            </nav>
        )
    }
}
const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn
})


export default connect(mapStateToProps, {})(Navbar)