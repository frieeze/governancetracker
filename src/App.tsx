import { Container } from "@material-ui/core";
import React from "react";
import "./App.css";
import SingleAddress from "./features/SingleAdress/SingleAddress";

function App() {
    return (
        <Container maxWidth="lg" className="App">
            <SingleAddress />
        </Container>
    );
}

export default App;
