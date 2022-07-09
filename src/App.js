import "./styles/App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";

const App = () => {
    const [all_cards, set_all_cards] = useState([]);
    const [cards_already_selected, set_cards_already_selected] = useState([]);
    const [score_count, set_score_count] = useState(0);
    const [highscore_count, set_highscore_count] = useState(0);

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
                <Card key={i} content={content} select_card={select_card} />,
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
    }, [score_count]);

    const select_card = (e) => {
        const selected = e.target.textContent;

        if (
            !cards_already_selected.includes(selected) &&
            score_count + 1 < 12
        ) {
            set_cards_already_selected((prev_cards) => [
                ...prev_cards,
                selected,
            ]);
            set_score_count((prev_score) => prev_score + 1);
        } else if (
            !cards_already_selected.includes(selected) &&
            score_count + 1 === 12
        ) {
            set_cards_already_selected((prev_cards) => [
                ...prev_cards,
                selected,
            ]);

            set_highscore_count(score_count + 1);

            set_score_count(0);
            set_cards_already_selected([]);
        } else {
            if (score_count > highscore_count) set_highscore_count(score_count);

            set_score_count(0);
            set_cards_already_selected([]);
        }
    };

    return (
        <div className="main_container">
            <header className="header">
                <span className="header_txt">Memory Card Game</span>
            </header>
            <section className="main_content">
                <div className="scores">
                    <span>Score: {score_count}</span>
                    <span> Highscore: {highscore_count} </span>
                </div>
                <div className="cards">{all_cards}</div>
            </section>
        </div>
    );
};

export default App;
