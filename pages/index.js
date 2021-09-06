import Head from 'next/head'
import Header from '../containers/header'
import Footer from '../containers/footers'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient;

export async function getServerSideProps(context) {
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            image: true
        }
    });

    return {
      props: {
        posts
      },
    }
}

export default function Home({posts}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Cuong Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Cuong Blog!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by editing{' '}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            pages/index.js
          </code>
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          { posts.map(post => (
              <Link href={`/post/${post.id}`}>
                <a
                className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                >
                <img className="w-full h-60 object-cover" src={post.image} />
                <h3 className="text-2xl font-bold">{post.title} &rarr;</h3>
                <p className="mt-4 text-xl">
                    {post.description.slice(0, 100)}...
                </p>
                </a>
            </Link>
          )) }
        </div>
      </main>

      <Footer />
    </div>
  )
}
