import styles from './style.module.scss';
import Link from 'next/link';

interface Props {
	categories: { slug: string; name: string }[];
}

export function Categories({ categories }: Props) {
	return (
		<div className={styles.categories}>
			<span>Категории</span>
			<ul className={styles.categoriesList}>
				{categories.map((i) => {
					return (
						<li key={i.slug}>
							<Link href={`blog/${i.slug}`}>{i.name}</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
