'use strict'

$( function(){

    let calc = {
        result : [],
        display: '0',
        number : [],
        operand : null,
        enterNumber : true,

        updateDisplay: function(){
            $('.display').val(this.display);
        },

        concatDigit: function(btn){
            if(this.enterNumber){
                let digit = $(btn).val();
                this.number.push(digit);
                this.display = this.number.join('');
                //this.number.length ? this.display = +this.number.join('') : this.display = this.result;
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
                   // this.number = number.toString().split('');
                   // this.display = number;
                   this.number = [];
                    this.execute('=');
                    this.updateDisplay();
                }
            }
            this.enterNumber = false;
        },

        changeSign: function(){
            if(this.result.length && !this.number.length){
                this.result[0] = this.result[0]*-1;
                this.number.length ? this.display = +this.number.join('') : this.display = this.result;
            }else if(this.number.length){
                
                if(this.number[0] === '-'){
                    this.number.shift();
                }else{
                    this.number.unshift('-');
                }
                this.number.length ? this.display = +this.number.join('') : this.display = this.result;
            }
            this.updateDisplay();
        },

        execute: function(operand){
            console.log('number entered: '+this.number);
            console.log('result stored: '+this.result);
            let number = 0;
            if(this.number.length){
                number = +this.number.join('');
            }
                
            if(this.result.length){

                    switch(this.operand){
                        case '+':
                            this.result[0] += number;
                            this.enterNumber = true;
                            break;
                        case '-':
                            this.result[0] -= number;
                            this.enterNumber = true;
                            break;
                        case '*':
                            this.result[0] *= number;
                            this.enterNumber = true;
                            break;
                        case '/':
                            this.result[0] /= number;
                            this.enterNumber = true;
                            break;
                        case '=':
                            this.result[0] = this.result[0];
                            this.enterNumber = false;
                            break;
                     }
                    
            }else{
                    console.log('pushing number to result');
                    this.result.push(number);
            }
            console.log('number = '+number);
                this.display = this.result[0];
                this.number = [];
                this.updateDisplay();
            this.operand = operand;
        }
    }


    $('.btn-digit').on('click', function (){
        calc.concatDigit(this);
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

    $('#btn-plus').on('click', function(){
         calc.execute('+');
    });

    $('#btn-minus').on('click', function(){
        calc.execute('-');
    });

    $('#btn-multiply').on('click', function(){
        calc.execute('*');
    });

    $('#btn-divide').on('click', function(){
        calc.execute('/');
    });

    $('#btn-equal').on('click', function(){
        calc.execute('=');
    });

    $('#btn-percent').on('click', function(){
        calc.percent();
    });

    $('#btn-sign').on('click', function (){
        calc.changeSign();
    });

});
