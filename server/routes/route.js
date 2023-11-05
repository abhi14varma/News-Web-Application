import express from "express";
import { getNews } from "../controller/news-contoller.js";
import { signupUser, loginUser , logoutUser } from '../controller/userController.js';

const Route = express.Router();

Route.get("/news",getNews);

Route.post('/login', loginUser);
Route.post('/signup', signupUser);
Route.post('/logout', logoutUser);

export default Route;
