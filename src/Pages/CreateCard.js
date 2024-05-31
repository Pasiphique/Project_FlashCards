import { Link, useParams } from "react-router-dom"
import { readDeck } from "../utils/api"
import { useEffect, useState } from "react"
import { createCard } from "../utils/api"
import CardForm from "./CardForm"

export default function CreateCard(){
    const {deckId} = useParams()
    const[deck,setDeck] = useState({})
    useEffect( ()=>{
        async function getDeck(){
            const deck = await readDeck(deckId)
            setDeck(deck)
        }
        getDeck()  
    },[deckId])
    const handleSubmit = async (form)=>{
        await createCard(deckId,{front:form.front,back:form.back}) 
      }
    return(
        <>
            <h1>{deck.name}</h1>
            <h1>Add Card</h1>
            <CardForm deckId={deckId} submitHandler={handleSubmit} />
        </> )}