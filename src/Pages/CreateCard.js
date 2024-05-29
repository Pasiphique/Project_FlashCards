import { Link, useParams } from "react-router-dom"
import { readDeck } from "../utils/api"
import { useEffect, useState } from "react"
import { createCard } from "../utils/api"

export default function CreateCard(){
    const {deckId} = useParams()
    const[deck,setDeck] = useState({})
    const formData ={
        front: '',
        back: ''
       }
       const[form,setForm] = useState(formData)
       const [dataLength, setDataLength] = useState(0)
       const handleInput = ({target}) =>{
        setForm({...form, [target.name]:target.value})
       }
    useEffect( ()=>{
        async function getDeck(){
            const deck = await readDeck(deckId)
            setDeck(deck)
        }
        getDeck()  
    },[deckId])
    const handleSubmit = async (e)=>{
        e.preventDefault()
        await createCard(deckId,{front:form.front,back:form.back})
        setForm(formData)
      }
    return(
        <>
            <h1>{deck.name}</h1>
            <h1>Add Card</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Front
                    <textarea required type="text" placeholder="Front side of Card" name="front" value={form.front} onChange={handleInput}/>
                </label>
                <label>
                    Back
                    <textarea required type="text" placeholder="Back side of Card" name="back" value={form.back} onChange={handleInput}/>
                </label>
               <Link to={`/decks/${deckId}`}><button>Done</button></Link> 
                <button type="submit">Save</button>
            </form>
        </> )}