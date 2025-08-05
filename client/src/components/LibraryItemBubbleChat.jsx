const LibraryItemBubbleChat = ({ item, type }) => {
  return (
    <>
      {type === "buku" && item?.hasOwnProperty("sinopsis") === true && (
        <BookItemBubbleChat item={item} />
      )}

      {type === "jurnal" && item?.hasOwnProperty("namaPublikasi") === true && (
        <JournalItemBubbleChat item={item} />
      )}

      {type === "skripsi" && item?.hasOwnProperty("namaMahasiswa") === true && (
        <SkripsiItemBubbleChat item={item} />
      )}
    </>
  );
};

const SkripsiItemBubbleChat = ({ item }) => {
  return (
    <div className="mt-5 rounded-bl-none bg-blue-200 p-5 text-black">
      <h3>
        Judul: <span className="font-bold">{item?.judul || ""}</span>{" "}
      </h3>
      <p>Sinopsis: {item?.abstrak || ""}</p>
      <p>Nama Mahasiswa: {item?.namaMahasiswa || ""} </p>
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
      <p>Publikasi: {item?.namaPublikasi || ""}</p>
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
      <p>Pengarang: {item?.pengarang?.nama || ""}</p>
      <p>Penerbit: {item?.penerbit?.nama || ""}</p>
      <p>Lokasi buku: {item?.lokasi || ""}</p>
    </div>
  );
};

export default LibraryItemBubbleChat;
