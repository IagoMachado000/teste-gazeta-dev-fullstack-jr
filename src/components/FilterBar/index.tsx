import styles from "./FilterBar.module.css";

interface FilterBarProps {
    order: "asc" | "desc";
    onOrderChange: (newOrder: "asc" | "desc") => void;
}

export default function FilterBar({ order, onOrderChange }: FilterBarProps) {
    return (
        <div className={styles.filterBar}>
            <span className={styles.label}>ORDENAR POR DATA:</span>
            <div className={styles.controls}>
                <button
                    className={`${styles.sortButton} ${
                        order === "desc" ? styles.active : ""
                    }`}
                    onClick={() => onOrderChange("desc")}
                >
                    Mais Recentes
                </button>
                <button
                    className={`${styles.sortButton} ${
                        order === "asc" ? styles.active : ""
                    }`}
                    onClick={() => onOrderChange("asc")}
                >
                    Mais Antigas
                </button>
            </div>
        </div>
    );
}
