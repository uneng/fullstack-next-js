import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>BPHTB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Mutar
      </main>

      <footer className={styles.footer}>
      footer
      </footer>
    </div>
  )
}
