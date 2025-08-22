import React, { useState, useEffect } from "react";
import styles from "@/styles/admin-panel.module.css";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../components/firebase"; 

export default function Adminpanel() {
  //useState variabelen
  const [label, setLabel] = useState("");
  const [title, setTitle] = useState("");
  const [optionalBody, setOptionalBody] = useState("");
  const [optionalButton, setOptionalButton] = useState("");

  const [amountCards, setAmountCards] = useState(0); // aantal cards standaard op 0
  const [cards, setCards] = useState([]); // cards array

  const [success, setSuccess] = useState(false);


  //Data ophalen bij bezoeken admin paneel pagina
  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "ctaData", "mainCTA");
        const docSnap = await getDoc(docRef);

        //als er al data opgeslagen is in de Firebase db dan worden de velden op de admin pagina automatisch aangevuld
        if (docSnap.exists()) {
          const data = docSnap.data();

          // vul inputvelden
          setLabel(data.label || "");
          setTitle(data.title || "");
          setOptionalBody(data.optionalBody || "");
          setOptionalButton(data.optionalButton || "");

          // vul cards array en aantal cards
          if (data.cards && data.cards.length > 0) {
            setAmountCards(data.cards.length);
            setCards(data.cards);
          } else {
            setAmountCards(0);
            setCards([]);
          }
        }
      } catch (error) {
        //als de data niet opgehaald kan worden, toon error
        console.error(error);
      };
    };

    fetchData();
  }, []);




  //Cards array aanpassen als amountCards verandert
  useEffect(() => {
    const newCards = [...cards];

    if (amountCards > cards.length) {
      // voeg lege cards toe
      for (let i = cards.length; i < amountCards; i++) {
        newCards.push({ title: "", description: "", link: "" });
      };
    } else if (amountCards < cards.length) {
      // haal cards weg
      newCards.length = amountCards;
    };

    setCards(newCards);
  }, [amountCards]);




  //Update 1 card veld
  function handleCardChange(index, field, value) {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };



  //Data opslaan in Firebase db
  async function saveData() {
    const data = { label, title, optionalBody, optionalButton, cards };

    try {
      //Vaste document ID "mainCTA" om tte overschrijven
      await setDoc(doc(db, "ctaData", "mainCTA"), data);

      //toon succes popup
      setSuccess(true);

      //na 10 seconden succes popup verwijderen
      setTimeout(() => {
        setSuccess(false);
      }, 10000);

      alert("Data opgeslagen in Firebase DB");

    } catch (error) {
      console.error(error);
    };
  };



  return (
    <div className={styles.adminpanel}>
      <h2>Admin Panel</h2>

      <div>
        <label>Label</label>
        <input value={label} onChange={e => setLabel(e.target.value)} />

        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} />

        <label>Optional Body</label>
        <input value={optionalBody} onChange={e => setOptionalBody(e.target.value)} />

        <label>Optional Button</label>
        <input value={optionalButton} onChange={e => setOptionalButton(e.target.value)} />

        <label>Aantal Cards</label>
        <select value={amountCards} onChange={e => setAmountCards(parseInt(e.target.value))}>
          {[0, 1, 2, 3, 4, 5, 6].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>

        {cards.map((card, index) => (
          <div key={index} className={styles.cardBlock}>
            <h4>Card {index + 1}</h4>

            <label>Title</label>
            <input placeholder="Title" value={card.title} onChange={e => handleCardChange(index, "title", e.target.value)} />

            <label>Description</label>
            <input placeholder="Description" value={card.description} onChange={e => handleCardChange(index, "description", e.target.value)} />

            <label>Link</label>
            <input placeholder="Link" value={card.link} onChange={e => handleCardChange(index, "link", e.target.value)} />
          </div>
        ))}

        <button onClick={saveData}>Opslaan</button>

      {success && (
        <div id="succesmessage"><p>Aanpassingen met succes opgeslagen!</p></div>
      )}


      </div>
    </div>
  );
}
