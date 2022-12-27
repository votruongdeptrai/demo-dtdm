import React, { useState } from "react";
import "./style.css";

const Card = (props) => {
    return (
        <div className="card" {...props}>
            {(props.headerLeft || props.headerRight) && (
                <div className="cardHeader">
                    {props.headerLeft && (
                        <div
                            style={{
                                alignSelf: "center",
                                fontSize: "20px",
                                fontWeight: "500",
                            }}
                        >
                            {props.headerLeft}
                        </div>
                    )}
                    {props.headerRight && props.headerRight}
                </div>
            )}

            {props.children}
        </div>
    );
};

const MaterialInput = (props) => {
    const [focus, setFocus] = useState(props.value === "" ? false : true);
    const [touch, setTouch] = useState(false);

    return (
        <div className="materialInput">
            <label
                className={`label ${focus ? "focus" : ""}`}
                style={{
                    top: 0,
                    lineHeight: "none",
                }}
            >
                {props.label && `Enter ${props.label}`}
            </label>
            <div
                style={{
                    display: "flex",
                }}
            >
                <input
                    className="input"
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    onFocus={(e) => {
                        setFocus(true);
                        setTouch(true);
                    }}
                    onBlur={(e) => {
                        if (e.target.value === "") {
                            setFocus(false);
                        } else {
                            setTouch(false);
                        }
                    }}
                />
                {props.rightElement ? props.rightElement : null}
            </div>
            {touch && (
                <div
                    style={{
                        fontSize: "10px",
                        color: "red",
                        fontWeight: 500,
                    }}
                >{`${props.label} is Required`}</div>
            )}
        </div>
    );
};

const MaterialButton = (props) => {
    const onClick = () => {
        props.onClick && props.onClick();
    };
    return (
        <div
            style={{
                width: "100%",
                ...props.style,
            }}
        >
            <button
                className="materialButton"
                style={{
                    backgroundColor: props.bgColor,
                    color: props.textColor,
                    fontSize: props.fontSize,
                }}
                onClick={onClick}
            >
                {props.icon && props.icon}
                {props.title && props.title}
            </button>
        </div>
    );
};

const Anchor = (props) => {
    return (
        <button {...props} className="anchorButton">
            {props.name}
        </button>
    );
};

const Breed = (props) => {
    return (
        <div className="breed">
            <ul>
                {props.breed &&
                    props.breed.map((item, index) => (
                        <li key={index}>
                            <a href={item.href}>{item.name}</a>
                            {props.breedIcon}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

const Price = (props) => {
    return (
      <div
        style={{
          fontSize: props.fontSize ? props.fontSize : "14px",
          fontWeight: "bold",
          margin: "5px 0",
        }}
      >
        {props.value}$
      </div>
    );
  };

export { Card, MaterialInput, MaterialButton, Anchor, Breed, Price }