const expandAside = document.getElementById('expand');
const selectBrand = document.querySelectorAll('.brand-select li');
const allShoes = document.querySelectorAll('.shoe');
const reset = document.getElementById('reset');
const message = document.getElementById('message');
const selectGender = document.querySelectorAll('.gender-selection li');
const selectPrice = document.querySelectorAll('.price-selection li');
const selectColor = document.querySelectorAll('.color-selection li');
const allOpts = document.querySelectorAll('.brand-selection ul li');
//Aside expand/Collapse
expandAside.addEventListener('click', () => {
  document.body.classList.toggle('expanded');
  document.body.classList.toggle('smallExpand');
  document.body.classList.toggle('coll');
})
//Drop down options expand/Collapse
const dropdownOpts = document.querySelectorAll('.brand-dropdown');
dropdownOpts.forEach((el) => {
  el.addEventListener('click', () => {
    const parent = el.closest('.brand-selection');
    const list = parent.querySelector('ul');
    list.style.display === 'none' ? list.style.display = 'block'
      : list.style.display = 'none';
  })
})

 
const priceMap = {
  all: () => true,
  low: (x) => x <= 200,
  medium: (x) => x >= 300 && x < 500,
  high: (x) => x > 500
}


let userMake = ['all'];
let userGender = 'all';
let userPrice = 'all';
let userColor = 'all';
const brandLoop = () => {
  selectBrand.forEach((el) => {
    el.addEventListener('click', () => {
      const brandValue = el.textContent.toLowerCase();
      if (brandValue === 'all') {
        userMake = ['all'];
        selectBrand.forEach((el) => {
          el.classList.remove('bg');
        })
        el.classList.add('bg');
        setTimeout(() => {
          el.classList.remove('bg');
        }, 100)
      }
      else {
        userMake = userMake.filter(i => i !== 'all');

        if (userMake.includes(brandValue)) {
          userMake = userMake.filter(li => li !== brandValue);
          el.classList.remove('bg');
        }
        else {
          userMake.push(brandValue);
          el.classList.add('bg');
        }
      }
      if (userMake.length === 0) {
        userMake = ['all'];
        selectBrand.forEach((j) => {
          j.classList.remove('bg');
        })
      }
      filter();
    })

  })
}
const genderLoop = () => {
  selectGender.forEach((el) => {
    el.addEventListener('click', () => {
      userGender = el.textContent.toLowerCase();
      selectGender.forEach((li => li.classList.remove('bg')));
      el.classList.add('bg');
      selectedLoop(userGender, selectGender);
      filter();
    })
  })
}
const priceLoop = () => {
  selectPrice.forEach((el) => {
    el.addEventListener('click', () => {
      userPrice = el.textContent.toLowerCase();
      selectPrice.forEach((el => el.classList.remove('bg')));
      el.classList.add('bg');
      selectedLoop(userPrice, selectPrice);
      filter();
    })
  })
}
const colorLoop = () => {
  selectColor.forEach((el) => {
    el.addEventListener('click', () => {
      userColor = el.textContent.toLowerCase();
      selectColor.forEach((li => li.classList.remove('bg')));
      el.classList.add('bg');
      selectedLoop(userColor, selectColor);
      filter();
    })
  })
}


// Shoe fltering
const filter = () => {
  let count = 0;
  allShoes.forEach((e) => {
    const brand = e.dataset.brand;
    const gender = e.dataset.gender;
    const price = e.dataset.price;
    const color = e.dataset.color;


    const check = userMake.includes('all') || userMake.includes(brand);
    const genderCheck = userGender === 'all' || gender === userGender;
    const priceCheck = priceMap[userPrice](price);
    const colorCheck = userColor === 'all' || color === userColor;


    if (check && genderCheck && priceCheck && colorCheck) {
      e.style.display = 'block';
      count++;
    }
    else {
      e.style.display = 'none';
    }

  })
  count === 0 ? message.style.display = 'block' : message.style.display = 'none';
}


//Helper/Reset Functions
const selectedLoop = (user, loopThru) => {
  if (user === 'all') {
    loopThru.forEach((el) => {
      el.classList.remove('bg');
    })
  }
}
reset.addEventListener('click', () => {
  allShoes.forEach((el) => {
    el.style.display = 'block';
    message.style.display = 'none';
  })
  userMake = ['all'];
  userColor = 'all';
  userGender = 'all';
  userPrice = 'all';

  [...selectBrand, ...selectColor, ...selectGender, ...selectPrice]
    .forEach((el => el.classList.remove('bg')));
  filter();
})


//calling functions
genderLoop();
brandLoop();
priceLoop();
colorLoop();




//Background changing theme section --------------
const box = document.getElementById('box');
const boxBorder = document.querySelector('.box-wrap');

const coords = boxBorder.getBoundingClientRect();
console.log(coords);



let distanceX = 0, newX = 0;

box.addEventListener('mousedown', (e)=>{
  newX = e.clientX;

  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);
})

function mouseMove (e){
  //calculate distance moved
  distanceX = newX - e.clientX;
  newX = e.clientX;


  startX = box.offsetLeft - distanceX;
  const widthBoundary = window.innerWidth - box.offsetWidth;
    

  
}
function mouseUp(){
  document.removeEventListener('mousemove', mouseMove);
  const boxCoords = box.getBoundingClientRect();
  console.log(boxCoords.left);
  console.log(boxCoords.right)
}