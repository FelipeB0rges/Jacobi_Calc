import React, { Component } from "react";
import './App.scss';
import Alert from '@material-ui/lab/Alert';
import { Container } from "@material-ui/core"
import 'fontsource-roboto';
import Home from './components/Home/Home';


class App extends Component {
  render() {
    return (
      <Home />
    );
  }
}



export default App;
