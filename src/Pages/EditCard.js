

import { Link, useParams,useNavigate } from "react-router-dom"
import { readDeck } from "../utils/api"
import { useEffect, useState } from "react"
import { readCard,updateCard } from "../utils/api"
import CardForm from "./CardForm"

export default function CreateCard(){
    const {deckId,cardId} = useParams()
    //const[deck,setDeck] = useState({})
    const [front,setFront] = useState("")
    const [back,setBack] = useState("")
    const navigate = useNavigate()
    useEffect( ()=>{
        async function getDeck(){
            const deck = await readDeck(deckId)
            const card = deck.cards.find(card => card.id == cardId)
            if(card){
                console.log(card)
                setFront(card.front)
                setBack(card.back)
            }
            
        }
        getDeck()  
    },[deckId,cardId])
    const handleSubmit = async (form)=>{
        await updateCard({id:cardId,front:form.front,back:form.back, deckId:Number(deckId)})   
        navigate(`/decks/${deckId}`)
      }
    
    if(front != ""){
        return(
            <>
                <h1>Edit Card</h1>
                <CardForm deckId={deckId} submitHandler={handleSubmit} front={front} back={back} />
            </> )}
     return ""
    }
   
    