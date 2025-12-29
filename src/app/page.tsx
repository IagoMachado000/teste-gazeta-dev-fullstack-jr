"use client";

import { useState, useMemo } from "react";
import articlesData from "@/data/articles.json";
import NewsCard from "@/components/NewsCard";
import FilterBar, { SortDirection, SortField } from "@/components/FilterBar";
import Sidebar from "@/components/Sidebar";
import { Article } from "@/types/article";

export default function Home() {
    const ITEMS_PER_PAGE = 10;
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const [sortBy, setSortBy] = useState<SortField>("date");
    const [direction, setDirection] = useState<SortDirection>("desc");

    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

    const dynamicCategories = useMemo(() => {
        const allCategories = articlesData.map((article) => article.category);

        const uniqueCategories = Array.from(new Set(allCategories));

        return uniqueCategories.sort();
    }, []);

    const mostReadArticles = useMemo(() => {
        return [...articlesData].sort((a, b) => b.views - a.views).slice(0, 5);
    }, []);

    const filteredAndSortedArticles = useMemo(() => {
        let result = [...articlesData];

        if (selectedCategory) {
            result = result.filter(
                (article) => article.category === selectedCategory
            );
        }

        return result.sort((a, b) => {
            let valA, valB;

            if (sortBy === "date") {
                valA = new Date(a.date).getTime();
                valB = new Date(b.date).getTime();
            } else {
                valA = a.views || 0;
                valB = b.views || 0;
            }

            if (direction === "desc") {
                return valB - valA; // Maior para menor
            } else {
                return valA - valB; // Menor para maior
            }
        });
    }, [sortBy, direction, selectedCategory]);

    const visibleArticles = useMemo(() => {
        return filteredAndSortedArticles.slice(0, visibleCount);
    }, [filteredAndSortedArticles, visibleCount]);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    };

    const toggleDirection = () => {
        setDirection((prev) => (prev === "desc" ? "asc" : "desc"));
    };

    return (
        <div className="home-wrapper">
            {/* Coluna Principal: Listagem de Notícias */}
            <section className="news-feed">
                <FilterBar
                    sortBy={sortBy}
                    direction={direction}
                    onSortFieldChange={setSortBy}
                    onDirectionToggle={toggleDirection}
                />

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
                    {visibleArticles.length > 0 ? (
                        visibleArticles.map((article: Article, index) => (
                            <NewsCard
                                key={article.id}
                                article={article}
                                isPriority={index < 2}
                            />
                        ))
                    ) : (
                        <p>Nenhuma notícia encontrada nesta categoria.</p>
                    )}
                </div>

                {visibleCount < filteredAndSortedArticles.length && (
                    <div className="load-more-container">
                        <button
                            className="load-more-button"
                            onClick={handleLoadMore}
                        >
                            CARREGAR MAIS NOTÍCIAS
                        </button>
                        <p className="load-more-info">
                            Mostrando {visibleCount} de{" "}
                            {filteredAndSortedArticles.length} notícias
                        </p>
                    </div>
                )}
            </section>

            {/* Coluna Lateral: Sidebar */}
            <Sidebar
                categories={dynamicCategories}
                mostRead={mostReadArticles}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
        </div>
    );
}
