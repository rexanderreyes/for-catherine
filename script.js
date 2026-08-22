import letterJson from "./letter.json" with { type: "json" };
const $ = (id) => document.getElementById(id);
const isHidden = false;

// elements
const pageMeter = $("page-meter");
const pagePrev = $("pb-prev");
const pageNext = $("pb-next");
const pageContent = $("page-content");
const starterPage = $("starter");
const rootPage = $("root");

const notes = letterJson.notes;
let page = 0;

pagePrev.onclick = () => updatePage(false);
pageNext.onclick = () => updatePage(true);
starter.onclick = async () => {
  const NgitiAudio = new Audio("./assets/Ngiti.mp3");
  NgitiAudio.loop = true;

  const starterAnim = starterPage.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 1500,
    fill: "forwards"
  });
  await starterAnim.finished;

  starter.style.display = "none";
  rootPage.style.display = "flex";

  const rootAnim = rootPage.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 1500,
    fill: "forwards"
  });

  NgitiAudio.play();
};

async function updatePage(isNext) {
  if (isNext && page < notes.length) page++;
  else if (!isNext && page > 1) page--;
  else return;

  pageNext.style.pointerEvents = "none";
  pagePrev.style.pointerEvents = "none";
  
  const exitAnim = pageContent.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 1000,
    fill: "forwards"
  });
  await exitAnim.finished;
  
  pageMeter.textContent = `Page ${page}/${notes.length}`;
  const prevNote = notes[page - 1];
  pageContent.textContent = isHidden ? btoa(prevNote) : `"${prevNote}"`;
  
  const introAnim = pageContent.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 1000,
    fill: "forwards"
  });
  await introAnim.finished;
  pageNext.style.pointerEvents = "auto";
  pagePrev.style.pointerEvents = "auto";
}

updatePage(true);
