import Head from 'next/head'
import Header from '../../containers/header';
import Footer from '../../containers/footers';
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient;

export async function getServerSideProps(context) {
    const {id} = context.params;

    const post = await prisma.post.findFirst({
        select: {
            id: true,
            title: true,
            description: true,
            image: true
        },
        where: {
            id: parseInt(id)
        }
    });

    return {
      props: {
        post
      },
    }
}

export default function PostPage({post}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          {post.title}
        </h1>

        <img className="w-full h-96 object-contain my-3" src={post.image} />

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            {post.description}
        </div>
      </main>

      <Footer />
    </div>
  )
}
