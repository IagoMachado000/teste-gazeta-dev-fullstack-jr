"use client";

import { useState, useMemo } from "react";
import articlesData from "@/data/articles.json";
import NewsCard from "@/components/NewsCard";
import FilterBar from "@/components/FilterBar";
import Sidebar from "@/components/Sidebar";
import { Article } from "@/types/article";

export default function Home() {
    const [order, setOrder] = useState<"asc" | "desc">("desc");

    // Lógica de ordenação: memorizada para performance
    const sortedArticles = useMemo(() => {
        return [...articlesData].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return order === "desc" ? dateB - dateA : dateA - dateB;
        });
    }, [order]);

    return (
        <div className="home-wrapper">
            {/* Coluna Principal: Listagem de Notícias */}
            <section className="news-feed">
                <FilterBar order={order} onOrderChange={setOrder} />

                <div className="articles-list">
                    {sortedArticles.map((article: Article) => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>
            </section>

            {/* Coluna Lateral: Sidebar */}
            <Sidebar />
        </div>
    );
}
