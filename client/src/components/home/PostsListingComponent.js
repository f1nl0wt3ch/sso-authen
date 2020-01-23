import React, { Component } from 'react'
import PostComponent from './PostComponent'
import { Grid } from '@material-ui/core'
import CircularIndeterminate from '../CircularIndeterminate'

export default class PostsListingComponent extends Component {
  constructor() {
     super()
     this.state = {
        posts: [],
        isLoading: false
     }
  }

  componentDidMount(){
     this.setState({ isLoading: true })
     fetch('/api/posts')
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
        { this.state.posts.map( (post,index) => (
            <PostComponent key={index} post={post} />
        ))}
        </Grid>
      </div>
      )
   }
}
