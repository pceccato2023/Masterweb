import "./ContactCard.css"

const ContactCard = (props) =>{

    return (
        <div className="contact-card">
            <img className="contact-img" src={props.img}/>
            <div>
            <p className="contact-name"> {props.name} {props.surname} </p>
            <p className="contact-number">{props.number}</p>
            <button onClick={()=> props.delete(props.id) } className="contact-button">ELIMINAR</button>
            </div>
        </div>
    )
}

export default ContactCard