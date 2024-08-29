"use client"; // Ajoutez cette ligne en haut
import Header from './components/Header';
import styles from './styles/Home.module.css';

const HomePage = () => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to ViviLink</h1>
                <p className={styles.description}>
                    Connect and manage your neighborhood, associations, and events effortlessly.
                </p>
                <div className={styles.cta}>
                    <a href="/register" className={styles.ctaButton}>
                        Get Started
                    </a>
                </div>
            </main>
        </>
    );
};

export default HomePage;
