export default class MovieUtil {
  //Builds object for a movie
  static buildMovies(m: any) {
    const getNames = (array: any) => array.map((e: any) => e.name);
    const object: any = {
      id: m.id,
      img: m.img,
      title: m.title,
      rating: m.rating,
      created: m.created,
      characters: [],
      genres: [],
    };

    if (m.Characters !== undefined) {
      object.characters = getNames(m.Characters);
    }
    if (m.Genres !== undefined) {
      object.genres = getNames(m.Genres);
    }
    return object;
  }

  //Builds object if genre exists
  static buildIncludeWhereObject(query: any) {
    let where: any = {};
    if (query.genre) {
      where.id = query.genre;
    }
    return where;
  }

  //Builds where object for update method
  static buildUpdateObject(requestObject: any) {
    let obj: any = {};
    for (const [key, value] of Object.entries(requestObject)) {
      obj[key] = value;
    }
    return obj;
  }
}
