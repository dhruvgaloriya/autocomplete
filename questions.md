## What is the difference between Component and PureComponent? Give an example where it might break my app.

Component: A base class for all React components. It doesn't implement shouldComponentUpdate() by default. Every time the state or props of a component change, React re-renders the component.

PureComponent: A subclass of Component that implements shouldComponentUpdate() with a shallow comparison of the previous and current props and state. If neither props nor state change, React skips the re-rendering, improving performance.

Example where it might break the app:

If a PureComponent is used on a component that has non-primitive props (like objects or arrays) and those props are being mutated instead of replaced, React might skip a re-render when it shouldn't, leading to the UI not updating as expected. For example:

```jsx
class MyComponent extends React.PureComponent {
  render() {
    console.log("Rendered!");
    return <div>{this.props.data.name}</div>;
  }
}

const country = { name: "United States" };

// it will not trigger re-render
data.name = "India";

<MyComponent data={data} />;
```

In this example, even though the name property of the data object is changed, React will not re-render the component because it compares the previous and current props using a shallow comparison.

## Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Why is it dangerous?: Context is typically used to pass data down the component tree, and components that consume this context will re-render whenever the context value changes. If you use shouldComponentUpdate to prevent unnecessary renders, it can lead to issues where the component doesn't update when context changes, leading to stale or inconsistent UI. This is especially problematic if the context value is being passed down deeply or to many components.

## Describe 3 ways to pass information from a component to its PARENT.

1. Callbacks (Props): The child component can pass information to the parent via callback functions. The parent defines the function and passes it as a prop to the child.

   ```jsx
   class Parent extends React.Component {
     handleData = (data) => {
       console.log(data);
     };

     render() {
       return <Child sendData={this.handleData} />;
     }
   }

   class Child extends React.Component {
     sendToParent = () => {
       this.props.sendData("Hello Parent!");
     };

     render() {
       return <button onClick={this.sendToParent}>Send Data</button>;
     }
   }
   ```

2. Context API: The parent component can provide a context value that the child component can consume. Changes to the context value will trigger re-renders in all components that consume that context.

3. State Lifting: Involves moving the shared state to the parent and passing it down to children.

## Give 2 ways to prevent components from re-rendering.

React.memo: A higher-order component for functional components, it memoizes the component and prevents re-renders when props do not change.

```jsx
const MyComponent = React.memo((props) => {
  // Render logic
});
```

shouldComponentUpdate: A lifecycle method in class components that allows you to return false to prevent re-rendering. You can use it to compare the current and next props and state to decide whether a re-render is necessary.

## What is a fragment and why do we need it? Give an example where it might break my app.

Fragment: A Fragment is a lightweight wrapper that lets you group a list of children without adding extra nodes to the DOM.

Why We Need It: It's useful when you need to return multiple elements from a component, but adding an extra div or span would break your layout or styling. It also helps avoid unnecessary DOM elements.

Example Where It Might Break Your App: Using Fragments where you need a specific wrapper element could cause layout issues:

```jsx
const MyComponent = () => (
  <>
    <p>Text1</p>
    <p>Text2</p>
  </>
);
```

If you needed a single wrapper for these elements, Fragment might break the layout since it doesn't produce any actual DOM element. Recently due to this we faced an issue in our application.

## Give 3 examples of the HOC pattern.

withRouter: Injects routing-related props into a component.

```jsx
import { withRouter } from "react-router-dom";
const MyComponent = ({ history }) => {
  // Use history prop for navigation
  return <div>...</div>;
};
export default withRouter(MyComponent);
```

withAuth: A custom HOC that provides authentication-related data or checks into a component.

```jsx
const withAuth = (WrappedComponent) => {
  return (props) => {
    // Check authentication status
    return <WrappedComponent {...props} />;
  };
};
```

withErrorBoundary: A HOC that adds error boundary behavior to a component to catch JavaScript errors.

```jsx
const withErrorBoundary = (WrappedComponent) => {
  return (props) => {
    try {
      return <WrappedComponent {...props} />;
    } catch (error) {
      return <div>Error occurred</div>;
    }
  };
};
```

## What's the difference in handling exceptions in promises, callbacks and async...await.

Promises: Use .catch() or try-catch (with async/await) to handle errors in a promise chain.

```jsx
myPromise
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Handle error
  });
```

Callbacks: Typically handle errors by passing an error as the first argument in the callback function.

```jsx
someAsyncFunction((error, result) => {
  if (error) {
    // Handle error
  } else {
    // Process result
  }
});
```

async/await: You use try-catch blocks to handle exceptions when working with async/await

```jsx
try {
  const result = await someAsyncFunction();
} catch (error) {
  console.error("Error:", error);
}
```

## How many arguments does setState take and why is it async.

1. Arguments: setState takes two arguments:

   1. State update: An object or a function that describes the state change.
   2. Callback: (optional) A callback to be executed after the state has been updated.

2. Why Async: setState is asynchronous because React batches state updates for performance reasons. It schedules a re-render of the component after the state update but doesn't immediately trigger a re-render during the call to setState. This allows React to minimize unnecessary renders and improve performance.

## List the steps needed to migrate a Class to Function Component.

1. Convert the class declaration to a function.
2. Replace render() method with return statement in the function.
3. Convert this.state to useState.
4. Replace lifecycle methods like componentDidMount with useEffect.
5. Bind event handlers (like handleClick) directly in the function body or use arrow functions.

## List a few ways styles can be used with components.

1. Inline styles: Style elements directly using the style attribute.
2. CSS classes: Apply styles using external or internal CSS.
3. CSS-in-JS: Use libraries like styled-components or emotion for component-scoped styles.
4. SASS/SCSS: Using a preprocessor for more powerful and maintainable styles.
5. CSS Modules: Use a module bundler to scope styles to a component.

## How to render an HTML string coming from the server.

1. Use ReactDOMServer.renderToString() to render the HTML string server-side.

2. use dangerouslySetInnerHTML in React. It is named "dangerous" because injecting raw HTML can expose your app to cross-site scripting (XSS) attacks if not sanitized properly.

```jsx
const MyComponent = ({ htmlString }) => (
  <div dangerouslySetInnerHTML={{ __html: htmlString }} />
);
```
