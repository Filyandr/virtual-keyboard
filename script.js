import keysData from './keysdata.js';

// Инициализация html элементов
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
description.innerHTML = 'Клавиатура создана в операционной системе Windows 10. Комбинация для переключения языка: левые ctrl + alt';
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

// localstorage проверка языка
let currentLang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ru';

// Инициализация кнопок и раскладок клавиатуры
function initKeyboard() {
  initKeyboardRow();
  let out = '';
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      out = `<button class = '${keysData[j][i].class}' >${keysData[j][i].key[currentLang]}</button>`;
      document.querySelector(`#keyboard_row${j}`).innerHTML += out;
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
  localStorage.setItem('lang', 'en');
}

function initRu() {
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      document.querySelector(`.${keysData[j][i].code}`).innerHTML = `${keysData[j][i].key.ru}`;
    }
  }
  currentLang = 'ru';
  localStorage.setItem('lang', 'ru');
}

function initShiftEn() {
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      document.querySelector(`.${keysData[j][i].code}`).innerHTML = `${keysData[j][i].shift.en}`;
    }
  }
  currentLang = 'en';
  localStorage.setItem('lang', 'en');
}

function initShiftRu() {
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      document.querySelector(`.${keysData[j][i].code}`).innerHTML = `${keysData[j][i].shift.ru}`;
    }
  }
  currentLang = 'ru';
  localStorage.setItem('lang', 'ru');
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
  localStorage.setItem('lang', 'en');
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
  localStorage.setItem('lang', 'ru');
}

// возврат позиции курсора - недоработан
function getCaret(el) {
  el.focus();
  if (el.selectionStart) {
    return el.selectionStart;
  } if (document.selection) {
    const r = document.selection.createRange();
    if (r == null) {
      return 0;
    }
    const re = el.createTextRange();
    const rc = re.duplicate();
    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart', re);

    return rc.text.length;
  }
  return 0;
}

// выводим символ при клике мышкой
let tempCaret = 0;

area.addEventListener('blur', () => {
  tempCaret = getCaret(area);
});

const allButtons = document.querySelectorAll('.key');
allButtons.forEach((item) => {
  item.addEventListener('mousedown', (event) => {
    const currentCaret = tempCaret;
    if (event.target.textContent.length < 3) {
      const leftPart = area.value.substring(0, currentCaret);
      const rightPart = area.value.substring(currentCaret);
      area.value = leftPart + event.target.textContent + rightPart;
      tempCaret = currentCaret + 1;
    }
  });
});

// добавляем класс актив при нажатии
document.addEventListener('keydown', (event) => {
  allButtons.forEach((item) => {
    if (item.className.split(' ')[1] === event.code) {
      if (item.className.split(' ')[1] === 'CapsLock') {
        item.classList.toggle('active');
      } else {
        item.classList.add('active');
      }
    }
  });
});

document.addEventListener('keyup', (event) => {
  allButtons.forEach((item) => {
    if (item.className.split(' ')[1] === event.code && (!(item.className.split(' ')[1] === 'CapsLock'))) {
      item.classList.remove('active');
    }
  });
});

// смена языка
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey) {
    if (currentLang === 'en') {
      initRu();
    } else if (currentLang === 'ru') {
      initEn();
    }
  }
});

// меняем клавиатуру при keydown shift
let shiftKeyOn = false;
let shiftClickOn = false;
document.addEventListener('keydown', (event) => {
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
});

// меняем клавиатуру при keyup shift
document.addEventListener('keyup', (event) => {
  if (event.code === 'ShiftLeft') {
    shiftKeyOn = false;
    if (currentLang === 'ru') {
      initRu();
    } else if (currentLang === 'en') {
      initEn();
    }
  }
});

// меняем клавиатуру при клике на shift
const shiftClickToggle = () => {
  if (shiftClickOn === false) {
    if (currentLang === 'en') {
      initShiftEn();
    } else if (currentLang === 'ru') {
      initShiftRu();
    }
    shiftClickOn = true;
  } else if (shiftClickOn === true) {
    if (currentLang === 'en') {
      initEn();
    } else if (currentLang === 'ru') {
      initRu();
    }
    shiftClickOn = false;
  }
};

function clickShift() {
  document.querySelector('.ShiftLeft').addEventListener('click', (event) => {
    shiftClickToggle();
    event.target.classList.toggle('active');
  });
}

document.querySelector('.ShiftLeft').addEventListener('click', clickShift());

// Капс
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

document.addEventListener('keyup', (event) => {
  if (event.code === 'CapsLock') {
    toggleCapsLock();
  }
});

document.querySelector('.CapsLock').addEventListener('click', (event) => {
  toggleCapsLock();
  event.target.classList.toggle('active');
});

// ищем по объекту совпадения event.code (ex. keyZ), вывод символа в зависимости от раскладки
document.addEventListener('keydown', (event) => {
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      if (keysData[j][i].code === event.code) {
        if (!('noType' in keysData[j][i])) {
          event.preventDefault();
          if (currentLang === 'ru') {
            if (shiftKeyOn === true || shiftClickOn === true) {
              if (capsOn === true) {
                if ((keysData[j][i].caps)) {
                  area.value += keysData[j][i].shift.ru;
                } else {
                  area.value += keysData[j][i].key.ru;
                }
              } else {
                area.value += keysData[j][i].shift.ru;
              }
            } else if (capsOn === true) {
              if (keysData[j][i].caps) {
                area.value += keysData[j][i].caps.ru;
              } else {
                area.value += keysData[j][i].shift.ru;
              }
            } else {
              area.value += keysData[j][i].key.ru;
            }
          } else if (currentLang === 'en') {
            if (shiftKeyOn === true || shiftClickOn === true) {
              if (capsOn === true) {
                if ((keysData[j][i].caps)) {
                  area.value += keysData[j][i].shift.en;
                } else {
                  area.value += keysData[j][i].key.en;
                }
              } else {
                area.value += keysData[j][i].shift.en;
              }
            } else if (capsOn === true) {
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
});
