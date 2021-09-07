import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Query from "./components/Query/Query";
import Home from "./components/Home/Home";
import { Box } from "@material-ui/core";
import Navbar from "components/Navbar/Navbar";

function App() {
    return (
        <Box className="Root">
            <Box className="App">
                <Router>
                    <Navbar />
                    <Switch>
                        <Route path="/details/:address">
                            <Query />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </Box>
        </Box>
    );
}

export default App;
