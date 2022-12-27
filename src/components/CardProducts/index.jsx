import React from "react";
import "./style.css";
import Countdown from "react-countdown";
import { useHistory } from "react-router-dom";

const CardProducts = ({ title, dealtime, data }) => {
  const history = useHistory();
  const timerURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";
  const timerDeal = () => {
    const renderer = ({ hours, minutes, seconds }) => {
      return (
        <span className="timer">
          {hours} : {minutes} : {seconds} Left
        </span>
      );
    };
    return <Countdown date={Date.now() + 5.04e7} renderer={renderer} />;
  };
  const superDeal = () => (
    <div className="supper_deal">
      <div className="super_deal_img">
        <img
          src="https://res.cloudinary.com/de4aiajqg/image/upload/v1652492940/Img/633789f7def60050_wmcatb.png"
          alt=""
        />
      </div>
    </div>
  );
  return (
    <div
      style={dealtime ? { display: "flex" } : null}
      className="card_products"
    >
      <div className="card_product_container">
        <div className="card_product_header">
          <span
            style={dealtime ? { display: "flex" } : {}}
            className="card_product_header_name"
          >
            <span>{title}</span>
            {dealtime ? (
              <div
                style={{
                  marginLeft: 20,
                  display: "flex",
                  alignItems: "center",
                  fontSize: 14,
                  color: "#7f7f7f",
                }}
              >
                <img src={timerURL} alt="" />
                {timerDeal()}
              </div>
            ) : null}
          </span>
          <div className="card_product_view_all">VIEW ALL</div>
        </div>
        <div className="card_product_content">
          {data &&
            data.map((prod) => (
              <div
                style={{ cursor: "pointer" }}
                onClick={() =>
                  history.push(
                    "SAMSUNG-Galaxy-A52-(Awesome-Blue-128-GB)-(6-GB-RAM)-5/628104b2df15dd092e07c5f7/p"
                  )
                }
                key={prod.name}
                className="card_product_item"
              >
                <div className="card_product_img">
                  <img src={prod.image} alt="" />
                </div>
                <span className="card_product_name">{prod.name}</span>
                <span className="card_product_sell">Min. 50% Off</span>
              </div>
            ))}
        </div>
      </div>
      {dealtime ? superDeal() : null}
    </div>
  );
};

export default CardProducts;
