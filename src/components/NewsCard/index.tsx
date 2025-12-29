import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import styles from "./NewsCard.module.css";
import { formatBrazilianDate } from "@/utils/dateFormatter";

interface NewsCardProps {
    article: Article;
    isPriority?: boolean;
}

export default function NewsCard({
    article,
    isPriority = false,
}: NewsCardProps) {
    return (
        <Link href={`/article/${article.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    priority={isPriority}
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 300px, 250px"
                />
            </div>

            <article className={styles.content}>
                <span className={styles.category}>{article.category}</span>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.summary}>{article.summary}</p>

                <div className={styles.footer}>
                    <time dateTime={article.date}>
                        {formatBrazilianDate(article.date)}
                    </time>
                    {article.views && (
                        <span> • {article.views} visualizações</span>
                    )}
                </div>
            </article>
        </Link>
    );
}
