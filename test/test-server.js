/**
 * Created by vuvot on 5/30/2016.
 * Test Blackbox for Item APIs
 */
process.env.NODE_ENV = "test";

var chai = require("chai");
var chaiHttp = require("chai-http");
var path = require("path");
var env = process.env.NODE_ENV || "test";
var config = require(path.join(__dirname, "..", "config", "config.json"))[env];

chai.should();
chai.use(chaiHttp);
var app = require("../app")();
var orders = [
    {
        "orderDate": "2016-07-04T14:25:43.511Z",
        "items":[
            {
                "productName": "Table",
                "quantity": 1,
                "unitPrice": 350,
                "description": "Dinner table model AE-11"
            },
            {
                "productName": "Chair",
                "quantity": 10,
                "unitPrice": 50,
                "description": "Chair model AC-11"
            },
            {
                "productName": "windows",
                "quantity": 4,
                "unitPrice": 500,
                "description": "Windows for bed rooms"
            }
        ],
        "location": {
            "latitude": 10.793546,
            "longitude": 106.651911,
            "accuracy": 5
        }
    },
    {
        "orderDate": "2016-07-04T18:25:43.511Z",
        "items":[
            {
                "productName": "Table",
                "quantity": 1,
                "unitPrice": 250,
                "description": "Dinner table model AF-14"
            },
            {
                "productName": "Chair",
                "quantity": 10,
                "unitPrice": 60,
                "description": "Chair model AC-18"
            }
        ],
        "location": {
            "latitude": 10.779825,
            "longitude": 106.632397,
            "accuracy": 10
        }
    }
];

