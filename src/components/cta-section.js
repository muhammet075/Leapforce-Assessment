import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/firebase";
import styles from "@/styles/cta-section.module.css";
import arrowRight from "@/assets/icons/arrow-right.svg";
import oranjeRoodArrowRight from "@/assets/icons/arrow-right-oranjerood.svg";

export default function CtaSection() {
  const [ctaData, setCtaData] = useState(null); // enkel 1 document

  useEffect(() => {
    const fetchCtaData = async () => {
      try {
        const docRef = doc(db, "ctaData", "mainCTA"); // precies hetzelfde document als in Admin panel
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCtaData(docSnap.data()); // data in state zetten
        } else {
          console.log("Geen data gevonden!");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCtaData();
  }, []);

  if (!ctaData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.ctasection}>
      <div>
        <p>{ctaData.label}</p>
        <h2 dangerouslySetInnerHTML={{ __html: ctaData.title }} />
        {ctaData.optionalBody && <p>{ctaData.optionalBody}</p>}
        {ctaData.optionalButton && <button>{ctaData.optionalButton}<Image src={oranjeRoodArrowRight} alt="Arrow right icon"/></button>}
      </div>


        {ctaData.cards && ctaData.cards.length > 0 && (
          <div className={styles.cards}>
            {ctaData.cards.map((card, index) => (
              <section key={index} className={styles.card}>
                <div>
                  <div>
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                    {card.link && <Link target="_blank" href={card.link}><Image src={arrowRight} alt="Right arrow icon"/></Link>}
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}

    </div>
  );
}
