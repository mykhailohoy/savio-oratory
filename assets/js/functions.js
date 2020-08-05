// working with <include>'s
export async function includeHTML(callback) {
  const includes = document.getElementsByTagName('include');
  [].forEach.call(includes, include => {
    let filePath = include.getAttribute('src');
    fetch(filePath).then((file) => {
      file.text().then((content) => {
        include.insertAdjacentHTML('afterEnd', content);
        include.remove();
      });
    });
  })
};

/* export async function includeHTML(callback) {
  const includes = document.getElementsByTagName('include');
  [].forEach.call(async (includes, include) => {
    let filePath = include.getAttribute('src');
    let data = fetch(filePath);
    data = await data.text();
    include.insertAdjacentHTML('afterEnd', data);
    include.remove();
  })
}; */


export function qs(selector) {
  let element = document.querySelector(selector);
  return element
}

export function htmlToElement(html) {
  var template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstChild;
}
