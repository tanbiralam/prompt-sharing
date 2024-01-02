"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { RWebShare } from "react-web-share"

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

  function handleShareClick(tag) {
    // Open a share dialog or copy a link
    // For example, using the Web Share API to show native sharing options
    if (navigator.share) {
      navigator.share({
        title: 'Share this post',
        text: `Check out this post with tag: ${prompt}`,
        url:"http://localhost:3000",
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      // Here you can implement your own custom sharing logic, such as copying a link
      console.log('Web Share API not supported');
      // For example, you could copy the URL to the clipboard:
      // navigator.clipboard.writeText(window.location.href)
      // .then(() => console.log('URL copied to clipboard'))
      // .catch((error) => console.log('Error copying URL:', error));
    }
  }

  function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6;  i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color;
  }

  function getTextColor(bgColor) {
    // Convert the hex color to RGB
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.replace("#", ""), 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    };
  
    // Calculate the luminance of the background color
    const rgb = hexToRgb(bgColor);
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  
    // Return white text for dark backgrounds and black text for light backgrounds
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  }
  
  const bgColor = generateRandomColor();
  const textColor = getTextColor(bgColor);

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
            <button class="bg-slate-200 px-2 font-medium rounded-xl hover:bg-slate-400 transition-colors ease-in-out capitalize"         
            onClick={() => handleTagClick && handleTagClick(post.tag)}
            style={{ 
              backgroundColor: bgColor,
              color: textColor 
            }}>
              {post.tag}
            </button>

            <button class="bg-slate-200 px-2 font-medium rounded-xl hover:bg-slate-400 transition-colors ease-in-out"   
            onClick={() => handleShareClick(post.prompt)}
>
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
