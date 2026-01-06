// 入力要素の取得
const number1Input = document.getElementById('number1');
const number2Input = document.getElementById('number2');

// 結果表示要素の取得
const additionResult = document.getElementById('addition');
const subtractionResult = document.getElementById('subtraction');
const multiplicationResult = document.getElementById('multiplication');
const divisionResult = document.getElementById('division');

/**
 * 計算処理を実行して結果を表示
 */
function calculate() {
    // 入力値を数値に変換
    const num1 = parseFloat(number1Input.value) || 0;
    const num2 = parseFloat(number2Input.value) || 0;

    // 各計算結果を表示
    additionResult.textContent = add(num1, num2);
    subtractionResult.textContent = subtract(num1, num2);
    multiplicationResult.textContent = multiply(num1, num2);
    divisionResult.textContent = divide(num1, num2);
}

/**
 * 加算
 * @param {number} a - 最初の数値
 * @param {number} b - 2番目の数値
 * @returns {number} 加算結果
 */
function add(a, b) {
    return (a + b).toFixed(2);
}

/**
 * 減算
 * @param {number} a - 最初の数値
 * @param {number} b - 2番目の数値
 * @returns {number} 減算結果
 */
function subtract(a, b) {
    return (a - b).toFixed(2);
}

/**
 * 乗算
 * @param {number} a - 最初の数値
 * @param {number} b - 2番目の数値
 * @returns {number} 乗算結果
 */
function multiply(a, b) {
    return (a * b).toFixed(2);
}

/**
 * 除算
 * @param {number} a - 最初の数値
 * @param {number} b - 2番目の数値
 * @returns {string} 除算結果（0除算の場合はエラーメッセージ）
 */
function divide(a, b) {
    if (b === 0) {
        return '0で割れません';
    }
    return (a / b).toFixed(2);
}

// 入力値が変更されたら自動的に計算
number1Input.addEventListener('input', calculate);
number2Input.addEventListener('input', calculate);

// 初期表示時に計算を実行
calculate();
