import { BiSearch } from 'react-icons/bi'
import { useContext } from 'react';
import { searchContext } from '../App';
import { searchPhotos } from '../service/API'
import { Link } from 'react-router-dom';
import { myDebounce } from '../utils';



const Navbar = () => {

    const { setPhotos } = useContext(searchContext);

    const searchPhotoF = async (query) => {
        const res = await searchPhotos(query);
        console.log(res);
        setPhotos(res);
    }


    const apiFn = myDebounce(searchPhotoF, 800);

    return (
        <div className="flex z-50 items-center w-screen p-3 fixed top-0 left-0  bg-[#fbfbfb] ">

            <Link to='/'>
                <h1 className="text-2xl Montserrat text-[#2c2c2c] ">Image Gallery</h1>
            </Link>


            <div className='flex   ml-8 py-1 px-1 rounded items-center justify-center border'>
                <BiSearch size={25} />
                <input type="text" className='ml-2 outline-none border-none w-96   ' placeholder=' Search here' onChange={(e) => {

                    apiFn(e.target.value);
                }} />



            </div>

        </div>
    )
}

export default Navbar