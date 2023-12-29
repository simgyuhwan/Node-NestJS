const axios = require("axios");

const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

axios
  .get(url)
  .then((result) => {
    if(result.status != 200) {
      throw new Error("요청에 실패했습니다!");
    }

    if(result.data) {
      return result.data;
    }

    throw new Error("데이터 없습니다.");
  })
  .then((data) => {
    if(!data.articleList || data.articleList.size == 0) {
      throw new Error("데이터가 없습니다.");
    }
    return data.articleList;
  })
  .then((articles) => {
    return articles.map((article, idx) => {
      return {title: article.title, rank: idx + 1, authorName: article.authorName};
    });
  })
  .then((results) => {
    for(let movieinfo of results) {
      console.log(`[${movieinfo.rank}위] ${movieinfo.title}, 감독: ${movieinfo.authorName}`);
    }
  })
  .catch((err) => {
    console.log("<<error>>");
    console.error(err);
  });