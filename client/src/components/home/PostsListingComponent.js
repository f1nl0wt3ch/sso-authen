import React, { Component } from 'react'
import PostComponent from './PostComponent'
import { Grid } from '@material-ui/core'
import CircularIndeterminate from '../CircularIndeterminate'

export default class PostsListingComponent extends Component {
  constructor(props) {
     super(props)
     this.state = {
        posts: [],
        isLoading: false,
        token: this.props.token
     }
  }

  componentDidMount(){
     this.setState({ 
        isLoading: true
     })
     fetch('/api/posts',{
        method: "GET",
        headers: {
           "x-access-token": this.state.token
        }
     })
     .then(rawData => rawData.json())
     .then(jsonData => {
        console.log(`Fetching all posts...${JSON.stringify(jsonData)}`)
        this.setState({
           posts: jsonData,
           isLoading: false
        })
     })
     .catch(err => console.log(err))
  }

  render() {
      return (this.state.isLoading)? (
        <div style={{ marginTop: 20, padding: 30 }} >
          <Grid container spacing={10} justify="center">
             <CircularIndeterminate />
          </Grid>
        </div>
      ) : (
        <div style={{ marginTop: 20, padding: 30 }} >
          <Grid container spacing={10} justify="center">
        { 
          (this.state.posts.length > 0)? this.state.posts.map( (post,index) => (
            <PostComponent key={index} post={post} />
          )) : ("")
        }
        </Grid>
      </div>
      )
   }
}
