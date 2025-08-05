const LibraryItemBubbleChat = ({ item, type }) => {
  return (
    <>
      {type === "buku" && item?.hasOwnProperty("sinopsis") === true && (
        <BookItemBubbleChat item={item} />
      )}

      {type === "jurnal" && item?.hasOwnProperty("publikasi") === true && (
        <JournalItemBubbleChat item={item} />
      )}

      {type === "skripsi" && item?.hasOwnProperty("mahasiswa") === true && (
        <SkripsiItemBubbleChat item={item} />
      )}
      {type === "publikasi" && item?.hasOwnProperty("volume") === true && (
        <PublicationItemBubbleChat item={item} />
      )}
    </>
  );
};

const PublicationItemBubbleChat = ({ item }) => {
  return (
    <div className="mt-5 rounded-bl-none bg-blue-200 p-5 text-black">
      <h3>
        Nama: <span className="font-bold">{item.name || ""}</span>{" "}
      </h3>
      <p>Volume: {item?.volume || ""} </p>
      <p>Tahun: {item?.tahun || ""}</p>
    </div>
  );
};
const SkripsiItemBubbleChat = ({ item }) => {
  return (
    <div className="mt-5 rounded-bl-none bg-blue-200 p-5 text-black">
      <h3>
        Judul: <span className="font-bold">{item?.judul || ""}</span>{" "}
      </h3>
      <p>Sinopsis: {item?.abstrak || ""}</p>
      <p>Nama Mahasiswa: {item?.mahasiswa?.name || ""} </p>
      <p>Tahun Skripsi: {item?.tahun || ""}</p>
    </div>
  );
};

const JournalItemBubbleChat = ({ item }) => {
  return (
    <div className="mt-5 rounded-bl-none bg-blue-200 p-5 text-black">
      {/* tipe item === jurnal */}
      <h3>
        Judul: <span className="font-bold">{item?.judul || ""}</span>{" "}
      </h3>
      <p>Sinopsis: {item?.abstrak || ""}</p>

      <p>
        Publikasi: {item?.publikasi?.name || ""}, {item?.publikasi?.tahun || ""}
        , {item?.publikasi?.volume || ""}
      </p>
      <p>Jurnal tersedia: {item?.tersedia || ""}</p>
    </div>
  );
};
const BookItemBubbleChat = ({ item }) => {
  return (
    <div className="mt-5 rounded-bl-none bg-blue-200 p-5 text-black">
      {/* tipe item === buku */}
      <h3>
        Judul: <span className="font-bold">{item?.judul || ""}</span>{" "}
      </h3>
      <p>Sinopsis: {item?.sinopsis || ""}</p>
      <p>Pengarang: {item?.pengarang?.name || ""}</p>
      <p>Penerbit: {item?.penerbit?.name || ""}</p>
      <p>Lokasi buku: {item?.lokasi || ""}</p>
    </div>
  );
};

export default LibraryItemBubbleChat;
