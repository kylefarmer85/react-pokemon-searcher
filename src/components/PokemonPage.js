import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

const URL = "http://localhost:3000/pokemon"

class PokemonPage extends React.Component {
  constructor(){
    super()
    this.state = {
      pokemons: [],
      searchTerm: ''
    }
  }

  componentDidMount() {
    fetch(URL)
    .then(resp => resp.json())
    .then(pokemons => {
      this.setState({
        pokemons: pokemons
      })
    })
  }

  addPokemon = (poke) => {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: poke.name,
        hp: poke.hp,
        sprites: {
          front: poke.frontUrl,
          back: poke.backUrl
        }
      })
    })
    .then(resp => resp.json())
    .then(poke => {
      this.setState(prevState => {
        return {
          pokemons: [...prevState.pokemons, poke]
        }
      })
    })
  }

  onChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  render() {
    const desiredPokemon = this.state.pokemons.filter(p =>
      p.name.includes(this.state.searchTerm)
    )
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <Search onChange={this.onChange} />
        <br />
        <PokemonCollection pokemons={desiredPokemon} />
      </Container>
    )
  }
}

export default PokemonPage
