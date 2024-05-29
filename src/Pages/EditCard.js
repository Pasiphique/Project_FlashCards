

import { Link, useParams,useNavigate } from "react-router-dom"
import { readDeck } from "../utils/api"
import { useEffect, useState } from "react"
import { readCard,updateCard } from "../utils/api"

export default function CreateCard(){
    const {deckId,cardId} = useParams()
    const[deck,setDeck] = useState({})
    const navigate = useNavigate()
    const formData ={
        front: '',
        back: ''
       }
       const[form,setForm] = useState(formData)
       const handleInput = ({target}) =>{
        setForm({...form, [target.name]:target.value})
       }
    useEffect( ()=>{
        async function getDeck(){
            const deck = await readDeck(deckId)
            const card = deck.cards.find(card => card.id == cardId)
            if(card){
                setForm({front:card.front, back:card.back})
            }
            
            setDeck(deck)
        }
        getDeck()  
    },[deckId,cardId])
    const handleSubmit = async (e)=>{
        e.preventDefault()   
        await updateCard({id:cardId,front:form.front,back:form.back, deckId:Number(deckId)})   
        navigate(`/decks/${deckId}`)
      }
    return(
        <>
            
            <h1>Edit Card</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Front
                    <textarea required type="text"  name="front" value={form.front} onChange={handleInput}/>
                </label>
                <label>
                    Back
                    <textarea required type="text" name="back" value={form.back} onChange={handleInput}/>
                </label>
               <Link to={`/decks/${deckId}`}><button>Done</button></Link> 
               <button type="submit">Save</button>
                
            </form>
        </> )}