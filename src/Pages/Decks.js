import {Routes,Route } from "react-router-dom";
import CreateDeck from '../Pages/CreateDeck'
import Deck from "./Deck";
import CreateCard from "./CreateCard";
import EditDeck from "./EditDeck";
import EditCard from './EditCard'
import Study from "./Study";
export default function Decks(){
    return(
        <Routes>
                <Route path="/new" element={<CreateDeck  />} />
                <Route path="/:deckId" element={<Deck />} />
                <Route path="/:deckId/cards/new" element={<CreateCard/>}/>    
                <Route path='/:deckId/edit' element={<EditDeck />} /> 
                <Route path='/:deckId/cards/:cardId/edit' element={<EditCard />} /> 
                <Route path='/:deckId/study' element={<Study />} />       
        </Routes>
    )
}