import React, {Component} from "react"
import CocktailDisplay from "./CocktailDisplay"
import SearchResults from "./SearchResults"
import Header from "./Header"

class CocktailGenerator extends Component {
    constructor(){
        super()
        this.state={
            displayDrink: false,    // Display drink recipe
            displayResults: false,  // or display search results
            displayIngredient: false, // See if we're searching ingredient (true) or drink (false)
            searchText: "", // Search text
            message: "",    // Message for no search results found
            results: [],    // Array for search results
            drink: {}       // Drink to display
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleRandomClick = this.handleRandomClick.bind(this)
        this.handleSearchClick = this.handleSearchClick.bind(this)
        this.handleSelectDrink = this.handleSelectDrink.bind(this)
        this.handleSelectIngredient = this.handleSelectIngredient.bind(this)

    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    // On click we want to fetch a new recipe from our API and update the state
    handleRandomClick(event){
        event.preventDefault()
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(response => {
            const drinks = response.drinks
            this.setState({
                displayDrink: true,
                displayResults: false,
                drink: drinks[0]
            })
        })
    }

    // Search for results based on the search text. If nothing in search bar, it will do nothing
    handleSearchClick(event){
        event.preventDefault()
        const buttonName = event.target.name
        const baseUrl = buttonName === "searchDrink" ? "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" : "https://www.thecocktaildb.com/api/json/v1/1/search.php?i="
        const search = this.state.searchText === "" ? "" : this.state.searchText.split(' ').join("%20")
        if(search !== ""){
            var searchUrl = baseUrl + search
            fetch(searchUrl)
            .then(response => response.json())
            .then(response => {
                const searchResults = buttonName === "searchDrink" ? response.drinks : response.ingredients
                if(searchResults !== null){
                    this.setState({
                        message: "",
                        results: searchResults,
                        displayIngredient: buttonName === "searchDrink" ? false : true
                    })
                }
                else{   // No results found. Set message to display
                    this.setState({
                        message: "No results found!",
                        results: []
                    })
                }
            })
            this.setState({
                displayResults: true,
                displayDrink: false
            })
        }
    }

    // Set the drink to the one we select from the search results
    handleSelectDrink(id){
        const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="
        const lookupUrl = baseUrl + id.toString()
        fetch(lookupUrl)
        .then(response => response.json())
        .then(response => {
            this.setState({
                displayDrink:true,
                displayResults: false,
                drink: response.drinks[0]
            })
        })
    }

    // Set the drink to the one we select from the search results
    handleSelectIngredient(name){
        const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="
        const lookupUrl = baseUrl + name
        fetch(lookupUrl)
        .then(response => response.json())
        .then(response => {
            this.setState({
                displayDrink:false,
                displayResults: true,
                displayIngredient: false,
                results: response.drinks
            })
        })
        .catch(error => {
            console.error(error)
            this.setState({
                message: "Database error.",
                displayDrink:false,
                displayResults: true,
                displayIngredient: false,
                results: []
            })
        })
    }

    render(){
        return(
            <div>
                <Header />
                <form className="formBar">
                    <input 
                        type="text" 
                        name="searchText" 
                        value={this.state.searchText} 
                        placeholder="Search" 
                        autoComplete="off"
                        onChange={this.handleChange}
                    />
                    <button name="searchDrink" onClick={this.handleSearchClick}>Search</button>
                    <button name="searchIngredient" onClick={this.handleSearchClick}>Search Ingredient</button>
                    <button onClick={this.handleRandomClick}>Random Recipe</button>
                </form>
                {/* Display either search results or cocktail recipe based on displayResults/displayDrink */}
                {this.state.displayResults && <SearchResults data={this.state} handleSelectDrink={this.handleSelectDrink} handleSelectIngredient={this.handleSelectIngredient}/>}
                {this.state.displayDrink && <CocktailDisplay data={this.state} handleSelectIngredient={this.handleSelectIngredient}/>}
            </div>
        )
    }
}

export default CocktailGenerator