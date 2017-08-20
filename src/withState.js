import React from "react"
import PropTypes from "prop-types"

const withState = WrappedComponent => {
  const Wrapper = (props, context) => {
    return <WrappedComponent {...context.store} put={context.put} {...props} />
  }

  Wrapper.contextTypes = {
    store: PropTypes.object,
    put: PropTypes.func,
  }

  const wrappedName =
    WrappedComponent.displayName || WrappedComponent.name || "Anonymous"

  Wrapper.displayName = `withState(${wrappedName})`

  return Wrapper
}

export default withState
