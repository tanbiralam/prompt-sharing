"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    
  
      <div class="prompt_card w-72 bg-white rounded-b-lg rounded-t-md border-t-8 border-green-400  justify-around shadow-md">
        <Image
          src={post.creator.image}
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain"
        />
        <p class="text-lg font-bold font-sans">{post.creator.username}</p>
        <div class="py-3">
          <p class="text-gray-400 text-sm">{post.prompt}</p>
        </div>
        <div class="flex justify-between">
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === post.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt="tick_image"
              width={12}
              height={12}
            />
          </div>
          <div class="text-sm flex gap-2">
            <button class="bg-slate-200 px-2 rounded-xl hover:bg-slate-400 transition-colors ease-in-out capitalize"         
            onClick={() => handleTagClick && handleTagClick(post.tag)}
>
              {post.tag}
            </button>

            <button class="bg-slate-200 px-2 rounded-xl hover:bg-slate-400 transition-colors ease-in-out">
              Share
            </button>

            {/* Edit and Delete Action  */}

            {session?.user.id === post.creator._id &&
              pathName === "/profile" && (
                <div className="text-sm flex gap-2 font-medium">
                  <button
                    class="bg-slate-200 px-2 rounded-xl hover:bg-slate-400 transition-colors ease-in-out"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-500 text-white font-medium px-2 rounded-xl hover:bg-slate-400 transition-colors ease-in-out"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
  );
};

export default PromptCard;
