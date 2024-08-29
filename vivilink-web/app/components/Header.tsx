"use client"; // Marque ce composant comme client

import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">ViviLink</Link>
            </div>
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <Link href="/login">Login</Link>
                    </li>
                    <li>
                        <Link href="/register">Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
