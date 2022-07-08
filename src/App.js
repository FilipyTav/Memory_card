import "./styles/App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";

const App = () => {
    const [all_cards, set_all_cards] = useState([]);

    let cards_content = [];

    const populate_cards_content = () => {
        for (let i = 0; i < 12; i++) {
            cards_content.push(i);
        }
    };

    const get_random_int = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    const choose_random_content = () => {
        const index = get_random_int(0, cards_content.length - 1);

        const [removed] = cards_content.splice(index, 1);

        return removed;
    };

    const create_cards = () => {
        for (let i = 0; i < 12; i++) {
            const content = choose_random_content();

            set_all_cards((prev_cards) => [
                ...prev_cards,
                <Card key={i} content={content} />,
            ]);
        }
    };

    const initialize = () => {
        populate_cards_content();

        create_cards();
    };

    useEffect(() => {
        initialize();

        return () => {
            set_all_cards([]);
            cards_content = [];
        };
    }, []);

    return (
        <div className="main_container">
            <header className="header">
                <span className="header_txt">Memory Card Game</span>
            </header>
            <section className="main_content">
                <div className="scores">
                    <span>Score: 10</span>
                    <span> Highscore: 12</span>
                </div>
                <div className="cards">{all_cards}</div>
            </section>
        </div>
    );
};

export default App;
