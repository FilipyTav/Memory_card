const Card = (props) => {
    // The card content and its functionality
    const {
        content: { name, value },
        select_card,
    } = props;

    // Changes font color based on background color
    // Returns either the opposite color or black or white
    const invert_color = (hex, bw) => {
        if (hex.indexOf("#") === 0) hex = hex.slice(1);

        // convert 3-digit hex to 6-digits.
        if (hex.length === 3)
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];

        if (hex.length !== 6) throw new Error("Invalid HEX color.");

        let r = parseInt(hex.slice(0, 2), 16);
        let g = parseInt(hex.slice(2, 4), 16);
        let b = parseInt(hex.slice(4, 6), 16);

        if (bw) {
            // https://stackoverflow.com/a/3943023/112731
            return r * 0.299 + g * 0.587 + b * 0.114 > 186
                ? "#000000"
                : "#FFFFFF";
        }

        // invert color components
        r = (255 - r).toString(16);
        g = (255 - g).toString(16);
        b = (255 - b).toString(16);

        // pad each with zeros and return
        const pad_zero = (str, len = 2) => {
            let zeros = [...len].join("0");
            return (zeros + str).slice(-len);
        };

        return `#${pad_zero(r)}${pad_zero(g)}${pad_zero(b)}`;
    };

    return (
        <div className="card" onClick={select_card}>
            <div
                className="card_content"
                style={{ background: value, color: invert_color(value, "yes") }}
            >
                {value}
            </div>
            <div className="card_name">{name}</div>
        </div>
    );
};

export default Card;
