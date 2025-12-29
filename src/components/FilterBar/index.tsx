import styles from "./FilterBar.module.css";

export type SortField = "date" | "views";
export type SortDirection = "asc" | "desc";

interface FilterBarProps {
    sortBy: SortField;
    direction: SortDirection;
    onSortFieldChange: (field: SortField) => void;
    onDirectionToggle: () => void;
}

export default function FilterBar({
    sortBy,
    direction,
    onSortFieldChange,
    onDirectionToggle,
}: FilterBarProps) {
    return (
        <div className={styles.filterBar}>
            <div className={styles.group}>
                <label htmlFor="sortField" className={styles.label}>
                    ORDENAR POR:
                </label>
                <select
                    id="sortField"
                    className={styles.select}
                    value={sortBy}
                    onChange={(e) =>
                        onSortFieldChange(e.target.value as SortField)
                    }
                >
                    <option value="date">Data de Publicação</option>
                    <option value="views">Número de Visualizações</option>
                </select>
            </div>

            <button
                className={styles.directionButton}
                onClick={onDirectionToggle}
                title={direction === "desc" ? "Decrescente" : "Ascendente"}
            >
                {direction === "desc" ? "▼ Maior primeiro" : "▲ Menor primeiro"}
            </button>
        </div>
    );
}
