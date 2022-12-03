'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const selectAllBtn = document.getElementById('select-all');
  const cardListItemsActive = document.querySelectorAll('.basket-active .card-list__item');
  const searchGoods = document.getElementById('searchGoods');
  const searchBtn = document.getElementById('search-btn');

  function counter() {
    let count1 = 0;
    let count2 = 0;
    document.querySelector('.card-list').querySelectorAll('.card-list__item').forEach((el) => {
      if (el.querySelector('.item__checkbox').checked) {
        count1 += Number(el.querySelector('.price-count').textContent.replace('com', '').split(' ').join(''));
        count2 += Number(el.querySelector('.price-discount').textContent.replace('com', '').split(' ').join(''))
      }
    })

    document.querySelector('.top__total>.count').textContent = count1.toLocaleString() + ' com'
    document.querySelector('.top__count>.count').textContent = count2.toLocaleString() + ' com'
    document.querySelector('.top__discount>.count').textContent = '-' + (count2 - count1).toLocaleString() + ' com'
  }

  function selectAll() {
    if (selectAllBtn.checked) {
      cardListItemsActive.forEach((el) => {
        el.querySelector('.item__checkbox').checked = true
      })
    } else {
      cardListItemsActive.forEach((el) => {
        el.querySelector('.item__checkbox').checked = false
      })
    }
    counter();
  }

  function updaterCounter() {
    document.querySelectorAll('.card-count__counter').forEach((el) => {
      if (el.children[1].value <= el.children[1].min) {
        el.children[0].disabled = true
      }
      else {
        el.children[0].disabled = false
      }

      if (el.children[1].value >= el.children[1].max) {
        el.children[2].disabled = true
      }
      else {
        el.children[2].disabled = false
      }
    })
  }

  function finder(finder) {
    const inputValue = finder.path[2].children[0].children[0].value.trim();
    document.querySelectorAll('.card-list__item').forEach(item => {
      const searchString = new RegExp(inputValue, 'i');
      if (!searchString.test(item.children[0].children[2].children[0].children[0].textContent.trim())) {
        item.classList.add('disabled')
      } else {
        item.classList.remove('disabled')
      }
    })
  };

  selectAll();
  counter();
  updaterCounter();
  selectAllBtn.addEventListener('change', selectAll);
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    finder(e);
  })
  // searchGoods.addEventListener('input', finder, this.value)

  document.querySelectorAll('.card-count__counter').forEach((el) => {
    el.children[0].addEventListener('click', () => {
      let priceCount = el.closest('.card-list__item').children[1].children[1].children[0].textContent.replace('com', '').split(' ').join('');
      let priceDiscount = el.closest('.card-list__item').children[1].children[1].children[1].textContent.replace('com', '').split(' ').join('');
      let newPriceCount = Math.round(priceCount - (priceCount / (Number(el.children[1].value) + 1)));
      let newPriceDiscount = Math.round(priceDiscount - (priceDiscount / (Number(el.children[1].value) + 1)))
      el.closest('.card-list__item').children[1].children[1].children[0].textContent = newPriceCount.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' com';
      el.closest('.card-list__item').children[1].children[1].children[1].textContent = newPriceDiscount.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' com';
      counter();
      updaterCounter();
    })

    el.children[2].addEventListener('click', () => {
      let priceCount = Number(el.closest('.card-list__item').children[1].children[1].children[0].textContent.replace('com', '').split(' ').join(''));
      let priceDiscount = Number(el.closest('.card-list__item').children[1].children[1].children[1].textContent.replace('com', '').split(' ').join(''));
      let newPriceCount = Math.round(priceCount + (priceCount / (Number(el.children[1].value) + 1)));
      let newPriceDiscount = Math.round(priceDiscount + (priceDiscount / (Number(el.children[1].value) + 1)))
      el.closest('.card-list__item').children[1].children[1].children[0].textContent = newPriceCount.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' com';
      el.closest('.card-list__item').children[1].children[1].children[1].textContent = newPriceDiscount.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' com';
      counter();
      updaterCounter();
    })
  })

  document.querySelector('body').onclick = e => {
    if (e.target.className == 'count-btn__dlt') {
      let good = e.target.closest('.card-list__item');
      good.remove();
      counter();
    }

    if (e.target.className == 'count-btn__like') {
      e.target.classList.add('active');
    } else if (e.target.className == 'count-btn__like active') {
      e.target.classList.remove('active');
    }
  }

  document.querySelector('.basket').onclick = e => {
    if (e.target.className != 'accordion__icon') return;
    e.target.parentNode.parentNode.querySelector('.card-list').hidden = !e.target.parentNode.parentNode.querySelector('.card-list').hidden;
  };

  document.querySelectorAll('.item__checkbox').forEach(el => {
    el.onclick = counter;
  })


  //Validator
  let firstnameInput = document.getElementById("firstname");
  let firstnameNote = document.querySelector('.recipient__firstname>.text-field__note');
  let lastnameInput = document.getElementById("lastname");
  let lastnameNote = document.querySelector('.recipient__lastname>.text-field__note');
  let emailInput = document.getElementById("email");
  let emailNote = document.querySelector('.recipient__email>.text-field__note');
  let numberInput = document.getElementById("number");
  let numberNote = document.querySelector('.recipient__number>.text-field__note');
  let innInput = document.getElementById("inn");
  let innNote = document.querySelector('.recipient__inn>.text-field__note');
  let btnSend = document.querySelector(".sidebar__btn-order");
  // console.log(btnSend)

  firstnameInput.addEventListener("keyup", function () {
    this.value = this.value.replace(/[\d]/g, "");
  });

  lastnameInput.addEventListener("keyup", function () {
    this.value = this.value.replace(/[\d]/g, "");
  });
  numberInput.addEventListener("keyup", function () {
    this.value = this.value.replace(/[A-Za-zА-Яа-яЁё]/, '');
  });
  innInput.addEventListener("keyup", function () {
    this.value = this.value.replace(/[^\d]/g, "");
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validateNumber = (number) => {
    return String(number)
      .toLowerCase()
      .match(
        /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g
      );
  };

  firstnameInput.addEventListener("input", function () {
    if (firstnameInput.value == '') {
      firstnameNote.classList.remove('error')
      return;
    }
    if (firstnameInput.value != '') {
      firstnameNote.classList.remove('error')
      return;
    }
  })
  lastnameInput.addEventListener("input", function () {
    if (lastnameInput.value == '') {
      lastnameNote.classList.remove('error')
      return;
    }
    if (lastnameInput.value != '') {
      lastnameNote.classList.remove('error')
      return;
    }
  })

  innInput.addEventListener("input", function () {
    if (innInput.value == '') {
      innNote.classList.remove('error')
      return;
    }
    if (innNote.value != '') {
      innNote.classList.remove('error')
      return;
    }
  })

  numberInput.addEventListener("blur", function () {
    if (numberInput.value == '') {
      numberNote.classList.remove('error')
      return;
    }
    if (!validateNumber(numberInput.value)) {
      numberNote.textContent = 'Формат: +9 999 999 99 99';
      numberNote.classList.add('error');
    } else {
      numberNote.classList.remove('error');
    }
  })

  emailInput.addEventListener("blur", function () {
    if (emailInput.value == '') {
      emailNote.classList.remove('error')
      return;
    }
    if (!validateEmail(emailInput.value)) {
      emailNote.textContent = 'Проверьте адрес электронной почты'
      emailNote.classList.add('error');
    } else {
      emailNote.classList.remove('error');
    }
  });



  btnSend.addEventListener('click', function () {
    if (firstnameInput.value == '') {
      firstnameNote.textContent = 'Укажите имя'
      firstnameNote.classList.add('error');
    } else {
      firstnameNote.classList.remove('error');
    }
    if (lastnameInput.value == '') {
      lastnameNote.textContent = 'Введите фамилию'
      lastnameNote.classList.add('error');
    } else {
      lastnameNote.classList.remove('error');
    }
    if (emailInput.value == '') {
      emailNote.textContent = 'Укажите электронную почту'
      emailNote.classList.add('error');
    }
    if (numberInput.value == '') {
      numberNote.textContent = 'Укажите номер телефона'
      numberNote.classList.add('error');
    } else {
      numberNote.classList.remove('error');
    }
    if (innInput.value == '') {
      innNote.textContent = 'Укажите индекс'
      innNote.classList.add('error');
    } else {
      innNote.classList.remove('error');
    }
  })
})

