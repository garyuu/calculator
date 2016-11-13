var equal = document.getElementById('main_eq');
var main = document.getElementById('main_val');
var hex = document.getElementById('hex_val');
var dec = document.getElementById('dec_val');
var oct = document.getElementById('oct_val');
var bin = document.getElementById('bin_val');
var base_int = {bin: 2, oct: 8, dec: 10, hex: 16};
var base = base_int.dec;
var numbers = [0];
var operators = [];
var number_input = true;
var result = 0;

function Equation()
{
    var i, j;
    var equation = "";
    for (i = 0, j = numbers.length == operators.length ? 0 : 1 ;
         i < operators.length && j < numbers.length ; ++i, ++j)
        equation = (numbers[j] >>> 0).toString(base) + " " + operators[i] + " " + equation;
    return equation;
}

function ValueDisplay()
{
    // Equation display
    equal.innerHTML = Equation();

    // Multibase display
    var val = result > 0 ? result : numbers[0];
    hex.innerHTML = (val >>> 0).toString(base_int.hex);
    dec.innerHTML = (val >>> 0).toString(base_int.dec);
    oct.innerHTML = (val >>> 0).toString(base_int.oct);
    bin.innerHTML = (val >>> 0).toString(base_int.bin);
    main.innerHTML = (val >>> 0).toString(base)
}

function Clear()
{
    numbers = [0];
    operators = [];
    ValueDisplay();
}

function Cancel()
{
    if (numbers.length == operators.length)
        numbers.unshift(0);
    else
        numbers[0] = 0;
    ValueDisplay();
}

function BackSpace()
{

    ValueDisplay();
}

function UnshiftOperator(op)
{
    if (numbers.length == operators.length)
        operators[0] = op;
    else
        operators.unshift(op);
}

function Operator(op)
{
    if (result > 0)
    {
        numbers[0] = result;
        result = 0;
    }
    switch(op){
    case 'add':
        UnshiftOperator('+');
        break;
    case 'sub':
        UnshiftOperator('-');
        break;
    case 'mul':
        UnshiftOperator('*');
        break;
    case 'div':
        UnshiftOperator('/');
        break;
    case 'mod':
        UnshiftOperator('%');
        break;
    }
    ValueDisplay();
}

function UnshiftDigit(digit)
{
    if (numbers.length == operators.length)
        numbers.unshift(digit);
    else
        if (numbers[0] >= 0)
            numbers[0] = numbers[0] * base + digit;
        else
            numbers[0] = -((-numbers[0] * base) + digit);
}

function Value(val)
{
    digit = parseInt(val, base_int.hex);
    if (base > digit)
        UnshiftDigit(digit);
    result = 0;
    ValueDisplay();
}

function Negative()
{

    ValueDisplay();
}

function Calculate()
{
    if (numbers.length == operators.length)
        numbers.unshift(numbers[0]);
    result = eval(Equation()+(numbers[0] >>> 0).toString(base))
    numbers = [0]
    operators = []
    ValueDisplay();
}
