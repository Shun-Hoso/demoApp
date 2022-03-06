import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { Heading } from '@chakra-ui/react';

type Post = {
  id: number;
  title: string;
};

type Props = {
  posts: Post[];
};

const Home: FC<Props> = (props) => {
  return (
    <div>
      <Heading color="red">Hello, Next.js with Chakra UI </Heading>
      <h2>POSTの一覧</h2>
      <table>
        {props.posts.map((post) => (
          <tr key={post.id}>
            <td>{post.id}.</td>
            <td>{post.title}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch('http://api:3000/posts', { method: 'GET' });
  const json = await response.json();

  return {
    props: {
      posts: json,
    },
  };
};

export default Home;
