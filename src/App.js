import React, { Component } from 'react'
import './App.css'
import Form from './composition/form/Form'


// Write a React app which allows users to search the 
// Star Wars API for a character name, and displays
//  the matching characters
// For example, a search for "Skywalker" should list
//  "Luke Skywalker", "Anakin Skywalker" and "Shmi Skywalker"
export default class App extends Component {

  state = {
    content: '',
    searchTerm: '',
    error: ''

  }

 
  updateSearchTerm = (e) => {
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value
    })
  }

  errMessage = (err) =>{
    this.setState({
      error: `${err} aka the name you entered was not found :(`
    })
  }
  submitHandle =(e) => {
    e.preventDefault();
    this.setState({
      content: '',
      error: ''
    })
    console.log('submit clicked', this.state.searchTerm)
    fetch(`https://swapi.co/api/people/?search=${this.state.searchTerm}`)
    .then(res => {
      if(!res.ok){
        throw new Error('something went wrong!')
      }
      return res;
      })
    .then(res => res.json())
    .then(data => this.updateContent(data))
    .catch((err) => {
      this.errMessage(err)
    })
  }

  updateContent = (data) => {
    
    if (data.results.length > 1) {
      let name = data.results.map(result => result.name  
      ).join(', ');
      this.setState({
        content: name
      })
    }
    else this.setState({
      content : data.results[0].name
    })
    
  }

  render() {
    console.log(this.state)
    return (
      <div className= 'App'>
        <Form 
        updateSearchTerm = {this.updateSearchTerm}
        submitHandle = {this.submitHandle}
        />
        <section>
          <p>{this.state.content}</p>
          <p>{this.state.error}</p>
        </section>
      </div>
    )
  }
}
