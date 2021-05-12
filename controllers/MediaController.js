const router = require("express").Router();
const { validateJWT } = require("../middleware");
const { Media } = require("../models");
const jwt = require("jsonwebtoken");