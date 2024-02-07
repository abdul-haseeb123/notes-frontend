import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import NextImage from "next/image";
import CategorySelect from "./categoryselect";
import NextLink from "next/link";

export const metadata = {
  title: "Lessons",
};

async function getLessons(category) {
  if (category != "") {
    const res = await fetch(
      process.env.BACKEND_URL +
        `/api/lessons?filters[categories][name][$eqi]=${category}&populate=*&fields[0]=title&fields[1]=slug&fields[2]=description`,
      {
        cache: "no-store",
      }
    );
    return res.json();
  } else {
    const res = await fetch(
      process.env.BACKEND_URL +
        "/api/lessons?populate=*&fields[0]=title&fields[1]=slug&fields[2]=description",
      {
        cache: "no-store",
      }
    );
    return res.json();
  }
}

async function getCategories() {
  const res = await fetch(process.env.BACKEND_URL + "/api/categories");
  return res.json();
}

function CardComponent({ lesson }) {
  return (
    <Card
      className="max-w-[300px] group hover:shadow-lg transition duration-300 ease-in-out rounded-lg overflow-hidden shadow-lg "
      radius="none"
      as={NextLink}
      href={"/lessons/" + lesson.attributes.slug}
    >
      <CardHeader className="p-0">
        <Image
          src={
            process.env.BACKEND_URL +
            lesson.attributes.cover.data.attributes.url
          }
          as={NextImage}
          alt={lesson.attributes.title}
          className="w-[300px] h-[220px] object-cover rounded-none"
          width={lesson.attributes.cover.data.attributes.width}
          height={lesson.attributes.cover.data.attributes.height}
        />
      </CardHeader>
      <CardBody className="">
        <h1 className="text-2xl font-bold group-hover:text-pink-600">
          {lesson.attributes.title}
        </h1>
        <p className="pt-1 text-sm line-clamp-3 ">
          {lesson.attributes.description}
        </p>
      </CardBody>
      <CardFooter className="gap-2 flex flex-row flex-wrap pt-0">
        {lesson.attributes.categories.data.map((category) => (
          <Chip
            className="bg-pink-600 text-white "
            key={category.attributes.name}
            color="primary"
            size="sm"
          >
            # {category.attributes.name}
          </Chip>
        ))}
      </CardFooter>
    </Card>
  );
}

export default async function lessons({ searchParams }) {
  const category = searchParams["category"] ?? "";
  const data = await getLessons(category);
  const lessons = data.data;

  const categories = await getCategories();
  return (
    <main className="container mx-auto grid p-5 justify-center min-h-[90vh]">
      <div className="w-fit md:ml-auto md:mr-0 ml-auto mr-auto">
        <CategorySelect categories={categories.data} />
      </div>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 place-content-center">
        {lessons.map((lesson) => (
          <CardComponent lesson={lesson} key={lesson.attributes.slug} />
        ))}
      </section>
    </main>
  );
}
