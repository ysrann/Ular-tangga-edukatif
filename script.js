```jsx
const { useState } = React;

const BOARD_SIZE = 100;
const TOTAL_QUESTIONS = 10;

const questionBank = [
  { q: 'Apa ibu kota Indonesia?', options: ['Jakarta', 'Surabaya', 'Bandung'], answer: 'Jakarta' },
  { q: 'Siapa presiden pertama Indonesia?', options: ['Soekarno', 'Soeharto', 'Jokowi'], answer: 'Soekarno' },
  { q: 'Gunung tertinggi di Indonesia adalah?', options: ['Semeru', 'Rinjani', 'Puncak Jaya'], answer: 'Puncak Jaya' },
  { q: 'Pulau terbesar di Indonesia adalah?', options: ['Sumatera', 'Kalimantan', 'Papua'], answer: 'Kalimantan' },
  { q: 'Bahasa resmi Indonesia adalah?', options: ['Jawa', 'Melayu', 'Indonesia'], answer: 'Indonesia' },
  { q: 'Hari Kemerdekaan Indonesia diperingati setiap?', options: ['17 Agustus', '1 Juni', '20 Mei'], answer: '17 Agustus' },
  { q: 'Lambang negara Indonesia adalah?', options: ['Banteng', 'Garuda', 'Harimau'], answer: 'Garuda' },
  { q: 'Mata uang Indonesia adalah?', options: ['Rupiah', 'Ringgit', 'Baht'], answer: 'Rupiah' },
  { q: 'Candi Borobudur terletak di provinsi?', options: ['Jawa Barat', 'Jawa Tengah', 'Yogyakarta'], answer: 'Jawa Tengah' },
  { q: 'Berapakah jumlah provinsi di Indonesia per tahun 2023?', options: ['34', '38', '40'], answer: '38' },
];

function SnakeLadderQuiz() {
  const [player, setPlayer] = useState(1);
  const [position, setPosition] = useState({ 1: 1 });
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [showResult, setShowResult] = useState(false);

  const rollDice = () => {
    const roll = Math.ceil(Math.random() * 6);
    const nextPos = Math.min(position[player] + roll, BOARD_SIZE);
    const randomQ = questionBank[Math.floor(Math.random() * TOTAL_QUESTIONS)];
    setQuestion({ ...randomQ, spot: nextPos });
  };

  const answerQuestion = () => {
    const isCorrect = selectedOption === question.answer;
    const newPos = isCorrect ? question.spot : Math.max(1, question.spot - 3);
    setPosition((prev) => ({ ...prev, [player]: newPos }));
    setShowResult(true);
    setTimeout(() => {
      setQuestion(null);
      setSelectedOption('');
      setShowResult(false);
      setPlayer(1);
    }, 2000);
  };

  const renderBoard = () => {
    const cells = [];
    for (let i = BOARD_SIZE; i >= 1; i--) {
      const isActive = position[1] === i;
      cells.push(
        <div
          key={i}
          className={`board-cell ${isActive ? 'active' : ''}`}
        >
          {i}
        </div>
      );
    }
    return <div className="grid grid-cols-10 gap-1 border p-2 bg-white rounded-lg shadow-md">{cells}</div>;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center text-green-700">🎲 Ular Tangga Kuis Indonesia</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">{renderBoard()}</div>
        <div className="w-full lg:w-1/3 space-y-4">
          {position[1] >= BOARD_SIZE ? (
            <div className="text-green-700 font-bold text-lg p-4 bg-white rounded shadow">🎉 Pemain 1 Menang!</div>
          ) : question ? (
            <div className="quiz-box">
              <div className="font-semibold text-gray-800">{question.q}</div>
              <div className="space-y-2">
                {question.options.map((opt) => (
                  <div key={opt}>
                    <input
            type="radio"
                      id={opt}
                      name="quiz"
                      value={opt}
                      checked={selectedOption === opt}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor={opt}>{opt}</label>
                  </div>
                ))}
              </div>
              <button
                onClick={answerQuestion}
                className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={!selectedOption}
              >
                Kirim Jawaban
              </button>
              {showResult && (
                <div className="font-medium text-sm text-center">
                  {selectedOption === question.answer ? '✅ Benar!' : '❌ Salah! Mundur 3 langkah.'}
                </div>
              )}
            </div>
          ) : (
            <button onClick={rollDice} className="button-primary">🎲 Lempar Dadu</button>
          )}
          <div className="text-center text-sm text-gray-600">Posisi Pemain: {position[1]}</div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<SnakeLadderQuiz />);
