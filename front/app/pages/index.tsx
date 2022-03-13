import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import { Heading } from '@chakra-ui/react';
import { initializeApollo } from '../lib/apolloClient';
import { GetPostAllDocument } from '../graphql/generated';

type Post = {
  id: number;
  title: string;
};

type Props = {
  posts: Post[];
};

const Home: FC<Props> = ({posts}) => {
  return (
    <div>
      <Heading color="red">Hello, Next.js with Chakra UI </Heading>
      <h2>POSTの一覧</h2>
      <table>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>{post.id}.</td>
            <td>{post.title}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo('http://api:3000/graphql');
  try {
    const getPostsResponse = await apolloClient.query({
      query: GetPostAllDocument,
    });

  return {
    props: {
      posts: getPostsResponse.data.posts,
    },
  };
  } catch (err) {
    return {
      notFound: true,
    }
  }
};

export default Home;
