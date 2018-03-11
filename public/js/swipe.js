const splash = document.querySelector('.splash');
const q1 = document.querySelector('.q1');
const q2 = document.querySelector('.q2');
const q3 = document.querySelector('.q3');
const q4 = document.querySelector('.q4');
const q5 = document.querySelector('.q5');
const q6 = document.querySelector('.q6');
const q7 = document.querySelector('.q7');
const q8 = document.querySelector('.q8');
const q9 = document.querySelector('.q9');
const q10 = document.querySelector('.q10');
const q11 = document.querySelector('.q11');
const q12 = document.querySelector('.q12');
const q13 = document.querySelector('.q13');
const q14 = document.querySelector('.q14');

let startingX;

handleTouchStart = (evt, elem) => {
  startingX = evt.touches[0].clientX;
  startingY = evt.touches[0].clientY;
};

handleTouchMove = (evt, elem) => {
  const disagree = elem.querySelector('.disagree');
  const agree = elem.querySelector('.agree');
  const neither = elem.querySelector('.neither');
  let thresholdHeight = screen.height / 4;

  let touch = evt.touches[0];
  let change = startingX - touch.clientX;
  let changeY = startingY - touch.clientY;

  if(agree != null) {
    const disagreeNote = disagree.querySelector('.note');
    const agreeNote = agree.querySelector('.note');
    const neitherNote = neither.querySelector('.note');
    if(change > 0 && changeY < thresholdHeight) {
      disagree.style.transform = "scale(2)";
      agree.style.transform = "scale(1)";
      neither.style.transform = "scale(1)";
      disagreeNote.style.opacity = "1";
      agreeNote.style.opacity = "0";
      neitherNote.style.opacity = "0";
    } else if(change < 0 && changeY < thresholdHeight) {
      agree.style.transform = "scale(2)";
      disagree.style.transform = "scale(1)";
      neither.style.transform = "scale(1)";
      disagreeNote.style.opacity = "0";
      agreeNote.style.opacity = "1";
      neitherNote.style.opacity = "0";
    } else if (changeY > 0) {
      neither.style.transform = "scale(2)";
      agree.style.transform = "scale(1)";
      disagree.style.transform = "scale(1)";
      disagreeNote.style.opacity = "0";
      agreeNote.style.opacity = "0";
      neitherNote.style.opacity = "1";
    }
  }


  elem.style.left = `${(change * -1)}px`;
  elem.style.top = `${(changeY * -1)}px`;
  evt.preventDefault();
}

handleTouchEnd = (evt, elem) => {
  const disagree = elem.querySelector('.disagree');
  const agree = elem.querySelector('.agree');
  const neither = elem.querySelector('.neither');
  if(agree != null) {
    const disagreeNote = disagree.querySelector('.note');
    const agreeNote = agree.querySelector('.note');
    const neitherNote = neither.querySelector('.note');
    neither.style.transform = "scale(1)";
    agree.style.transform = "scale(1)";
    disagree.style.transform = "scale(1)";
    disagreeNote.style.opacity = "0";
    agreeNote.style.opacity = "0";
    neitherNote.style.opacity = "0";
  }

  let change = startingX - evt.changedTouches[0].clientX;
  let changeY = startingY - evt.changedTouches[0].clientY;
  let threshold = screen.width / 3;
  let thresholdHeight = screen.height / 3;
  let absolutChange;
  let absolutChangeY;
  if(change < 0) {
    absolutChange = -1 * change;
  } else {
    absolutChange = change;
  }
  if(changeY < 0) {
    absolutChangeY = -1 * changeY;
  } else {
    absolutChangeY = changeY;
  }
  console.log('thresholdHeight: ' + thresholdHeight);
  console.log('changeY: ' + changeY);
  console.log(changeY > thresholdHeight);
  if(changeY > thresholdHeight) {
    console.log('threshold passed!');
    elem.style.transition = 'all ease-out .3s';
    elem.style.top = '-100vh';
    // splash.style.left = '100%';
  } else if(absolutChange < threshold) {
    elem.style.left = 0;
    elem.style.top = 0;
  } else {
    splash.style.transition = 'all ease-out .3s';
    if(change < 0) {
      elem.style.left = '100%';
    } else if (change > 0) {
      elem.style.left = '-100%';
    }

  }
}
