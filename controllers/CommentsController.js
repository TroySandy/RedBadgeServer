const router = require("express").Router();
const { validateJWT } = require("../middleware");
const { Comments } = require("../models");
const jwt = require("jsonwebtoken");