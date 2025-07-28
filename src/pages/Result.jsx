import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Result() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type");
  const value = searchParams.get("value");
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!type || !value) {
      navigate("/");
      return;
    }
    const url = `http://numbersapi.com/${value}/${type}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        return res.text();
      })
      .then((txt) => {
        setFact(txt);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [type, value, navigate]);

  if (loading)
    return (
      <div>
        <p>Загрузка</p>
      </div>
    );
  if (error)
    return (
      <div className="bg-red-900 p-6 rounded shadow-md">
        <p className="text-red-500">Ошибка: {error}</p>
        <button onClick={() => navigate("/")} className="mt-4 text-blue-600">
          Назад
        </button>
      </div>
    );

  return (
    <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-lg">
      <h2 className="text-xl mb-4 text-gray-100">Результат</h2>
      <p className="text-gray-300">
        <strong>Тип факта:</strong> {type}
      </p>
      <p className=" text-gray-300">
        <strong>Значение:</strong> {value}
      </p>
      <div className="mt-4 p-4 bg-gray-700 rounded text-gray-300">{fact}</div>
      <button
        onClick={() => navigate("/")}
        className="mt-6 py-3 px-3 bg-gradient-to-r from-purple-600 to-teal-400 text-white font-medium rounded-lg hover:from-purple-700 hover:to-teal-500 transition"
      >
        Попробовать снова
      </button>
    </div>
  );
}
