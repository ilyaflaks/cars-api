const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//data parser - used to parse post data
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Cars API",
      version: "1.0.0",
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.send("Navigate to /cars or /api-docs to see the API");
});

/**
 * @swagger
 * /cars:
 *    get:
 *      description: Get all cars
 *      responses:
 *        200:
 *          description: Success
 */

const cars = [
  {
    VIN: "991100228833",
    make: "Honda",
    model: "Civic",
    year: "2018",
  },
  {
    VIN: "001199228833",
    make: "Toyota",
    model: "Corolla",
    year: "2020",
  },
  {
    VIN: "556644773388",
    make: "Ford",
    model: "Focus",
    year: "2019",
  },
];

app.get("/cars", (req, res) => {
  res.send(cars);
});

/**
 * @swagger
 *  /car:
 *    post:
 *      description: Get one car
 *      parameters:
 *      - name: vin, make, model, year
 *        description: Car params
 *        in: body
 *        required: true
 *        type: string
 *      responses:
 *        200:
 *          description: Success
 *
 */

app.post("/car", (req, res) => {
  console.log(req.body);
  const vin = req.body.vin;
  const make = req.body.make;
  const year = req.body.year;
  const model = req.body.model;
  const carObj = {
    VIN: vin,
    make: make,
    model: model,
    year: year,
  };
  cars.push({ carObj });
  res.send({ carObj });
});

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
