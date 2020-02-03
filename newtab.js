const emptyCardImagePlaceholder = [
  "random1.jpeg",
  "random2.jpeg",
  "random3.jpeg",
  "random4.jpeg",
  "random5.jpeg",
  "random6.jpeg",
  "random7.jpeg"
];

const buildDevCardComponent = function(article) {
  let image = document.querySelector(".card__image img");
  let title = document.querySelector(".card__title");
  let description = document.querySelector(".card__description");
  var userName = document.querySelector(".name");
  var userWebsite = document.querySelector(".user .website a");
  let url = document.querySelector(".card__image a");
  debugger;
  let descriptionText =
    article.description ||
    (article.body_html &&
      article.body_html
        .replace(/<\/?[^>]+>/gi, " ")
        .replace(/\n/g, "")
        .replace(/<br\/>/g, "")
        .replace(/<img>/g, "")
        .slice(0, 500)
        .trim());
  image.setAttribute(
    "src",
    article.cover_image ||
      emptyCardImagePlaceholder[Math.floor(Math.random() * 7)]
  );
  let userURL =
    article.user.website_url ||
    `https://twitter.com/${article.user.twitter_username}`;

  url.setAttribute("href", article.url);
  title.innerText = article.title;
  description.innerText =
    descriptionText.charAt(0).toUpperCase() + descriptionText.slice(1) + "...";
  userName.innerText = article.user.name;
  userWebsite.setAttribute("href", userURL);
};

const displayDevArticle = function() {
  let pageNo = Math.floor(Math.random() * 10);
  fetch(`https://dev.to/api/articles?page=${pageNo}`)
    .then(articles => {
      articles.json().then(articles => {
        let randomArticle = articles[Math.floor(Math.random() * 30)];
        let articleID = randomArticle.id;
        fetch(`https://dev.to/api/articles/${articleID}`).then(article => {
          article.json().then(article => {
            let {
              id,
              title,
              description,
              cover_image,
              tags,
              url,
              body_html,
              user
            } = article;
            buildDevCardComponent({
              id,
              title,
              description,
              cover_image,
              tags,
              url,
              body_html,
              user
            });
          });
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
};

const showNotFoundPage = function() {
  let img = document.querySelector(".card__image img");
  let title = document.querySelector(".card__title");
  let userName = document.querySelector(".user .name");
  let userURL = document.querySelector(".user .website");
  img.setAttribute("src", "page-not-found.png");
  title.innerText =
    "Oopsie! Either you must have lost the internet or the Internet must have lost you 🤔";
  userName.innerText = "";
  userURL.innerHTML = "";
};

console.log("A DEV article a day keeps a person awake");
if (navigator.onLine) {
  document.addEventListener("DOMContentLoaded", displayDevArticle);
} else {
  showNotFoundPage();
}
