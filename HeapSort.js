const fs = require('fs');
const os = require('os');

// Função de ordenação HeapSort
function heapSort(arr) {
    const heapify = (arr, n, i) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, n, largest);
        }
    };

    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }

    return arr;
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
    const outputFile = 'heapsort_JS.txt';

    try {
        const data = fs.readFileSync(inputFile, 'utf8');
        let numeros = data.split('\n').filter(line => line.trim() !== '').map(Number);

        // HeapSort
        const start = process.hrtime();
        numeros = heapSort(numeros);
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
