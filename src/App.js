import "./styles/App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";

const App = () => {
    return (
        <div className="main_container">
            <header className="header">
                <span className="header_txt">Memory Card Game</span>
            </header>
            <div className="main_content"></div>
        </div>
    );
};

export default App;
