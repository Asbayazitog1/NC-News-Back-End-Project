const express = require("express");
const { handlePsqErrors, handleCustomErrors } = require("./errors");
const { getAllTopics, getAllEndpoints, getArticleByArticleID, getAllArticles, getAllCommentsByArticleId, addNewCommentByArticleId, updateArticleByArticleId, deleteCommentByCommentID, getAllUsers } = require("./app.controller");
const cors = require('cors');


const app =express()
app.use(cors())
app.use(express.json())


app.get('/api/topics', getAllTopics)
app.get('/api/articles/:article_id',getArticleByArticleID)
app.get("/api",getAllEndpoints)
app.get('/api/articles/:article_id/comments',getAllCommentsByArticleId)
app.get("/api/articles",getAllArticles)
app.get("/api/users",getAllUsers)

app.post("/api/articles/:article_id/comments",addNewCommentByArticleId)

app.patch("/api/articles/:article_id",updateArticleByArticleId)

app.delete("/api/comments/:comment_id", deleteCommentByCommentID)



app.all('*' ,(req,res,next) =>{
    res.status(404).send({msg:"Not Found"})
});


app.use(handlePsqErrors);
app.use(handleCustomErrors);
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});



module.exports = app;