import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Post from './Post/Post';
import Header from './Header/Header';
import Compose from './Compose/Compose';


const baseUrl = "https://practiceapi.devmountain.com/api"

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios
      .get(baseUrl+"/posts")
      .then(response=>{
        this.setState({posts:response.data})
      })
    }

  updatePost(id,text) {
    axios
      .put(baseUrl+"/posts?id="+id,{text})
      .then(response=>{
        this.setState({posts: response.data})
      })
  }

  deletePost(id) {
    axios
      .delete(baseUrl+"/posts?id="+id)
      .then(response=>{
        this.setState({posts: response.data})
      })
  }

  createPost(text) {
    console.log(text)
    axios
      .post(baseUrl+"/posts", {text})
      .then(response=>{
        this.setState({posts: response.data})
      })
  }

  render() {
    const { posts } = this.state;
    let postList = posts.map(e=> (
      <Post key={e.id} 
      text={e.text} 
      date={e.date} 
      updatePostFn={this.updatePost} 
      id={e.id}
      deletePostFn={this.deletePost}
       />
    ))
      console.log(postList)
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose 
          createPostFn={this.createPost}
          />
            {postList}
              
                
          
            
          
        </section>
      </div>
    );
  }
}

export default App;
