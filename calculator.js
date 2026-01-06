// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {

// 入力要素の取得
const number1Input = document.getElementById('number1'); // 2026年の累計実績
const number2Input = document.getElementById('number2'); // 2025年の累計実績
const number3Input = document.getElementById('number3'); // 本日の客数
const number4Input = document.getElementById('number4'); // 本日の点数
const number5Input = document.getElementById('number5'); // 本日の売り上げ

// 結果表示要素の取得
const additionResult = document.getElementById('addition');      // 2025年の累計比
const subtractionResult = document.getElementById('subtraction'); // 貯金額
const setRateResult = document.getElementById('setRate');         // セット率
const unitPriceResult = document.getElementById('unitPrice');     // 1点単価
const avgPriceResult = document.getElementById('avgPrice');       // 客単価

// コピーボタンの取得
const copyButton = document.getElementById('copyButton');

/**
 * localStorageから値を読み込む
 */
function loadFromStorage() {
    const savedNum1 = localStorage.getItem('calculator_num1');
    const savedNum2 = localStorage.getItem('calculator_num2');
    const savedNum3 = localStorage.getItem('calculator_num3');
    const savedNum4 = localStorage.getItem('calculator_num4');
    const savedNum5 = localStorage.getItem('calculator_num5');
    
    if (savedNum1 !== null) number1Input.value = savedNum1;
    if (savedNum2 !== null) number2Input.value = savedNum2;
    if (savedNum3 !== null) number3Input.value = savedNum3;
    if (savedNum4 !== null) number4Input.value = savedNum4;
    if (savedNum5 !== null) number5Input.value = savedNum5;
}

/**
 * localStorageに値を保存する
 */
function saveToStorage() {
    localStorage.setItem('calculator_num1', number1Input.value);
    localStorage.setItem('calculator_num2', number2Input.value);
    localStorage.setItem('calculator_num3', number3Input.value);
    localStorage.setItem('calculator_num4', number4Input.value);
    localStorage.setItem('calculator_num5', number5Input.value);
}

/**
 * 計算処理を実行して結果を表示
 */
function calculate() {
    // 要素が存在しない場合は処理を中断
    if (!number1Input || !number2Input || !number3Input || !number4Input || !number5Input ||
        !additionResult || !subtractionResult || !setRateResult || !unitPriceResult || !avgPriceResult) {
        console.error('必要な要素が見つかりません');
        return;
    }

    // 入力値を数値に変換（カンマを削除してから変換）
    const num1 = parseFloat(number1Input.value.replace(/,/g, '')) || 0; // 2026年の累計実績
    const num2 = parseFloat(number2Input.value.replace(/,/g, '')) || 0; // 2025年の累計実績
    const num3 = parseFloat(number3Input.value.replace(/,/g, '')) || 0; // 本日の客数
    const num4 = parseFloat(number4Input.value.replace(/,/g, '')) || 0; // 本日の点数
    const num5 = parseFloat(number5Input.value.replace(/,/g, '')) || 0; // 本日の売り上げ

    // 各計算結果を表示
    // 2025年の累計比 = 2026年の累計実績 / 2025年の累計実績 * 100
    additionResult.textContent = calculateYearRatio(num1, num2);
    
    // 貯金額 = 2026年の累計実績 - 2025年の累計実績
    subtractionResult.textContent = subtract(num1, num2);
    
    // セット率 = 本日の点数 / 客数
    setRateResult.textContent = calculateSetRate(num4, num3);
    
    // 1点単価 = 本日の売り上げ / 点数
    unitPriceResult.textContent = calculateUnitPrice(num5, num4);
    
    // 客単価 = 本日の売り上げ / 客数
    avgPriceResult.textContent = calculateAvgPrice(num5, num3);
}

/**
 * 入力フィールドの値をカンマ付きにフォーマット
 */
function formatInput(input) {
    // 現在の値を取得
    let value = input.value;
    
    // カンマを削除して数値のみを取得
    value = value.replace(/,/g, '').trim();
    
    // 空の場合は何もしない
    if (value === '') {
        return;
    }
    
    // 数値に変換
    const num = parseFloat(value);
    
    // 有効な数値の場合、カンマ区切りでフォーマット
    if (!isNaN(num)) {
        input.value = num.toLocaleString('ja-JP');
    } else {
        // 無効な値の場合は元の値を維持
        input.value = value;
    }
}

/**
 * 入力フィールドのカンマを削除
 */
