// <---[Displays the Pokemon's Information]---> //
import { useState } from "react";


const ShowEntry = ({pokemon, banList, setBanList}) => {

    // [Handle Ban Clicks] //
    const handleBanClicks = (type) => {
        if (!banList.includes(type)) {
            setBanList([...banList, type]);
        }
    };


    return (
        <div className="display-container">
            {/* ---- [Name and ID Number] ---- */}
            <div className="ID-section">
                <h2>#{pokemon.id} —— {pokemon.name} </h2>
            </div>


            {/* ---- [Sprite] ---- */}
            {pokemon.image ? (
                <img src={pokemon.image} className="pkm-sprite" />
            ) : (
                <p>[Sprite Not Found]</p>
            )}


            {/* ---- [Types] ---- */}
            <div className="type-section">
                <h2>Type:</h2>
                <div className="type-list">
                    {pokemon.types.map((type, index) => (
                        <span
                            key={index}
                            className={`type-item ${type} ${banList.includes(type)}`}
                            onClick={() => handleBanClicks(type)}
                        >{type}</span>
                    ))}
                </div>
            </div>


            {/* ---- [Abilities] ---- */}
            <div className="ability-section">
                <h2>Abilities:</h2>
                <div className="ability-list">
                    {pokemon.abilities.map((ability, index) => (
                        <span
                            key={index}
                            className={`ability-item ${banList.includes(ability)}`}
                            onClick={() => handleBanClicks(ability)}
                        >{ability}</span>
                    ))}
                </div>
            </div>


            {/* ---- [Egg Groups] ---- */}
            <div className="egg-section">
                <h2>Egg Group:</h2>
                <div className="egg-list">
                    {pokemon.eggGroups.map((egg, index) => (
                        <span
                            key={index}
                            className={`egg-item ${banList.includes(egg)}`}
                            onClick={() => handleBanClicks(egg)}
                        >{egg}</span>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default ShowEntry;