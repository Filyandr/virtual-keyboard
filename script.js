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
description.innerHTML = 'Клавиатура создана в операционной системе Windows 10. Для переключения языка комбинация: левые shift + alt';
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

let currentLang = 'en';

function initEn() {
  initKeyboardRow();
  let out = '';
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      out = `<button class = '${keysData[j][i].class}' >${keysData[j][i].key.en}</button>`;
      document.querySelector(`#keyboard_row${j}`).innerHTML += out;
      currentLang = 'en';
    }
  }
  clickShift();
}

initEn();

function initRu() {
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

// initRu()

function initShiftEn() {
  initKeyboardRow();
  let out = '';
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      out = `<button class = '${keysData[j][i].class}' >${keysData[j][i].shift.en}</button>`;
      document.querySelector(`#keyboard_row${j}`).innerHTML += out;
      currentLang = 'en';
    }
  }
  clickShift();
}

// initShiftEn();

function initShiftRu() {
  initKeyboardRow();
  let out = '';
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      out = `<button class = '${keysData[j][i].class}' >${keysData[j][i].shift.ru}</button>`;
      document.querySelector(`#keyboard_row${j}`).innerHTML += out;
      currentLang = 'ru';
    }
  }
}

// initShiftRu();


const allButtons = document.querySelectorAll('.key');
allButtons.forEach((item) => {
  item.addEventListener('mousedown', (event) => {
    if (event.target.textContent.length < 2) {
      area.value += `${event.target.textContent}`;
    }
  })
});


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
  if (event.shiftKey) {
    shiftKeyOn = true;
    if (currentLang === 'ru') {
      initShiftRu();
    } else if (currentLang === 'en') {
      initShiftEn();
    }
  }
})
// меняем клаву при keyup shift
document.addEventListener('keyup', function(event) {
    if (event.shiftKey === false) {
      shiftKeyOn = false;
      if (currentLang === 'ru') {
        initRu();
      } else if (currentLang === 'en') {
        initEn();
      }
    }
})



// меняем клаву при клике на shift
let onShift = false;
let shiftClickToggle = function() {
  console.log('her1');
  if (onShift === false) {
    console.log('xer2')
    if (currentLang === 'en') {
      initShiftEn();
    } else if (currentLang === 'ru') {
      initShiftRu();
    }
    onShift = true;

  } else if (onShift === true) {
    console.log('хер3');
    if (currentLang === 'en') {
      initEn();
    } else if (currentLang === 'ru') {
      initRu();
    }
    onShift = false;
  }
}
function clickShift() {
  document.querySelector('.ShiftLeft').addEventListener('click', function(event) {
  // console.log(event);
  shiftClickToggle();

})
}
// повесить событие на удержание любого шифта, должна быть переменная, нажат ли шифт, если да заменяем клавиатуру при нажатом шифте и настраиваем ввод в текстарею соответствующим символом

// ищем по объекту совпадения по event.code (ex. keyZ) и в зависимости от текущей раскладки выводим символ
document.addEventListener('keydown', (event) => {
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      if (keysData[j][i].code == event.code) {
        if (!('noType' in keysData[j][i])) {
          if (currentLang === 'ru') {
            if (shiftKeyOn === false) {
              area.value += keysData[j][i].key.ru;
            } else {
              area.value += keysData[j][i].shift.ru;
            }
          } else if (shiftKeyOn === false) {
            area.value += keysData[j][i].key.en;
          } else {
            area.value += keysData[j][i].shift.en;
          }
        }
      }
    }
  }
})



  // console.log(keysData.find(item => item.code == event.code));
  // area.value += event.code
  // event.preventDefault();
  // console.log(event.code);
    // for (let j = 0; j < keysData.length; j += 1) {
    //   for (let i = 0; i < keysData[j].length; i += 1) {


      // event.code

  // for (let j = 0; j < keysData.length; j += 1) {
  //   for (let i = 0; i < keysData[j].length; i += 1) {
  //     if (event.key == `${keysData[j][i].key.ru}` ||
  //           event.key == `${keysData[j][i].key.en}` ||
  //           event.key == `${keysData[j][i].shift.ru}` ||
  //           event.key == `${keysData[j][i].shift.en}`) {
  //       if ('noType' in keysData[j][i]) {
  //         area.value += '';
  //         // event.preventDefault();
  //       } else {
  //         area.value += `${event.key}`;
  //         // event.preventDefault();
  //       }
  //     }
  //   }
  // }
// });


// backspace functional
// function backSpace() {
//   let bckspc = String(area.value);
//   bckspc = bckspc.slice(0, 1);
//   area.value = bckspc;
//   if (document.querySelector("textarea").selectionStart === 0) return;
// }

// keyboard.addEventListener('mousedown', (event) => {
//   if (event.target && event.target.textContent == 'Backspace'){
//     backSpace();
//   }
// })
// const buttonBackspace = document.querySelector('.Backspace');
// buttonBackspace.addEventListener('mousedown', function(event) {
//   backSpace();
// })