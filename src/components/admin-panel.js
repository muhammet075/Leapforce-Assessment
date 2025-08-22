import { useState } from "react";
import styles from "@/styles/admin-panel.module.css";

function Adminpanel() {
  const [label, setLabel] = useState("");
  const [title, setTitle] = useState("");
  const [optionalBody, setOptionalBody] = useState("");
  const [optionalButton, setOptionalButton] = useState("");

  function saveData() {
    alert("Opgeslagen");
    console.log({
      label,
      title,
      optionalBody,
      optionalButton,
    });
  }

  return (
    <div className={styles.adminpanel}>
      <div>

        <section>
        <p>Label</p>
        <input id="labelinput" value={label} onChange={(e) => setLabel(e.target.value)} />
        </section>

        <section>
        <p>Title</p>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </section>

        <section>
        <p>Optional body</p>
        <input id="optionalbody" value={optionalBody} onChange={(e) => setOptionalBody(e.target.value)} />
        </section>

        <section>
        <p>Optional button</p>
        <input id="optionalbutton" value={optionalButton} onChange={(e) => setOptionalButton(e.target.value)} />
        </section>

        <button onClick={saveData}>Opslaan</button>
        
      </div>
    </div>
  );
}

export default Adminpanel;
