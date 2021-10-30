import { expect } from "chai";
import request from "supertest";
import app from "../src/server";

//Hardcoded token for testing
let token: any = process.env.DISNEY_TOKEN;

//Bad request, 'name' should be 'title' instead
const movieData = {
  img: "https://lumiere-a.akamaihd.net/v1/images/p_thelittlemermaid_6a6ef760.jpeg",
  name: "The Little Mermaid",
  rating: 4,
  created: "1999-12-07",
};

//Bad request, 'background' should be 'story' instead
const characterData = {
  img: "https://static.wikia.nocookie.net/disney/images/8/8a/Profile_-_Ariel.jpg",
  name: "Ariel",
  age: 16,
  weight: 55,
  background:
    "The seventh and youngest daughter of King Triton and Queen Athena, rulers of the undersea kingdom of Atlantica. Ariel lived through much of her young life with a passionate - yet forbidden - admiration of the human world, and longed to someday experience life on the surface.",
};

//Tests
describe("Movie and Character API tests", function () {
  before((done) => {
    app.on("app_started", () => {
      console.log("Begin testing");
      done();
    });
  });

  it("Should return bad request status code and error message", (done) => {
    request(app)
      .post("/movies")
      .set("Authorization", "Bearer " + token)
      .send(movieData)
      .end((err: any, res: any) => {
        if (err) console.log(err);
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal(
          "Looks like some data is missing. Your request should look similar to this:"
        );
      });
    done();
  });

  it("Should return resource not found status code and error message", (done) => {
    request(app)
      .get("/movies/100") // Id 100 should not exist
      .set("Authorization", "Bearer " + token)
      .end((err: any, res: any) => {
        if (err) console.log(err);
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal("Movie not found");
      });
    done();
  });

  it("Should return bad request status code and error message", (done) => {
    request(app)
      .post("/characters")
      .set("Authorization", "Bearer " + token)
      .send(characterData)
      .end((err: any, res: any) => {
        if (err) console.log(err);
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal(
          "Looks like some data is missing. Your request should look similar to this:"
        );
      });
    done();
  });

  it("Should return resource not found status code and error message", (done) => {
    request(app)
      .get("/characters/100") // Id 100 should not exist
      .set("Authorization", "Bearer " + token)
      .end((err: any, res: any) => {
        if (err) console.log(err);
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal("Character not found");
      });
    done();
  });
});
