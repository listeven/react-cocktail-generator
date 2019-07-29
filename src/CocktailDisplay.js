import React from "react"
import IngredientList from "./IngredientList"

function CocktailDisplay(props) {
    return(
        <div>
            <div className="cocktail-ingredient-display">
                <div className="cocktail">
                    <h1>{props.data.drink.strDrink}</h1>
                    <img src={props.data.drink.strDrinkThumb} alt="" />
                </div>
                <div className="ingredientList">
                    <h2>Ingredients</h2>
                    <IngredientList data={props.data} handleSelectIngredient={props.handleSelectIngredient}/>
                </div>
            </div>

            <div className="instructions">
                <h2>Instructions</h2>
                <p>{props.data.drink.strInstructions}</p>
            </div>
        </div>
    )
}

export default CocktailDisplay