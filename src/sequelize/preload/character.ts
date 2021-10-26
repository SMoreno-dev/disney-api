const characterData = [
    {
        img: "https://static.wikia.nocookie.net/disney/images/8/85/Aladdin_%28personaje%29.png/revision/latest?cb=20160318010334&path-prefix=es",
        name: "Aladdin",
        age: 18,
        weight: 75,
        story: "A former street rat from the city of Agrabah, Aladdin spent much of his youth scraping for food and ducking guards with his monkey sidekick Abu."
    },
    {
        img: "https://upload.wikimedia.org/wikipedia/en/9/94/Simba_%28_Disney_character_-_adult%29.png",
        name: "Simba",
        age: 20,
        weight: 190,
        story: "The son of Mufasa and Sarabi, who was destined to rule the Pride Lands, as king. When Mufasa was murdered by his treacherous brother, Scar, Simba was exiled from the Pride Lands after his uncle blamed him for his father's death."
    },
    {
        img: "https://upload.wikimedia.org/wikipedia/en/e/e1/Snow_white_disney.png",
        name: "Snow White",
        age: 14,
        weight: 50,
        story: "Shortly after discovering love in a charming Prince, Snow White learns that her jealous stepmother, The Evil Queen, is determined to kill her. Snow White forcibly runs away from home to escape the queen's wrath, but finds shelter in the cottage of seven dwarfs. Now a refugee, Snow White dreams of reuniting with her prince and living happily ever after."
    },
    {
        img: "https://static.wikia.nocookie.net/disney/images/f/f2/Profile_-_Nemo.jpg/revision/latest?cb=20190529221404",
        name: "Nemo",
        age: 6,
        weight: 1,
        story: "Nemo is a young clownfish who lives with his father, Marlin in a sea anemone. Before he hatched from his egg, his mother, Coral and the other eggs were killed in an attack by a barracuda."
    }
]

export default (model: any) => {
    characterData.map(async(c) => {
        try {
            console.log('CREATING:', c)
            await model.create({
                img: c.img,
                name: c.name,
                age: c.age,
                weight: c.weight,
                story: c.story
            })

        } catch (error) {
            console.log('ERROR!', error)
        }
    })
}
