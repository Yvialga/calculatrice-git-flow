import { addition } from './function/addition.js';
import { squareroot } from './function/square_root.js';
import { square } from './function/square.js';
import { multiplication } from './function/multiplication.js';
import { division } from './function/division.js';
import { subtraction } from './function/subtraction.js';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const operations = {
    '1': {
        label: 'Addition',
        args: 2,
        fn: (a, b) => addition(a, b)
    },
    '2': {
        label: 'Soustraction',
        args: 2,
        fn: (a, b) => subtraction(a, b)
    },
    '3': {
        label: 'Multiplication',
        args: 2,
        fn: (a, b) => multiplication(a, b)
    },
    '4': {
        label: 'Division',
        args: 2,
        fn: (a, b) => division(a, b)
    },
    '5': {
        label: 'Racine carrée',
        args: 1,
        fn: (a) => squareroot(a)
    },
    '6': {
        label: 'Mis au carrée',
        args: 1,
        fn: (a) => square(a)
    },
};

function askNumbers(op, callback) {
    rl.question('Premier nombre : ', (a) => {
        if (op.args === 1) {
            callback(parseFloat(a), null);
        } else {
            rl.question('Deuxième nombre : ', (b) => {
                callback(parseFloat(a), parseFloat(b));
            });
        }
    });
}

function askOperation() {
    console.log('\nChoisissez une opération :');
    for (const [key, { label }] of Object.entries(operations)) {
        console.log(`  ${key}. ${label}`);
    }

    rl.question('\nVotre choix : ', (choice) => {
        const op = operations[choice];
        if (!op) {
            console.log('Choix invalide, veuillez réessayer.');
            return askOperation();
        }

        askNumbers(op, (a, b) => {
            const result = op.args === 1 ? op.fn(a) : op.fn(a, b);
            console.log(`Résultat (${op.label}) : ${result}`);

            rl.question('\nNouveau calcul ? (o/n) : ', (again) => {
                if (again.toLowerCase() === 'o') {
                    askOperation();
                } else {
                    rl.close();
                }
            });
        });
    });
}

askOperation();