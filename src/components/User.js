import React, { Component } from 'react'
import { connect } from 'react-redux'
import egg from '../globals/egg.jpg'
import { IoIosTrash } from 'react-icons/io'
import { toggleAdminUserView, updateSearch, toggleAdmin, deleteUser } from '../actions/appActions'
import { Link } from 'react-router-dom'

export class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAdmin: this.props.user.isAdmin
        }
    }

    componentDidUpdate = () => {
        if (this.state.isAdmin !== this.props.user.isAdmin)
            this.setState({
                ...this.state,
                isAdmin: this.props.user.isAdmin
            })
    }

    handleUserClick = () => {
        this.props.toggleAdminUserView();
        this.props.updateSearch(this.props.user.pseudo);
    }

    handleToggleAdmin = () => {
        this.setState({
            ...this.state,
            isAdmin: !this.state.isAdmin
        })
        this.props.toggleAdmin(this.props.user, this.props.token)
    }

    render() {
        let adminClass = this.props.user.isAdmin ? 'admin' : ''
        return (
            <div className="user-view">
                <div className="user-view-pseudo-div">
                    <img className="user-view-photo" src={ egg } alt="egg"></img>
                    <div className="user-view-pseudo-info-div">
                        <div className="user-view-action-div">
                            <span className={`user-view-admin-badge ${adminClass}`} onClick={this.handleToggleAdmin}>Admin</span>
                            <Link to={{ pathname: `/selectionform/${ this.props.user._id }`, state: {type: "supprimer", user: true, data: this.props.user} }} style={ { textDecoration: "none" } } className="user-view-supprimer" ><IoIosTrash /></Link>
                        </div>
                            <span className="user-view-pseudo" onClick={this.handleUserClick}>{ this.props.user.pseudo }</span>
                        <span className="user-view-email">{ this.props.user.email }</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token
})

const mapDispatchToProps = {
    toggleAdminUserView,
    updateSearch,
    toggleAdmin,
    deleteUser
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
