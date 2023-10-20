import axios from "axios"


const apiKey = process.env.REACT_APP_ACCESS_KEY;

if (apiKey) {
    axios.defaults.headers.common['Authorization'] = `Client-ID ${apiKey}`;
}


export const getPhotos = async () => {

    const res = await axios.get('https://api.unsplash.com/photos/', {
        params: {
            page: 1,
            per_page: 50,
            order_by: "popular"
        },
    });
    return res.data;

}



export const searchPhotos = async (query, page = 1, perPage = 30) => {

    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: query,
                page: page,
                per_page: perPage,
            },
        });
        console.log(response);
        return response.data.results;
    }
    catch (error) {
        console.log(error);
    }
};



// Function to suggest search queries based on user input
export const getSuggestions = async (query) => {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: query,
                page: 1,
                per_page: 5, // Adjust the number of suggestions
            },
        });


        const suggestions = response.data.results.map((result) => result.description);
        return suggestions;
    } catch (error) {

        throw error;
    }
};
