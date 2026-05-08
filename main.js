
document.addEventListener('DOMContentLoaded', () => {
    const lottoBallsContainer = document.getElementById('lotto-balls');
    const generateBtn = document.getElementById('generate-btn');
    const historyList = document.getElementById('history-list');

    const HISTORY_KEY = 'lottoHistory';

    // 로컬 스토리지에서 기록 불러오기
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

    // 공 색상 지정을 위한 함수
    const getColor = (number) => {
        if (number <= 10) return '#fbc400'; // 노란색
        if (number <= 20) return '#69c8f2'; // 파란색
        if (number <= 30) return '#ff7272'; // 빨간색
        if (number <= 40) return '#aaa'; // 회색
        return '#b0d840'; // 녹색
    };

    // 로또 번호 생성 및 표시 함수
    const generateLottoNumbers = () => {
        lottoBallsContainer.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        sortedNumbers.forEach((number, index) => {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.textContent = number;
            ball.style.backgroundColor = getColor(number);
            ball.style.animationDelay = `${index * 0.1}s`;
            lottoBallsContainer.appendChild(ball);
        });

        // 기록에 추가
        addToHistory(sortedNumbers);
    };

    // 기록에 추가하고 화면 업데이트
    const addToHistory = (numbers) => {
        const newHistoryItem = {
            time: new Date().toLocaleString(),
            numbers: numbers,
        };

        history.unshift(newHistoryItem);
        if (history.length > 10) {
            history.pop();
        }

        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        renderHistory();
    };

    // 기록을 화면에 렌더링
    const renderHistory = () => {
        historyList.innerHTML = '';
        history.forEach(item => {
            const li = document.createElement('li');
            li.className = 'history-item';

            const timeSpan = document.createElement('span');
            timeSpan.className = 'time';
            timeSpan.textContent = new Date(item.time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

            const numbersSpan = document.createElement('span');
            numbersSpan.className = 'numbers';
            numbersSpan.textContent = item.numbers.join(', ');

            li.appendChild(timeSpan);
            li.appendChild(numbersSpan);
            historyList.appendChild(li);
        });
    };

    // 이벤트 리스너 설정
    generateBtn.addEventListener('click', generateLottoNumbers);

    // 초기 기록 렌더링
    renderHistory();
});
