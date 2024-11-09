"use client";
import React from "react";
import { useParams ,useSearchParams} from "next/navigation";
const Course = () => {
    const params = useParams<{v:string}>();
    const searchParams = useSearchParams();
    const v = searchParams.get("v");
  return (
    <div>
      <h1 className="text-2xl text-white font-semibold mb-4">Video {params.v}</h1>
      <p className="text-gray-400"> {v}</p>
    </div>
  );
};

export default Course;
