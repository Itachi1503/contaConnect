import React, {useState,useEffect} from 'react'
import NavBar from './NavBar'
import './Contacts.css'
import Edit from './edit.png'
import Delete from './delete.png'
import { toast } from 'react-toastify';


export default function Contacts( { searchTerm ,onSearchChange}) {
  const [contacts, setContacts] = useState(()=> {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [editContactId, setEditContactId] = useState(null);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddToContact = ()=> {
    if (!userName.trim() || !phone.trim()) {
      toast.warning("Field Empty");
      return; 
  }

  const duplicateContact = contacts.find((contact)=> {
   return contact.userName.toLowerCase() === userName.toLowerCase() || 
    contact.phone === phone;
  })

  if(duplicateContact) {
    toast.warning("Already in list");
    setUserName("");
    setPhone("");
    return;
  }

    const newContact = {
      id: Date.now(),
      userName,
      phone,
    }

    setContacts((prevContact => {
      const updatedContacts = [...prevContact, newContact];
      return updatedContacts.sort((a, b)=> a.userName.toLocaleLowerCase().localeCompare(b.userName.toLowerCase()));
    }))

    setUserName("");
    setPhone("");
    toast.success("Added Successfully");
  }

const handleDeleteContact = (id)=> {
    setContacts(prevContact => {
      const updatedContacts = prevContact.filter(contact => contact.id !== id);
      return updatedContacts.sort((a, b)=> a.userName.toLocaleLowerCase().localeCompare(b.userName.toLowerCase()));
    })
    toast.success("Contact Deleted");
}

  const handleEditContact = (id) => {
    const contactToEdit = contacts.find(contact => contact.id === id);
    if(contactToEdit) {
      setUserName(contactToEdit.userName);
      setPhone(contactToEdit.phone);
      setEditContactId(id);
    }
    
}
  
const handleUpdateContact = ()=> {
  setContacts(prevContact => prevContact.map(contact => {
    if(contact.id === editContactId) {
      return {...contact, userName, phone};
    }
    return contact;
  }).sort(((a, b)=> a.userName.toLocaleLowerCase().localeCompare(b.userName.toLowerCase()))))

  setUserName("");
  setPhone("");
  setEditContactId(null)
  toast.success("Updated Sucessfully");
}


const displayedContacts = contacts.filter((contact)=> {
  return contact.userName.toLowerCase().includes(searchTerm.toLowerCase());
});

const handleKeyDown = (e)=> {
  if (e.key === "Enter"){
    handleAddToContact();
  }
   
}



  return (

    <div className='big-container'>
        <NavBar onSearchChange={onSearchChange} />
        <div className="contact-container">
            <h1 className='heading'>My contact List</h1>
            <div className='contact-input'>
              <div className="inputs">
              <input value={userName} onChange={e => setUserName(e.target.value)} onKeyDown={e => handleKeyDown(e)} placeholder='User Name' className="user" />
              <input value={phone} onChange={e => setPhone(e.target.value)} onKeyDown={e => handleKeyDown(e)} placeholder='Conatct No.' className="user"/>
              </div>
             
            <button className="add-btn"  onClick={editContactId ? handleUpdateContact : handleAddToContact}>{editContactId ? "Update" : "Add Contact" }</button>
            {editContactId && <button  onClick={()=> {
              setUserName("");
              setPhone("");
              setEditContactId(null);
            }} className="add-btn cancle">Cancle</button>}
            </div>
            <ul>   
              {displayedContacts.length !== 0 ?  displayedContacts.map(contact => {
               return ( contact.userName && contact.phone &&
                  <li key={contact.id} className='contact-list'>
                    <div className='user-info'>
                      <input type='text' readOnly className='list' value={contact.userName}/>
                      <input type='text' readOnly className='list' value={contact.phone.substring(0, 6) + " " + contact.phone.substring(5)}/>
                    </div>
                    <div className='user-btn'>
                      <button onClick={() => handleEditContact(contact.id)} className='ed-btn' ><img src={Edit} alt="Edit" /></button>
                      <button onClick={()=> handleDeleteContact(contact.id)} className='ed-btn'><img src={Delete} alt="Delete"/></button> 
                    </div>
                   

                </li>
                
                ) 
              }) : (<li className='no-result'>No results</li>)}
              
            </ul>
        </div> 
    </div>
  )
}

Contacts.defaultProps = {
  searchTerm: ""
};