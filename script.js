import keysData from './keysdata.js';

const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
document.body.append(wrapper);

const title = document.createElement('h1');
title.className = 'title';
title.innerHTML = 'RSS Виртуальная клавиатура';
wrapper.append(title);

const area = document.createElement('textarea');
area.className = 'area';
title.innerHTMl = 'введите текст';
area.setAttribute('autofocus', '');
wrapper.append(area);
area.readOnly = true;

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
wrapper.append(keyboard);

const description = document.createElement('div');
description.className = 'description';
description.innerHTML = 'Клавиатура создана в операционной системе Windows 10. Комбинация для переключения языка: левые shift + alt';
wrapper.append(description);

function initKeyboardRow() {
  keyboard.innerHTML = '';
  for (let i = 0; i < 5; i += 1) {
    const keyboardRow = document.createElement('div');
    keyboardRow.className = 'keyboard_row';
    keyboardRow.id = `keyboard_row${i}`;
    keyboard.appendChild(keyboardRow);
  }
}

let currentLang = 'ru';

// ИНИЦИАЦИЯ КНОПОК КЛАВЫ
let initKeyboard = function() {
  initKeyboardRow();
  let out = '';
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      out = `<button class = '${keysData[j][i].class}' >${keysData[j][i].key.ru}</button>`;
      document.querySelector(`#keyboard_row${j}`).innerHTML += out;
      currentLang = 'ru';
    }
  }
}
initKeyboard();

function initEn() {

  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      document.querySelector(`.${keysData[j][i].code}`).innerHTML = `${keysData[j][i].key.en}`;
    }
  }
  currentLang = 'en';
}

function initRu() {

  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      document.querySelector(`.${keysData[j][i].code}`).innerHTML = `${keysData[j][i].key.ru}`;
    }
  }
  currentLang = 'ru';
}

function initShiftEn() {
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      document.querySelector(`.${keysData[j][i].code}`).innerHTML = `${keysData[j][i].shift.en}`;
    }
  }
  currentLang = 'en';
}

function initShiftRu() {
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      document.querySelector(`.${keysData[j][i].code}`).innerHTML = `${keysData[j][i].shift.ru}`;
    }
  }
  currentLang = 'ru';
}

function initCapsEn() {
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      if (keysData[j][i].caps) {
        document.querySelector(`.${keysData[j][i].code}`).innerHTML = `${keysData[j][i].caps.en}`;
      } else {
        document.querySelector(`.${keysData[j][i].code}`).innerHTML = `${keysData[j][i].shift.en}`;
    }
  }
  }
  currentLang = 'en';
}

function initCapsRu() {
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      if (keysData[j][i].caps) {
        document.querySelector(`.${keysData[j][i].code}`).innerHTML = `${keysData[j][i].caps.ru}`;
      } else {
        document.querySelector(`.${keysData[j][i].code}`).innerHTML = `${keysData[j][i].shift.ru}`;
    }
  }
  }
  currentLang = 'ru';
}

//выводим символ при клике мышкой
const allButtons = document.querySelectorAll('.key');
allButtons.forEach((item) => {
  item.addEventListener('mousedown', (event) => {
    if (event.target.textContent.length < 2) {
      area.value += `${event.target.textContent}`;
    }
  })
});

// function handlerKeyDown(event) {
//   (const button of allButtons) {
//     if (button.classList.contains('active')) {
//       button.classList.remove('active');
//     }
//   } else if
// }

// keyboard.addEventListener("mousedown", keyOn);
// keyboard.addEventListener("keydown", function(event) {
//   console.log();
// });

// function keyOn(event) {
//   if ((event.target.classList.contains("key"))) {
//     event.target.classList.add("active");
//     console.log(event.target);
//   }
// }

// function keyOff(event) {
//   // if (event.code.classList.contains("key")) {
//     // event.target.classList.add("active");

//     console.log(event);
//   // }
// }

// function toggleActive(event) {
//   event.classList.toggle('active');
// }
// // вешаем свойство activ при вводе с клавы
//   document.addEventListener('keydown', (event) => {
//     toggleActive();
//     console.log(event.code);
//   })
//   document.addEventListener('click', (event) => {
//     // console.log(event.target.className.split(" ")[1]);
//   })



