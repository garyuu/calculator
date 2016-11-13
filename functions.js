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

function Equation(b=base)
{
    var i, j;
    var equation = "";
    for (i = 0, j = numbers.length == operators.length ? 0 : 1 ;
         i < operators.length && j < numbers.length ; ++i, ++j)
        if (b == base_int.dec)
            equation = numbers[j].toString(b) + " " + operators[i] + " " + equation;
        else
            equation = (numbers[j] >>> 0).toString(b).toUpperCase() + " " + operators[i] + " " + equation;
    return equation;
}

function ValueDisplay()
{
    // Equation display
    equal.innerHTML = Equation();

    // Multibase display
    var val = result != 0 ? result : numbers[0];
    hex.innerHTML = (val >>> 0).toString(base_int.hex).toUpperCase();
    dec.innerHTML = val.toString(base_int.dec);
    oct.innerHTML = (val >>> 0).toString(base_int.oct);
    bin.innerHTML = (val >>> 0).toString(base_int.bin);
    switch(base){
    case base_int.hex:
        main.innerHTML = hex.innerHTML;
        break;
    case base_int.dec:
        main.innerHTML = dec.innerHTML;
        break;
    case base_int.oct:
        main.innerHTML = oct.innerHTML;
        break;
    case base_int.bin:
        main.innerHTML = bin.innerHTML;
        break;
    }
}

function Clear()
{
    result = 0;
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
    if (numbers.length > operators.length)
        numbers[0] = (numbers[0] / base) >> 0;
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
    if (result != 0)
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
    {
        UnshiftDigit(digit);
        result = 0;
    }
    ValueDisplay();
}

function Negative()
{
    if (numbers.length == operators.length)
        numbers.unshift(-numbers[0]);
    else
        if (result != 0)
            result = -result;
        else
            numbers[0] = -numbers[0];
    ValueDisplay();
}

function Calculate()
{
    if (numbers.length == operators.length)
        numbers.unshift(numbers[0]);
    result = eval(Equation(base_int.dec)+numbers[0].toString(base_int.dec));
    numbers = [0];
    operators = [];
    ValueDisplay();
}

function int2base(b)
{
    var name = '';
    switch(b){
    case base_int.hex:
        name = 'hex';
        break;
    case base_int.dec:
        name = 'dec';
        break;
    case base_int.oct:
        name = 'oct';
        break;
    case base_int.bin:
        name = 'bin';
        break;
    }
    return name;
}

function UnfocusBase(b)
{
    var name = int2base(b);
    var tag = document.getElementById(name+'_tag');
    tag.style.color = 'black';
    tag.style.fontWeight = 'normal';
    tag.style.backgroundColor = 'white';
}

function FocusBase(b)
{
    var name = int2base(b);
    var tag = document.getElementById(name+'_tag');
    tag.style.color = 'white';
    tag.style.fontWeight = 'bold';
    tag.style.backgroundColor = 'black';
}

function ChangeBase(basename)
{
    UnfocusBase(base);
    base = eval("base_int."+basename);
    FocusBase(base);
    ValueDisplay();
}

FocusBase(base);
