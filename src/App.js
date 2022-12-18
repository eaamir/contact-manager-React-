import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import _ from "lodash";

import './App.css';
import ViewContact from "./components/contact/ViewContact";
import Contacts from './components/contact/contacts';
import Navbar from './components/Navbar';
import { createContact, getAllContacts, getAllGroups } from "./services/contactservices";
import AddContact from "./components/contact/addContact";
import EditContact from './components/contact/EditContact';

function App() {
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [getContacts, setContacts] = useState([]);
  const [getFilteredContacts, setFilteredContacts] = useState([]);
  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: ""
  });
  const [query, setQuery] = useState({ text: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: gropsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(gropsData);

        setLoading(false);
      }
      catch (err) {
        console.log(err.massage);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);

        setLoading(false);
      }
      catch (err) {
        console.log(err.massage);
        setLoading(false);
      }
    };

    fetchData();
  }, [forceRender]);

  const createContactForm = async event => {
    event.preventDefault();
    try {
      const { status } = await createContact(getContact);

      if (status === 201) {
        setContact({});
        setForceRender(!forceRender);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.massage);
    }
  }

  const setContactInfo = (event) => {
    setContact({
      ...getContact,
      [event.target.name]: event.target.value
    });
  };

  const contactSearch = _.debounce(event => {
    setQuery({ ...query, text: event.target.value });
    const allContacts = getContacts.filter((contact) => {
      return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setFilteredContacts(allContacts);
  }, 1000);


  return (
    <div className="App">
      <Navbar query={query} search={contactSearch} />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route path='/contacts' element={<Contacts contacts={getFilteredContacts} loading={loading} />} />
        <Route path='/contacts/add' element={<AddContact loading={loading}
          setContactInfo={setContactInfo}
          contact={getContact}
          groups={getGroups}
          createContactForm={createContactForm} />} />
        <Route path='/contacts/:contactId' element={<ViewContact />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact forceRender={forceRender} setForceRender={setForceRender} />} />
      </Routes>
    </div>

  );
}

export default App;
