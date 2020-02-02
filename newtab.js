var emptyCardImagePlaceholder = [
  "https://images.unsplash.com/photo-1488381297039-d6ee94af777e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1655&q=80",
  "https://images.unsplash.com/photo-1489359337130-59cfeeccc6c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
  "https://images.unsplash.com/photo-1513106021000-168e5f56609d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
  "https://images.unsplash.com/photo-1554672053-c4205442a9fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
  "https://images.unsplash.com/photo-1547555999-14e818e09e33?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  "https://images.unsplash.com/photo-1546700908-f2001b40cf76?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
];

const buildDevCardComponent = function(article) {
  let image = document.querySelector(".card__image img");
  let title = document.querySelector(".card__title");
  let description = document.querySelector(".card__description");
  var userName = document.querySelector(".name");
  var userWebsite = document.querySelector(".user .website a");
  let url = document.querySelector(".card__image a");

  let descriptionHTML =
    article.body_html &&
    article.body_html
      .slice(0, 500)
      .replace(/<\/?[^>]+>/gi, " ")
      .replace(/<br>/g, "")
      .replace(/<img>/g, "")
      .trim();
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
  description.innerText = (article.description || descriptionHTML) + "...";
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

console.log("A DEV article a day keeps a person awake");
document.addEventListener("DOMContentLoaded", displayDevArticle);
