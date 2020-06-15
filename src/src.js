const currIds = [145, 292, 298];
const currenciesCache = {};

init();

async function init () {
    const currPromises = currIds.map(currId => fetchCurr(currId));
    const currencies = await Promise.all(currPromises);

    currencies.forEach(currency => {
        currenciesCache[currency.Curr_ID] = currency;
    })

    createCurrOptions(currencies); 

    document.getElementById('curr_sel').addEventListener('click', async () => {
        let selectEl = document.getElementById('curr_sel');
        const selectedCurrId = selectEl.value;
        //console.log(selectedCurrId);
        //let fetchedCurrRate = await getCurrRate(selectedCurrId);
        //console.log(fetchedCurrRate);
        //let currScale = fetchedCurrRate.Cur_Scale;
        //let currRate = fetchedCurrRate.Cur_OfficialRate;
        
        if (selectedCurrId != '0') {
            fetchedCurrRate = await getCurrRate(selectedCurrId);
            currRate = fetchedCurrRate.Cur_OfficialRate;
            currScale = fetchedCurrRate.Cur_Scale;
        } else {
            currRate = '1';
            currScale = '1';
        }
        // кнопка очистить------------------------------------------------------------------------------------------
        document.getElementById('clear').addEventListener('click', function (ev) {
            if (ev.target.nodeName === "BUTTON") {
                devman.classList.remove('bold');
                leaddev.classList.remove('bold');
                dev.classList.remove('bold');
                qualman.classList.remove('bold');
                leadqa.classList.remove('bold');
                testers.classList.remove('bold');
                //-------------------------------------
                Devel.classList.remove('displayNone');
                LeadDev.classList.remove('displayNone');
                Testers.classList.remove('displayNone');
                LeadQa.classList.remove('displayNone');
                Spandevmam.classList.remove('chevron-bottom');
                Spanleaddev.classList.remove('chevron-bottom');
                Spanqualman.classList.remove('chevron-bottom');
                Spanleadqa.classList.remove('chevron-bottom');
                //-------------------------------------
                Devel.classList.add('displayInline');
                LeadDev.classList.add('displayInline');
                Testers.classList.add('displayInline');
                LeadQa.classList.add('displayInline');
                Spandevmam.classList.add('chevron-right');
                Spanleaddev.classList.add('chevron-right');
                Spanqualman.classList.add('chevron-right');
                Spanleadqa.classList.add('chevron-right');
                //-----------------------------------------
                curr_sel.value = '0';
                currRate = '1';
                currScale = '1';

                perem = [];

                for(var i = 1; i < tableMain.rows.length;){
                tableMain.deleteRow(i);
                }
            }
        })
        //----------------------------------------------------------------------------------------------------
        function onClickRate() {
            //удаление строк из таблицы, кроме первой-----------------------------------------------------------------
            for(var i = 1; i < tableMain.rows.length;){
                tableMain.deleteRow(i);
            }
            //добавление строк tr в которых находятся колонки td---------------------------------------------------------
            for (let i = 0; i < perem.length; i++) {
                block = document.createElement('tr');
                tableMain.append(block);
                for (let obj in perem[i]) {
                    const tdList = document.createElement('td');
                    if (obj === 'salary') {
                        newDev = (perem[i][obj] / currRate) * currScale;  //--------------------------------------нужный курс валют
                        newDevCurr = newDev.toFixed(0);
                    } else {
                        newDevCurr = perem[i][obj];
                    }
                    block.append(tdList);
                    tdList.append(newDevCurr);
                }
            }
        };
        onClickRate();

        left.addEventListener('click', function (ev) {
            if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'DEV') {
                perem = developer.all_stuff;
                ev.target.classList.add('bold');
            }
            if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'LEADDEV') {
                perem = devLead.all_stuff;
                ev.target.classList.add('bold');
            }
            if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'DEVMAN') {
                perem = devDeptHead.all_stuff;
                ev.target.classList.add('bold');
            }
            if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'TESTERS') {
                perem = qaTester.all_stuff;
                ev.target.classList.add('bold');
            }
            if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'LEADQA') {
                perem = qaLead.all_stuff;
                ev.target.classList.add('bold');
            }
            if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'QUALMAN') {
                perem = qaDeptHead.all_stuff;
                ev.target.classList.add('bold');
            }  
            //удаление строк из таблицы, кроме первой-----------------------------------------------------------------
            for(var i = 1; i < tableMain.rows.length;){
                tableMain.deleteRow(i);
            }
            //добавление строк tr в которых находятся колонки td---------------------------------------------------------
            for (let i = 0; i < perem.length; i++) {
                block = document.createElement('tr');
                tableMain.append(block);
                for (let obj in perem[i]) {
                    const tdList = document.createElement('td');
                    if (obj === 'salary') {
                        newDev = (perem[i][obj] / currRate) * currScale;  //--------------------------------------нужный курс валют
                        newDevCurr = newDev.toFixed(0);
                    } else {
                        newDevCurr = perem[i][obj];
                    }
                    block.append(tdList);
                    tdList.append(newDevCurr);
                }
            }
        })
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
async function fetchCurr(id) {
    const url = id
    ? 'https://www.nbrb.by/api/exrates/currencies/' + id
    : 'https://www.nbrb.by/api/exrates/currencies';

    const result = await fetch(url);
    const fetchedData = await result.json();

    return fetchedData;
}

