
const BaseURL = 'https://api.unsplash.com/';

export const fetchImageFromUnsplash = async (place) => {
    const URL = BaseURL + 'search/photos?page=1&query=' + place + '&client_id=' + process.env.EXPO_PUBLIC_UNSPLASH_API_KEY;
    try{
        const response = await fetch(URL);
        const json = await response.json();
        const imageURL = json.results[0].urls.regular;
        return imageURL;
    } catch(error){
        console.log(error);
    }
}