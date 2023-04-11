import React from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
const AboutUs = () => {
  const [currPage, setCurrPage] = useState("About");
  return (
    <div>
      <Navbar currPage={currPage} setCurrPage={setCurrPage} />

      <div class=" mt-16 2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div class="flex flex-col lg:flex-row justify-between gap-8">
          <div class="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 class="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">
              About Us
            </h1>
            <p class="font-normal text-base leading-6 text-gray-600 dark:text-white">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis, sed fugiat aliquid provident eos excepturi est modi.
              Beatae rerum sapiente similique, optio, modi repellat error nemo
              maiores expedita nesciunt blanditiis! A consequuntur in error
              placeat atque officia. Temporibus inventore ad nobis fugiat fuga
              saepe nemo asperiores! Amet, odio maxime? Veritatis fuga, eveniet
              incidunt natus eius cumque! Earum dolorum nemo quo. Expedita hic,
              voluptates, omnis soluta ea nisi alias vero nam dolor aspernatur
              esse recusandae asperiores iste dolores ipsam laborum? Non
              eligendi nihil alias esse excepturi minima cumque eos, iste
              aliquam.
            </p>
          </div>
          <div class="w-full lg:w-8/12">
            <img
              class="w-full h-full"
              src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
              alt="A group of People"
            />
          </div>
        </div>

        <div class="flex lg:flex-row flex-col justify-between gap-8 pt-12">
          <div class="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 class="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">
              Our Story
            </h1>
            <p class="font-normal text-base leading-6 text-gray-600 dark:text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatem at fugit laborum beatae, repellendus quaerat temporibus
              quia molestias rem autem quis quasi tenetur! Rem architecto non a
              quaerat reprehenderit perferendis. Porro commodi sit, ratione
              saepe hic, magnam ipsam accusamus dolorum cum voluptas rem qui
              vero distinctio corporis nam, laboriosam dolorem! Ad, voluptates
              illum mollitia impedit dolorem soluta modi tempore dolorum?
            </p>
          </div>
          <div class="w-full lg:w-8/12 lg:pt-8">
            <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
              <div class="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  class="md:block hidden"
                  src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png"
                  alt="Alexa featured Image"
                />
                <img
                  class="md:hidden block"
                  src="https://i.ibb.co/zHjXqg4/Rectangle-118.png"
                  alt="Alexa featured Image"
                />
                <p class="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">
                  Alexa
                </p>
              </div>
              <div class="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  class="md:block hidden"
                  src="https://i.ibb.co/fGmxhVy/Rectangle-119.png"
                  alt="Olivia featured Image"
                />
                <img
                  class="md:hidden block"
                  src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png"
                  alt="Olivia featured Image"
                />
                <p class="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">
                  Olivia
                </p>
              </div>
              <div class="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  class="md:block hidden"
                  src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png"
                  alt="Liam featued Image"
                />
                <img
                  class="md:hidden block"
                  src="https://i.ibb.co/C5MMBcs/Rectangle-120.png"
                  alt="Liam featued Image"
                />
                <p class="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">
                  Liam
                </p>
              </div>
              <div class="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  class="md:block hidden"
                  src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png"
                  alt="Elijah featured image"
                />
                <img
                  class="md:hidden block"
                  src="https://i.ibb.co/ThZBWxH/Rectangle-121.png"
                  alt="Elijah featured image"
                />
                <p class="font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4">
                  Elijah
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
