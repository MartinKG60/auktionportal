import React, { Component } from "react";
import { firebaseCon } from "../../connection";
import DatePicker from "react-datepicker";
import Moment from "moment";
import Tags from "../Tags";

import "react-datepicker/dist/react-datepicker.css";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            startDate: null
        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange = value => {
        this.setState({
            startDate: value
        });
    };

    productNameOnChange = e => {
        this.setState({ productName: e.target.value });
    };

    addProduct = () => {
        let productName = this.state.productName;
        let productTags = document.getElementById("tags").value;

        if (productName !== "") {
            firebaseCon.content
                .set("products", Date.now().toString(), {
                    name: productName,
                    created: Date.now(),
                    countdown: Moment(this.state.startDate).format(),
                    tags: productTags
                })
                .then(() => console.log("Setting"))
                .catch(e => console.error(e));
            window.location.reload();
        } else {
            console.log("Not OK");
        }
    };

    render() {
        return (
            <div className="product-create">
                <input
                    type="text"
                    placeholder="Giv din auktion en titel"
                    className="product-create__product-name"
                    value={this.state.productName}
                    onChange={this.productNameOnChange}
                />

                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="DD/MM/YYYY-HH:mm"
                    timeCaption="time"
                    placeholderText="Hvornår skal din auktion slutte?"
                    locale="da-dk"
                />

                <Tags title={this.state.productName} />

                <button onClick={this.addProduct} className="product-create__button waves-effect waves-light btn">
                    Opret
                </button>
            </div>
        );
    }
}

export default Create;
