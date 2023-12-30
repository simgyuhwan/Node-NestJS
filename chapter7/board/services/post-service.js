const paginator = require("../utils/paginator");
const { ObjectId } = require("mongodb");

const projectionOption = {
  projection: {
    password: 0,
    "comments.password": 0,
  },
};

async function getDetailPost(collection, id) {
  return await collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $inc: { hits: 1} }, projectionOption);
}

// 글 목록
async function list(colleciton, page, search) {
  const perPage = 10;

  const query = {title: new RegExp(search, "i")};

  const cursor = colleciton.find(query, {limit: perPage, skip: (page - 1) * perPage}).sort({
    createdDt: -1,
  });

  const totalCount = await colleciton.count(query);
  const posts = await cursor.toArray();

  const paginatorObj = paginator({totalCount, page, perPage: perPage});
  return [posts, paginatorObj];
}

// 글쓰기
async function writePost(collection, post) {
  post.hits = 0;
  post.createDt = new Date().toISOString();
  return await collection.insertOne(post);
}

async function getPostByIdAndPassword(colleciton, { id, password }) {
  return await colleciton.findOne({ _id: new ObjectId(id), password: password }, projectionOption);
}

async function getPostById(colleciton, id) {
  return await colleciton.findOne({ _id: new ObjectId(id) }, projectionOption);
}

async function updatePost(colleciton, id, post) {
  const toUpdatePost = {
    $set: {
      ...post,
    },
  };
  return await colleciton.updateOne({ _id: new ObjectId(id) }, toUpdatePost );
}

module.exports = {
  list,
  writePost,
  getDetailPost,
  getPostById,
  getPostByIdAndPassword,
  updatePost,
};