function createCurrOptions(currencies) {
    currencies.forEach(currency => {
        const optionEl = document.createElement('option');
        optionEl.value = currency.Cur_ID;
        optionEl.innerText = currency.Cur_Abbreviation;

        document.getElementById('curr_sel').appendChild(optionEl);
    });
}

async function getCurrRate(currId) {
    const response = await fetch('https://www.nbrb.by/api/exrates/rates/' + currId);
    return response.json();
}

//-----------------------------------------------------------------------------------------------------
const employeers = [
    {
        id: 0,
        name: "YarikHead",
        dept_unit_id: 0,
        tel: "123-123-3", 
        salary: 3000
    },
    {
        id: 1,
        name: "MashaLead",
        dept_unit_id: 1,
        tel: "123-123-3", 
        salary: 2000
    },
    {
        id: 2,
        name: "SashaLead",
        dept_unit_id: 1,
        tel: "123-123-3", 
        salary: 2200
    },
    {
        id: 3,
        name: "MirraDev",
        dept_unit_id: 2,
        tel: "123-123-3",
        salary: 1200
    },
    {
        id: 4,
        name: "IraDev",
        dept_unit_id: 2,
        tel: "123-123-3",
        salary: 1000
    },
    {
        id: 5,
        name: "DanikHead3",
        dept_unit_id: 3,
        tel: "123-123-33",
        salary: 3000
    },
    {
        id: 6,
        name: "OliaLead3",
        dept_unit_id: 4,
        tel: "123-123-3",
        salary: 2200
    },
    {
        id: 7,
        name: "KoliaLead",
        dept_unit_id: 4,
        tel: "123-123-3",
        salary: 2000
    }, 
    {
        id: 8,
        name: "LenaTest",
        dept_unit_id: 5,
        tel: "123-123-3",
        salary: 1200
    },
    {
        id: 9,
        name: "SienaTest",
        dept_unit_id: 5,
        tel: "123-123-3",
        salary: 1000
    }
];
 
let developer = {
    name: 'Developers',
    id: 2,
    dept_units: [],
    all_stuff: []
};
let devLead = {
    name: 'Lead Developers',
    id: 1,
    dept_units: [developer],
    all_stuff: []
};
let devDeptHead = {
    name: 'Development Management',
    id: 0,
    dept_units: [devLead],
    all_stuff: []
};
let qaTester = {
    name: 'Testers',
    id: 5,
    dept_units: [],
    all_stuff: []
};
let qaLead = {
    name: 'Lead QA',
    id: 4,
    dept_units: [qaTester],
    all_stuff: []
};
let qaDeptHead = {
    name: 'Quality Assurance Management',
    id: 3,
    dept_units: [qaLead],
    all_stuff: []
};
//добавление в массив сотрудников отдела---------------------------------------------------------
developer.all_stuff = employeers.filter(developer => developer.dept_unit_id === 2);
devLead.all_stuff = employeers.filter(devLead => devLead.dept_unit_id === 1);
devDeptHead.all_stuff = employeers.filter(devDeptHead => devDeptHead.dept_unit_id === 0);
qaTester.all_stuff = employeers.filter(qaTester => qaTester.dept_unit_id === 5);
qaLead.all_stuff = employeers.filter(qaLead => qaLead.dept_unit_id === 4);
qaDeptHead.all_stuff = employeers.filter(qaDeptHead => qaDeptHead.dept_unit_id === 3);
const left = document.getElementById('left');
// переключение жирного--------------------------------------------------------------------------
left.addEventListener('click', function (ev) {
   if (ev.target.dataset.sign === 'DEV') {
    devman.classList.remove('bold');
    leaddev.classList.remove('bold');
    qualman.classList.remove('bold');
    leadqa.classList.remove('bold');
    testers.classList.remove('bold');
   }
   if (ev.target.dataset.sign === 'LEADDEV') {
    devman.classList.remove('bold');
    dev.classList.remove('bold');
    qualman.classList.remove('bold');
    leadqa.classList.remove('bold');
    testers.classList.remove('bold');
   }
   if (ev.target.dataset.sign === 'DEVMAN') {
    leaddev.classList.remove('bold');
    dev.classList.remove('bold');
    qualman.classList.remove('bold');
    leadqa.classList.remove('bold');
    testers.classList.remove('bold');
   }
   if (ev.target.dataset.sign === 'TESTERS') {
    devman.classList.remove('bold');
    leaddev.classList.remove('bold');
    dev.classList.remove('bold');
    qualman.classList.remove('bold');
    leadqa.classList.remove('bold');
   }
   if (ev.target.dataset.sign === 'LEADQA') {
    devman.classList.remove('bold');
    leaddev.classList.remove('bold');
    dev.classList.remove('bold');
    qualman.classList.remove('bold');
    testers.classList.remove('bold');
   }
   if (ev.target.dataset.sign === 'QUALMAN') {
    devman.classList.remove('bold');
    leaddev.classList.remove('bold');
    dev.classList.remove('bold');
    leadqa.classList.remove('bold');
    testers.classList.remove('bold');
   }
});
// шеврон------------------------------------------------------------------------------------------
const Devel = document.getElementById('dev');
const LeadDev = document.getElementById('leaddev');
const DevMan = document.getElementById('devman');
const Testers = document.getElementById('testers');
const LeadQa = document.getElementById('leadqa');
const QualMan = document.getElementById('qualman');



