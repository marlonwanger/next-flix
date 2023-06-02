"use client";

import React from "react";
import Image from 'next/image'
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

export default function FavoriteComponent() {

  const router = useRouter();

  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="text-center text-white">
        Loading...
      </div>
    )
  }

  return (
    <div onClick={() => router.push('/')}>
      <div className=" group flex-row w-44 mx-auto">
        <div
          className="
          w-44
          h-44
          rounded-md
          flex
          items-center
          justify-center
          border-2
          border-transparent
          group-hover:cursor-pointer
          group-hover:border-white
          overflow-hidden
        "
        >
          <Image
            src="/images/default-blue.png"
            alt="1"
            width={172}
            height={172}
          />
        </div>
        <div
          className="
        mt-4
        text-gray-400
        text-2xl
        text-center
        group-hover:text-white
      "
        >
          {user?.currentUser?.name}
        </div>
      </div>
    </div>
  );
}
