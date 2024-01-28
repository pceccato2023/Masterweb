import React from "react";
import ContactCard from "../ContactCard/ContactCard.js";
import "./ListContacts.css";
import {useDebounce} from "use-debounce";

const ListContacts = () => {
  const URL = "http://localhost:3000/contacts";
  const URL_FILTER ="http://localhost:3000/contacts?name="

  const [contactList, setContactList] = React.useState([]);
  const [newContact, setNewContact] = React.useState([]);
  const [filter,setFilter] = React.useState("");
  const [filterWithTime] = useDebounce(filter,1000)
  const [total,setTotal] = React.useState(0);

  React.useEffect(() => {
    getAllContactsFromApi();
  }, [filterWithTime]);

  React.useEffect(() => {
    const sum = contactList.length;
    setTotal(sum);
    console.log(sum)
  },[contactList])

  const getAllContactsFromApi = () => {
    fetch(URL_FILTER + filter)
      .then((response) => response.json())
      .then((data) => setContactList(data));
    console.log(contactList);
  };

  const deleteContact = React.useCallback((id) => {
    console.log(URL + "/" + id);
    fetch(URL + "/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => getAllContactsFromApi());
  }, []);

  const submitNewContact = (event) =>{
    event.preventDefault();

    fetch(URL,{
      method:"POST",
      body: JSON.stringify(newContact),
      headers: {
        "Content-Type":"application/json",
      }
    })
    .then((response) => response.json())
    .then((data) => {
      getAllContactsFromApi();
      setNewContact({
        name:"",
        surname:"",
        img:"",
        telefono:"",
      })
    })


  }

  return (
    <div>
      <h2>Mi agenda ( NUMERO!!)</h2>
      {contactList.map((contact) => (
        <ContactCard
          id={contact.id}
          name={contact.name}
          surname={contact.surname}
          img={contact.img}
          number={contact.telefono}
          delete={deleteContact}
        />
      ))}
      <h2>Buscar</h2>
      <input className="newcontact-input"
      type="text"
      value={filter}
      onChange={(event) => setFilter(event.target.value)}>
      </input>
      
      <h2>Añadir nuevo contacto</h2>
      <div className="form-container">
      <form 
        onSubmit={(event) => {
          submitNewContact(event);
        }}
      >
        <label> Nombre</label>
        <input className="newcontact-input"
          type="text"
          name="name"
          value={newContact.name}
          onChange={(event) =>
            setNewContact({ ...newContact, name: event.target.value })
          }
        />
        <label>Apellido</label>
        <input className="newcontact-input"
          type="text"
          name="surname"
          value={newContact.surname}
          onChange={(event) =>
            setNewContact({ ...newContact, surname: event.target.value })
          }
        />
        <label>Imagen</label>
        <input className="newcontact-input"
          type="text"
          name="img"
          value={newContact.img}
          onChange={(event) =>
            setNewContact({ ...newContact, img: event.target.value })
          }
        />
        <label> Teléfono</label>
        <input className="newcontact-input"
          type="text"
          name="number"
          value={newContact.telefono}
          onChange={(event) =>
            setNewContact({ ...newContact, telefono: event.target.value })
          }
        />
        <button className="newContact-btn" type="submit">Añadir presidente</button>
      </form>
      </div>
    </div>
  );
};

export default ListContacts;
