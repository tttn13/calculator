
arr = ["AC", "+/-", "%", "/",7,8,9, "*",4,5,6, "-",1,2,3, "+",0, 0,".","="];
common_operators = ["+", "-", "*", "/"];
const div = document.getElementById('numbers');
const calculatorTable = document.createElement("table");

function createTableLayout() {
    for (let i =0; i<5; i++){
        var row = calculatorTable.insertRow(i);
        for (let x=0; x<4; x++){
            var cell = row.insertCell(x);
            cell.className = "cell";
        }
    }
    div.appendChild(calculatorTable);
}

createTableLayout();
addContent();

function addContent() {
    const cells = document.querySelectorAll(".cell");
    console.log(cells);
    cells.forEach((cell, index) => {
        cell.innerHTML = arr[index];
    })
    //create header as result display 
    var header = calculatorTable.createTHead();
    var display_window = document.createElement("th");
    header.appendChild(display_window);
    display_window.setAttribute("colspan", "4");
    cells[16].setAttribute("colspan", "2");
    cells[17].setAttribute('hidden', "true");
}


const cells = document.querySelectorAll(".cell");

left = Array.from(cells)
needChange = left.slice(0,3);
needChange.forEach((cell) => {
    cell.setAttribute("style","background-color: #4c4c4c");
})

needChange2 = [cells[3],cells[7], cells[11], cells[15], cells[19]];
needChange2.forEach((cell) => {
    cell.setAttribute("style","background-color: #e8a321");
})


let display_window = document.querySelector('th');

function displayValue() {
    let operand_build = "";
    let operand_arr = [];
    let operators_arr = [];
    cells.forEach((cell) => {
        cell.addEventListener('click', function() {
            pressed_char = cell.innerHTML;
            console.log("Before:{" + operators_arr.toString() +"}, {"
+ operand_arr.toString()+"}");

            if (pressed_char == "+/-") {
                negateNumber();
                remove_op_and_operand_pair(operand_arr, operators_arr);
            } else if (pressed_char == "%") {
                percentageNumber(display_window.innerHTML);
                remove_op_and_operand_pair(operand_arr, operators_arr);
            } 
            else if (pressed_char == "AC") {
                operand_build = "";
                display_window.innerHTML = "";
                reset_calculator(cell, operand_build, operand_arr, operators_arr);
            } else if (number_is_added(operand_build,pressed_char)) {
                if (last_operation_is_equal(operators_arr)) {
                    operand_arr.shift();
                    operand_arr.shift();
                    operators_arr.shift();
                }
                operand_build += (pressed_char);
                display_window.innerHTML = operand_build;
                
            } else {
                operators_arr.push(pressed_char);
                if (common_operators.includes(pressed_char)) {
                    remove_op_and_operand_pair(operand_arr, operators_arr);
                    if (operators_arr[0] != "=") {
                        operand_arr.push(operand_build);
                    }
                    operand_build = "";
                    operator_is_entered(operand_arr,operators_arr);
                } else if (pressed_char == "=") {
                    operand_arr.push(operand_build);
                    equal_is_entered(operand_arr,operators_arr);
                    operand_build = "";
                }
            }
            console.log("After:{" + operators_arr.toString() +"}, {"
            + operand_arr.toString()+"}");
        })
    })
}

function remove_op_and_operand_pair(operands, operators) {
    if (last_operation_is_equal(operators)) {
        operands.shift();
        operators.shift();
    }
}

function last_operation_is_equal(operators) {
    return operators.length == 2 && operators[1] == "=";
}

function deleteFromLeft(array, num) {
    for (i = 0; i < num; i++) {
        array.shift()
    }
}

function clearOperands(array) {
    deleteFromLeft(array, 2);
}

function operator_is_entered(operand_arr,operators_arr){
    if (operators_arr.length == 2) {
        if (operators_arr[0] != "=") { 
            result = calculate(operators_arr[0],Number(operand_arr[0]),Number(operand_arr[1]));
            display_window.innerHTML = result;
            operand_arr.push(result);
            clearOperands(operand_arr);
            deleteFromLeft(operators_arr, 1);
        } else {
            deleteFromLeft(operators_arr, 1);
        }
    }
}


function equal_is_entered(operand_arr,operators_arr) {
   
    console.log(Number(operand_arr[0]),Number(operand_arr[1]));
    result = calculate(operators_arr[0],Number(operand_arr[0]),Number(operand_arr[1]));
    display_window.innerHTML = result;
    operand_arr.push(result);
    operand_arr.shift();
}

function number_is_added(operand_string,char){
    if ((char == 0) && (operand_string.length ==0)) {
        return false;
    } else if ((char == 0) && (operand_string.length !=0)) {
        return true;
    } else if (Number(char)) {
        return true;
    } else if ((char == ".") && (parseInt(operand_string))){
        return true;
    } 
}

function calculate(operator, leftOperand, rightOperand) {
    if (operator == "+") {
        return (leftOperand + rightOperand);
    } else if (operator == "-") {
        return (leftOperand - rightOperand);
    } else if (operator == "*") {
        return (leftOperand * rightOperand);
    } else if (operator == "/") {
        return (leftOperand / rightOperand);
    } 
}

function negateNumber() {
    value = display_window.innerHTML;
    number = Number(value);
    display_window.innerHTML = -number;
}

function percentageNumber() {
    value = display_window.innerHTML;
    number = Number(value);
    display_window.innerHTML = number/100;
}

function reset_calculator(button, operand, operand_arr, operators_arr) {
    button.addEventListener('dblclick', function() {
        operand_arr.length = 0;
        operators_arr.length = 0;
        operand = "";
    })
}
   
displayValue();

