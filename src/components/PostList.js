import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { IoIosAddCircle } from 'react-icons/io'
import PostAdmin from './PostAdmin'
import { Link } from "react-router-dom"
import FlipMove from 'react-flip-move'

class PostList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            filter: {
                type: 'date',
                directionDate: true,
                directionLike: true
            }
        }
    }

    componentDidMount = () => {
        this.setState({opacity: 1})
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.filter !== this.props.filter) {
            setTimeout(() => this.setState({
                ...this.state,
                opacity: 1,
                filter: {
                    type: this.props.filter.type,
                    directionDate: this.props.filter.directionDate,
                    directionLike: this.props.filter.directionLike
                }
            }), 300)
        }
    }

    sortList = (a, b) => {
        if (this.state.filter.type === 'date') {
            if (a.dateCreation === b.dateCreation) return a.texte > b.texte
            return this.state.filter.directionDate ? a.dateCreation < b.dateCreation : a.dateCreation > b.dateCreation
        } else if (this.state.filter.type === 'like') {
            if (this.props.adminView) {
                if (a.signaler.length === b.signaler.length) return a.texte > b.texte
                return this.state.filter.directionLike ? a.signaler.length < b.signaler.length : a.signaler.length > b.signaler.length
            }
            else {
                if (a.reactions.length === b.reactions.length) return a.texte > b.texte
                return this.state.filter.directionLike ? a.reactions.length < b.reactions.length : a.reactions.length > b.reactions.length
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
                <FlipMove duration={500} easing={'ease-in-out'}>
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