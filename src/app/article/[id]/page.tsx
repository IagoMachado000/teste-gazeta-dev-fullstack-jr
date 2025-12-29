import articlesData from "@/data/articles.json";
import { Article } from "@/types/article";
import styles from "./ArticleDetail.module.css";
import Image from "next/image";
import Link from "next/link";
import { formatBrazilianDate } from "@/utils/dateFormatter";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ArticlePage({ params }: PageProps) {
    const { id } = await params;

    const article = (articlesData as Article[]).find((a) => a.id === id);

    if (!article) {
        return (
            <div className={styles.notFound}>
                <h1>Notícia não encontrada</h1>
                <Link href="/">Voltar para a Home</Link>
            </div>
        );
    }

    return (
        <article className={styles.container}>
            <Link href="/" className={styles.backLink}>
                ← Voltar para a listagem
            </Link>

            <header className={styles.header}>
                <span className={styles.category}>{article.category}</span>
                <h1 className={styles.title}>{article.title}</h1>
                <div className={styles.metadata}>
                    <time dateTime={article.date}>
                        Publicado em {formatBrazilianDate(article.date)}
                    </time>
                    {article.views && (
                        <span> • {article.views} visualizações</span>
                    )}
                </div>
            </header>

            <div className={styles.imageWrapper}>
                <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>

            <div className={styles.content}>
                {article.content.split("\n").map((paragraph, index) => (
                    <p key={index} style={{ marginBottom: "1.5rem" }}>
                        {paragraph}
                    </p>
                ))}
            </div>
        </article>
    );
}
