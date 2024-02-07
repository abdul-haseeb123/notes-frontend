import React from "react";
import McqCard from "./mcqcard";

async function getMcq(slug) {
  const res = await fetch(
    process.env.BACKEND_URL + `/api/mcqs?filters[slug][$eq]=${slug}&populate=*`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export async function generateMetadata({ params }) {
  const data = await getMcq(params.slug);
  const mcq = data.data[0];
  if (data.data.length === 0) {
    return {
      title: "MCQ not found",
    };
  } else {
    const mcq = data.data[0];
    return {
      title: mcq.attributes.title,
      description: mcq.attributes.description,
      type: "article",
      openGraph: {
        title: mcq.attributes.title,
        description: mcq.attributes.description,
        type: "article",
      },
    };
  }
}

async function page({ params }) {
  const data = await getMcq(params.slug);
  const mcq = data.data[0];
  return (
    <main className="container p-4 mx-auto grid place-content-center gap-6 w-full">
      <h1 className="text-3xl font-bold mb-4">{mcq.attributes.title}</h1>
      {mcq.attributes.questions.data.map((question, idx) => (
        <McqCard
          key={question.id}
          question_text={question.attributes.question_text}
          correct_answer={question.attributes.correct_answer}
          choice1={question.attributes.choice1}
          choice2={question.attributes.choice2}
          choice3={question.attributes.choice3}
          choice4={question.attributes.choice4}
          id={idx + 1}
        />
      ))}
    </main>
  );
}

export default page;
