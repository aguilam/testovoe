import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [type, setType] = useState('math');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isRandom, setIsRandom] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (isRandom) return true;
    if (type === 'date') {
      const [m, d] = input.split('/');
      if (!m || !d || isNaN(m) || isNaN(d)) {
        setError('Дата должна быть в формате ММ/ДД');
        return false;
      }
    } else {
      if (!/^\d+$/.test(input)) {
        setError('Число должно быть в виде цифр');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    const params = new URLSearchParams({ type, value: isRandom ? 'random' : input });
    navigate(`/result?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-100 mb-6 text-center">
        Информация о числах
      </h1>

      <label className="block mb-4 text-gray-300">
        Тип факта:
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="mt-2 w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="math">Math</option>
          <option value="trivia">Trivia</option>
          <option value="date">Date</option>
        </select>
      </label>

      <label className="flex items-center mb-4 text-gray-300">
        <input
          type="checkbox"
          checked={isRandom}
          onChange={e => setIsRandom(e.target.checked)}
          className="h-5 w-5 text-teal-400 focus:ring-teal-400 bg-gray-700 border-gray-600 rounded"
        />
        <span className="ml-3">Случайное значение</span>
      </label>

      {!isRandom && (
        <label className="block mb-4 text-gray-300">
          {type === 'date' ? 'Введите дату (MM/DD):' : 'Введите число:'}
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="mt-2 w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </label>
      )}

      {error && (
        <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-teal-400 text-white font-medium rounded-lg hover:from-purple-700 hover:to-teal-500 transition"
      >
        Узнать факт
      </button>
    </form>
  );
}
