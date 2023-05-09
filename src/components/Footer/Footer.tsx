import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href='https://github.com/MaksymKuzmych'>
        <img src='./github.svg' alt='github' className={styles.githubImg} />
      </a>
      <p className={styles.copyright}>Copyright © 2023 Halo Lab</p>
    </footer>
  );
};
