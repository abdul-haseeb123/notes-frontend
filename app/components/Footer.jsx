import React from "react";
import { Link, Image } from "@nextui-org/react";
import NextLink from "next/link";

import NextImage from "next/image";

function Footer() {
  return (
    <footer className="bg-pink-50 dark:bg-pink-200">
      <div className="container mx-auto p-3 flex flex-wrap justify-evenly gap-2 relative items-center">
        <Image
          src={"/college-chemistry.png"}
          width={210}
          height={210}
          alt="College Chemistry"
          className="w-full object-cover"
          as={NextImage}
        />
        <div className="flex flex-wrap gap-6 ">
          <Link size="lg" href="/lessons" color="danger">
            Lessons
          </Link>

          <Link size="lg" href="/blogs" color="danger">
            Blogs
          </Link>

          <Link size="lg" href="/mcqs" color="danger">
            MCQs
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
