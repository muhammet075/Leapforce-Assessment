import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebase";

import styles from "@/styles/cta-section.module.css";

export default function CtaSection() {

  useEffect(() => {
    const fetchCtaData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ctaData"));
        const dataArray = [];
        querySnapshot.forEach(doc => {
          dataArray.push({ id: doc.id, ...doc.data() });
        });
        console.log(dataArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCtaData();
  }, []);

  return (
    <div className={styles.ctasection}>
      <div>
        <p>ctaSection</p>
      </div>
    </div>
  );
}
