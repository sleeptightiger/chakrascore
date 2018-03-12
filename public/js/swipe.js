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
const tunePage = document.querySelector('.tuning');
const submit = document.querySelector('form .submit');
const input = document.querySelector('.input');

submit.addEventListener('click', (e) => {
  input.classList.toggle('disappear');
  e.preventDefault();
});

let startingX;
let count = 0;
blastOff = count => {
  if(count == 14) {
    console.log('Blast off!');
    tunePage.classList.toggle('disappear');
  }
};


const chakras = [0, 0, 0, 0, 0, 0, 0];

findMax = array => {
  let indexWithMax = 0;
  const maxs = []
  for(let i = 0; i < array.length; i++) {
    if(array[i] > array[indexWithMax]) {
      indexWithMax = i;
    }
  }
  for(let i = 0; i < array.length; i++) {
    if(array[i] == array[indexWithMax]) {
      maxs.push(i);
    }
  }
  indexWithMax = maxs[Math.floor(Math.random()*maxs.length)];
  return indexWithMax;
}

tuneChakra = chakras => {
  const indexWithMax = findMax(chakras);
  let chakra = '';
  switch (indexWithMax) {
    case 0:
        chakra = "root";
        break;
    case 1:
        chakra = "sacral";
        break;
    case 2:
        chakra = "solar";
        break;
    case 3:
        chakra = "heart";
        break;
    case 4:
        chakra = "throat";
        break;
    case 5:
        chakra = "third";
        break;
    case 6:
        chakra = "crown";
  }
  return chakra;
};

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
      if((change * -1)/4 < 25 && (change * -1)/4 > -25) {
        elem.style.transform = `rotate(${(change * -1)/4}deg)`;
      }
    } else if(change < 0 && changeY < thresholdHeight) {
      agree.style.transform = "scale(2)";
      disagree.style.transform = "scale(1)";
      neither.style.transform = "scale(1)";
      disagreeNote.style.opacity = "0";
      agreeNote.style.opacity = "1";
      neitherNote.style.opacity = "0";
      if((change * -1)/4 < 25 && (change * -1)/4 > -25) {
        elem.style.transform = `rotate(${(change * -1)/4}deg)`;
      }
    } else if (changeY > 0) {
      neither.style.transform = "scale(2)";
      agree.style.transform = "scale(1)";
      disagree.style.transform = "scale(1)";
      disagreeNote.style.opacity = "0";
      agreeNote.style.opacity = "0";
      neitherNote.style.opacity = "1";
      elem.style.transform = `rotate(0deg)`;
      console.log('neither');
    }
  } else {
    if(change > 0 && changeY < thresholdHeight) {
      if((change * -1)/4 < 25 && (change * -1)/4 > -25) {
        elem.style.transform = `rotate(${(change * -1)/4}deg)`;
      }
    } else if(change < 0 && changeY < thresholdHeight) {
      if((change * -1)/4 < 25 && (change * -1)/4 > -25) {
        elem.style.transform = `rotate(${(change * -1)/4}deg)`;
      }
    } else if (changeY > 0) {
      elem.style.transform = `rotate(0deg)`;
      console.log('neither');
    }
  }


  elem.style.left = `${(change * -1)}px`;
  elem.style.top = `${(changeY * -1)}px`;


  evt.preventDefault();
}

handleTouchEnd = (evt, elem) => {
  let q = false;
  const disagree = elem.querySelector('.disagree');
  const agree = elem.querySelector('.agree');
  const neither = elem.querySelector('.neither');
  if(agree != null) {
    q = true;
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
  if(changeY > thresholdHeight) {
    if(q) {
      count += 1;
      blastOff(count);
    }
    elem.style.transition = 'all ease-out .3s';
    elem.style.top = '-160vh';
    elem.style.opacity = '0';
    const classes = elem.classList;
    if(classes.contains('root')) {
      chakras[0] += .5;
    } else if (classes.contains('sacral')) {
      chakras[1] += .5;
    } else if (classes.contains('solar')) {
      chakras[2] += .5;
    } else if (classes.contains('heart')) {
      chakras[3] += .5;
    } else if (classes.contains('throat')) {
      chakras[4] += .5;
    } else if (classes.contains('third')) {
      chakras[5] += .5;
    } else if (classes.contains('crown')) {
      chakras[6] += .5;
    }
  } else if(absolutChange < threshold) {
    elem.style.left = 0;
    elem.style.top = 0;
    elem.style.transform = `rotate(0deg)`
  } else {
    splash.style.transition = 'all ease-out .3s';
    if(change < 0) {
      if(q) {
        count += 1;
        blastOff(count);
      }
      elem.style.left = '160%';
      elem.style.opacity = '0';
      console.log('agree');
      const classes = elem.classList;
      if(classes.contains('root')) {
        chakras[0] += 1;
      } else if (classes.contains('sacral')) {
        chakras[1] += 1;
      } else if (classes.contains('solar')) {
        chakras[2] += 1;
      } else if (classes.contains('heart')) {
        chakras[3] += 1;
      } else if (classes.contains('throat')) {
        chakras[4] += 1;
      } else if (classes.contains('third')) {
        chakras[5] += 1;
      } else if (classes.contains('crown')) {
        chakras[6] += 1;
      }
  } else if (change > 0) {
      if(q) {
        count += 1;
        blastOff(count);
      }
      elem.style.left = '-160%';
      elem.style.opacity = '0';
      console.log('disagree');
      const classes = elem.classList;
      if(classes.contains('root')) {
        chakras[0] -= 1;
      } else if (classes.contains('sacral')) {
        chakras[1] -= 1;
      } else if (classes.contains('solar')) {
        chakras[2] -= 1;
      } else if (classes.contains('heart')) {
        chakras[3] -= 1;
      } else if (classes.contains('throat')) {
        chakras[4] -= 1;
      } else if (classes.contains('third')) {
        chakras[5] -= 1;
      } else if (classes.contains('crown')) {
        chakras[6] -= 1;
      }
    }

  }
  // console.log(chakras);
  // console.log(tuneChakra(chakras));
  // console.log(count);
}
