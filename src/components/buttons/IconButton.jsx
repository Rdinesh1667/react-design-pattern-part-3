import React from 'react'

const icons = {
    cross: "❌",
    tick: "✔",
    edit: "✏️",
    remove: "⛔",
    plus: "➕"
};

const IconButton = ({ onClick, label, iconName, ...rest }) => {
    return (
        <button {...rest} onClick={onClick}>
            {label && <span>{label} </span>}
            {iconName && <span>{icons[iconName]}</span>}
        </button>
    );
};

export default IconButton;