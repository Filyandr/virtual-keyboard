import keysData from './keysdata.js';

const v = keysData;

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
wrapper.append(area);

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
wrapper.append(keyboard);

const description = document.createElement('div');
description.className = 'description';
description.innerHTML = 'Клавиатура создана в операционной системе Windows 10. Для переключения языка комбинация: левые ctrl + alt';
wrapper.append(description);

for (let i = 0; i < 5; i += 1) {
  const keyboardRow = document.createElement('div');
  keyboardRow.className = 'keyboard_row';
  keyboardRow.id = `keyboard_row${i}`;
  keyboard.appendChild(keyboardRow);
}

function initEn() {
  let out = '';
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      out = `<div class = '${keysData[j][i].class}' > ${keysData[j][i].key.en} </div>`;
      document.querySelector(`#keyboard_row${j}`).innerHTML += out;
    }
  }
}

initEn();

function initRu() {
  let out = '';
  for (let j = 0; j < keysData.length; j += 1) {
    for (let i = 0; i < keysData[j].length; i += 1) {
      out = `<button class = '${keysData[j][i].class}' > ${keysData[j][i].key.ru} </button>`;
      document.querySelector(`#keyboard_row${j}`).innerHTML += out;
    }
  }
}

// initRu();

const allButtons = document.querySelectorAll('.key');
allButtons.forEach((item) => {
  item.addEventListener('mousedown', (event) => {
    area.value += `${event.target.textContent}`;
  })
});
