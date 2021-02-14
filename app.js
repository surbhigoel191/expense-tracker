function myFunction(num){
    var ele = document.getElementById(num);
    ele.parentNode.removeChild(ele);
}
let prev_pie_type='total'
let ExpenseController = (() => {
    let total = 0, salary = 0, bonus = 0, allowance = 0, hack=0, cash=0, other_in=0,
    other_ex=0, food=0,transport=0,house=0,education=0,health=0,social=0;out=0,inn=0;

    return {
        inputEntry(userInput) {
            if (userInput['expenseType'] === 'salary') {
                salary += userInput['value'];
                inn += userInput['value'];
                total += userInput['value'];
            }
            if (userInput['expenseType'] === 'bonus') {
                bonus += userInput['value'];
                inn += userInput['value'];
                total += userInput['value'];
            }
            if (userInput['expenseType'] === 'allowance') {
                allowance += userInput['value'];
                inn += userInput['value'];
                total += userInput['value'];
            }
            if (userInput['expenseType'] === 'hackathon wins') {
                hack += userInput['value'];
                inn += userInput['value'];
                total += userInput['value'];
            }
            if (userInput['expenseType'] === 'cash inflow') {
                cash += userInput['value'];
                inn += userInput['value'];
                total += userInput['value'];
            }
            if (userInput['expenseType'] === 'other inflow') {
                other_in += userInput['value'];
                inn += userInput['value'];
                total += userInput['value'];
            }
            if (userInput['expenseType'] === 'food expenses') {
                food += userInput['value'];
                out += userInput['value'];
                total -= userInput['value'];
            }
            if (userInput['expenseType'] === 'health expenses') {
                health += userInput['value'];
                out += userInput['value'];
                total -= userInput['value'];
            }
            if (userInput['expenseType'] === 'transportation costs') {
                transport += userInput['value'];
                out += userInput['value'];
                total -= userInput['value'];
            }
            if (userInput['expenseType'] === 'household expenses') {
                house += userInput['value'];
                out += userInput['value'];
                total -= userInput['value'];
            }
            if (userInput['expenseType'] === 'education costs') {
                education += userInput['value'];
                out += userInput['value'];
                total -= userInput['value'];
            }
            if (userInput['expenseType'] === 'social expenses') {
                social += userInput['value'];
                out += userInput['value'];
                total -= userInput['value'];
            }
            if (userInput['expenseType'] === 'other outflow') {
                other_ex += userInput['value'];
                out += userInput['value'];
                total -= userInput['value'];
            }
        },

        getOutData() {
            return out;
        },
        getInData() {
            return inn;
        },
        getSalaryData() {
            return salary;
        },
        getBonusData() {
            return bonus;
        },
        getHackData() {
            return hack;
        },
        getAllowanceData() {
            return allowance;
        },
        getCashData() {
            return cash;
        },
        getOtherInData() {
            return other_in;
        },
        getFoodData() {
            return food;
        },
        getTransportData() {
            return transport;
        },
        getEduData() {
            return education;
        },
        getOtherOutData() {
            return other_ex;
        },
        getHouseData() {
            return house;
        },
        getSocialData() {
            return social;
        },
        getHealthData() {
            return health;
        },
        getTotalData() {
            return total;
        }
    }

})();

