import { GetStaticProps } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import { FaRegUser, FaRegCalendar, FaPooStorm } from 'react-icons/fa';
import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Link from 'next/link';
// interface Post {
//   uid?: string;
//   first_publication_date: string | null;
//   data: {
//     title: string;
//     subtitle: string;
//     author: string;
//   };
// }

// interface PostPagination {
//   next_page: string;
//   results: Post[];
// }

// interface HomeProps {
//   postsPagination: PostPagination;
// }
type Post = {
  slug?: string;
  data: {
    title: string | null;
    subtitle: string;
    author: string;
  };
  createdAt: string;
};
interface PostPagination {
  next_page: string | null;
  posts: Post[];
}

export default function Home({ posts, next_page }: PostPagination) {
  return (
    <>
      <Head>
        <title>Jonas Blog</title>
      </Head>
      <Header />
      <div className={styles.container}>
        {posts.map(post => (
          <div key={post.slug}>
            <section className={styles.content}>
              <Link href={`/post/${post.slug}`}>
                <a>
                  <h1 className={styles.title}>{post.data.title}</h1>
                </a>
              </Link>
              <p>{post.data.subtitle}</p>
            </section>

            <section className={styles.info}>
              <FaRegCalendar />
              <time>{post.createdAt}</time>
              <FaRegUser /> <strong>{post.data.author}</strong>
            </section>
          </div>
        ))}
        <a className={styles.more} href="#">
          {next_page !== null ? 'Carregar mais posts' : ''}
        </a>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['results'],
      pageSize: 20,
    }
  );
  /**
   * !! PARA VER TODO O CONTEÚDO QUE IMPORTAMOS DO PRISMIC
   */
  // console.log(JSON.stringify(postsResponse, null, 2));
  // console.log(postsResponse.next_page);
  const posts = postsResponse.results.map(post => {
    return {
      slug: post.uid,

      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
      createdAt: new Date(post.first_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }
      ),
    };
  });
  // console.log(posts);

  return {
    props: {
      posts,
      next_page: postsResponse.next_page,
    },
  };
};
