import { GrClose } from "react-icons/gr";
import { FcLike } from "react-icons/fc";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";

const Modal = ({ isOpen, onClose, photo }) => {
  const handleDownload = async (imageUrl, name) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = name; // The desired download filename
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto ">
      <div className="flex items-center justify-center  h-screen  ">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="flex  items-center  overflow-hidden shadow-xl transform transition-all  relative justify-center bg-white rounded-lg">
          <div className="flex flex-col">
            <div className="flex justify-end p-2 ">
              <GrClose size={22} onClick={onClose} cursor={"pointer"} />
            </div>

            <div className="flex items-center justify-center">
              <img
                src={photo.urls.full}
                className=" max-h-[50vh] h-auto w-[45vw]"
                alt="img"
              />
            </div>

            <div className="flex items-center justify-between p-4 flex-wrap">
              <div className="flex items-center ">
                <img
                  src={photo.user.profile_image.large}
                  alt="prof_pic"
                  className="rounded-full h-12 w-12"
                />
                <div className="flex flex-col ml-4">
                  <h1 className="Montserrat text-[15px]">
                    {photo.user.social.instagram_username}{" "}
                    {photo.user.last_name}
                  </h1>
                  <p className="Poppins text-[10px] text-[#A7A7A7]">
                    @ {photo.user.username}
                  </p>
                </div>

                <div className="flex items-center   ml-4">
                  <div className="ml-4 flex items-center">
                    <AiOutlineTwitter size={20} className="mr-2" />
                    <h1>
                      {" "}
                      <a
                        href={
                          "https://twitter.com/" +
                          photo.user.social.instagram_username
                        }
                      >
                        {" "}
                        <p className="Poppins text-[10px] text-[#A7A7A7]">
                          / {photo.user.username}
                        </p>{" "}
                      </a>
                    </h1>
                  </div>

                  <div className="ml-4 flex items-center">
                    <AiOutlineInstagram size={20} className="mr-2" />
                    <h1>
                      {" "}
                      <a
                        href={
                          "https://instagram.com/" +
                          photo.user.social.instagram_username
                        }
                      >
                        {" "}
                        <p className="Poppins text-[10px] text-[#A7A7A7]">
                          / {photo.user.username}
                        </p>{" "}
                      </a>
                    </h1>
                  </div>
                </div>
              </div>

              <div className="flex  justify-end  items-center">
                <FcLike size={20} />
                <p className="ml-2 Montserrat text-[12px]">{photo.likes}</p>
              </div>
            </div>

            {photo.tags ? (
              <div className="p-4 ">
                <h1 className="mb-4  Montserrat text-[13px]"> Related Tags</h1>
                <div className="flex items-center ">
                  {photo?.tags?.map((tag) => {
                    return (
                      <p className="bg-[#e7e7e7] px-4 py-1 rounded-md cursor-pointer ml-2 ">
                        {tag.title}
                      </p>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="flex justify-center mt-2 mb-2 ">
              <button
                onClick={(e) => {
                  handleDownload(photo.urls.full, photo.id);
                }}
                className="bg-green-600 px-4 py-2 rounded-md text-white"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