function unformatInput(input) {
    input.value = input.value.replace(/,/g, '');
}

/**
 * 2025年の累計比を計算
 * @param {number} num2026 - 2026年の累計実績
 * @param {number} num2025 - 2025年の累計実績
 * @returns {string} 累計比（パーセンテージ）
 */
function calculateYearRatio(num2026, num2025) {
    if (num2025 === 0) {
        return '0で割れません';
    }
    const ratio = (num2026 / num2025) * 100;
    return (Math.floor(ratio * 10) / 10).toFixed(1) + '%';
}

/**
 * 減算（貯金額）
 * @param {number} a - 2026年の累計実績
 * @param {number} b - 2025年の累計実績
 * @returns {string} 減算結果
 */
function subtract(a, b) {
    return '¥' + Math.floor(a - b).toLocaleString('ja-JP');
}

/**
 * セット率を計算
 * @param {number} points - 本日の点数
 * @param {number} customers - 本日の客数
 * @returns {string} セット率
 */
function calculateSetRate(points, customers) {
    if (customers === 0) {
        return '0で割れません';
    }
    const rate = points / customers;
    return (Math.floor(rate * 100) / 100).toFixed(2);
}

/**
 * 1点単価を計算
 * @param {number} sales - 本日の売り上げ
 * @param {number} points - 本日の点数
 * @returns {string} 1点単価
 */
function calculateUnitPrice(sales, points) {
    if (points === 0) {
        return '0で割れません';
    }
    return '¥' + Math.floor(sales / points).toLocaleString('ja-JP');
}

/**
 * 客単価を計算
 * @param {number} sales - 本日の売り上げ
 * @param {number} customers - 本日の客数
 * @returns {string} 客単価
 */
function calculateAvgPrice(sales, customers) {
    if (customers === 0) {
        return '0で割れません';
    }
    return '¥' + Math.floor(sales / customers).toLocaleString('ja-JP');
}

// 入力値が変更されたら自動的に計算（保存はblurで行う）
number1Input.addEventListener('input', () => {
    calculate();
});
number2Input.addEventListener('input', () => {
    calculate();
});
number3Input.addEventListener('input', () => {
    calculate();
});
number4Input.addEventListener('input', () => {
    calculate();
});
number5Input.addEventListener('input', () => {
    calculate();
});

// フォーカス時にカンマを削除
number1Input.addEventListener('focus', () => unformatInput(number1Input));
number2Input.addEventListener('focus', () => unformatInput(number2Input));
number3Input.addEventListener('focus', () => unformatInput(number3Input));
number4Input.addEventListener('focus', () => unformatInput(number4Input));
number5Input.addEventListener('focus', () => unformatInput(number5Input));

// フォーカスを外した時にカンマをつけて保存
number1Input.addEventListener('blur', () => {
    formatInput(number1Input);
    calculate();
    saveToStorage();
});
number2Input.addEventListener('blur', () => {
    formatInput(number2Input);
    calculate();
    saveToStorage();
});
number3Input.addEventListener('blur', () => {
    formatInput(number3Input);
    calculate();
    saveToStorage();
});
number4Input.addEventListener('blur', () => {
    formatInput(number4Input);
    calculate();
    saveToStorage();
});
number5Input.addEventListener('blur', () => {
    formatInput(number5Input);
    calculate();
    saveToStorage();
});

// コピーボタンのクリックイベント
copyButton.addEventListener('click', async () => {
    // 結果をテキスト形式で取得
    const resultText = `2025 累計比 ${additionResult.textContent}
貯金額 ${subtractionResult.textContent}
【セット率】 ${setRateResult.textContent}
【1点単価】 ${unitPriceResult.textContent}
【客単価】 ${avgPriceResult.textContent}`;

    try {
        // クリップボードにコピー
        await navigator.clipboard.writeText(resultText);
        
        // ボタンの表示を変更
        copyButton.textContent = '✓ コピーしました！';
        copyButton.classList.add('copied');
        
        // 2秒後に元に戻す
        setTimeout(() => {
            copyButton.textContent = '📋 結果をコピー';
            copyButton.classList.remove('copied');
        }, 2000);
    } catch (err) {
        // エラー時
        copyButton.textContent = '❌ コピー失敗';
        setTimeout(() => {
            copyButton.textContent = '📋 結果をコピー';
        }, 2000);
    }
});

// 初期表示時にlocalStorageから復元して計算を実行
loadFromStorage();
calculate();
}); // DOMContentLoaded終了