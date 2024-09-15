"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import axios from "axios";
import Image from "next/image";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";

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
  const [currentPictureId, setCurrentPictureId] = useState("");

  const [showModal, setShowModal] = useState(false);

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

  function handleModal(pictureId: string) {
    setCurrentPictureId(pictureId);
    setShowModal((oldState) => !oldState);
  }

  function closeModal() {
    setShowModal((oldState) => !oldState);
  }

  return (
    <main>
      <Header />
      {loadingPictures && (
        <div className="w-dvw h-dvh fixed bg-[rgba(0,0,0,32%)] top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <Loading />
        </div>
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
              onClick={() => handleModal(picture.id)}
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
      {showModal && (
        <Modal pictureId={currentPictureId} closeModal={closeModal} />
      )}
    </main>
  );
}
