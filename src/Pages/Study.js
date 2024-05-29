
import { useState,useEffect } from "react"
import { readDeck } from "../utils/api"
import { useParams,Link, useNavigate } from "react-router-dom"
import '../App.css'
export default function Study(){
    const navigate = useNavigate()
    const {deckId} = useParams()
    const [deck,setDeck] = useState({})
    const [front, setFront] = useState("")
    const [back,setBack] = useState("")
    const [deckIndex, setDeckIndex] = useState(0)
    const [btn, setBtn] = useState("")
    const onFlip =()=>{
        setFront(back)
        setBack(front)  
        setBtn(<button onClick={()=>handleNext()} >next</button>)
    }
    const handleNext = () =>{
        const deckLength = deck.cards.length - 1
        let next = deckIndex + 1

        if (next > deckLength ){
            if(window.confirm("Rest cards?")){
                next = 0
            }else{
                navigate("/")
                return;
            }
        }   
        const card = deck.cards[next]
        setDeckIndex(next)
        setFront(card.front)
        setBack(card.back) 
        setBtn("")
    }
    useEffect(()=>{
        async function getDeck(){
            const response = await readDeck(deckId)        
            if(response.cards.length > 0){
                setFront(response.cards[deckIndex].front)
                setBack(response.cards[deckIndex].back)
            }
            setDeck(response)
        }
        getDeck()
},[deckId])

    if( Object.keys(deck).length > 0 ){
        if(deck.cards.length < 3){
            return(
                <>
                    <h1>{deck.name}</h1>
                    <h2>Not enough cards.</h2>
                    <p>You need at least 3 cards to study. There are {deck.cards.length} in this deck</p>
                    <Link to={`/decks/${deck.id}/cards/new`}><button>Add Cards</button></Link>
                </>
            )
        }else{
            return(
            <>
                <h1>{deck.name}</h1>
                <h1>Study</h1>
                <h3>Card {deckIndex+1} of {deck.cards.length}</h3>
                <div>
                    <p>{front}</p>
                    <button onClick={() => onFlip()}>flip</button>
                    {btn}
                </div>
           </>
            )
           
        }
    }
}