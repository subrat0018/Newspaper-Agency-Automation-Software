import React from "react";

const ImageCard = ({ src }) => {
  return (
    <div className=" max-w-7xl">
      <div class="overflow-hidden  aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
        <div class="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
          <div>
            <div class="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
              <div class="font-bold">Jessie Watsica</div>

              <div class="opacity-60 text-sm ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Distinctio dolores error iure, perferendis sequi totam. Ad
                aliquam aperiam atque deleniti dolor dolorem enim esse et in,
                inventore itaque, pariatur reprehenderit.
              </div>
            </div>
          </div>
        </div>
        <img
          alt=""
          class="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
          src={src}
        />
      </div>
    </div>
  );
};

export default ImageCard;
