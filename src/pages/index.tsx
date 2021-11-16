import { GetStaticProps } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import { FaRegUser, FaRegCalendar } from 'react-icons/fa';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Jonas Blog</title>
      </Head>
      <Header />
      <div className={styles.container}>
        <section className={styles.content}>
          <a href="#">
            <h1 className={styles.title}>Como utilizar Hooks</h1>
          </a>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            reprehenderit necessitatibus incidunt eius quod odit illum aliquam
            maiores laudantium, aliquid temporibus quisquam voluptatibus aut
            minima ut quasi, accusantium magni expedita.
          </p>
        </section>

        <section className={styles.info}>
          <FaRegCalendar />
          <time>15 Marc 2021</time>
          <FaRegUser /> <strong>Joseph Oliveira</strong>
        </section>
        <a className={styles.more} href="#">
          Carregar mais posts
        </a>
      </div>
    </>
  );
}

// export const getStaticProps = async () => {
//   const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query();

//   // TODO
// };