let UIController = (() => {
    let expenseType = 'salary';

    let HTMLStrings = {
        typePieT: '#pie_t',
        typePieI: '#pie_i',
        typePieO: '#pie_o',
        typeUsd: '#usd',
        typeRbl: '#rbl',
        typeEuro: '#eur',
        typeInr: '#inr',
        typeYen: '#yen',
        typePnd: '#pnd',
        inExpenseDescription: '.input-expense-description',
        inExpenseValue: '.input-expense-value',
        inExpenseDate: '.input-expense-date',
        btnSubmitExpense: '.btn-submit-expense',
        expenseList: '.expense-list',
        currentMonth: '#current-month',
        typeSalary: '#type-salary',
        typeFood: '#type-food',
        typeTransport: '#type-transport',
        typeBonus: '#type-bonus',
        typeAllow: '#type-allow',
        typeHack: '#type-hack',
        typeCash: '#type-cash',
        typeSocial: '#type-social',
        typeEducation: '#type-education',
        typeHouse: '#type-house',
        typeHealth: '#type-health',
        typeOtherin: '#type-otherin',
        typeOtherout: '#type-otherout',
        trackingText: '.tracking-text',
        expenseChart: '#expense-chart',
        monthBudget: '#month-budget'
    };

    return {
        numberFormat(number) {
            return Intl.NumberFormat('en-IN').format(number);
        },
        showCurrentMonth() {
            let now, month, year, months;
            now = new Date();
            month = now.getMonth();
            year = now.getFullYear();
            months = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
                'November', 'December'
            ];
            document.querySelector(HTMLStrings.currentMonth).textContent = months[month] + " " + year;
        },

        getHTMLStrings() {
            return HTMLStrings;
        },

        setExpenseType(type) {
            console.log('here', type);
            this.expenseType = type;
            document.querySelector(HTMLStrings.trackingText).textContent = "Tracking " + type;
        },

        setPieType(type) {
            console.log('here', type);
            this.pieType = type ? type : prev_pie_type;
            if(this.pieType === 'in'){
                UIController.displayChart_i(ExpenseController.getSalaryData(),ExpenseController.getBonusData(),ExpenseController.getAllowanceData(),ExpenseController.getHackData(),ExpenseController.getCashData(),ExpenseController.getOtherInData())
            }else if(type === 'out'){
                UIController.displayChart_o(ExpenseController.getFoodData(),ExpenseController.getHealthData(),ExpenseController.getTransportData(),ExpenseController.getHouseData(),ExpenseController.getEduData(),ExpenseController.getSocialData(),ExpenseController.getOtherOutData())
            }else{
                UIController.displayChart_t(ExpenseController.getInData(),ExpenseController.getOutData())
            }
        },

        setCurrencyType(curr) {
            console.log('here', curr);
            this.currencyType = curr;
            let curr_symbol;
            if(curr === 'inr'){
                curr_symbol = '₹'
            } else if(curr === 'pnd'){
                curr_symbol = '£'
            } else if(curr === 'euro'){
                curr_symbol = '€'
            } else if(curr === 'usd'){
                curr_symbol = '$'
            } else if(curr === 'yen'){
                curr_symbol = '¥'
            } else {
                curr_symbol = '₽'
            }
            UIController.updateOverallTotal(0,curr_symbol)
            return curr_symbol
        },

        getUserExpenseInput() {
            return {
                description: document.querySelector(HTMLStrings.inExpenseDescription).value,
                value: parseFloat(document.querySelector(HTMLStrings.inExpenseValue).value),
                date: document.querySelector(HTMLStrings.inExpenseDate).value,
                expenseType: this.expenseType
            }
        },

        getUserCurrencyInput() {
            return {
                currencyType: this.currencyType ? this.currencyType : 'inr'
            }
        },

        getUserPieInput() {
            prev_pie_type = this.pieType ? this.pieType : prev_pie_type
            return {
                pieType: prev_pie_type
            }
        },

        addListItem (inputObj, curr_symbol) {
            let html, element;let indx=1;
            element = HTMLStrings.expenseList;

            if (inputObj['expenseType'] === 'salary' || inputObj['expenseType'] === 'bonus' || inputObj['expenseType'] === 'allowance' || inputObj['expenseType'] === 'hackathon wins' || inputObj['expenseType'] === 'cash inflow' || inputObj['expenseType'] === 'other inflow') {
                html = '<div id="'+ indx +'" class="bottom-border"> <div class="row expense-row"><div class="col-2 expense-date fs-15">' + inputObj['date'] + ' </div><div class="col-7 expense-text fs-15"> ' + inputObj['expenseType'] + ': ' + inputObj['description'] + ' </div><div class="col-2 expense-value expense-saving fs-15"> '+ curr_symbol + ' ' + this.numberFormat(inputObj['value']) + ' </div><div class="col-1" id="'+indx+'"><button style = "padding: 0rem 0rem" class = "btn bg-transparent" onclick="myFunction('+indx+')"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button></div></div>'
            } else {
                html = '<div id="'+ indx +'" class="bottom-border"> <div class="row expense-row"><div class="col-2 expense-date fs-15">' + inputObj['date'] + ' </div><div class="col-7 expense-text fs-15"> ' + inputObj['expenseType'] + ': ' + inputObj['description'] + ' </div><div class="col-2 expense-value expense-cost fs-15"> '+ curr_symbol + ' ' + this.numberFormat(inputObj['value']) + ' </div><div class="col-1" id="'+indx+'"><button style = "padding: 0rem 0rem" class = "btn bg-transparent" onclick="myFunction('+indx+')"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button></div></div>'
            }
            indx++;
            // Adding the new element
            document.querySelector(element).insertAdjacentHTML('beforeend', html);

            // Clearing the input fields after adding element
            document.querySelector(HTMLStrings.inExpenseValue).value = "";
            document.querySelector(HTMLStrings.inExpenseDescription).value = "";
            document.querySelector(HTMLStrings.inExpenseDate).value = "";
        },

        updateOverallTotal(totalValue,curr_symbol) {
            document.querySelector(HTMLStrings.monthBudget).textContent  = curr_symbol + " " + this.numberFormat(totalValue);

            if (totalValue > 0) {
                if (document.querySelector(HTMLStrings.monthBudget).classList.contains('expense-cost')) {
                    document.querySelector(HTMLStrings.monthBudget).classList.remove('expense-cost');
                }
                document.querySelector(HTMLStrings.monthBudget).classList.add('expense-saving');
            }else if (totalValue == 0) {
                if (document.querySelector(HTMLStrings.monthBudget).classList.contains('expense-cost')) {
                    document.querySelector(HTMLStrings.monthBudget).classList.remove('expense-cost');
                }
                if (document.querySelector(HTMLStrings.monthBudget).classList.contains('expense-saving')) {
                    document.querySelector(HTMLStrings.monthBudget).classList.remove('expense-saving');
                }
                document.querySelector(HTMLStrings.monthBudget).classList.add('total_0');
            } else {
                if (document.querySelector(HTMLStrings.monthBudget).classList.contains('expense-saving')) {
                    document.querySelector(HTMLStrings.monthBudget).classList.remove('expense-saving');
                }
                document.querySelector(HTMLStrings.monthBudget).classList.add('expense-cost');
            }
        },

        displayChart_t(inn, out) {
            let ctx = document.querySelector(HTMLStrings.expenseChart);
            let expenseChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Inflow', 'Outflow'],
                    datasets: [{
                        data: [inn, out],
                        backgroundColor: [
                            'rgba(32, 137, 56, 1)',
                            'rgba(255, 84, 98, 1)'
                        ],
                        borderWidth: 0.5
                    }]
                },
                options: {
                    legend: {
                        labels: {
                            fontColor: 'white'
                        }
                    }
                }
            });
        },
        displayChart_i(a,b,c,d,e,f) {
            let ctx = document.querySelector(HTMLStrings.expenseChart);
            let expenseChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Salary','Bonus','Allowance','Hackathon','Petty Cash','Other'],
                    datasets: [{
                        data: [a,,b,c,d,e,f],
                        backgroundColor: [
                            'rgba(32, 137, 56, 1)',
                            'rgba(255, 84, 98, 1)',
                            'rgba(240, 255, 0, 1)',
                            'rgba(128,128,0, 1)',
                            'rgba(128,128,128, 1)',
                            'rgba(0, 0, 0, 1)'
                        ],
                        borderWidth: 0.5
                    }]
                },
                options: {
                    legend: {
                        labels: {
                            fontColor: 'white'
                        }
                    }
                }
            });
        },
        displayChart_o(a,b,c,d,e,f,g) {
            let ctx = document.querySelector(HTMLStrings.expenseChart);
            let expenseChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Food', 'Health','Transportation','Household','Education','Social Life','Other'],
                    datasets: [{
                        data: [a,b,c,d,e,f,g],
                        backgroundColor: [
                            'rgba(32, 137, 56, 1)',
                            'rgba(255, 84, 98, 1)',
                            'rgba(240, 255, 0, 1)',
                            'rgba(128,128,0, 1)',
                            'rgba(128,128,128, 1)',
                            'rgba(0, 0, 0, 1)',
                            'rgba(255,255,255,1)'
                        ],
                        borderWidth: 0.5
                    }]
                },
                options: {
                    legend: {
                        labels: {
                            fontColor: 'white'
                        }
                    }
                }
            });
        }
    }
})();

