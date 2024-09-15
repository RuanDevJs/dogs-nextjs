import { PawPrint } from "phosphor-react";
import Loading from "../Loading";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import Modal from "./Modal";
import api from "@/app/lib/axios";

type PictureId = string;

interface IPicture {
  createdAt: Date;
  id: PictureId;
  picture_url: string;
  title: string;
  user_id: string;
  username: string;
}

interface IProps {
  pictureId: PictureId;
  closeModal: () => void;
}

export default function Overlay({ pictureId, closeModal }: IProps) {
  const [picture, setPicture] = useState<IPicture | null>(null);
  const [loadingPicture, setLoadingPicture] = useState(true);

  useEffect(() => {
    async function fetchPicture() {
      try {
        const fetchedPictureFromDB = await (
          await api.get(`/pictures/${pictureId}`)
        ).data;

        setPicture(fetchedPictureFromDB.picture);
      } catch (error) {
        console.error("Could not fetch picture");
      } finally {
        setTimeout(() => setLoadingPicture(false), 500);
      }
    }
    fetchPicture();
  }, [pictureId]);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  }

  return (
    <div
      onClick={handleClick}
      className="w-dvw h-dvh fixed bg-[rgba(0,0,0,62%)] top-0 bottom-0 left-0 right-0 flex items-center justify-center"
    >
      {loadingPicture ? <Loading /> : <Modal data={picture!} />}
    </div>
  );
}
