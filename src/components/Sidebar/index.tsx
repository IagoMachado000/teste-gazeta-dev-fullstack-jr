import styles from "./Sidebar.module.css";

export default function Sidebar() {
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
                    {categories.map((cat) => (
                        <li key={cat}>
                            <a href="#">{cat}</a>
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
