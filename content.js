// content scripts are scripts that can receive and modify the content of a page the extension is running on
// you have to define what scripts will be content scripts in the manifest.json file and determine which pages they will be injected
// into using the "matches" property

// When a user installs an extension, the browser informs them what the extension can do. Content scripts request permission
// to run on sites that meet the match pattern criteria.

// Content scripts can use the DOM to read and modify the content of a page. 

const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  const button = document.createElement("button");
  button.textContent = "Click me!";
  button.addEventListener("click", () => {
    alert("Button clicked!");
  });
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read (content script working)`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
  badge.insertAdjacentElement("afterend", button);
}