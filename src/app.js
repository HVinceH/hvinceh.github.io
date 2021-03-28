const PageState = function() {
  let currentState = new shortName(this);

  this.init = function() {
    this.change(new shortName);
  }

  this.change = function(state) {
    currentState = state;
  }
}



class LS {
  saveToLS(e) {
    if (e.target === document.querySelector('#save')) {
      let thename = e.target.parentElement.children[0].innerHTML;
      let names = JSON.parse(localStorage.getItem('names'));
      if (names === null) {
        names = [thename];
      } else {
        names.push(thename);
      }
      localStorage.setItem('names', JSON.stringify(names));
    }
  }
  removeItem(thename) {
    let names = JSON.parse(localStorage.getItem('names'));
    let index = names.indexOf(thename);
    names.splice(index, 1);
    localStorage.setItem('names', JSON.stringify(names));
  }
}



const shortName = function(page) {
  const box = document.querySelector('.changestatebox');
  box.innerHTML = `
  <div class='generatebox'>
    <button class='button'>Generate Short Name</button>
    <div class='thename'></div>
  </div>
  `;
  document.querySelector('button').addEventListener('click', function(e) {
    e.preventDefault();
    getData();

    //fetch function
    async function getData() {
      const response = await fetch('words.json');
      if (!response.ok) {
        throw new Error(`Error Fetching Data: ${response.status}`);
      } else {
        let data = await response.json();
        assignWords(data);
      }
    }

    //pick random verb, verbIng, adjective, nounSingular & nounPlural
    function assignWords(data) {
      let verb = data.verbs[Math.floor(Math.random() * data.verbs.length)];
      let verbIng = data.verbsIng[Math.floor(Math.random() * data.verbsIng.length)];
      let adjective = data.adjectives[Math.floor(Math.random() * data.adjectives.length)];
      let nounSingular = data.nounsSingular[Math.floor(Math.random() * data.nounsSingular.length)];
      let nounPlural = data.nounsPlural[Math.floor(Math.random() * data.nounsPlural.length)];

      assignTemplate(verb, verbIng, adjective, nounSingular, nounPlural)
    }

    //pick random template & generate name
    function assignTemplate(verb, verbIng, adjective, nounSingular, nounPlural) {
      const templates = [
        `${verb} My ${nounSingular}`, 
        `${adjective} ${nounPlural}`, 
        `The ${verbIng} ${nounPlural}`, 
        `${verb} The ${adjective} ${nounSingular}`,
        `${adjective} ${verbIng} ${nounPlural}`
      ];
      let teamName = templates[Math.floor(Math.random() * templates.length)];

      putNameIn(teamName);
    }

    //put name into document
    function putNameIn(teamName) {
      document.querySelector('.thename').innerHTML = `
      <span id='namespan'>${teamName}</span> <button class='button' id='save'>Save</button>
      `;
    }
  });
}



const longName = function(page) {
  const box = document.querySelector('.changestatebox');
  box.innerHTML = `
  <div class='generatebox'>
    <button class='button'>Generate Long Name</button>
    <div class='thename'></div>
  </div>
  `;
  document.querySelector('button').addEventListener('click', function(e) {
    e.preventDefault();
    getData();

    //fetch function
    async function getData() {
      const response = await fetch('words.json');
      if (!response.ok) {
        throw new Error(`Error Fetching Data: ${response.status}`);
      } else {
        let data = await response.json();
        assignWords(data);
      }
    }

    //pick random verb, verbIng, adjective, nounSingular & nounPlural
    function assignWords(data) {
      let verb = data.verbs[Math.floor(Math.random() * data.verbs.length)];
      let verbIng = data.verbsIng[Math.floor(Math.random() * data.verbsIng.length)];
      let adjective = data.adjectives[Math.floor(Math.random() * data.adjectives.length)];
      let nounSingular = data.nounsSingular[Math.floor(Math.random() * data.nounsSingular.length)];
      let nounPlural = data.nounsPlural[Math.floor(Math.random() * data.nounsPlural.length)];

      assignTemplate(verb, verbIng, adjective, nounSingular, nounPlural)
    }

    //pick random template & generate name
    function assignTemplate(verb, verbIng, adjective, nounSingular, nounPlural) {
      const templates = [
        `${nounPlural} ${verbIng} In The ${adjective} ${nounSingular}`, 
        `A Bunch Of ${nounPlural} ${verbIng} For A ${nounSingular}`, 
        `When ${adjective} ${nounPlural} ${verb}`, 
        `${verb} Over The ${adjective} ${nounSingular} With ${nounPlural}`,
        `The ${verbIng} ${nounSingular} And The ${adjective} ${nounPlural}`
      ];
      let teamName = templates[Math.floor(Math.random() * templates.length)];

      putNameIn(teamName);
    }

    //put name into document
    function putNameIn(teamName) {
      document.querySelector('.thename').innerHTML = `
      <span id='namespan'>${teamName}</span> <button class='button' id='save'>Save</button>
      `;
    }
  });
}



const favourites = function(page) {
  const box = document.querySelector('.changestatebox');
  box.innerHTML = `
  <div class='faveslist'>
  </div>
  `;
  const faveslist = document.querySelector('.faveslist')
  let names = JSON.parse(localStorage.getItem('names'));
  names.forEach(function(name) {
    let div = document.createElement('div');
    div.innerHTML = `
    <span>${name}</span> <button class='button'>X</button>
    `;
    faveslist.appendChild(div);
  });

  //delete
  let buttons = document.getElementsByClassName('button');
  for (let i = 0 ; i < buttons.length ; i++) {
    buttons[i].addEventListener('click', function(e) {
      let thename = e.target.parentElement.children[0].innerHTML;
      const ls = new LS();
      ls.removeItem(thename);
      e.target.parentElement.remove();
    })
  }
}



const page = new PageState;
page.init();



document.querySelector('.select').addEventListener('change', function(e) {
  if (e.target.value === 'short') {
    page.change(new shortName);
  } else if (e.target.value === 'long') {
    page.change(new longName);
  } else if (e.target.value === 'faves') {
    page.change(new favourites);
  }
})



const ls = new LS();
document.addEventListener('click', function(e) {ls.saveToLS(e)});