
'use strict'

$( function (){


    let calc = {
        display : '0',
        number : [],
        operationChain : [],
        result : 0,
        sign : 1,
        numberEntered : true,

        updateDisplay: function(){
            $('.display').val(this.display);
        },

        concatDigit: function(btn){
            this.numberEntered = true;
            let digit = $(btn).val();
            this.number.push(digit);
            this.number.length ? this.number.join('') : this.number.push('0');
            this.display = +this.number;
            this.updateDisplay();
        },

        pushNumber: function(){
            if(!this.number.length){
                this.number = ['0'];
            }
            let number = this.number.join('');
            this.operationChain.push(number);
            this.number = [];
            this.numberEntered = false;
        },

        pushOperation: function(operand){
            let lastIndex = this.operationChain.length - 1,
            lastElem  = this.operationChain[lastIndex];
            if( ['*','/','+','-','='].includes(lastElem) ){
                this.operationChain[lastIndex] = operand;
            }else{
                this.operationChain.push(operand);
            }
        },

        updateOperationChain: function(operand){
            if(this.numberEntered){
                this.pushNumber();
            }
            this.pushOperation(operand);
            console.log('chain:'+this.operationChain);
            this.eval();
        },

        percentage: function(){

            // need to decide how to do this !? 
            let last = this.operationChain.length - 1;
            if(['*','/','+','-','='].includes(this.operationChain[last])){
                this.operationChain.pop();  //remove operation 
            }
        },

        changeSign: function(){
            if(this.numberEntered && this.number.length){
                this.number[0] === '-' ? this.number.shift() : this.number.unshift('-');
                this.display = +this.number.join('');
                this.updateDisplay();
                console.log(this.number);
            }else{
                this.pushOperation('*');
                this.operationChain.push('-1');
                this.eval();
            }
        },

        eval: function(){
            let numbers = [],
                operands = [],
                secondLast = this.operationChain.length - 2,
                index = 0;
                self = this;
            /*
            for(let i=0; i <= secondLast ; i++){
                if( i % 2 ){
                    operands.push(this.operationChain[i]);
                }else{
                    numbers.push(+this.operationChain[i])
                }
            };*/

            this.operationChain.forEach( function(operand){
                if( ['-','+','*','/','='].includes(operand) ){
                    operands.push(operand);
                }else{
                    numbers.push(+operand);
                }
            });
            //evaluate percentage first;
            

            //evaluate rest;
            /*
            self.result = numbers[index];
            operands.forEach( function(operand) {
                index++;
                switch(operand){
                    case '+':
                        self.result += numbers[index];
                        break;
                    case '-':
                        self.result -= numbers[index];
                        break;
                    case '*':
                        self.result *= numbers[index];
                        break;
                    case '/':
                        self.result /= numbers[index];
                        break;
                    case '=':
                        self.result = self.result;
                        break;
                }
                */
            this.result = numbers[0];
            for(let i=1; i < numbers.length; i++){
                switch(operands[index]){
                    case '+':
                        self.result += numbers[i];
                        break;
                    case '-':
                        self.result -= numbers[i];
                        break;
                    case '*':
                        self.result *= numbers[i];
                        break;
                    case '/':
                        self.result /= numbers[i];
                        break;
                    case '=':
                        self.result = self.result;
                        break;
                }
                index++;
            };
            this.result = this.result;
            this.display = this.result;
            this.updateDisplay();
            console.log('numbers = '+ numbers);
            console.log('operand = '+operands);
            console.log('result = '+this.result);
        },
        
        percent: function(){
            this.percentage();
        },

        add: function(){
            this.updateOperationChain('+');
        },

        multiply: function(){
            this.updateOperationChain('*');
        },

        divide: function(){
            this.updateOperationChain('/');
        },

        substract: function(){
            this.updateOperationChain('-');
        },

        equal: function(){
            this.updateOperationChain('=');
        }
    }
    

    $('.btn-digit').on('click', function (){
         calc.concatDigit(this);
    });

    $('#btn-sign').on('click', function (){
        calc.changeSign();
    });

    $('#btn-percent').on('click', function(){
        calc.percent();
    });

    $('#btn-plus').on('click', function(){
        calc.add();
    });

    $('#btn-minus').on('click', function(){
        calc.substract();
    });

    $('#btn-multiply').on('click', function(){
        calc.multiply();
    });

    $('#btn-divide').on('click', function(){
        calc.divide();
    });

    $('#btn-equal').on('click', function(){
        calc.equal();
    });

});
