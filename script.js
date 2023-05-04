import keysData from './keysdata.js';

// Инициализация html элементов
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
document.body.append(wrapper);

const title = document.createElement('h1');
title.className = 'title';
title.innerHTML = 'Виртуальная клавиатура';
wrapper.append(title);

const area = document.createElement('textarea');
area.className = 'area';
title.innerHTMl = 'введите текст';
wrapper.append(area);

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

// звук клика
const audio = document.createElement("audio");
audio.classList.add('audio')
audio.src = "./assets/audio.mp3";
audio.type = "audio/mpeg";
document.body.appendChild(audio);


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

// каретка
function getCaret(el) {
  return el.selectionStart ?? el.createTextRange()?.text?.length ?? 0;
}

function resetCursor(txtElement, currentPos) {
  if (txtElement.setSelectionRange) {
    txtElement.focus();
    txtElement.setSelectionRange(currentPos, currentPos);
  } else if (txtElement.createTextRange) {
    txtElement.createTextRange()?.moveStart("character", currentPos)?.select();
  }
}

// функциональные кнопки
function Backspace() {
  let textarea = document.querySelector(".area");
  let currentPos = getCaret(area);
  let text = textarea.value;
  let backSpace = text.slice(0, currentPos - 1) + text.slice(currentPos);
  textarea.value = backSpace;
  resetCursor(textarea, currentPos - 1);
}

function Other() {
  let textarea = document.querySelector(".area");
  let currentPos = getCaret(area);
  resetCursor(textarea, currentPos);
}

function OtherInput(letter) {
  let textarea = document.querySelector(".area");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del =
    text.substr(0, currentPos) + letter + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 1);
}

function Delete() {
  let textarea = document.querySelector(".area");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del = text.substr(0, currentPos) + text.substr(currentPos + 1, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos);
}

function ArrowUp() {
  let textarea = document.querySelector(".area");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del = text.substr(0, currentPos) + "▲" + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 1);
}

function ArrowLeft() {
  let textarea = document.querySelector(".area");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del = text.substr(0, currentPos) + "◄" + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos - 1);
}

function ArrowDown() {
  let textarea = document.querySelector(".area");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del = text.substr(0, currentPos) + "▼" + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 1);
}

function ArrowRight() {
  let textarea = document.querySelector(".area");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del = text.substr(0, currentPos) + "►" + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 1);
}

function Enter() {
  let textarea = document.querySelector(".area");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del = text.substr(0, currentPos) + "\n" + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 1);
}

function Space() {
  let textarea = document.querySelector(".area");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del =
    text.substr(0, currentPos) + " " + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 1);
}

function Tab() {
  let textarea = document.querySelector(".area");
  let currentPos = getCaret(textarea);
  let text = textarea.value;
  let Del = text.substr(0, currentPos) + "    " + text.substr(currentPos, text.length);
  textarea.value = Del;
  resetCursor(textarea, currentPos + 4);
}

// вывод символа при клике на виртуальную клавиатуру
const allButtons = document.querySelectorAll('.key');
allButtons.forEach((item) => {
  item.addEventListener('mousedown', (event) => {
    console.log(event);
    if (event.target.textContent.length < 2 && event.target.textContent !== ' ') {
      OtherInput(event.target.textContent);
    } else {
       if  (item.className.split(' ')[1] === 'Backspace') {
        Backspace();
      } else if (item.className.split(' ')[1] === 'Delete') {
        Delete();
      } else if (item.className.split(' ')[1] === 'ArrowUp') {
        ArrowUp();
      } else if (item.className.split(' ')[1] === 'ArrowLeft') {
        ArrowLeft();
      } else if (item.className.split(' ')[1] === 'ArrowDown') {
        ArrowDown();
      } else if (item.className.split(' ')[1] === 'ArrowRight') {
        ArrowRight();
      } else if (item.className.split(' ')[1] === 'Enter') {
        Enter();
      } else if (item.className.split(' ')[1] === 'Tab') {
        Tab();
      } else if (item.className.split(' ')[1] === 'Space') {
        Space();
      }
    }
    audio.play();
  })
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

let ctrlOn = false;
function toggleCtrlLock() {
  if (ctrlOn === true) {
    ctrlOn = false;
  } else {
    ctrlOn = true;
  }
}

document.querySelector('.AltLeft').addEventListener('click', (event) => {
  if (ctrlOn === true) {
    if (currentLang === 'en') {
      initRu();
    } else if (currentLang === 'ru') {
      initEn();
    }
    toggleCtrlLock()
    document.querySelector('.ControlLeft').classList.toggle('active');
  }
});

document.querySelector('.ControlLeft').addEventListener('click', (event) => {
  toggleCtrlLock();
  event.target.classList.toggle('active');
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
          audio.play();
          event.preventDefault();
          if (currentLang === 'ru') {
            if (shiftKeyOn === true || shiftClickOn === true) {
              if (capsOn === true) {
                if ((keysData[j][i].caps)) {
                  OtherInput(keysData[j][i].shift.ru);
                } else {
                  OtherInput(keysData[j][i].key.ru);
                }
              } else {
                OtherInput(keysData[j][i].shift.ru);
              }
            } else if (capsOn === true) {
              if (keysData[j][i].caps) {
                OtherInput(keysData[j][i].caps.ru);
              } else {
                OtherInput(keysData[j][i].shift.ru);
              }
            } else {
              OtherInput(keysData[j][i].key.ru);
            }
          } else if (currentLang === 'en') {
            if (shiftKeyOn === true || shiftClickOn === true) {
              if (capsOn === true) {
                if ((keysData[j][i].caps)) {
                  OtherInput(keysData[j][i].shift.en);
                } else {
                  OtherInput(keysData[j][i].key.en);
                }
              } else {
                OtherInput(keysData[j][i].shift.en);
              }
            } else if (capsOn === true) {
              if (keysData[j][i].caps) {
                OtherInput(keysData[j][i].caps.en);
              } else {
                OtherInput(keysData[j][i].shift.en);
              }
            } else {
              OtherInput(keysData[j][i].key.en);
            }
          }
        } else {
          if (event.code === 'Tab') {
            event.preventDefault();
            Tab();
          } else if (event.code === 'Del') {
            Del();
          }
        }
        audio.play();
      }
    }
  }
});
