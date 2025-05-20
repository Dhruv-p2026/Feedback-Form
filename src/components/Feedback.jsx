import "./Feedback.css";
import { useState, useEffect, use } from "react";
 import db from "./Firebase";
import { ref, push, onValue } from "firebase/database";
import Loader from "./Loader";

function Feedback() {
    let [name,setName] = useState("");
    let [feedback,setFeedback] = useState("");

    let [finalArray, setFinalArray] = useState([]);
    let [loading, setLoading] = useState(true); 

    function handleName(event)
    {
        setName(event.target.value);
    }

    function handleFeedback (event)
    {
        setFeedback(event.target.value);
    }
    function handleSubmit(event)
    {
        event.preventDefault();
        let data =
        {
            name : name,
            Feedback :  feedback,
            time : new Date().toLocaleString()
        }
        push(ref(db,"feedback"),data)
        .then (()=>
        {
            alert("sent successfully");

        }
        )
        .catch((error)=>alert(error)
        )
        .finally(()=>{
            setName("");
            setFeedback("");
        });
    }

    useEffect(()=>{
        setLoading(true);
        onValue(ref(db,"feedbacks"),(snapshot)=>
        {
            if(snapshot.exists())
            {
                let a=[];
                let text = snapshot.val();
                for(let ditto in text)
                {
                    a.push(text[ditto]);
                }
                setFinalArray(a.reverse());
            }
            else{
                setFinalArray([]);

            }
            setLoading (false);
        })
    },[]);
    

   

    
  
    
    return (
        <div className="feedback-wrapper">
            <div className="feedback-container">
                <h2>Feedback Form</h2>
                <form  className="feedback-form" onSubmit ={handleSubmit}>
                    <div className="group">
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" required  value={name} onChange = {handleName}/>
                    </div>

                    <div className="group">
                        <label htmlFor="feedback">Feedback</label>
                        <textarea id="feedback" name="feedback" required  value={feedback} onChange= {handleFeedback} />
                    </div>

                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
            <div className="feedback-panel">
                <h2>Feedback Received</h2>
                   
    {loading? (<Loader/>) : (
                <ul className="feedback-list">
                {finalArray.length>0? (
                    finalArray.map((obj)=>{
                        return <li className="feedback-item">
                            <strong>{obj.name}</strong>
                            <p>{obj.feedback}</p>
                            <p>{obj.time}</p>
                        </li>
                    })
                )
                : (<p>No Feedback</p>)}
                </ul>
               )}
            </div>
        </div>
    );
}
export default Feedback;

