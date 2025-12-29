import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>
                    <strong>Gazeta do Povo - Teste Técnico</strong>
                </p>
                <p className={styles.copyright}>
                    © {new Date().getFullYear()} Desenvolvido para fins de
                    avaliação.
                </p>
            </div>
        </footer>
    );
}
