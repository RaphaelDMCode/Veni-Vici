// <---[Sidebar for Banned and Previous Seen Pokemons]---> //
import { useState } from "react";

const Sidebar = ({BannedList, RemoveBan, History}) => {
    return (
        <div className="side-bar">


            {/* ---- [Banned Section] ---- */}
            <div className="banned-bar">
                <h2>Banned List:</h2>
                <h3>Select an Attribute to Ban it</h3>
                <div className="banned-list">
                    {BannedList.map((item, index) => (
                        <span
                            key={index}
                            className={`ban-types type-item ${item} ${
                                ["fire","water","grass","electric","steel","ghost","psychic","normal","ground","ice","dragon","fairy","dark","fighting","poison","bug","rock","flying"].includes(item)
                                ? "type-item"
                                : "non-type-item"
                            }`}
                            onClick={() => RemoveBan(item)}
                        >{item}</span>
                    ))}
                </div>
            </div>


            {/* ---- [History Sectuon] ---- */}
            <div className="history-bar">
                <h2>Previously Seen:</h2>
                <div className="history-list">
                    {History.map((pokemon) => (
                        <div key={pokemon.id} className="history-pkms">
                            <img 
                                src={pokemon.image} 
                                className="history-img"
                            />
                            <p>#{pokemon.id} {pokemon.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;