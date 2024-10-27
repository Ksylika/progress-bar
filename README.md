# 📘 Progress bar


> Проект был создан по техническому заданию. Создавала с креативным подходом и желанием внедрить что-то новое ❤️. 
> Задача разработать прототип блока Progress для использования в мобильных web-приложениях. Основное предназначение блока отображать процесс выполнения процессов и их прогресс выполнения.

## 🚀 Личный решение дополнения в UI

- ✨ **Котик** - добавляет разнообразие в проект и делает дизайн менее скучным, а также запоминающимся. Также было доработано движение глаз в зависимости от заполнение полосы прогресса.
- 🔧 **Дополнительная тема** - добавляет выбор темы под удобство пользователя, также использование темной темы сейчас крайне частое явление.
- 📊 **Цвет в зависиомти от заполненности** - Показывает цветовую индикацию понятную любого пользователю о том насколько заполнен прогресс, выполнен в классических цветах часто используемых в жизни.
- 🎨 **Цветовая палитра** - выбиралась исключительно от личных предпочтений.


## 💡 Решения и подходы

1. **Разделение логики**  
   Компоненты прогресс-бара и основной логики разделены, чтобы улучшить читаемость кода и упростить его поддержку. Весь функционал прогресс-бара вынесен в `src/script/progressBar/progressBar.js`, а общий скрипт находится в `src/script/script.js`.


2. **Градиенты и анимации**  
   Для улучшения визуальной привлекательности прогресс-бара использован динамический градиент, который изменяется в зависимости от текущего прогресса. Также добавлены CSS-анимации для плавного перехода.

3. **Темизация**  
   Внедрена возможность смены тем (светлая/темная тема), чтобы пользователь мог выбирать наиболее удобный для него вариант. Реализовано через CSS-переменные.

4. **Для упрощения и улучшения читаемости кода был использован метод `Object.assign()`**.
    - Добавлять несколько свойств к элементам DOM** с меньшим количеством кода.
    - Избегать дублирования**: так как `Object.assign()` позволяет добавлять свойства в уже существующий объект, это помогло избежать создания промежуточных объектов и сэкономить место в коде.

5. **Разделение стилей**
    Помогает улучшить поиск и изменение стилей в проекте за счет разделение их по отдельным файлам.



## 📁 Структура проекта

```plaintext
├── src                    # Исходные файлы проекта
│   ├── assets             # Статичные ресурсы проекта
│   │   ├── css            # CSS стили
│   │   └── image          # Изображения
│   └── script             # Скрипты
│       ├── progressBar    # Компоненты для прогресс-бара
│       │   └── progressBar.js   # Основной JS файл для прогресс-бара
│       └── script.js      # Основной JS файл проекта
├── index.html             # Главная HTML страница
├── .gitattributes         # Настройки для Git
└── README.md              # Документация проекта
