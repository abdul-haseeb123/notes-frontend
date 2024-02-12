import Markdown from "react-markdown";

async function getAbout() {
  const res = await fetch(process.env.BACKEND_URL + "/api/about");
  return res.json();
}

export const metadata = {
  title: "About",
  description: "About the site",
  type: "article",
  openGraph: {
    title: "About",
    description: "About the site",
    type: "article",
  },
};

export default async function about() {
  const data = await getAbout();
  const about = data.data;
  return (
    <main className="container p-4 prose dark:prose-invert mx-auto prose-a:text-pink-500 prose-headings:text-pink-400 prose-strong:text-pink-400 prose-lg hover:prose-headings:text-pink-500 hover:prose-a:text-pink-300 prose-h1:text-pink-400">
      <Markdown>{about.attributes.content}</Markdown>
    </main>
  );
}
