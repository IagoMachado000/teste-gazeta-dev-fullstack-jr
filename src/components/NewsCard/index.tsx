import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import styles from "./NewsCard.module.css";

interface NewsCardProps {
    article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
    return (
        <Link href={`/article/${article.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                {/* Usamos o componente Image do Next para performance */}
                <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>

            <article className={styles.content}>
                <span className={styles.category}>{article.category}</span>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.summary}>{article.summary}</p>

                <div className={styles.footer}>
                    <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString("pt-BR")}
                    </time>
                    {article.views && (
                        <span> • {article.views} visualizações</span>
                    )}
                </div>
            </article>
        </Link>
    );
}
