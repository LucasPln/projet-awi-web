import React, { Component } from "react";
import { connect } from 'react-redux';


class Navbar extends Component{

    render(){
        return (
            <nav>
                <ol>
                    <li>Logo</li>
                    <li>Equal Report</li>
                    <li>Pseudo</li>
                    <li>Logo My Profile</li>
                    <li>Logo login</li>
                </ol>
            </nav>
        )
    }
}
const mapStateToProps = state => ({
    
})


export default connect(mapStateToProps, {})(Navbar)