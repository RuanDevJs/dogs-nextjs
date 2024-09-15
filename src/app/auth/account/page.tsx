"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import api from "@/app/lib/axios";
import Modal from "@/components/Modal";

interface IPictures {
  id: string;
  title: string;
  picture_url: string;
  username: string;
  user_id: string;
  createdAt: Date;
}

export default function Account() {
  const session = useSession();
  const sessionUser = session.data?.user;

  const [pictures, setPictures] = useState<IPictures[]>([]);
  const [loadingPictures, setLoadingPictures] = useState(true);

  const [currentPictureId, setCurrentPictureId] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getPicturesFromUserId() {
      try {
        if (sessionUser && sessionUser.id) {
          const response = await api.get(`/pictures/user/${sessionUser.id}`);
          const responseData = response.data.pictures as IPictures[];

          setPictures(responseData);
        }
      } catch (error) {
        if (error instanceof Error) console.error("Error on fetch pictures");
      } finally {
        setLoadingPictures(false);
      }
    }

    getPicturesFromUserId();
  }, [sessionUser]);

  if (session.status === "loading" || loadingPictures) return null;

  function handleClick(pictureId: string) {
    setCurrentPictureId(pictureId);
    setShowModal((oldState) => !oldState);
  }

  function closeModal() {
    setShowModal((oldState) => !oldState);
  }

  return (
    <main className="max-w-[50rem] mx-auto my-5">
      <div className="grid grid-cols-3 gap-5 justify-center max-w-[50rem] mx-auto pb-8 animate-transition-page-up">
        {pictures.length &&
          pictures.map((picture, index) => {
            return (
              <img
                src={picture.picture_url}
                className="w-full h-full object-cover rounded cursor-pointer hover:brightness-75 transition ease-in-out duration-[0.32s]  hover:-translate-y-3 shadow"
                alt=""
                key={picture.id}
                draggable={false}
                onClick={() => handleClick(picture.id)}
              />
            );
          })}
      </div>
      {showModal && (
        <Modal pictureId={currentPictureId} closeModal={closeModal} />
      )}
    </main>
  );
}
