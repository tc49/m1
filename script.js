//1
const getGists = async () => {
    let response = await fetch('https://api.github.com/gists/public');
    let data = await response.json();
    let res = data.map(el => {
        return el.files[Object.keys(el.files)[0]];
    });

    let table = document.createElement('table');
    table.classList.add("table", "table-striped");

    const header = document.createElement('thead');
    header.innerHTML = `<tr><td>Filename</td><td>language</td><td>raw_url</td></tr>`;
    table.appendChild(header);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    res.forEach(el => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${el.filename}</td><td>${el.language}</td><td>${el.raw_url}</td>`
        tbody.appendChild(tr);
    })
    document.getElementById('app').appendChild(table);
}

getGists();




//2
class Node { //элемент списка
    constructor(name, next = []) {
        this.text = `${name}->`;
        this.click = 0;
        this.next = next;
    }
}


const gen = (n, level, pref = '') => { //генератор списка
    if (level === 0) {
        return [];
    }
    level--;
    let acc = [];
    for (let index = 1; index <= n; index++) {
        acc = [...acc, new Node(`${pref}${index}`, gen(n, level, `${pref}${index}.`))];
    }
    return acc;
}

const data = [
    {
        text: '1->',
        click: 0,
        next: [
            {
                text: '1.1->',
                click: 0,
                next: [
                    {
                        text: '1.1.1->',
                        click: 0,
                        next: []
                    }
                ]
            },
            {
                text: '1.2->',
                click: 0,
                next: []
            }
        ]
    },
    {
        text: '2->',
        click: 0,
        next: []
    }
]

obj = document.getElementById('obj');
let history = [];

const getList = (list) => {
    list.forEach(el => {
        const div = document.createElement('div');
        div.textContent = `[(${el.click})${el.text}]`;
        obj.appendChild(div);

        const func = (e) => {
            el.click++;
            if (el.next.length === 0) {
                e.target.textContent = `[(${el.click})${el.text}]`;
                return;
            }
            history.push(list);
            obj.innerHTML = '';
            getList(el.next);
        }
        div.addEventListener('click', func);
    })

    if (history.length !== 0) {
        const back = document.createElement('span');
        back.textContent = '<<back';
        obj.appendChild(back);

        const goBack = () => {
            obj.innerHTML = '';
            getList(history.pop());
        }
        back.addEventListener('click', goBack);
    }
}

getList(gen(10, 3));



//3
const timer = () => {
    const stopwatch = document.getElementById('stopwatch');
    let i = 0;
    let timerID;

    const sec = document.createElement('div');
    sec.textContent = '0';
    stopwatch.appendChild(sec);

    const stop = document.createElement('button');
    stop.textContent = 'stop';
    stopwatch.appendChild(stop);

    const reset = document.createElement('button');
    reset.textContent = 'reset';
    stopwatch.appendChild(reset);
    reset.addEventListener('click', () => { i = 0; sec.textContent = i });


    const stopStopwatch = () => {
        clearInterval(timerID);
        stop.removeEventListener('click', stopStopwatch);
        stop.textContent = 'start';
        stop.addEventListener('click', startNewStopwatch);
    }

    const startNewStopwatch = () => {
        timerID = setInterval(() => { sec.textContent = ++i }, 1000);
        stop.removeEventListener('click', startNewStopwatch);
        stop.textContent = 'stop';
        stop.addEventListener('click', stopStopwatch)
    }
    startNewStopwatch();
}
document.addEventListener('DOMContentLoaded', () => { timer() });


//4
var _x = 1;

var foo = {
    _x: 2,
    bar: function () {
        return this._x;
    }
}

console.log('1', foo.bar());
var baz = foo.bar;
//_x = 2;  первый способ
//console.log('2', baz()); 
console.log('2', baz.apply(foo)); // второй способ

setTimeout(function () { console.log('3', baz()) }, 0);

_x = 4;
