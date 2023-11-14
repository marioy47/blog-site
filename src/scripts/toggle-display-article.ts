
const toggleDisplayArticle = (tags, filter) => {
    Object.keys(tags).forEach(article => {
      const selector = `[data-article-id=${article}]`;
      if (tags[article].find(element => element === filter)) {
        document.querySelector(selector).setAttribute('style', '');
      } else {
        document.querySelector(selector).setAttribute('style', 'display: none');
      } 
    });
}

const getTagsInDatasets: Object<string|array> = ( selector ) => {
  const tags = {};
  const [...articles ] = document.querySelectorAll(selector)
  articles.forEach(article => {
    tags[article.dataset.articleId] = article.dataset.tags.split(',');
  });
  return tags;
}

const tags = getTagsInDatasets('article');

document.addEventListener('astro:page-load', () => {
  if (location.hash) {
    toggleDisplayArticle(tags, location.hash.replace('#',''));
  }
  //Unfortunately windows.addEventListener('hashchange') does not work on transtions.
  [...document.querySelectorAll('ul>li>a')].forEach(link => {
    const u = new URL(link.getAttribute('href'), 'https://whatever.com');
    link.addEventListener('click', ()=> toggleDisplayArticle(tags, u.hash.replace('#','')));
  })
});

