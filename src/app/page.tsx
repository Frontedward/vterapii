import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        Добро пожаловать в VTerapii
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Онлайн платформа для приёма пациентов
      </p>
      <div className="flex gap-4">
        <a
          href="/auth/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Войти
        </a>
        <a
          href="/auth/register"
          className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Регистрация
        </a>
      </div>
    </div>
  );
}
