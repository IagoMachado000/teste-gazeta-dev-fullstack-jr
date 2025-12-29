"use client";

import Link from "next/link";
import "./../../app/globals.css";
import styles from "./Header.module.css";
import { useSidebar } from "@/context/SidebarContext";

export default function Header() {
    const { toggleSidebar, isOpen } = useSidebar();

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                <button className={styles.menuBtn} onClick={toggleSidebar}>
                    {isOpen ? "✕" : "☰"}
                </button>

                <Link href="/" className={styles.logo}>
                    gazeta do povo
                </Link>
            </div>
        </header>
    );
}
