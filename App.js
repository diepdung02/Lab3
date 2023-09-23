import { View } from "react-native"
import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import ContactListItem from "./components/ContactListItem";
import { useEffect, useState } from "react";
import Address from "ipaddr.js";
import { fetchRandomContact } from "./utils/api";
import ContactThumbnail from "./components/ContactThumbnail";

const App=()=>{
  const [contact, setContact] = useState({});
  useEffect(()=>
      {
          fetchRandomContact().then(
              contact => setContact(contact)
          )
      }
  ,[]);
  const {avatar, name, email, phone, cell}= contact;
  console.log(contact);
  return (
    <View style={{flex:1, justifyContent: "center", backgroundColor:"blue"}}>
      <ContactListItem avatar={avatar} name={name} phone={phone}/>
    </View>
  )
}

export default App;