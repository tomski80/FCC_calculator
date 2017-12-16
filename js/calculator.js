
'use strict'

$( function (){


    let calc = {
        display : '0',
        number : [],
        operationChain : [],
        result : 0,

        updateDisplay: function(){
            $('.display').val(this.display);
        },

        concatDigit: function(btn){
            let digit = $(btn).val();
            this.number.push(digit);
            this.display = this.number.length ? this.number.join('') : '0';
            this.updateDisplay();
        },

        updateOperationChain: function(operand){
            if(this.number.length){
                let number = this.number.join('');
                this.operationChain.push(number);
                this.number = [];
            }
            let lastIndex = this.operationChain.length - 1,
                lastElem  = this.operationChain[lastIndex];

            if( ['+','-','*','/','='].includes(lastElem) ){
                this.operationChain[lastIndex] = operand;
            }else{
                this.operationChain.push(operand);
            }

            this.eval();
        },

        eval: function(){
            let numbers = [],
                operands = [],
                secondLast = this.operationChain.length - 2,
                index = 0;
                self = this;

            for(let i=0; i <= secondLast ; i++){
                if( i % 2 ){
                    operands.push(this.operationChain[i]);
                }else{
                    numbers.push(+this.operationChain[i])
                }
            };
        
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
            });

            this.display = this.result;
            this.updateDisplay();
            console.log('numbers = '+ numbers);
            console.log('operand = '+operands);
            console.log('result = '+this.result);
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
