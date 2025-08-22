import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";

function Header() {

    useEffect(() => {
    }, []);



    return(      
        <header className={styles.header}>  
            <div>
                <h1>Leapforce Assessment</h1>
                <h2>Muhammet Kömür</h2>
            </div>
        </header>
    )
}
  
export default Header;