import "./styles/App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";

const App = () => {
    // All the cards and their content
    const [all_cards, set_all_cards] = useState([]);

    // Array of cards that were already selected
    const [cards_already_selected, set_cards_already_selected] = useState([]);

    // Score and highscore
    const [score_count, set_score_count] = useState(0);
    const [highscore_count, set_highscore_count] = useState(0);

    // Content to be distributed randomly to all cards
    let cards_content = [];

    // Adds the content to the array
    const populate_cards_content = () => {
        for (let i = 0; i < 12; i++) {
            cards_content.push(i);
        }
    };

    // Random integer between min and max, both inclusive
    // Used to select a content for the cards
    const get_random_int = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    // Selectes a random content and removes the selected content from the array
    const choose_random_content = () => {
        const index = get_random_int(0, cards_content.length - 1);

        const [removed] = cards_content.splice(index, 1);

        return removed;
    };

    // Creates the Card elements and adds them to all_cards
    const create_cards = () => {
        for (let i = 0; i < 12; i++) {
            // Content to be assigned
            const content = choose_random_content();

            set_all_cards((prev_cards) => [
                ...prev_cards,
                <Card key={i} content={content} select_card={select_card} />,
            ]);
        }
    };

    // Adds the content to the cards and render them
    const initialize = () => {
        populate_cards_content();

        create_cards();
    };

    useEffect(() => {
        initialize();

        // The cards are reset after each render if the score changes
        return () => {
            set_all_cards([]);
            cards_content = [];
        };
    }, [score_count]);

    // Selects a card when it is clicked
    const select_card = (e) => {
        const selected = e.target.textContent;

        // The else if is here because the set function of useState is async (delayed)

        // If the card has not been selected previously and it is not the last card available
        if (
            !cards_already_selected.includes(selected) &&
            score_count + 1 < 12
        ) {
            // Considers the card as selected
            set_cards_already_selected((prev_cards) => [
                ...prev_cards,
                selected,
            ]);

            // Adds 1 to the score
            set_score_count((prev_score) => prev_score + 1);
        } else if (
            // If it is the last card available
            !cards_already_selected.includes(selected) &&
            score_count + 1 === 12
        ) {
            set_cards_already_selected((prev_cards) => [
                ...prev_cards,
                selected,
            ]);

            // Sets the highscore to the maximum amount
            set_highscore_count(score_count + 1);

            // Resets the score
            set_score_count(0);

            // Clears the selected cards
            set_cards_already_selected([]);
        } else {
            // Only changes the highscore if the score is higher
            if (score_count > highscore_count) set_highscore_count(score_count);

            // Resets the score and the selected cards
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
