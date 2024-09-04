"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import axios from "axios";
import Image from "next/image";

interface IPictures {
  id: number;
  src: string;
}

export default function Home() {
  const [pictures, setAllpictures] = useState<IPictures[]>([]);
  const [loadingPictures, setLoadingPictures] = useState(true);

  useEffect(() => {
    async function fetchPictures() {
      const data = (await (
        await axios.get(
          "https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=6&_user=0"
        )
      ).data) as IPictures[];
      setAllpictures(data);
      setLoadingPictures(false);
    }

    fetchPictures();
  });

  return (
    <main>
      <Header />
      {loadingPictures && (
        <p className="animate-transition-page-up">Carregando fotos...</p>
      )}
      <div className="grid grid-cols-3 gap-2 justify-center items-center max-w-[50rem] mx-auto pb-8 animate-transition-page-up">
        {pictures.map((picture, index) => {
          return (
            <img
              src={picture.src}
              className="w-full object-cover rounded cursor-pointer hover:brightness-75 transition ease-in-out duration-150"
              alt=""
              key={picture.id}
              style={{
                gridColumn: index === 3 ? "4/2" : "auto",
                gridRow: index === 3 ? "3/1" : "auto",
              }}
              draggable={false}
            />
          );
        })}
      </div>
    </main>
  );
}
