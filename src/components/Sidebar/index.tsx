"use client";

import Link from "next/link";
import styles from "./Sidebar.module.css";
import { Article } from "@/types/article";
import { useSidebar } from "@/context/SidebarContext";

interface SidebarProps {
    categories: string[];
    mostRead: Article[];
    selectedCategory: string | null;
    onCategoryChange: (category: string | null) => void;
}

export default function Sidebar({
    categories,
    mostRead,
    selectedCategory,
    onCategoryChange,
}: SidebarProps) {
    const { isOpen, closeSidebar } = useSidebar();

    return (
        <>
            {/* O Overlay só existe no mobile quando aberto */}
            {isOpen && (
                <div className={styles.overlay} onClick={closeSidebar} />
            )}

            <aside
                className={`${styles.sidebar} ${
                    isOpen ? styles.sidebarOpen : ""
                }`}
            >
                <div className={styles.widget}>
                    <h4 className={styles.title}>categorias</h4>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <button
                                onClick={() => {
                                    onCategoryChange(null);
                                    closeSidebar();
                                }}
                                className={`${styles.categoryButton} ${
                                    !selectedCategory
                                        ? styles.activeCategory
                                        : ""
                                }`}
                            >
                                Todas as notícias
                            </button>
                        </li>
                        {categories.map((cat) => (
                            <li key={cat} className={styles.listItem}>
                                <button
                                    onClick={() => {
                                        onCategoryChange(cat);
                                        closeSidebar();
                                    }}
                                    className={`${styles.categoryButton} ${
                                        selectedCategory === cat
                                            ? styles.activeCategory
                                            : ""
                                    }`}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.widget}>
                    <h4 className={styles.title}>mais lidas</h4>
                    <ul className={styles.mostReadList}>
                        {mostRead.map((article, index) => (
                            <li
                                key={article.id}
                                className={styles.mostReadItem}
                            >
                                <span className={styles.rank}>{index + 1}</span>
                                <Link
                                    href={`/article/${article.id}`}
                                    className={styles.mostReadTitle}
                                    onClick={closeSidebar}
                                >
                                    {article.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
}