describe("Items (having data)", function () {
  "use strict";

  before(function () {
    // return app.models.sequelize.sync().then(function () {
    //   //init test db
    //   return app.models.order.bulkCreate(
    //     [
    //     {
    //       "id": 1,
    //       "productName": "Table",
    //       "quantity": 1,
    //       "unitPrice": 350,
    //       "description": "dinner table model AE-11"
    //     },
    //     {
    //       "id": 2,
    //       "productName": "Chair",
    //       "quantity": 10,
    //       "unitPrice": 50,
    //       "description": "Chair model AC-11"
    //     },
    //     {
    //       "id": 3,
    //       "productName": "windows",
    //       "quantity": 4,
    //       "unitPrice": 500,
    //       "description": "Windows for bed rooms"
    //     }]
    //     );
    // });
  });

  // after(function () {
  //   //clear test db
  //   return app.models.order.destroy({
  //     where: {
  //       id: {
  //         "$like": "%"
  //       }
  //     }
  //   });
  // });
     it("should list ALL items on /item POST", function (done){
        chai.request(app)
       .post(config.apiUrl + "/order")
            .send(orders[0])
       .end(function (err, res) {
           res.should.have.status(200);
       });
        done();
    });

//   it("should list ALL items on /item GET", function (done) {
//     chai.request(app)
//       .get(config.apiUrl + "/item")
//       .end(function (err, res) {
//         res.should.have.status(200);
//         res.should.be.json; // jshint ignore:line
//         res.body.should.be.a("array");
//         res.body.should.have.length(3);
//         res.body[0].should.have.property("id");
//         res.body[0].should.have.property("productName");
//         res.body[0].should.have.property("quantity");
//         res.body[0].should.have.property("unitPrice");
//         res.body[0].should.have.property("description");
//         res.body[0].should.have.property("createdAt");
//         res.body[0].should.have.property("updatedAt");
//         res.body[0].productName.should.equal("Table");
//         res.body[0].quantity.should.equal(1);
//         res.body[0].unitPrice.should.equal(350);
//         res.body[0].description.should.equal("dinner table model AE-11");
//         done();
//       });
//   });
//
//   it("should list a SINGLE item on /item/:id GET", function (done) {
//     chai.request(app)
//       .get(config.apiUrl + "/item/3")
//       .end(function (err, res) {
//         res.should.have.status(200);
//         res.should.be.json; // jshint ignore:line
//         res.body.should.be.a("object");
//         res.body.should.have.property("id");
//         res.body.should.have.property("productName");
//         res.body.should.have.property("quantity");
//         res.body.should.have.property("unitPrice");
//         res.body.should.have.property("description");
//         res.body.should.have.property("createdAt");
//         res.body.should.have.property("updatedAt");
//         res.body.productName.should.equal("windows");
//         res.body.quantity.should.equal(4);
//         res.body.unitPrice.should.equal(500);
//         res.body.description.should.equal("Windows for bed rooms");
//         done();
//       });
//   });
//
//   it("should add a SINGLE item on /item POST", function (done) {
//     chai.request(app)
//       .post(config.apiUrl + "/item")
//       .send({
//         "productName": "Sofa",
//         "quantity": 1,
//         "unitPrice": 2500,
//         "amount": 2500,
//         "description": "Sofa for living room"
//       })
//       .end(function (err, res) {
//         res.should.have.status(200);
//         res.should.be.json; // jshint ignore:line
//         res.body.should.be.a("object");
//         res.body.should.have.property("id");
//         res.body.should.have.property("productName");
//         res.body.should.have.property("quantity");
//         res.body.should.have.property("unitPrice");
//         res.body.should.have.property("description");
//         res.body.should.have.property("createdAt");
//         res.body.should.have.property("updatedAt");
//         res.body.productName.should.equal("Sofa");
//         res.body.quantity.should.equal(1);
//         res.body.unitPrice.should.equal(2500);
//         res.body.description.should.equal("Sofa for living room");
//         done();
//       });
//   });
//
//   it("should update a SINGLE item on /item/:id PUT", function (done) {
//     chai.request(app)
//       .put(config.apiUrl + "/item/3")
//       .send({
//         "productName": "windows luxury",
//         "quantity": 5,
//         "unitPrice": 3000,
//         "description": "Euro Windows for all bed room"
//       })
//       .end(function (err, res) {
//         res.should.have.status(200);
//         res.should.be.json; // jshint ignore:line
//         res.body.should.be.a("object");
//         res.body.should.have.property("id");
//         res.body.should.have.property("productName");
//         res.body.should.have.property("quantity");
//         res.body.should.have.property("unitPrice");
//         res.body.should.have.property("description");
//         res.body.should.have.property("createdAt");
//         res.body.should.have.property("updatedAt");
//         res.body.productName.should.equal("windows luxury");
//         res.body.quantity.should.equal(5);
//         res.body.unitPrice.should.equal(3000);
//         res.body.description.should.equal("Euro Windows for all bed room");
//         done();
//       });
//   });
//
//   it("should delete a SINGLE item on /item/:id DELETE", function (done) {
//     chai.request(app)
//       .delete(config.apiUrl + "/item/2")
//       .end(function (err, res) {
//         res.should.have.status(200);
//         res.should.be.json; // jshint ignore:line
//         res.body.should.be.a("object");
//         res.body.should.have.property("id");
//         res.body.should.have.property("productName");
//         res.body.should.have.property("quantity");
//         res.body.should.have.property("unitPrice");
//         res.body.should.have.property("description");
//         res.body.should.have.property("createdAt");
//         res.body.should.have.property("updatedAt");
//         res.body.productName.should.equal("Chair");
//         res.body.quantity.should.equal(10);
//         res.body.unitPrice.should.equal(50);
//         res.body.description.should.equal("Chair model AC-11");
//         done();
//       });
//   });
//
//   it("should return error status and message when add without send content on SINGLE item on /item POST ", function (done) {
//     chai.request(app)
//       .post(config.apiUrl + "/item")
//       .end(function (err, res) {
//         res.should.have.status(500);
//         res.should.be.json; // jshint ignore:line
//         res.body.should.be.a("object");
//         res.body.should.have.property("message");
//         res.body.message.should.equal("All fields are required and in json format when uploading. Please make sure post data in application/json format");
//         done();
//       });
//   });
//
//   it("should return error status and message when add without send all fields on SINGLE item on /item POST ", function (done) {
//     chai.request(app)
//       .post(config.apiUrl + "/item")
//       .send({
//         "quantity": 1,
//         "unitPrice": 2500,
//         "amount": 2500,
//         "description": "Sofa for living room"
//       })
//       .end(function (err, res) {
//         res.should.have.status(500);
//         res.should.be.json; // jshint ignore:line
//         res.body.should.be.a("object");
//         res.body.should.have.property("message");
//         res.body.message.should.equal("All fields are required and in json format when uploading. Please make sure post data in application/json format");
//         done();
//       });
//   });
//
//   it("should return error status and message when edit without send content SINGLE item on /item/:id PUT ", function (done) {
//     chai.request(app)
//       .put(config.apiUrl + "/item/1")
//       .end(function (err, res) {
//         res.should.have.status(500);
//         res.should.be.json; // jshint ignore:line
//         res.body.should.be.a("object");
//         res.body.should.have.property("message");
//         res.body.message.should.equal("Needed at least one fields and in json format when uploading. Please make sure post data in application/json format");
//         done();
//       });
//   });
//
// });
//
//
// describe("Items (none data)", function () {
//   "use strict";
//
//   it("should return blank array when GET ALL on /item GET", function (done) {
//     chai.request(app)
//       .get(config.apiUrl + "/item")
//       .end(function (err, res) {
//         res.should.have.status(200);
//         res.should.be.json; // jshint ignore:line
//         res.body.should.be.a("array");
//         res.body.should.have.length(0);
//         done();
//       });
//   });
//
//   it("should return not found status and message when GET SINGLE on /item/:id GET", function (done) {
//     chai.request(app)
//       .get(config.apiUrl + "/item/10")
//       .end(function (err, res) {
//         res.should.have.status(404);
//         res.should.be.json; // jshint ignore:line
//         res.body.should.be.a("object");
//         res.body.should.have.property("message");
//         res.body.message.should.equal("Item not found");
//         done();
//       });
//   });
//
//   it("should return error status and message when edit a non existing id SINGLE item on /item/:id PUT ", function (done) {
//     chai.request(app)
//       .put(config.apiUrl + "/item/10")
//       .send({
//         "productName": "windows luxury",
//         "quantity": 5,
//         "unitPrice": 3000,
//         "description": "Euro Windows for all bed room"
//       })
//       .end(function (err, res) {
//         res.should.have.status(500);
//         res.should.be.json; // jshint ignore:line
//         res.body.should.be.a("object");
//         res.body.should.have.property("message");
//         res.body.message.should.equal("Item you want to update does not exists");
//         done();
//       });
//   });
//
//   it("should return error status and message when delete a non existing id SINGLE item on /item/:id DELETE ", function (done) {
//     chai.request(app)
//       .delete(config.apiUrl + "/item/10")
//       .end(function (err, res) {
//         res.should.have.status(500);
//         res.should.be.json; // jshint ignore:line
//         res.body.should.be.a("object");
//         res.body.should.have.property("message");
//         res.body.message.should.equal("Item you want to delete does not exists");
//         done();
//       });
//   });
});
