import { useState, useEffect} from "react"
import {Link} from "react-router-dom";
import { listDecks,deleteDeck } from "../utils/api";

export default function Home(){
    const [decks, setDecks] = useState([])

    useEffect(()=>{
        async function getDecks(){
            const decks  = await listDecks()
            setDecks(decks)    
        }
        getDecks()
       },[])

       const handleDelete = async(id) =>{
            await deleteDeck(id)
            setDecks(await listDecks())

       }

    return (
        <>
            <Link to='/decks/new'><button> Create Deck</button></Link>           
            {decks.map((deck,index) =>{
            return(
                <div key={index}>
                    <div>
                        <h1>{deck.name}</h1>
                        <p>{deck.cards.length} cards</p>
                    </div>
                    <p>{deck.description}</p>
                    <Link to={`/decks/${deck.id}`}><button>View</button></Link>
                    <Link to={`/decks/${deck.id}/study`}><button>Study</button></Link>
                    <button onClick={()=>handleDelete(deck.id)}>Delete</button>
                </div>
            )
        })}
            
        </>      
    )
}
