'use strict'

const MAX_LENGTH = 11;          //maximum number of digit allowed to key-in by user and to display

let calc = {
    result : [],
    display: '0',
    number : [],
    operand : null,                         
    enterNumber : true,

    updateDisplay: function(){
        this.display = +this.display;
        this.display = this.display.toString();
        this.display = this.display.slice(0,MAX_LENGTH);
        $('.display').val(this.display);
    },

    concatDigit: function(btn){
        let number;

        number = this.number.join('');
        //if last operation was '='
        //then we starting new calculation
        if (this.operand === '='){
            this.clearAll();
            if(number === '0.'){
                //prevent wipeing out the decimal point 
                // if it was pressed just after '='
                this.number = ["0","."];
            }
        }
        //in any other case we just concatenate digit to number
        if(this.operand != '=' && this.number.length < MAX_LENGTH){
            let digit = $(btn).val();
            this.number.push(digit);
            this.display = this.number.join('');
            this.updateDisplay();
        }
    },

    addDecimal: function(){
        if(!(this.number.includes('.'))){
            if(this.number.length){
                this.number.push('.');
            }else{
                this.number.push('0');
                this.number.push('.');
            }
        }
    },

    clearNum: function(){
        if(this.number.length){
            this.number = [];
            this.display = '0';
            this.updateDisplay();
        }
    },

    clearAll: function(){
        this.result = [];
        this.number = [];
        this.display = '0';
        this.operand = null;
        this.updateDisplay();
    },

    //calculate percentage depending on operation 
    //if mult or divide then convert number to n/100 
    //if add or sub then calculate percentage as (previous_num*percent_num)/100
    percent: function(){
        if((this.operand === '*') || (this.operand === '/')){
            let number = +this.number.join('');
            number = number / 100;
            this.number = [];
            this.number.push(number);
            this.execute('=');
        }else{
            let number = +this.number.join('');
            if(this.result.length && this.number.length){
                number = this.result * number / 100;
                this.number = [];
                this.number.push(number);
                this.execute('=');
            }else if(this.number.length){
                number = number / 100;
                this.result.push(number);
                this.display = this.result[0];
                this.number = [];
                this.execute('=');
                this.updateDisplay();
            }
        }
    },

    //if there is result but no new number punched in by user then change the sign 
    //of the result, otherwise change the sign of just punched in number     
    changeSign: function(){
        if(this.result.length && !this.number.length){
            this.result[0] = this.result[0]*-1;
            this.display = this.result;
        }else if(this.number.length){
            if(this.number[0] === '-'){
                this.number.shift();
            }else{
                this.number.unshift('-');
            }
            this.display = +this.number.join('');
        }
        this.updateDisplay();
    },

    execute: function(operand){
        let number = 0;

        if(this.number.length){
            number = +this.number.join('');
        }
        //execute operation based on the previously key-in operand    
        if(this.result.length){
            switch(this.operand){
                case '+':
                    this.result[0] += number;
                    break;
                case '-':
                    this.result[0] -= number;
                    break;
                case '×':
                    this.result[0] *= number;
                    break;
                case '÷':
                    this.result[0] /= number;
                    break;
                case '=':
                    this.result[0] = this.result[0];
                    break;
            }  
        }else{
            this.result.push(number);
        }
        this.display = this.result[0];
        this.number = [];
        this.updateDisplay();
        this.operand = operand;                     //update operand to track state
    }
}

/*********************************/
/*  prog exeution starts here    */
/*********************************/
//using jQuery
$( function(){

    $('.btn-digit').on('click', function (){
        calc.concatDigit(this);
    });

    $('.btn-op').on('click', function(){
         calc.execute($(this).val());
    });

    $('#btn-decimal').on('click', function (){
        calc.addDecimal();
    });

    $('#btn-CE').on('click', function (){
        calc.clearNum();
    });

    $('#btn-C').on('click', function (){
        calc.clearAll();
    });

    $('#btn-percent').on('click', function(){
        calc.percent();
    });

    $('#btn-sign').on('click', function (){
        calc.changeSign();
    });

});
