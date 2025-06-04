"use client";
import { ChevronDown, User } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Лого/Название */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Добро пожаловать
            </h1>
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-4">
            {/* Профиль */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 focus:outline-none group"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-md">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full w-3 h-3"></span>
                </div>
                <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Профиль
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Выпадающее меню профиля */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/10 dark:ring-white/10 focus:outline-none divide-y divide-gray-100 dark:divide-gray-700 z-50">
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Имя пользователя
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      user@example.com
                    </p>
                  </div>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Настройки
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Помощь
                    </a>
                  </div>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Выйти
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
