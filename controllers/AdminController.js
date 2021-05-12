const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize");
const { validateJWT } = require("../middleware");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");