import "./styles/App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";

const App = () => {
    const all_cards = [];

    for (let i = 0; i < 12; i++) {
        all_cards.push(<Card key={i} content={i} />);
    }

    return (
        <div className="main_container">
            <header className="header">
                <span className="header_txt">Memory Card Game</span>
            </header>
            <div className="main_content">
                <div className="cards">{all_cards}</div>
            </div>
        </div>
    );
};

export default App;
