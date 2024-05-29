import { useEffect, useState } from "react"
import { useParams,Link, useNavigate} from "react-router-dom"
import {readDeck,deleteDeck,deleteCard,updateCard} from '../utils/api/index'
export default function Deck(){
    const {deckId} = useParams()
    const [deck, setDeck] = useState({})
    const navigate = useNavigate()

    
    const handleDeleteDeck = async(id) =>{  
        await deleteDeck(id)
        navigate('/')
   }
    const handleDeleteCard = async(id) =>{  
        if(window.confirm("Delete this Card? You will not be able to recover it. ")){
            await deleteCard(id) 
            setDeck(await readDeck(deckId))
        }
        
}
    useEffect(()=>{
            async function getDeck(){
                const getDeck = await readDeck(deckId)     
                setDeck(getDeck)
            }
            getDeck()
    },[deckId])
    
    return(
        <>
        <DeckInfo deck={deck} deckId={deckId} handleDeleteDeck={handleDeleteDeck}/>
        <Cards cards={deck.cards} handleDeleteCard={handleDeleteCard} updateCard={updateCard}/>
        </>
    )
}
function DeckInfo({deck,deckId,handleDeleteDeck}){
      return (
        <>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <div>
               <Link to={`/decks/${deckId}/edit`}> <button >edit</button></Link>{/* updateDeck */ }
               <Link to={`/decks/${deck.id}/study`}><button>Study</button></Link>
                <Link to={`/decks/${deckId}/cards/new`}><button >add cards</button> </Link>
                <button onClick={()=>handleDeleteDeck(deckId)}> Delete</button> {/* deleteDeck */}
            </div>
        </>)
        
}
function Cards({cards,handleDeleteCard}){

    if(cards!= undefined){
        return(
        <>
        {cards.map((card) =>{
            return (
                <div key={card.id}>
                    <p>{card.front}</p>
                    <div>
                        <p>{card.back}</p>
                        <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`}><button>Edit</button></Link>
                        <button onClick={()=>handleDeleteCard(card.id)}>Delete</button>
                    </div>
                </div>
            )
        })}
        </>)
    }
    return ''
    
}