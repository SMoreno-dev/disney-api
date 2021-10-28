export default class CharacterUtil {
    //Builds where object only if movie query exists
    static buildIncludeWhereObject(query: any) {
        let where: any = {}
  
        if(query.movies) {
          where.id = query.movies
        }
        return where;
      }
  
      //Builds object if name or age queries exist
      static buildListWhereObject(query: any) {
          let where: any = {};
          if(query.name) {
            where.name = query.name
          } 
          
          if(query.age) {
            where.age = query.age
          }
  
          return where;
        }
        
        //Builds an object for a character
        static buildCharacters(c: any) {
          const getTitles = () => c.Movies.map((t: any) => t.title);
          const object: any = {
            id: c.id,
            img: c.img,
            name: c.name,
            age: c.age,
            weight: c.weight,
            story: c.story,
            movies: []
          }
          if(c.Movies) {
            object.movies = getTitles();
          }
          return object;
        }

        //Builds where object for update method
        static buildUpdateObject(requestObject: any) {
            let obj: any = {}
            for (const [key, value] of Object.entries(requestObject)) {
              obj[key] = value
            }
            return obj;
        }
}