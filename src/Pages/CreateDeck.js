import { Link,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import {createDeck,listDecks} from '../utils/api/index'
export default function CreateDeck(){
    const navigate = useNavigate()
    const formData ={ name: '', description: ''}
    const[form,setForm] = useState(formData)
    const [id, setId] = useState(null)
    const handleInput = ({target}) =>{
        setForm({...form, [target.name]:target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setForm(formData)
    }
    const addToDeck = async () =>{
        await createDeck({id:id, name: form.name, description:form.description})
        navigate(`/decks/${id}`)

    }
    useEffect(()=>{
        async function getLength(){
            const response  = await listDecks()
            if(response.length > 0){
                const newDeckId = response[response.length-1].id + 1 
                setId(newDeckId)
            }else{
                setId(1)
            }  
        }
        getLength()
    },[])
   
    return(
        <>
        <h1>Create Deck</h1>
    <form onSubmit={handleSubmit}>
        <label>
            Name
            <input required type='text'  placeholder="Deck Name" name="name" value={form.name} onChange={handleInput}/>
        </label>
        <label>
            Description
            <textarea required placeholder="Brief description of the deck" name="description" value={form.description} onChange={handleInput}/>
        </label>
        <Link to='/'><button>Cancel</button></Link>
        <button onClick={addToDeck}>Submit</button>
    </form>

    </>
    )
}
/*
on submit use the createdeck function to create a new deck
then use the readdeck function to get the last element in the array and then use that as your deckId
*/