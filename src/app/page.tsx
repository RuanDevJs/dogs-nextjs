"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import axios from "axios";
import Image from "next/image";

interface IPictures {
  createdAt: Date;
  id: string;
  picture_url: string;
  title: string;
  user_id: string;
  username: string;
}

export default function Home() {
  const [pictures, setAllpictures] = useState<IPictures[]>([]);
  const [loadingPictures, setLoadingPictures] = useState(true);
  const [currentPage, setCurrentPage] = useState<number[]>([0]);

  useEffect(() => {
    // https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=6&_user=0
    async function fetchPictures() {
      try {
        const data = (await (
          await axios.get("http://localhost:3000/api/pictures/")
        ).data.pictures) as IPictures[];

        setAllpictures(data);
        setLoadingPictures(false);
      } catch (error) {
        console.error("Error on fetch pictures: ", error);
      }
    }

    fetchPictures();
  }, []);

  return (
    <main>
      <Header />
      {loadingPictures && (
        <p className="animate-transition-page-up">Carregando fotos...</p>
      )}
      <div className="grid grid-cols-3 gap-3 justify-center max-w-[50rem] mx-auto pb-8 animate-transition-page-up">
        {pictures.map((picture, index) => {
          return (
            <div
              key={picture.id}
              className="w-full h-full"
              style={{
                gridColumn: index === 1 ? "4/2" : "auto",
                gridRow: index === 1 ? "span 2" : "auto",
              }}
            >
              <img
                src={picture.picture_url}
                alt={picture.title}
                className="w-full h-full object-cover rounded cursor-pointer hover:brightness-75 transition ease-in-out duration-150"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
