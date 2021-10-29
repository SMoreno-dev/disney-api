import { sequelize } from "..";

const genreData = [
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Drama-icon.svg/220px-Drama-icon.svg.png",
    name: "Drama",
  },
  {
    img: "https://nofilmschool.com/sites/default/files/styles/facebook/public/screen_shot_2019-06-18_at_1.30.02_pm.png?itok=lDnBE5q0",
    name: "Adventure",
  },
  {
    img: "https://thumbs.dreamstime.com/b/comedy-cinema-theatre-genre-cinematography-movie-production-vector-illustration-comedy-cinema-theatre-genre-cinematography-105691554.jpg",
    name: "Comedy",
  },
  {
    img: "https://www.filmsite.org/images/romance-genre.jpg",
    name: "Romance",
  },
  {
    img: "https://media.istockphoto.com/vectors/misical-cinema-or-theatre-genre-cinematography-movie-production-vector-id891437044?b=1&k=20&m=891437044&s=170667a&w=0&h=DFn7ZmYP3MDB5XDIdo2oRg3hNBDMWsFw-hhXxhgkYjg=",
    name: "Musical",
  },
  {
    img: "https://thumbs.dreamstime.com/b/fantasy-cinema-genre-symbol-cinema-channel-cinematography-movie-production-vector-illustration-fantasy-cinema-genre-symbol-105691610.jpg",
    name: "Fantasy",
  },
];

export default async (model: any) => {
  //BEGIN
  const t = await sequelize.transaction();

  try {
    genreData.map(async (g) => {
      console.log("INSERTING Genre:", g.name);
      await model.create({
        img: g.img,
        name: g.name,
      });
    });
    //COMMIT
    await t.commit();
  } catch (error) {
    //ROLLBACK
    await t.rollback();
    console.log("ERROR!", error);
  }
};
