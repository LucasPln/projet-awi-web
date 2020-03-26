import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import PostAdmin from './PostAdmin'
import User from './User'
import { IoIosAddCircle } from 'react-icons/io'
import { Link } from "react-router-dom"
import FlipMove from 'react-flip-move'

class PostList extends Component {

    sortList = (a, b) => {
        if (this.props.filter.type === 'date') {
            if (this.props.adminUserView && this.props.adminView) 
                return this.props.filter.directionDate ? (a.pseudo.toLowerCase() > b.pseudo.toLowerCase() ? 1 : -1) : (a.pseudo.toLowerCase() < b.pseudo.toLowerCase() ? 1 : -1)
            else {
                if (a.dateCreation === b.dateCreation) return a.texte > b.texte
                return this.props.filter.directionDate ? (a.dateCreation < b.dateCreation ? 1 : -1) : (a.dateCreation > b.dateCreation ? 1 : -1)
            }
        } else if (this.props.filter.type === 'like') {
            if (this.props.adminView) {
                if (this.props.adminUserView) {
                    if (a.numSignaler === b.numSignaler) return a.pseudo.toLowerCase() > b.pseudo.toLowerCase() ? 1 : -1
                    return this.props.filter.directionLike ? (a.numSignaler < b.numSignaler ? 1 : -1) : (a.numSignaler > b.numSignaler ? 1 : -1)
                }
                else {
                    if (a.signaler.length === b.signaler.length) return a.texte > b.texte
                    return this.props.filter.directionLike ? (a.signaler.length < b.signaler.length ? 1 : -1) : (a.signaler.length > b.signaler.length ? 1 : -1)
                }
            }
            else {
                if (a.reactions.length === b.reactions.length) return a.texte > b.texte
                return this.props.filter.directionLike ? (a.reactions.length < b.reactions.length ? 1 : -1) : (a.reactions.length > b.reactions.length ? 1 : -1)
            }
        }
    }

    filterList = (data) => {
        if (this.props.adminUserView) {
            if (data.pseudo.toLowerCase().indexOf(this.props.searchValue.toLowerCase()) !== -1 || data.email.toLowerCase().indexOf(this.props.searchValue.toLowerCase()) !== -1)
            return true
        }
        else if (data.texte.toLowerCase().indexOf(this.props.searchValue.toLowerCase()) !== -1 || data.createur.pseudo.toLowerCase().indexOf(this.props.searchValue.toLowerCase()) !== -1)
            return true
        return false
    }

    populateList = () => {
        let data = this.props.adminView && this.props.adminUserView && this.props.loggedIn ? this.props.users : this.props.posts
        if (this.props.searchValue === '') {
            data = data.sort(this.sortList)
        } else {
            data = data.filter(this.filterList)
            if (data.length === 0) return <span id="aucun-res">Aucun résultat</span>
        }

        return data.map(d => this.props.adminView && this.props.loggedIn
            ? this.props.adminUserView
                ? <div key={ d._id }><User user={d} /></div>
                : <div key={ d._id }><PostAdmin post={ d } key={ d._id } /></div>
            : <div key={ d._id }><Post post={ d } key={ d._id } postView={ false } /></div>)
    }

    render() {
        let waiting = this.props.waiting ? { opacity: 1 } : { opacity: 0 }
        
        return (
            <div id="post-list">
                <span className="state-waiting" id="post-list-state-waiting" style={waiting}></span>
                <div id="post-spacer"></div>
                { this.props.loggedIn && !this.props.adminView ? <Link to={ { pathname: '/texteform', state: { type: 'create' } } } id="post-write-btn"><IoIosAddCircle /></Link> : '' }
                <FlipMove duration={500} easing={'ease-in-out'} staggerDelayBy={10} staggerDurationBy={20}>
                    { this.populateList() }
                </FlipMove>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.app.posts,
    loggedIn: state.auth.loggedIn,
    adminView: state.app.adminView,
    filter: state.app.filter,
    searchValue: state.app.searchValue,
    waiting: state.auth.waiting,
    adminUserView: state.app.adminUserView,
    users: state.app.users
})


export default connect(mapStateToProps)(PostList);