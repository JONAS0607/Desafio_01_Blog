import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

// interface Post {
//   first_publication_date: string | null;
//   data: {
//     title: string;
//     banner: {
//       url: string;
//     };
//     author: string;
//     content: {
//       heading: string;
//       body: {
//         text: string;
//       }[];
//     }[];
//   };
// }

// interface PostProps {
//   post: Post;
// }
interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <div className={styles.container}>
      <Header />
      <h1>{post.slug}</h1>
    </div>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { slug } = params;
  const prismic = getPrismicClient(req);
  const response = await prismic.getByUID('post', String(slug), {});
  console.log(response.data.title);

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    // content: RichText.asHtml(response.data.content),
    // createdAt: new Date(response.last_publication_date).toLocaleDateString(
    //   'pt-BR',
    //   {
    //     day: '2-digit',
    //     month: 'short',
    //     year: 'numeric',
    //   }
    // ),
  };

  return {
    props: { post },
  };
};
