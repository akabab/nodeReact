import React, { Component } from 'react';
import Gift from './Gift';
import logo from './logo.png';
import './App.css';
import * as api from './api'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gifts: []
    };

    this.refreshGifts = gifts => this.setState({ gifts })
    this.handleSubmit = this.handleSubmit.bind(this);
    this.notify = this.notify.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const { value: gift } = event.target[0]

    if (!gift) { return }

    api.add(gift)
      .then(this.refreshGifts).catch(console.error)
  }

  notify() {
    const elem = document.getElementById('notify')
    elem.style.borderColor = 'grey'
    api.notify()
      .then(status => {
        elem.style.borderColor = status === 'ok' ? 'green' : 'red'
      })
      .catch(console.error)
  }

  componentDidMount() {
    api.get().then(this.refreshGifts).catch(console.error)
  }

  render() {
    const gifts = this.state.gifts.map((gift, index) =>
      <Gift key={index} name={gift} remove={() => api.remove(index)
        .then(this.refreshGifts).catch(console.error)} />
    )

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">It's Christmas !</h1>
        </header>

        <img src="https://media.giphy.com/media/JltOMwYmi0VrO/giphy.gif" alt="" />

        <form onSubmit={this.handleSubmit}>
          <input type="text" />
          <button type="submit"> Ajouter </button>
        </form>

        <div className="GiftWrapper">
          {gifts}
        </div>

        <button id="notify" type="button" className="mail" onClick={this.notify}>
          Dear Santa Florian, send me my gifts
        </button>

      </div>
    );
  }
}

export default App;
