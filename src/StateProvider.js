import React, { Component } from "react"
import PropTypes from "prop-types"

class StateProvider extends Component {
  state = {
    store: {},
  }

  getChildContext() {
    return {
      store: this.state.store,
      put: this.put,
    }
  }

  put = partialState => {
    return new Promise((resolve, reject) => {
      this.setState(
        {
          store: { ...this.state.store, ...partialState },
        },
        () => resolve(this.state.store)
      )
    })
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

StateProvider.childContextTypes = {
  store: PropTypes.object,
  put: PropTypes.func,
}

export default StateProvider
