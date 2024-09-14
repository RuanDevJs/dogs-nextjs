"use client";

import { useSession } from "next-auth/react";
import { Dog, PawPrint } from "phosphor-react";

import * as firebaseStorage from "firebase/storage";
import { ChangeEvent, useRef, useState } from "react";

import { firebaseApp } from "@/app/services/firebase";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import api from "@/app/lib/axios";

const formSchema = z.object({
  title: z.string().min(5, "O título preciso conter no mínimo 5 caracteres"),
});

type TypeFormData = z.infer<typeof formSchema>;

export default function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<TypeFormData>({
    resolver: zodResolver(formSchema),
  });

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<null | string>(null);

  const { title } = getValues();
  const disabled = !title && !previewImage;

  const session = useSession();
  const sessionUser = session.data?.user;

  const navigate = useRouter();

  function createStorageUrl(fileName: string) {
    const storageURL = `/users/${sessionUser?.id}/pictures/${fileName}`;
    return storageURL;
  }

  async function setFileInFirebase(
    fileToUpload: File
  ): Promise<string | undefined> {
    try {
      if (fileToUpload && fileToUpload.name) {
        const storageURL = createStorageUrl(fileToUpload.name);
        const storage = firebaseStorage.getStorage(firebaseApp);
        const storageRef = firebaseStorage.ref(storage, storageURL);

        await firebaseStorage.uploadBytes(storageRef, fileToUpload);
        const downloadUrl = await firebaseStorage.getDownloadURL(storageRef);

        return downloadUrl;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error on upload file ${fileToUpload.name} on firebase`);
      }
    }
  }

  async function onSelectPicture(event: ChangeEvent<HTMLInputElement>) {
    const fileFromInput = event.target.files;

    if (fileFromInput !== null) {
      const pickedImage = fileFromInput[0];
      const imageUrl = URL.createObjectURL(pickedImage);

      setPreviewImage(imageUrl);
    }
  }

  async function onSubmit(formData: TypeFormData) {
    if (inputFileRef.current) {
      const fileToUpload = inputFileRef.current.files!;
      const pickedImage = fileToUpload[0];

      const getDownloadUrl = await setFileInFirebase(pickedImage);

      if (getDownloadUrl && getDownloadUrl.length) {
        const payload = {
          title: formData.title,
          picture_url: getDownloadUrl,
          username_id: sessionUser?.id,
          username: sessionUser?.username,
        };

        const response = await api.post("/pictures", payload);

        if (response.status === 201) {
          navigate.push("/auth/account");
        }
      }
    }
  }

  return (
    <div className="max-w-[50rem] mt-12 mx-auto  relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 w-2/3">
          <label
            className="font-helvetica font-normal text-base text-zinc-500"
            htmlFor="title"
          >
            Escreva uma legenda
          </label>
          <input
            type="text"
            placeholder="Gostaria de compartilhar..."
            className="font-helvetica font-normal text-sm text-zinc-900 px-3 py-4 border rounded bg-zinc-100 outline-none focus:border-yellow-400 focus:bg-white"
            id="title"
            {...register("title")}
          />
          {errors.title && (
            <p className="font-helvetica text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="mt-3 w-2/3">
          <label
            className="font-helvetica font-normal text-base text-zinc-500"
            htmlFor="file"
          >
            Selecione uma foto para postar
            <span className="font-helvetica font-normal text-base text-zinc-400 flex items-center gap-1 py-4 cursor-pointer border px-3 text-center justify-center border-dashed hover:text-[#FFBB11] hover:border-[#FFBB11] rounded transition ease-in-out duration-150 bg-zinc-100 mt-1 hover:bg-yellow-50">
              Escolher minha foto <Dog size={18} weight="regular" />
            </span>
          </label>
          <input
            type="file"
            className="hidden"
            id="file"
            onChange={onSelectPicture}
            ref={inputFileRef}
          />
        </div>
        {previewImage && (
          <div className="mt-3 w-2/3">
            <img
              src={previewImage}
              alt=""
              className="w-full h-full object-cover rounded"
            />
          </div>
        )}
        <button
          type="submit"
          className="font-helvetica font-normal text-base text-zinc-50 bg-[#FFBB11] w-2/3 flex justify-center items-center px-4 py-3 mt-5 rounded hover:bg-yellow-400 ease-in-out duration-150 transition gap-2 disabled:bg-zinc-300 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          Postar minha foto <PawPrint size={20} weight="regular" />
        </button>
      </form>
    </div>
  );
}
