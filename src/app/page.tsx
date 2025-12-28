"use client";

import { useState, useMemo } from "react";
import articlesData from "@/data/articles.json";
import NewsCard from "@/components/NewsCard";
import FilterBar from "@/components/FilterBar";
import Sidebar from "@/components/Sidebar";
import { Article } from "@/types/article";

export default function Home() {
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

    // Lógica de ordenação: memorizada para performance
    const filteredAndSortedArticles = useMemo(() => {
        let result = [...articlesData];

        if (selectedCategory) {
            result = result.filter(
                (article) => article.category === selectedCategory
            );
        }

        return result.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return order === "desc" ? dateB - dateA : dateA - dateB;
        });
    }, [order, selectedCategory]);

    return (
        <div className="home-wrapper">
            {/* Coluna Principal: Listagem de Notícias */}
            <section className="news-feed">
                <FilterBar order={order} onOrderChange={setOrder} />

                {selectedCategory && (
                    <div style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
                        Mostrando notícias de:{" "}
                        <strong>{selectedCategory}</strong>
                        <button
                            onClick={() => setSelectedCategory(null)}
                            style={{
                                marginLeft: "10px",
                                cursor: "pointer",
                                border: "none",
                                background: "none",
                                color: "red",
                            }}
                        >
                            (Limpar filtro)
                        </button>
                    </div>
                )}

                <div className="articles-list">
                    {filteredAndSortedArticles.length > 0 ? (
                        filteredAndSortedArticles.map((article: Article) => (
                            <NewsCard key={article.id} article={article} />
                        ))
                    ) : (
                        <p>Nenhuma notícia encontrada nesta categoria.</p>
                    )}
                </div>
            </section>

            {/* Coluna Lateral: Sidebar */}
            <Sidebar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
        </div>
    );
}
