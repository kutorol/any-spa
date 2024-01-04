import { humanDateTime } from "./date";

// Скачивает в файл переданную строку
export const downloadStringAsFile = (content: string, fileName?: string, mimeType?: string): void => {
  // Создаем Blob из строки
  const blob = new Blob([content], { type: mimeType || "text/plain" });

  // Создаем элемент <a> для создания ссылки
  const link = document.createElement("a");

  // Устанавливаем атрибуты элемента <a>
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName || humanDateTime();

  // Добавляем элемент в DOM
  document.body.appendChild(link);
  // Запускаем клик по ссылке
  link.click();
  // Удаляем элемент из DOM
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(link.href), 7000);
};