import { expect } from "chai";
import request from "supertest";
import app from "../src/server";

//Auth data for token
const email = process.env.EMAIL;
const password = process.env.PASS;

//Bad request, 'name' should be 'title' instead
const movieData = {
  img: "https://lumiere-a.akamaihd.net/v1/images/p_thelittlemermaid_6a6ef760.jpeg",
  name: "The Little Mermaid",
  rating: 4,
  created: "1999-12-07",
};

//Hardcoded token for testing
let token: any =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVVVJRCI6IjJiYzQ0ZmU4LTA1NWQtNGRiNi1hYWU2LTkyZjgxNTM1NDVlMCIsImlhdCI6MTYzNTYyNzM4MH0.07m400edD3YIIz31VVb6X_m3HHlBSVfcuCDSc5j1EjE";

//Tests
describe("Movie API tests", function () {
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
});
