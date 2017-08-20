# Richelieu

Centralized state for React apps ⚜️

**This is an alpha project, not ready for production use**

## Goals

- Facilitate exchange of information between components by providing a global store and means to update it
- Provide a developer-friendly API that plays nicely with plain Javascript functions and Promises

## Example

<img width="893" alt="screen shot 2017-08-19 at 11 42 17 pm" src="https://user-images.githubusercontent.com/1571667/29492673-3a7987aa-8538-11e7-96bb-43f536031973.png">

**App.js** The top-level component imports `StateProvider` which sets up the global store

```jsx
import React, { Component } from "react"
import { StateProvider } from "richilieu" // ◀
import Contents from "./Contents"

class App extends Component {

  render() {
    return (
      <StateProvider>
        <Contents />
      </StateProvider>
    )
  }
}
export default App
```

**Contents.js** Intermediate components are not aware of the store

```jsx
import React from "react"
import { withState } from "richilieu" // ◀
import InnerContent from "./InnerContent"

class Contents extends Component {
  render() {
    return <Inner />
  }
}
export default Contents
```

**InnerContent.js** Deeper in the tree, the InnerContent component connects to the restore and receives the store's state as props, as well as the `put` function to change the store

```jsx
import React from "react"
import { withState } from "richilieu"

const InnerContent = props => {
  window.setTimeout(async () => {
    const partialState = {
      ticker: 1 + props.ticker || 0,
    }
    const newStore = await props.put(partialState) // ◀
    console.log("newStore: ", newStore)
  }, 2000)
  return (
    <div>
      {JSON.stringify(props)}
    </div>
  )
}

InnerContent.displayName = InnerContent

export default withState(InnerContent)
```

## API

##### `<StoreProvider>` 

Provides store via `context` to `withState` wrappers

##### `withState()`

```jsx
withState(MyComponent)
```

A function that returns a new component that receives each key in the store as a prop, as well as the `put` function. 

Extension Point: The wrapped component can implement `shouldComponentUpdate` to ignore changes to certain parts of the store

Possible Future API: The component returned by `withState` may take a prop to subscribe only to a certain key or "slice" of store state

##### `put(partialState)`

Components connected to the store receive a `put` prop that they can call to change the global state. This has the same API as `setState` (it's calling setState in the StoreProvider) but instead taking a second callback argument, it returns a Promise that resolves with the new state. In most cases the resolved value will not be needed because the component will receive the new state as props.

```jsx
fetch('/logout')
  .then(res => props.put({
    user: {
      loggedIn: false 
    }
  })
  .catch(err => {
    props.put({
      errors: props.errors.concat([err])
    })
  })
```

## Differences from Redux/Flux/MobX

- No action creators, no reducers, no dispatcher; update batching is managed by React's setState

## Developing

- `npm run transpile` Starts babel watcher, suitable for developing against a local project that can resolve package.json's `module` field
- `npm run build` Bundles the library with Webpack