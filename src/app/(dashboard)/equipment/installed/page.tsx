"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, User, Hash, Barcode } from "lucide-react";

type Equipment = {
  id: string;
  locationPath: string[];
  type: string;
  name: string;
  installationDate: Date;
  lastCheckDate: Date;
  expirationDate: Date;
  nextReplacementDate: Date;
  replacedBy: string;
  inventoryNumber: number;
  serialNumber: number;
  daysUntilWriteOff: number;
};

export default function InstalledEquipmentPage() {
  // Моковые данные с правильными типами
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: "EQ-1001",
      locationPath: ["0", "6", "1"],
      type: "СЗИ1У ~24СЗ",
      name: "СЗИ1У ~24СЗ",
      installationDate: new Date("2023-05-16"),
      lastCheckDate: new Date("2023-05-26"),
      expirationDate: new Date("2031-12-31"),
      nextReplacementDate: new Date("2028-05-16"),
      replacedBy: "Новиков В.О.",
      inventoryNumber: 111140899,
      serialNumber: 7492,
      daysUntilWriteOff: 1076,
    },
    {
      id: "EQ-1002",
      locationPath: ["25", "2", "1", "1а"],
      type: "НМШ1-1440",
      name: "57-40ур",
      installationDate: new Date("2024-09-24"),
      lastCheckDate: new Date("2024-10-03"),
      expirationDate: new Date("2038-12-31"),
      nextReplacementDate: new Date("2028-09-24"),
      replacedBy: "Новиков В.О.",
      inventoryNumber: 1100745926,
      serialNumber: 64116,
      daysUntilWriteOff: 1207,
    },
  ]);

  // Форматирование даты в российский формат
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ru-RU");
  };

  // Форматирование пути установки
  const formatLocation = (path: string[]) => {
    return path.join("-");
  };

  // Получение цвета для дней до списания
  const getDaysColor = (days: number): "green" | "orange" | "red" => {
    if (days < 180) return "red";
    if (days < 365) return "orange";
    return "green";
  };

  return (
    <div className="p-6">
      {/* Заголовок страницы */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Установленная аппаратура
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Список всего оборудования, установленного на объектах
        </p>
      </div>

      {/* Таблица оборудования */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Место
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Тип
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Имя
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Установка
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Проверка
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Срок эксп.
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  След. замена
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Кто заменил
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Инв. №
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Зав. №
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  До списания
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {equipment.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {formatLocation(item.locationPath)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {item.type}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {item.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <div className="flex items-center">
                      <CalendarDays className="w-4 h-4 mr-1 text-gray-400" />
                      {formatDate(item.installationDate)}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatDate(item.lastCheckDate)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatDate(item.expirationDate)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatDate(item.nextReplacementDate)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1 text-gray-400" />
                      {item.replacedBy}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <div className="flex items-center">
                      <Hash className="w-4 h-4 mr-1 text-gray-400" />
                      {item.inventoryNumber}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <div className="flex items-center">
                      <Barcode className="w-4 h-4 mr-1 text-gray-400" />
                      {item.serialNumber}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge variant={getDaysColor(item.daysUntilWriteOff)}>
                      <Clock className="w-3 h-3 mr-1" />
                      {item.daysUntilWriteOff} дн.
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Кнопка добавления */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Всего записей: {equipment.length}
        </div>
        <Button
          onClick={() => {
            // Логика добавления нового оборудования
          }}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Добавить оборудование
        </Button>
      </div>
    </div>
  );
}
