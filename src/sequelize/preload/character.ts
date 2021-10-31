import db, { sequelize } from "../index";

const characterData = [
  {
    img: "https://static.wikia.nocookie.net/disney/images/8/85/Aladdin_%28personaje%29.png/revision/latest?cb=20160318010334&path-prefix=es",
    name: "Aladdin",
    age: 18,
    weight: 75,
    story:
      "A former street rat from the city of Agrabah, Aladdin spent much of his youth scraping for food and ducking guards with his monkey sidekick Abu.",
    movies: ["Aladdin", "Aladdin 2"],
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/en/9/94/Simba_%28_Disney_character_-_adult%29.png",
    name: "Simba",
    age: 20,
    weight: 190,
    story:
      "The son of Mufasa and Sarabi, who was destined to rule the Pride Lands, as king. When Mufasa was murdered by his treacherous brother, Scar, Simba was exiled from the Pride Lands after his uncle blamed him for his father's death.",
    movies: ["The Lion King", "The Lion King 2"],
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/en/e/e1/Snow_white_disney.png",
    name: "Snow White",
    age: 14,
    weight: 50,
    story:
      "Shortly after discovering love in a charming Prince, Snow White learns that her jealous stepmother, The Evil Queen, is determined to kill her. Snow White forcibly runs away from home to escape the queen's wrath, but finds shelter in the cottage of seven dwarfs. Now a refugee, Snow White dreams of reuniting with her prince and living happily ever after.",
    movies: ["Snow White and the Seven Dwarfs"],
  },
  {
    img: "https://static.wikia.nocookie.net/disney/images/f/f2/Profile_-_Nemo.jpg/revision/latest?cb=20190529221404",
    name: "Nemo",
    age: 6,
    weight: 1,
    story:
      "Nemo is a young clownfish who lives with his father, Marlin in a sea anemone. Before he hatched from his egg, his mother, Coral and the other eggs were killed in an attack by a barracuda.",
    movies: ["Finding Nemo"],
  },
];

export default async (model: any) => {
  //BEGIN
  const t = await sequelize.transaction();
  try {
    characterData.map(async (c) => {
      console.log("INSERTING Character:", c.name);

      //Create Character
      const char = await model.create({
        img: c.img,
        name: c.name,
        age: c.age,
        weight: c.weight,
        story: c.story,
      });

      //Create Association
      c.movies.map(async (m) => {
        const movie = await db.Movie.findOne({
          where: {
            title: m,
          },
        });
        await char.addMovie(movie);
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
