const fs = require('fs');
const os = require('os');

// Função de ordenação QuickSort
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Função principal
function main() {
    // Informações da linguagem e sistema
    console.log("Linguagem: JavaScript (Node.js)");
    console.log(`Versão: ${process.version}`);
    console.log(`Sistema Operacional: ${os.type()} ${os.release()}`);
    console.log(`CPU: ${os.cpus()[0].model}`);
    console.log(`Memória RAM: ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB\n`);

    // Lendo o arquivo
    const inputFile = 'txt/arq100k.txt';
    const outputFile = 'quicksort100k_JS.txt';
    

    try {
        const data = fs.readFileSync(inputFile, 'utf8');
        let numeros = data.split('\n').filter(line => line.trim() !== '').map(Number);

        // QuickSort
        const start = process.hrtime();
        numeros = quickSort(numeros);
        const end = process.hrtime(start);

        // Salvando em arquivo de saída
        fs.writeFileSync(outputFile, numeros.join('\n'), 'utf8');

        // Informações de tempo e memória
        const tempoMs = (end[0] * 1000) + (end[1] / 1e6);
        const memoriaKb = process.memoryUsage().heapUsed / 1024;
        console.log(`Tempo de execução: ${tempoMs.toFixed(2)} ms`);
        console.log(`Memória utilizada: ${memoriaKb.toFixed(2)} KB`);
    } catch (err) {
        console.error(`Erro: ${err.message}`);
    }
}

main();
