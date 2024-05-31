
import { useEffect, useState } from "react"
import { useNavigate,Link } from "react-router-dom"
export default function CardForm({deckId,submitHandler, front="", back=""}){
    const formData ={
        front: front,
        back: back
       }
       const[form,setForm] = useState(formData)
       const handleInput = ({target}) =>{
        setForm({...form, [target.name]:target.value})
       }
       const handleSubmit = async(e)=>{
            e.preventDefault()
            submitHandler(form)
            setForm(formData)
       }
       useEffect(() =>{
        console.log("card:", front,back)
       },[])
    return(
    <form onSubmit={handleSubmit}>
                <label>
                    Front
                    <textarea required type="text" placeholder={front} name="front" value={form.front} onChange={handleInput}/>
                </label>
                <label>
                    Back
                    <textarea required type="text" placeholder={back} name="back" value={form.back} onChange={handleInput}/>
                </label>
               <Link to={`/decks/${deckId}`}><button>Done</button></Link> 
                <button type="submit">Save</button>
    </form>
    )
}