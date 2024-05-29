
import { readDeck,updateDeck} from "../utils/api"
import { useParams,Link } from "react-router-dom"
import { useEffect, useState } from "react"
export default function EditDeck(){
    const {deckId} = useParams()
    const formData ={
        name: '',
        description: ''
       }
       const[form,setForm] = useState(formData)
       const[deck,setDeck] = useState({})
    const handleSubmit = async () =>{
        await updateDeck({id:deck.id,name:form.name, description:form.description}) 
    }
    const handleInput = ({target}) =>{
        setForm({...form, [target.name]:target.value})
       }
    useEffect(()=>{
        async function getDeck(){
            const getDeck = await readDeck(deckId)
            setDeck(getDeck)
            setForm({name:getDeck.name,description:getDeck.description})
        }
        getDeck()
    },[deckId])
   
        return(
            <>  
                <h1>Edit Deck</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        name
                        <input type="text"  required name="name" value={form.name} onChange={handleInput}/>
                    </label>
                    <label>
                        description
                        <textarea required name="description" value={form.description} onChange={handleInput}/>
                    </label>
                <Link to={`/decks/${deckId}`}><button>Cancel</button></Link> 
                    <button type="submit">Submit</button>
                </form>
            </>)
}