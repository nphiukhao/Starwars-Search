import React, { Component } from 'react'

export default class Form extends Component {
    render() {
        return (
            <div>
                <form onSubmit={e => this.props.submitHandle(e)}>
                    <label htmlFor='seachBar'>
                        Search StarWars characters: 
                    </label>
                    <input className='searchBar' type='text' id='searchBar' name='searchBar'
                        onChange={e => this.props.updateSearchTerm(e)}>

                    </input>
                    <button type='submit'>Summon Search Force</button>
                </form>
                    
                
            </div>
        )
    }
}
