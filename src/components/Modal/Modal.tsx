interface IPicture {
  data: {
    createdAt: string;
    picture_url: string;
    title: string;
    username: string;
  };
}

export default function Modal({ data }: IPicture) {
  const date = new Date(data.createdAt);
  return (
    <div className="h-5/6 w-3/5 m-auto grid grid-cols-2 bg-white rounded-lg overflow-hidden box-border gap-5 animate-transition-page-up">
      <div className="rounded-lg h-full w-full overflow-hidden">
        <img
          src={data.picture_url}
          alt=""
          className="w-full h-full object-cover overflow-hidden"
        />
      </div>
      <div className="w-full py-5">
        <h1 className="flex items-center text-4xl font-spectral-700 z-[100] text-spectral-dark relative after:block after:w-4 after:h-4 after:bg-[#FFBB11] after:absolute after:-z-10 after:bottom-[5px] after:rounded">
          {data.title}
        </h1>
        <span className="mt-5 block text-sm text-zinc-400 font-medium">
          Por @{data.username} |{" "}
          {date.toLocaleString("pt-br", {
            dateStyle: "long",
          })}
        </span>
      </div>
    </div>
  );
}
