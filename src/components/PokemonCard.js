import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  constructor(){
    super() 
    this.state = {
      flip: true
    }
  }

  toggleImg = () => {
    this.setState(prevState => {
      return {
        flip: !prevState.flip
      }
    }) 
  }
  


  render() {
    const {id, name, hp} = this.props
    return (
      <Card>
        <div>
          <div className="image" onClick={this.toggleImg}>

          { this.state.flip ?
            <img src={this.props.sprites.front} alt="oh no!" />
            :
            <img src={this.props.sprites.back} alt="oh no!" />
          }

          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
