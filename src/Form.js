import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from 'yup';


const formSchema = yup.object().shape({
    name: yup.string().required("Must have a name."),
    size: yup
      .string()
      .required('Must have a pizza size'),
    pepperoni: yup.boolean()
    .oneOf([true], "please agree to terms of use"),
    bacon: yup.boolean(),
    // .oneOf([true], "please agree to terms of use"),
    sausage: yup.boolean(),
    // .oneOf([true], "please agree to terms of use"),
    ham: yup.boolean(),
    // .oneOf([true], "please agree to terms of use"),
    special: yup.string(),
   
  });
  
  export default function Form() {
    
    const [buttonDisabled, setButtonDisabled] = useState(true);
  
    
    const [formState, setFormState] = useState({
      name: "",
      size: "",
      pepperoni: "",
      bacon:"",
      sausage:"",
      ham:"",
      special: ""
     
     
    });
  
    const [errors, setErrors] = useState({
      name: "",
      size: "",
    //   pepperoni: "",
    //   bacon:"",
    //   sausage:"",
    //   ham:"",
    //   special: ""
     
    });
  
   
    const [post, setPost] = useState([]);
  
    useEffect(() => {
      formSchema.isValid(formState).then(valid => {
        setButtonDisabled(!valid);
      });
    }, [formState]);
  
    const formSubmit = e => {
      e.preventDefault();
      axios
        .post("https://reqres.in/api/users", formState)
        .then(res => {
          setPost(res.data); 
          console.log("success", post);
          setFormState({
            name: "",
            size: "",
            pepperoni: "",
            bacon:"",
            sausage:"",
            ham:"",
            special: ""
           
          });
        })
        .catch(err => console.log(err.response));
    };
  
    const validateChange = e => {
     
      yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
          setErrors({
            ...errors,
            [e.target.name]: ""
          });
        })
        .catch(err => {
          setErrors({
            ...errors,
            [e.target.name]: err.errors[0]
          });
        });
    };
  
    const inputChange = e => {
      e.persist();
      const newFormData = {
        ...formState,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value
      };
  
      validateChange(e);
      setFormState(newFormData);
    };
  
    return (
      <form onSubmit={formSubmit}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder='Name'
            value={formState.name}
            onChange={inputChange}
          />
          {errors.name.length > 1 ? <p className="error">{errors.name}</p> : null}
        </label><br/>
        <label htmlFor="size">
        What pizza size?
        <select
        id='size'
        name='size'
        onChange={inputChange}>
            <option value='small'>small</option>
            <option value='medium'>medium</option>
            <option value='large'>large</option>
            <option value='xlarge'>xlarge</option>
        </select>
        </label><br/>
        <label htmlFor="special">
         Special Requests
          <input
            type='text'
            name="special"
            placeholder='Special Requests'
            value={formState.special}
            onChange={inputChange}
          />
       
        </label><br/>
        <label htmlFor="pepperoni" className="pepperoni">
          <input
            type="checkbox"
            name="pepperoni"
            checked={formState.pepperoni}
            onChange={inputChange}
          />
          pepperoni
        </label><br/>
        <label htmlFor="bacon" className="bacon">
          <input
            type="checkbox"
            name="bacon"
            checked={formState.bacon}
            onChange={inputChange}
          />
          bacon
        </label><br/>
        <label htmlFor="sausage" className="sausage">
          <input
            type="checkbox"
            name="sausage"
            checked={formState.sausage}
            onChange={inputChange}
          />
          sausage
        </label><br/>
        <label htmlFor="ham" className="ham">
          <input
            type="checkbox"
            name="ham"
            checked={formState.ham}
            onChange={inputChange}
          />
          ham
        </label><br/>
        
        
        
        <button disabled={buttonDisabled}>Order Now </button>

        <pre>{JSON.stringify(post, null, 3)}</pre>
      </form>
    );
  }