left.addEventListener('click', function (ev) {
    if (ev.target.nodeName === 'SPAN' && ev.target.dataset.sign === 'spanLEADDEV') {
        ev.target.classList.toggle('chevron-right');
        ev.target.classList.toggle('chevron-bottom');
        Devel.classList.toggle('displayInline');
        Devel.classList.toggle('displayNone');
    }
    if (ev.target.nodeName === 'SPAN' && ev.target.dataset.sign === 'spanDEVMAN') {
        ev.target.classList.toggle('chevron-right');
        ev.target.classList.toggle('chevron-bottom');
        LeadDev.classList.toggle('displayInline');
        LeadDev.classList.toggle('displayNone');
    }
    if (ev.target.nodeName === 'SPAN' && ev.target.dataset.sign === 'spanLEADQA') {
        ev.target.classList.toggle('chevron-right');
        ev.target.classList.toggle('chevron-bottom');
        Testers.classList.toggle('displayInline');
        Testers.classList.toggle('displayNone');
    }
    if (ev.target.nodeName === 'SPAN' && ev.target.dataset.sign === 'spanQUALMAN') {
        ev.target.classList.toggle('chevron-right');
        ev.target.classList.toggle('chevron-bottom');
        LeadQa.classList.toggle('displayInline');
        LeadQa.classList.toggle('displayNone');
    }
});
//проверяем какой отдел выбираем-------------------------------------------------------------------------------------
left.addEventListener('click', function (ev) {
    if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'DEV') {
        perem = developer.all_stuff;
        ev.target.classList.add('bold');
    }
    if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'LEADDEV') {
        perem = devLead.all_stuff;
        ev.target.classList.add('bold');
    }
    if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'DEVMAN') {
        perem = devDeptHead.all_stuff;
        ev.target.classList.add('bold');
    }
    if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'TESTERS') {
        perem = qaTester.all_stuff;
        ev.target.classList.add('bold');
    }
    if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'LEADQA') {
        perem = qaLead.all_stuff;
        ev.target.classList.add('bold');
    }
    if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'QUALMAN') {
        perem = qaDeptHead.all_stuff;
        ev.target.classList.add('bold');
    }  
    //удаление строк из таблицы, кроме первой-----------------------------------------------------------------
    for(var i = 1; i < tableMain.rows.length;){
        tableMain.deleteRow(i);
    }
    //добавление строк tr в которых находятся колонки td---------------------------------------------------------
    for (let i = 0; i < perem.length; i++) {
        block = document.createElement('tr');
        tableMain.append(block);
        for (let obj in perem[i]) {
            const tdList = document.createElement('td');
            if (obj === 'salary') {
                newDev = perem[i][obj];  //--------------------------------------нужный курс валют
            } else {
                newDev = perem[i][obj];
            }
            block.append(tdList);
            tdList.append(newDev);
        }
    }
})
// кнопка очистить------------------------------------------------------------------------------------------

const Spandevmam = document.getElementById('spandevmam');
const Spanleaddev= document.getElementById('spanleaddev');
const Spanqualman = document.getElementById('spanqualman');
const Spanleadqa = document.getElementById('spanleadqa');



document.getElementById('clear').addEventListener('click', function (ev) {
    if (ev.target.nodeName === "BUTTON") {
        devman.classList.remove('bold');
        leaddev.classList.remove('bold');
        dev.classList.remove('bold');
        qualman.classList.remove('bold');
        leadqa.classList.remove('bold');
        testers.classList.remove('bold');
        //-------------------------------------
        Devel.classList.remove('displayNone');
        LeadDev.classList.remove('displayNone');
        Testers.classList.remove('displayNone');
        LeadQa.classList.remove('displayNone');
        Spandevmam.classList.remove('chevron-bottom');
        Spanleaddev.classList.remove('chevron-bottom');
        Spanqualman.classList.remove('chevron-bottom');
        Spanleadqa.classList.remove('chevron-bottom');
        //-------------------------------------
        Devel.classList.add('displayInline');
        LeadDev.classList.add('displayInline');
        Testers.classList.add('displayInline');
        LeadQa.classList.add('displayInline');
        Spandevmam.classList.add('chevron-right');
        Spanleaddev.classList.add('chevron-right');
        Spanqualman.classList.add('chevron-right');
        Spanleadqa.classList.add('chevron-right');
        //-----------------------------------------
        for(var i = 1; i < tableMain.rows.length;){
        tableMain.deleteRow(i);
        }
    }
})
