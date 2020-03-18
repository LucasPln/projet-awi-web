import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { IoIosAddCircle } from 'react-icons/io'
import PostAdmin from './PostAdmin'
import { Link } from "react-router-dom"
import FlipMove from 'react-flip-move'

class PostList extends Component {

    sortList = (a, b) => {
        if (this.props.filter.type === 'date') {
            if (a.dateCreation === b.dateCreation) return a.texte > b.texte
            return this.props.filter.directionDate ? (a.dateCreation < b.dateCreation ? 1 : -1) : (a.dateCreation > b.dateCreation ? 1 : -1)
        } else if (this.props.filter.type === 'like') {
            if (this.props.adminView) {
                if (a.signaler.length === b.signaler.length) return a.texte > b.texte
                return this.props.filter.directionLike ? (a.signaler.length < b.signaler.length ? 1 : -1) : (a.signaler.length > b.signaler.length ? 1 : -1)
            }
            else {
                if (a.reactions.length === b.reactions.length) return a.texte > b.texte
                return this.props.filter.directionLike ? (a.reactions.length < b.reactions.length ? 1 : -1) : (a.reactions.length > b.reactions.length ? 1 : -1)
            }
        }
    }

    filterList = (post) => {
        if (post.texte.toLowerCase().indexOf(this.props.searchValue.toLowerCase()) !== -1 || post.createur.pseudo.toLowerCase().indexOf(this.props.searchValue.toLowerCase()) !== -1)
            return true
        return false
    }

    populateList = () => {
        let posts = this.props.posts
        if (this.props.searchValue === '') {
            posts = posts.sort(this.sortList)
        } else {
            posts = posts.filter(this.filterList)
            if (posts.length === 0) return <span id="aucun-res">Aucun résultat</span>
        }
        return posts.map(p => this.props.adminView && this.props.loggedIn ? <div key={p._id}><PostAdmin post={p} key={p._id}/></div> : <div key={p._id}><Post post={ p } key={ p._id } postView={ false } /></div>)
    }

    render() {
        return (
            <div id="post-list">

                <div id="post-spacer"></div>
                { this.props.loggedIn ? <Link to={ { pathname: '/texteform', state: { type: 'create' } } } id="post-write-btn"><IoIosAddCircle /></Link> : '' }
                <FlipMove duration={500} easing={'ease-in-out'} staggerDelayBy={10} staggerDurationBy={30}>
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
    searchValue: state.app.searchValue
})


export default connect(mapStateToProps, {})(PostList);