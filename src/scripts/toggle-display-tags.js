
function toggleDisplayArticle(tags) {
    Object.keys(tags).forEach(article => {
      const selector = `[data-article-id=${article}]`;
      if (tags[article].find(element => `#${element }` == location.hash)) {
        document.querySelector(selector).removeAttribute('style');
        console.log('showing', selector);
      } else {
        console.log('removing', selector);
        document.querySelector(selector).setAttribute('style', 'display: none');
      } 
    });
}

document.addEventListener('astro:page-load', () => {
  const tags = {};
  const [...articles ] = document.querySelectorAll('article')
  articles.forEach(article => {
    tags[article.dataset.articleId] = article.dataset.tags.split(',');
  });
  if (location.hash) {
    toggleDisplayArticle(tags);
  }
  window.addEventListener('hashchange', () => toggleDisplayArticle(tags));
})
