import app from "../src/server";
import { expect } from "chai";
import request from "supertest";

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

//Tests
describe("Movie API tests", function () {
  let token: any = null;

  before((done) => {
    app.on("app_started", () => {
      request(app)
        .post("/auth/register")
        .send({ email, password })
        .end((err, res) => {
          if (err) console.log(err);
          token = res.body.token;
          done();
        });
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
