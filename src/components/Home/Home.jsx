import React, { useEffect, useState, useContext } from 'react'
import { BiSearch } from 'react-icons/bi';
import { FcLike } from 'react-icons/fc';
import { getPhotos, searchPhotos } from '../../service/API';
import Modal from './Modal';
import { searchContext } from '../../App';
import { myDebounce } from '../../utils';
const Home = () => {

    const { photos, setPhotos } = useContext(searchContext);
    const [photo, setPhoto] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    const searchPhotoF = async (query) => {
        const res = await searchPhotos(query);
        console.log(res);
        setPhotos(res);
    }


    const apiFn = myDebounce(searchPhotoF, 800);


    useEffect(() => {
        (
            async () => {

                const res = await getPhotos();
                setPhotos(res);
            })();

    }, [setPhotos]);

    return (
        <div className='flex flex-col items-center justify-center mt-16'  >


            <div className='flex  items-center flex-col  justify-center h-96  w-screen  bg-img  bg-[#0e4d1ea4]' >
                <h1 className='text-3xl text-[#ffffff] text-center Montserrat'>Welcome  to IG Gallery , a place for high quality images</h1>

                <div className='flex bg-white px-2 mt-8  py-1 rounded items-center justify-center'>
                    <BiSearch size={25} />
                    <input type="text" className='ml-2  p-2 w-[50vw] outline-none border-none' placeholder='Search for some high-resolution images ' onChange={(e) => {

                        apiFn(e.target.value);
                    }} />


                </div>
            </div>



            <div className=' containern p-8 ' >

                {

                    photos?.map((photo, idx) => {
                        return <div className="figure cursor-pointer" key={photo.id} onClick={() => {
                            setPhoto(photo)
                            openModal();
                        }}>
                            <div className='border rounded-lg  border-[#E5E5E5]  m-4 flex flex-col'>
                                <div className='flex items-center'>
                                    <img src={photo.urls.small} alt="" className='rounded-lg' />
                                </div>

                                <div className='flex justify-between mt-4 items-center  p-4  '>

                                    <div className='flex items-center'>

                                        <img src={photo.user.profile_image.large} alt="prof_pic" className='rounded-full h-12 w-12' />

                                        <div className='flex flex-col ml-4'>
                                            <h1 className='Montserrat text-[15px]'>{photo.user.first_name}{" "}{photo.user.last_name}</h1>
                                            <p className='Poppins text-[10px] text-[#A7A7A7]'>@ {photo.user.username}</p>
                                        </div>

                                    </div>
                                    <div className='flex items-center justify-center'>


                                        <FcLike size={20} />
                                        <p className='ml-2 Montserrat text-[12px] relative top-[2px]'>{photo.likes}</p>

                                    </div>



                                </div>



                            </div>
                        </div>
                    })






                }




            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} photo={photo} />



        </div>
    )
}

export default Home