const Card = (props) => {
    // The card content and its functionality
    const { content, select_card } = props;

    return (
        <div className="card" onClick={select_card}>
            {content}
        </div>
    );
};

export default Card;
