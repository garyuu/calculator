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

function ValueDisplay(val)
{
    var i;
    // Equation display
    var equation = ""
    for (i = 0 ; i < operators.length ; ++i)
        equation = (numbers[i+1] >>> 0).toString(base) + " " + operators[i] + " " + equation;
    equal.innerHTML = equation;

    // Multibase display
    var val = numbers[0];
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
}

function Cancel()
{

}

function BackSpace()
{

}

function Operator(op)
{

}

function Value(val)
{

}

function Negative()
{

}

function Calculate()
{

}
