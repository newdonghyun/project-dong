
document.addEventListener('DOMContentLoaded', () => {
    // 로또 관련 요소
    const lottoBallsContainer = document.getElementById('lotto-balls');
    const generateBtn = document.getElementById('generate-btn');
    const historyList = document.getElementById('history-list');

    // 테마 관련 요소
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    const HISTORY_KEY = 'lottoHistory';
    const THEME_KEY = 'theme';

    // 아이콘 SVG
    const moonIcon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    const sunIcon = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';

    // 로컬 스토리지에서 기록 및 테마 불러오기
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    let currentTheme = localStorage.getItem(THEME_KEY);

    // 테마 적용 함수
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.innerHTML = sunIcon;
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.innerHTML = moonIcon;
        }
    };

    // 테마 전환 함수
    const toggleTheme = () => {
        const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);
    };

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

        addToHistory(sortedNumbers);
    };

    // 기록에 추가하고 화면 업데이트
    const addToHistory = (numbers) => {
        const newHistoryItem = {
            time: new Date().toISOString(),
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
    themeToggleBtn.addEventListener('click', toggleTheme);

    // 초기 렌더링
    applyTheme(currentTheme);
    renderHistory();
});
