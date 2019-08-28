/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import axios from 'axios'

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            results: []
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        e.persist();
        const term = e.target.value.toLowerCase();
        let results = [];
        if (term) {
            setTimeout(() => {
                axios.get(`http://localhost:3035/product/${term}`)
                    .then(response => {
                        results = response.data;
                        this.setState({ results: results });
                    });
            }, 700)
        }


    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={this.onSearch.bind(this)}/>
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    <div style={{padding: '3em'}}>
                        {
                            this.state.results.map((item,i) => {
                            return <div className={'product-container'} key={i}>
                                      <div>
                                         <p style={{marginBottom: '.5em'}}>{item.name}</p><span><b>{item.price}</b></span>
                                         <p>{item.about}</p>
                                         {
                                            item.tags.map((y, tagsIndex) => {
                                                return <div key={tagsIndex}>{y}</div>
                                            })
                                         }
                                      </div>
                                      <div>
                                          <img style={{width: '100%'}} src={item.picture}></img>
                                      </div>
                                   </div>
                            })
                        }
                    </div>
                </div>
            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;
