import React ,{useState,useEffect,useContext} from "react";
import "./signup.css"
import noteContext from "../../context/notes/noteContext"
import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup =()=> {
 // const [values,setValues] = useState({})
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [contact,setContact]= useState("");
  const [pass,setPass]=useState("");
  const [confirmpass,setConfirmpass]=useState("");
  const [list,setList]= useState({username,email,contact,pass,confirmpass})
  const [formErrors,setFormErrors]= useState({});
  const [isSubmit,setIsSubmit]= useState(false);
  //const [records,setRecords] = useState([]);

  // const handleChange =(event)=>{
  //  const name = event.target.name;
  //  const value = event.target.value;
  //  console.log(name,value);
  //  setValues({...values,[name]:value})
  // }
  // const navigate = useNavigate();
  const context = useContext(noteContext);
  const {auth, setAuth} = context;
  const navigate = useNavigate();
  const handleFormSubmit =(event)=>{
    event.preventDefault();
    //const newRecord ={...values, id: new Date().getTime().toString() }
    //console.log(records);
    //setRecords([...records, newRecord]);
    setFormErrors(validate(email,contact,username,pass,confirmpass));

    const data = 
    {
      "username": username,
      "email": email,     
      "phone_number": contact,
      "password": pass,
    }
    
    axios.post('http://10.224.1.212:8000/auth/create/user', data)
    .then((result)=>{
      console.log(result.data)
      alert('signup success')
      navigate("/login")
      
     
      console.log(auth.username, auth.email, auth.contact,auth.pass,auth.confirmpass)
      
    })
    .catch((error)=>{
     alert('service error')
     console.log(error)

    })
    
    //setValues({});
    setUsername("");
    setEmail("");
    setContact("");
    setPass("");
    setConfirmpass("");
    setIsSubmit(true);
    setList({...list,username,email,contact,pass,confirmpass})
  
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      //console.log(values);
     console.log(list)
    }
  }, [formErrors]);
  const validate = (email,contact,username,pass,confirmpass) => {
    const errors = {};
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/i;
    const nameregex = /^[a-zA-Z0-9.\-_@*!]{5,15}$/i;
    //const username = fullname.values.trim();
    if (!username) {
      errors.username = "Username is required!";
    }else if (!nameregex.test(username)) {
     errors.username = "Username must be at least 5 characters can have lowercase,uppercase,0-9,_,-,!,@";
   }
    if (!email) {
      errors.email = "Email is required!";
    } else if (!emailregex.test(email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!pass) {
      errors.pass = "Password is required";
    }else if (!passregex.test(pass)) {
      errors.pass = "Password must be at least 6 characters including 1 lowercase,1 uppercase,1 number,and 1 special character !,@,#,$,%,^,&,*,";
    }
    if (!contact) {
      errors.contact = "Contact Number is required!";
    }else if (contact.length <10) {
      errors.contact = "Contact number not less than 10 digits";  
    }  else if (contact.length >10) {
      errors.contact = "Contact number not exceeds 10 digits";  
    }
    if (!confirmpass) {
      errors.confirmpass = "Confirmation of Password is required";
    }else if(pass !=confirmpass){
      errors.confirmpass="Both passwords does not match"
    }
    return errors;
  };
  return(
    <div className="app">
      <div className="login-form">
        <div className="title">
          Sign-Up
        </div>
        
        <form action="" onSubmit={handleFormSubmit}>
          <div className="input-container">
          <label>User Name</label>
          <input name="fullname" placeholder= "Enter Name" id="fullname" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <small className="color">{formErrors.username}</small>
          <div className="input-container">
          <label>Email</label>
          <input  name="email" placeholder= "Enter Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <small className="color">{formErrors.email}</small>
          <div className="input-container">
          <label>Contact</label>
          <input  name="contact" placeholder= "Enter Contact No." id="contact" value={contact} onChange={(e) => setContact(e.target.value)}/>
          </div>
          <small className="color">{formErrors.contact}</small>
          <div className="input-container">
          <label>Password</label>
          <input type="password" name="password" placeholder= "Create Password"id="password" value={pass} onChange={(e) => setPass(e.target.value)}/>
          </div>
          <small className="color">{formErrors.pass}</small>
          <div className="input-container">
          <label>Confirm Password</label>
          <input type="password" name="confirmpassword" placeholder= "Confirm Password"id="confirmpassword" value={confirmpass} onChange={(e) => setConfirmpass(e.target.value)}/>
          </div>
          <small className="color">{formErrors.confirmpass}</small>
        <div>
        
        </div>
        <div><h4>Already have an account?</h4><h2><Link to="/login">Login</Link></h2></div>
        <div className="button-container">
          {/* <input type="submit" /> */}
          <button type="submit" >SUBMIT</button>
        </div>
        
        <h1>@2023 copyright:cdac.in</h1>
        </form>
        {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="container">
            Signed in successfully</div>
      ) : (
         null//<pre>{JSON.stringify(values, undefined, 2)}</pre>
      )}
      </div>
     
    </div>
  )
};
export default Signup;