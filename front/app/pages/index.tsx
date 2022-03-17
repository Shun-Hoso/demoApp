import React, { FC, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Heading } from '@chakra-ui/react';
import { initializeApollo } from '../lib/apolloClient';
import { GetPostAllDocument } from '../graphql/generated';
import { FlashNotice } from '../components/uiParts/FlashNotice';
import { CommonButton } from '../components/uiParts/Button/CommonButton';

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
      < FlashNotice />
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
      <CommonButton text={'更新する'} color={'blue'} mt={5} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo(process.env.LOCAL_API_URL);
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
