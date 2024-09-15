"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import axios from "axios";
import Image from "next/image";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";
import FeedPhotos from "@/components/FeedPhotos";

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
  const [wait, setWait] = useState(false);

  const [pages, setPages] = useState<number[]>([0]);
  const [currentPictureId, setCurrentPictureId] = useState("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      const scroll = window.scrollY;
      const height = document.body.offsetHeight - window.innerHeight;

      if (scroll > height * 0.75 && !wait && pages.length < 2) {
        setPages((pages) => [...pages, pages.length * 6]);
        // wait = true;

        // setTimeout(() => {
        //   wait = false;
        // }, 500);
      }
    }

    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [pages]);

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
      {pages.map((page) => {
        return (
          <FeedPhotos key={page} currentPage={page} handleModal={handleModal} />
        );
      })}
      {showModal && (
        <Modal pictureId={currentPictureId} closeModal={closeModal} />
      )}
    </main>
  );
}