((UIController, ExpenseController) => {

    let HTMLStrings = UIController.getHTMLStrings();
    let setupEventListeners = () => {
        document.querySelector(HTMLStrings.typeEuro).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[1].innerHTML = "Euro";
            setCurrencyType('euro')
        });
        document.querySelector(HTMLStrings.typeUsd).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[1].innerHTML = "United States Dollar";
            setCurrencyType('usd')
        });
        document.querySelector(HTMLStrings.typeRbl).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[1].innerHTML = "Russian Ruble";
            setCurrencyType('rbl')
        });
        document.querySelector(HTMLStrings.typeYen).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[1].innerHTML = "Japanese Yen";
            setCurrencyType('yen')
        });
        document.querySelector(HTMLStrings.typePnd).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[1].innerHTML = "United Kingdom Pound";
            setCurrencyType('pnd')
        });
        document.querySelector(HTMLStrings.typeInr).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[1].innerHTML = "Indian Rupee";
            setCurrencyType('inr')
        });
        document.querySelector(HTMLStrings.btnSubmitExpense).addEventListener('click', addExpense);
        document.querySelector(HTMLStrings.typeSalary).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[2].innerHTML = "Salary";
            setExpenseType('salary')
        });
        document.querySelector(HTMLStrings.typeFood).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[3].innerHTML = "Food";
            setExpenseType('food expenses')
        });
        document.querySelector(HTMLStrings.typeTransport).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[3].innerHTML = "Transportation";
            setExpenseType('transportation costs')
        });
        document.querySelector(HTMLStrings.typeBonus).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[2].innerHTML = "Bonus";
            setExpenseType('bonus')
        });
        document.querySelector(HTMLStrings.typeAllow).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[2].innerHTML = "Allowance";
            setExpenseType('allowance')
        });
        document.querySelector(HTMLStrings.typeHack).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[2].innerHTML = "Hackathon Wins";
            setExpenseType('hackathon wins')
        });
        document.querySelector(HTMLStrings.typeCash).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[2].innerHTML = "Petty Cash";
            setExpenseType('cash inflow')
        });
        document.querySelector(HTMLStrings.typeOtherin).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[2].innerHTML = "Other";
            setExpenseType('other inflow')
        });
        document.querySelector(HTMLStrings.typeOtherout).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[3].innerHTML = "Other";
            setExpenseType('other outflow')
        });
        document.querySelector(HTMLStrings.typeEducation).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[3].innerHTML = "Education";
            setExpenseType('education costs')
        });
        document.querySelector(HTMLStrings.typeHouse).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[3].innerHTML = "Household";
            setExpenseType('household expenses')
        });
        document.querySelector(HTMLStrings.typeHealth).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[3].innerHTML = "Health";
            setExpenseType('health expenses')
        });
        document.querySelector(HTMLStrings.typeSocial).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[3].innerHTML = "Social";
            setExpenseType('social expenses')
        });
        document.querySelector(HTMLStrings.typePieT).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[0].innerHTML = "Total Expenses";
            setPieType('total')
        });
        document.querySelector(HTMLStrings.typePieI).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[0].innerHTML = "Inflow";
            setPieType('in')
        });
        document.querySelector(HTMLStrings.typePieO).addEventListener('click', () => {
            var x = document.getElementsByClassName("dropdown-toggle");
            x[0].innerHTML = "Outflow";
            setPieType('out')
        });
    };

    let deleteRow = (num) => {
        UIController.deleteRow(num);
    }

    let setExpenseType = (type) => {
        UIController.setExpenseType(type);
    }

    let setCurrencyType = (type) => {
        UIController.setCurrencyType(type);
    }

    let setPieType = (type) => {
        UIController.setPieType(type);
    }

    let addExpense = () => {
        let input = UIController.getUserExpenseInput();
        let curr = UIController.getUserCurrencyInput();
        let pie = UIController.getUserPieInput();
        console.log(input);console.log(curr.currencyType);console.log(pie);
        let curr_symbol;
        if(curr.currencyType === 'inr'){
            curr_symbol = '₹'
        } else if(curr.currencyType === 'pnd'){
            curr_symbol = '£'
        } else if(curr.currencyType === 'euro'){
            curr_symbol = '€'
        } else if(curr.currencyType === 'usd'){
            curr_symbol = '$'
        } else if(curr.currencyType === 'yen'){
            curr_symbol = '¥'
        } else if(curr.currencyType === 'rbl') {
            curr_symbol = '₽'
        }
        if(input.description === ""){
            alert("Please enter description.");
        }else if(isNaN(input.value)){
            alert("Please enter value.");
        }else if(input.value <= 0){
            alert("Please enter a positive value.");
        }else if(input.date === null){
            alert("Please enter a date.");
        }else if(input.expenseType === undefined){
            alert("Please choose an expense type.");
        }else{
            console.log('Adding item');
            UIController.addListItem(input,curr_symbol);
            ExpenseController.inputEntry(input);
            UIController.updateOverallTotal(ExpenseController.getTotalData(), curr_symbol);
            UIController.setPieType(pie.pieType);
        }
    }

    let init = () => {
        console.log('Initializing...');
        setupEventListeners();
        UIController.showCurrentMonth();
    }

    init();

})(UIController, ExpenseController);