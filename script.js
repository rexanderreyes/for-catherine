const $ = (id) => document.getElementById(id);
const isHidden = false;

const pageMeter = $("page-meter");
const pagePrev = $("page-prev");
const pageNext = $("page-next");
const pageContent = $("page-content");

const notes = new Set([
  "Catherine, Love...",
  "I'm sorry.",
  "I know ive hurt you"
]);

let page = 0;

function updatePage(isNext) {
  if (isNext && page < notes.size) page++;
  else if (!isNext && page > 1) page--;
  else return;

  pageMeter.textContent = `Page ${page}/${notes.size}`;
  const prevNote = [...notes][page - 1];
  pageContent.textContent = isHidden ? btoa(prevNote) : prevNote;
  pageContent.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 1000,
    fill: "forwards"
  });
}

updatePage(true);
