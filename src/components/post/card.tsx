import Post from "@/src/models/post";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function PostCard(post: Post) {
  return (
    <>
      <Card className="w-full h-[32rem]">
        <CardHeader floated={false} className="h-4/6">
          <Image
            width={1920}
            height={1080}
            src={`${process.env.NEXT_PUBLIC_API_URL}/data/post/${post.id}`}
            alt="image"
            className="object-cover h-full"
          />
        </CardHeader>
        <CardBody className="text-center h-[20%] flex flex-col justify-center">
          <Typography color="blue-gray" className="mb-2 text-lg">
            {post.title}
          </Typography>
          <Typography color="blue-gray" className="text-sm" textGradient>
            {post.category}
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center pt-2 gap-7">
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/data/post/${post.id}/pdf/${post.pdf}`}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex flex-row items-center justify-center w-11/12 h-10 space-x-1 text-white duration-300 rounded-lg bg-navy hover:shadow-lg hover:text-white/80"
          >
            Descargar
          </Link>
        </CardFooter>
      </Card>

      {/* <div className="flex flex-col items-center justify-between p-4 space-y-3 rounded-lg shadow-lg w-full h-[30rem]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Image
            width={1920}
            height={1080}
            src={`${process.env.NEXT_PUBLIC_API_URL}/data/post/${post.id}`}
            alt="image"
            className="object-cover w-64 rounded-lg shadow-md h-72"
          />
          <div className="flex flex-col items-center justify-center w-11/12">
            <div className="text-2xl font-semibold text-center text-black truncate line-clamp-2">
              {post.title}
            </div>
            <div className="text-base font-thin text-center text-black truncate line-clamp-2">
              {post.category}
            </div>
          </div>
        </div>
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/data/post/${post.id}/pdf/${post.pdf}`}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="flex flex-row items-center justify-center w-11/12 h-10 space-x-1 text-white duration-300 rounded-lg bg-navy hover:shadow-lg hover:text-white/80"
        >
          Descargar
        </Link>
      </div> */}
    </>
  );
}
