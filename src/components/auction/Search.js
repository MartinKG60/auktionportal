import React from "react";
import { firebaseCon } from "../../connection";
import { addClass, removeClass } from "../../utils/dom/classList";
import { Link } from "react-router-dom";

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            search: "",
            products: [],
            filteredProductsCounter: 0
        };
    }

    componentDidMount() {
        firebaseCon.content
            .get("products", {
                fields: ["id", "name", "tags", "created", "countdown", "price"]
            })
            .then(products => {
                let productList = [];
                for (let product in products) {
                    productList.push(products[product]);
                }
                this.setState({ products: productList });
            })
            .catch(error => console.error(error));
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });

        if (event.target.value.length !== 0) {
            removeClass(document.getElementById("search-result-list"), "hidden");
        } else {
            addClass(document.getElementById("search-result-list"), "hidden");
        }
    }

    render() {
        let filteredProductList = [];

        if (this.state.search !== "") {
            const filteredProducts = this.state.products.filter(product => {
                return product.tags.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            });

            // filteredProductsCounter = filteredProducts.length;

            filteredProductList = filteredProducts.map(product => {
                return (
                    <li className="search-wrapper__result-list--item result-list__item collection-item" id={product.id} key={product.id}>
                        <div className="row no-margin">
                            <div className="col s8">
                                <div className="result-list__item--name">
                                    <Link to={`/product/${product.name}`} className="result-list__item--name--link">
                                        {product.name}
                                    </Link>
                                </div>
                            </div>
                            <div className="col s4">
                                <div className="result-list__item--price">
                                    <b>{product.price} kr.</b>
                                </div>
                            </div>
                        </div>
                        <div className="row no-margin">
                            <div className="col s12">
                                <div className="result-list__item--tags">{product.tags}</div>
                            </div>
                        </div>
                    </li>
                );
            });
        }

        return (
            <div className="search-wrapper">
                <i className="material-icons prefix">search</i>
                <input type="text" placeholder="Hvad søger du?" id="search" className="search-wrapper__input" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                {/* <div className="search-wrapper__filtered-product-counter hidden">{filteredProductsCounter} produkter fundet</div> */}
                <ul id="search-result-list" className="collection search-wrapper__result-list hidden">
                    {filteredProductList}
                </ul>
            </div>
        );
    }
}

export default Search;
