"use client";

import React, { useEffect, useState } from "react";
import api from "@/app/lib/axios";
import Loading from "../Loading";
import Image from "next/image";
import Modal from "../Modal";

interface IPictures {
  createdAt: Date;
  id: string;
  picture_url: string;
  title: string;
  user_id: string;
  username: string;
}

interface IProps {
  currentPage: number;
  handleModal: (pictureId: string) => void;
}

export default function FeedPhotos({ currentPage, handleModal }: IProps) {
  const [pictures, setPictures] = useState<IPictures[]>([]);
  const [loadingPictures, setLoadingPictures] = useState(true);

  const [currentPictureId, setCurrentPictureId] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchPictures() {
      setLoadingPictures(true);
      if (currentPage >= 18) return;

      const data = (await (
        await api.get(`/pictures?page=${currentPage}`)
      ).data.pictures) as IPictures[];

      setPictures(data);

      setTimeout(() => {
        setLoadingPictures(false);
      }, 700);
    }

    fetchPictures();
  }, [currentPage]);

  function handleClick(pictureId: string) {
    setCurrentPictureId(pictureId);
    setShowModal((oldState) => !oldState);
    handleModal(pictureId);
  }

  if (loadingPictures) {
    return (
      <div className="w-dvw h-dvh fixed bg-[rgba(0,0,0,32%)] top-0 bottom-0 left-0 right-0 flex items-center justify-center ">
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 justify-center max-w-[50rem] mx-auto pb-5 opacity-0 animate-animate-feed">
      {pictures.map((picture, index) => {
        return (
          <div
            key={picture.id}
            className="w-full h-full"
            style={{
              gridColumn: index === 3 ? "4/2" : "auto",
              gridRow: index === 3 ? "3/1" : "auto",
            }}
            onClick={() => handleClick(picture.id)}
          >
            <Image
              src={picture.picture_url}
              alt={picture.title}
              className="w-full h-full object-cover rounded cursor-pointer hover:brightness-75 transition ease-in-out duration-150"
              draggable={false}
              width={460}
              height={460}
            />
          </div>
        );
      })}
    </div>
  );
}
