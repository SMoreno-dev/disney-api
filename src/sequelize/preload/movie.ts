import db from "..";

const movieData = [
    {
        img: "https://m.media-amazon.com/images/M/MV5BNTI4ODQ1MzAzNV5BMl5BanBnXkFtZTgwMzU4NzMxMDE@._V1_.jpg",
        title: "Aladdin",
        created: "1992-11-25",
        rating: 4,
        genres: ["Comedy", "Musical", "Romance", "Adventure", "Fantasy"]
    },
    {
        img: "https://static.wikia.nocookie.net/english-voice-over/images/5/54/The_Lion_King_1994_DVD_Cover.PNG/revision/latest?cb=20160108215359&path-prefix=sv",
        title: "The Lion King",
        created: "1994-07-07",
        rating: 5,
        genres: ["Comedy", "Musical", "Romance", "Adventure", "Drama"]
    },
    {
        img: "https://static.wikia.nocookie.net/disney/images/5/56/Snow-White-and-the-Seven-Dwarfs-Poster.jpg/revision/latest/scale-to-width-down/250?cb=20160923160034&path-prefix=es",
        title: "Snow White and the Seven Dwarfs",
        created: "1938-01-26",
        rating: 5,
        genres: ["Musical", "Romance", "Fantasy"]
    },
    {
        img: "https://m.media-amazon.com/images/M/MV5BZTAzNWZlNmUtZDEzYi00ZjA5LWIwYjEtZGM1NWE1MjE4YWRhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        title: "Finding Nemo",
        created: "2003-07-03",
        rating: 5,
        genres: ["Comedy", "Adventure"]
    }
]

export default async(model: any) => {
    movieData.map(async(m) => {
        try {
            console.log('INSERTING Movie:', m.title);
            const movie = await model.create({
            img: m.img,
                title: m.title,
                created: m.created,
                rating: m.rating
            })

            //Create Associations
            m.genres.map(async(g: any) => {
                const genre = await db.Genre.findOne({
                    where: {
                        name: g
                    }
                })
                await movie.addGenre(genre);   
            })
        } catch (error) {
            console.log('ERROR!', error);
            throw error;
        }

    })  
}