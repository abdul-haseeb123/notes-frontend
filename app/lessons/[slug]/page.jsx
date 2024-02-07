import React from "react";
import Markdown from "react-markdown";

async function getLesson(slug) {
  const res = await fetch(
    process.env.BACKEND_URL +
      `/api/lessons?populate=cover&filters[slug][$eq]=${slug}&fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=content`
  );
  return res.json();
}

export async function generateMetadata({ params }) {
  const data = await getLesson(params.slug);
  const lesson = data.data[0];
  if (data.data.length === 0) {
    return {
      title: "Lesson not found",
    };
  } else {
    const lesson = data.data[0];
    return {
      title: lesson.attributes.title,
      description: lesson.attributes.description,
      type: "article",
      openGraph: {
        title: lesson.attributes.title,
        description: lesson.attributes.description,
        type: "article",
        images: [
          process.env.BACKEND_URL + lesson.attributes.cover.data.attributes.url,
        ],
      },
    };
  }
}

async function page({ params }) {
  const data = await getLesson(params.slug);
  const lesson = data.data[0];
  return (
    <main className="container p-4 prose dark:prose-invert mx-auto prose-a:text-pink-500 prose-headings:text-pink-400 prose-strong:text-pink-400 prose-lg hover:prose-headings:text-pink-500 hover:prose-a:text-pink-300 prose-h1:text-pink-400 ">
      <Markdown>{lesson.attributes.content}</Markdown>
    </main>
  );
}

export default page;
