import React, { Component } from "react";
import { firebaseCon } from "../../connection";
import Moment from "react-moment";
import "moment/locale/da";
import Countdown from "react-countdown-now";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        firebaseCon.content
            .get("products", { fields: ["id", "name", "created", "countdown"] })
            .then(products => {
                let productList = [];
                for (let product in products) {
                    productList.push(products[product]);
                }
                this.setState({ products: productList });
            })
            .catch(error => console.error(error));
    }

    countdownComplete() {
        console.log("Im done!");
    }

    // Renderer callback with condition
    renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <span>You are good to go!</span>;
        } else {
            // Render a countdown
            return (
                <span>
                    {days} dage {hours} timer {minutes} minutter og {seconds} sekunder
                </span>
            );
        }
    };

    render() {
        let productList = this.state.products.map(product => {
            return (
                <li className="product-item collection-item avatar" id={product.id} key={product.id}>
                    <i className="product-item__icon circle large material-icons">keyboard_arrow_right</i>
                    <div className="product-item__date">
                        Oprettet d. <Moment format="DD/MM/YYYY - HH:mm">{product.created}</Moment>
                    </div>
                    <div className="product-item__name">{product.name}</div>
                    <div className="product-item__countdown">
                        Nedtælling: <Countdown date={product.countdown} onComplete={this.countdownComplete} renderer={this.renderer} />
                    </div>
                </li>
            );
        });

        return (
            <div>
                <ul className="collection product-list">{productList}</ul>
            </div>
        );
    }
}

export default List;
