import React, { Component } from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/Aux";
import withClass from "../../../hoc/withClass";
import classes from "./Person.css";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
  // const rnd = Math.random();
  // console.log(rnd);

  // if(rnd>0.9){
  //     throw new Error('Something went wrong');
  // }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log("[Person.js] componentDidUpdate");
  //   console.log(snapshot);
  // }

  // componentWillUnmount() {
  //   console.log("[Person.js] componentWillUnmount");
  // }

  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);
  }

  render() {
    console.log("[Person.js] rendering...");
    return (
      <Aux>
        {this.context.authenticated ? (
          <p>Authenticated!</p>
        ) : (
          <p>Please login</p>
        )}

        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          // ref={(inputEl) => {this.inputElement = inputEl}}
          ref={this.inputElementRef}
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default withClass(Person, classes.Person);
