# REACT DESIGN PATTERN PART - 3

> # React Reducer Pattern

### The React State Reducer Pattern is a pattern used to manage state in a more predictable and scalable way by centralizing state transitions into a single function called a reducer. This pattern is inspired by the Redux architecture but can be applied within a single component or context using React's useReducer hook. Here's a breakdown of the key concepts and how it works:

### Key Concepts:

> ### State: 
> The current state of a component or a part of the application. In the reducer pattern, state is often an object or a complex data structure.

> ### Action: 
> An object that describes a state transition. Actions typically have a type property (a string that defines the kind of action) and an optional payload property that carries data needed for the transition.

> ### Reducer:
> A pure function that takes the current state and an action as arguments and returns a new state. The reducer is the central place where all state changes are defined.

## How It Works

> ### Defining Initial State: 
> You start by defining the initial state of your component or feature. This can be a simple value or an object representing the state.

> ### Creating Actions: 
> Define actions that represent possible state transitions. These are usually represented as objects with a type and a payload.

> ### Implementing the Reducer:
> Write a reducer function that handles different action types. The reducer should be a pure function that does not mutate the current state but instead returns a new state based on the action received.

> ### Using useReducer Hook: 
> In a functional component, use the useReducer hook to integrate the reducer. useReducer takes the reducer function and the initial state as arguments and returns an array with the current state and a dispatch function.
```
Example

import React, { useReducer } from 'react';

// 1. Define the initial state
const initialState = { count: 0 };

// 2. Define the reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error('Unknown action type');
  }
}

// 3. Create a component using useReducer
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}

export default Counter;
```

## Benefits
> ### Predictable State Changes: 
>Since all state changes are centralized in the reducer, it's easier to predict and manage state transitions.

> ### Scalability: 
> The reducer pattern can handle complex state logic, making it suitable for large applications.

> ### Reusability: 
> The same reducer logic can be reused across different parts of an application or even across different projects.

> ### Testability: 
> Reducers are pure functions, making them easy to test independently of the UI.

## When to Use
- When a component's state logic is complex, involving multiple sub-values or interdependent state transitions.
- When you want a consistent approach to managing state across multiple components.
- When state transitions need to be handled in a predictable and centralized manner.
- The State Reducer Pattern provides a clear and structured way to manage state in React applications, making it a popular choice for developers looking to maintain clean and maintainable code.

> # Component Composition Pattern

### In React, component composition is a pattern where you build complex UIs by combining smaller, reusable components. It's a fundamental principle of React development, promoting code reusability, maintainability, and flexibility.


## Key aspects of component composition:
### Building blocks:
#### Think of components as building blocks. You create small components that handle specific tasks or UI elements, and then combine them to form larger, more complex components.

> ### Props:
> Components communicate with each other through props, which are data passed down from parent to child components.

> ### Children:
> Components can render other components as children, allowing you to create nested structures.

> ### Flexibility:
> Composition allows you to easily rearrange components, add new ones, or replace existing ones without affecting the rest of your application.

``` 
Example:

// A simple component to display a welcome message

function WelcomeMessage({ name }) {
  return <p>Welcome, {name}!</p>;
}

// A component that combines the WelcomeMessage with a button
function Greeting({ name }) {
  return (
    <div>
      <WelcomeMessage name={name} />
      <button>Log Out</button>
    </div>
  );
}
```
## Benefits of Component Composition:
> ### Reusability:
> You can reuse your components in different parts of your application, reducing code duplication and making your code more maintainable.

> ### Flexibility:
> Composition makes it easy to modify or extend your UI by adding, removing, or rearranging components.

> ### Readability:
> Smaller, focused components are easier to understand and maintain than large, monolithic components.

> ### Testability:
>Smaller components are easier to test in isolation, ensuring that they work correctly before integrating them into larger components.


## Container Components:
#### These components manage the state and data fetching logic, passing the data down to presentational components.

> ### Higher-Order Components (HOCs):
> These are functions that take a component as input and return a new component with additional functionality.

> ### Render Props:
> A pattern where a component receives a function as a prop and renders the result of that function.

> ### Context API:
>A way to share data between components without prop drilling.



