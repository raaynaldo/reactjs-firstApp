import React, { Component } from "react";

import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import withClass from "../hoc/withClass";
import Aux from "../hoc/Aux";
import AuthContext from "../context/auth-context";
// import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  state = {
    persons: [
      { id: "asdsa", name: "Ray", age: 24 },
      { id: "sssds", name: "Jantya", age: 20 },
      { id: "sdass", name: "Stefanie", age: 23 },
    ],
    otherState: "some other value",
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate");
    return true;
  }

  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate");
  }

  // const [otherState, setOtherState] = useState("some other value");
  // console.log(personsState, otherState);

  // const switchNameHandler = (newName) => {
  //   // console.log('was clicked!');
  //   // DON'T DO THIS: personsState.persons[0].name= 'Raynaldo';
  //   setPersonsState({
  //     persons: [
  //       { name: newName, age: 24 },
  //       { name: "Jantya", age: 20 },
  //       { name: "Stefanie", age: 25 },
  //     ],
  //   });
  // };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = { ...this.state.persons[personIndex] };
    // const person = Object.assign({}, personsState[personIndex]);

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1,
      };
    });
  };

  deletePersonHandler = (personIndex) => {
    // const persons = personsState.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({
      persons: persons,
    });
  };

  togglePersonHandler = () => {
    console.log(this);
    console.log(this.state);
    const doesSHow = this.state.showPersons;
    this.setState({ showPersons: !doesSHow });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };
  // const style = {
  //   backgroundColor: "green",
  //   color: "white",
  //   font: "inherit",
  //   border: "1px solid blue",
  //   padding: "8px",
  //   cursor: "pointer",
  //   ":hover": {
  //     backgroundColor: "lightgreen",
  //     color: "black",
  //   },
  // };

  render() {
    console.log("[App.js] render");
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
          isAuthenticated={this.state.authenticated}
        />
      );
    }

    return (
      <Aux>
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler,
          }}
        >
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonHandler}
            />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
  //return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Does this work now?'));
}

export default withClass(App, classes.App);
