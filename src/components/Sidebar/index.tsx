import styles from "./Sidebar.module.css";

interface SidebarProps {
    selectedCategory: string | null;
    onCategoryChange: (category: string | null) => void;
}

export default function Sidebar({
    selectedCategory,
    onCategoryChange,
}: SidebarProps) {
    const categories = [
        "Tecnologia",
        "Política",
        "Economia",
        "Esportes",
        "Cultura",
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.widget}>
                <h4 className={styles.title}>CATEGORIAS</h4>
                <ul className={styles.list}>
                    {/* Opção para limpar o filtro */}
                    <li>
                        <button
                            onClick={() => onCategoryChange(null)}
                            className={
                                !selectedCategory ? styles.activeCategory : ""
                            }
                        >
                            Todas as notícias
                        </button>
                    </li>

                    {categories.map((cat) => (
                        <li key={cat}>
                            <button
                                onClick={() => onCategoryChange(cat)}
                                className={
                                    selectedCategory === cat
                                        ? styles.activeCategory
                                        : ""
                                }
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={`${styles.widget} ${styles.newsletter}`}>
                <h4 className={styles.title}>NEWSLETTER</h4>
                <p>Receba o melhor da Gazeta no seu e-mail.</p>
                <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className={styles.input}
                />
                <button className={styles.button}>INSCREVER</button>
            </div>
        </aside>
    );
}