// смена языка
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.altKey){
    if (currentLang === 'en') {
      initRu();
    } else if (currentLang === 'ru') {
      initEn();
    }
  }
});

// SHIFTUEM
// меняем клаву при keydown shift
let shiftKeyOn = false;
document.addEventListener('keydown', function(event) {
  if (event.code === 'ShiftLeft') {
    if (shiftClickOn === true) {
      shiftClickOn = false;
    } else {
    shiftKeyOn = true;
    if (currentLang === 'ru') {
      initShiftRu();
    } else if (currentLang === 'en') {
      initShiftEn();
    }
  }
  }
})

// меняем клаву при keyup shift
document.addEventListener('keyup', function(event) {
    if (event.code === 'ShiftLeft') {
      shiftKeyOn = false;
      if (currentLang === 'ru') {
        initRu();
      } else if (currentLang === 'en') {
        initEn();
      }
    }
})

// меняем клаву при клике на shift
let shiftClickOn = false;
let shiftClickToggle = function() {
  if (shiftClickOn === false) {
    if (currentLang === 'en') {
      initShiftEn();
    } else if (currentLang === 'ru') {
      initShiftRu();
    }
    shiftClickOn = true;
    // console.log(shiftClickOn);

  } else if (shiftClickOn === true) {
    if (currentLang === 'en') {
      initEn();
    } else if (currentLang === 'ru') {
      initRu();
    }
    shiftClickOn = false;

  }
}

function clickShift() {
  document.querySelector('.ShiftLeft').addEventListener('click', function(event) {
  shiftClickToggle();
})
}

document.querySelector('.ShiftLeft').addEventListener('click', clickShift());

// KAPSUEM
let capsOn = false;
function toggleCapsLock() {
  if (capsOn === true) {
    capsOn = false;
    if (currentLang === 'ru') {
      initRu();
    } else if (currentLang === 'en') {
      initEn();
    }
  } else {
  capsOn = true;
  if (currentLang === 'ru') {
    initCapsRu();
  } else if (currentLang === 'en') {
    initCapsEn();
  }
}
}

document.addEventListener('keyup', function(event) {
  if (event.code === 'CapsLock') {
    toggleCapsLock();
}})

document.querySelector('.CapsLock').addEventListener('click', function(event) {
    toggleCapsLock();
});

// ищем по объекту совпадения по event.code (ex. keyZ) и в зависимости от текущей раскладки выводим символ
document.addEventListener('keydown', (event) => {
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      if (keysData[j][i].code == event.code) {
        if (!('noType' in keysData[j][i])) {
          event.preventDefault();

          if (currentLang === 'ru') {
            if (shiftKeyOn === true || shiftClickOn === true) {
              if  (capsOn === true) {
                if ((keysData[j][i].caps)) {
                  area.value += keysData[j][i].shift.ru
                } else {
                  area.value += keysData[j][i].key.ru
                }
              } else {
                area.value += keysData[j][i].shift.ru;
              }

            } else {
              if (capsOn === true) {
                if (keysData[j][i].caps) {
                area.value += keysData[j][i].caps.ru;
                } else {
                  area.value += keysData[j][i].shift.ru;
                }
              } else {
                area.value += keysData[j][i].key.ru;
              }
            }

          } else if (currentLang === 'en') {
            if (shiftKeyOn === true || shiftClickOn === true) {
              if  (capsOn === true) {
                if ((keysData[j][i].caps)) {
                  area.value += keysData[j][i].shift.en
                } else {
                  area.value += keysData[j][i].key.en
                }
              } else {
                area.value += keysData[j][i].shift.en;
              }

            } else {
              if (capsOn === true) {
                if (keysData[j][i].caps) {
                area.value += keysData[j][i].caps.en;
                } else {
                  area.value += keysData[j][i].shift.en;
                }
              } else {
                area.value += keysData[j][i].key.en;
              }
            }
        }
      }
      }
    }
  }
})


