const Card = (props) => {
    const { content, select_card } = props;
    return (
        <div className="card" onClick={select_card}>
            {content}
        </div>
    );
};

export default Card;
