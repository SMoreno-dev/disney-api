export default class MovieUtil {
    //Builds object for a movie
    static buildMovies(m: any) {
        const getNames = (array: any) => array.map((e: any) => e.name);
        const object: any = {
            id: m.id,
            img: m.img,
            title: m.title,
            rating: m.rating,
            characters: [],
            genres: []
        }

        if(m.Characters !== undefined) {
            object.characters = getNames(m.Characters);
        } 
        if(m.Genres !== undefined) {
            object.genres = getNames(m.Genres);
        }
        return object;
    }
}