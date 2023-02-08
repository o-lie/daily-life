import styles from "@/styles/components/Card.module.scss";

const Card = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.card}>
			{ children }
		</div>
	)
}

export default Card;