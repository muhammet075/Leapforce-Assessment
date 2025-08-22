import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";
import settingsIco from "@/assets/icons/settings.svg";

function Header() {

    useEffect(() => {
    }, []);



    return(      
        <header className={styles.header}>  
            <div>
                <Link href="/">
                    <h1>Leapforce Assessment</h1>
                    <h2>Muhammet Kömür</h2>
                </Link>

                <Link href="/admin"><Image src={settingsIco} alt="Instellingen icoon"/>Admin panel</Link>
            </div>
        </header>
    )
}
  
export default Header;