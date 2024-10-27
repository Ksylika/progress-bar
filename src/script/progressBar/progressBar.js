export class ProgressBar {
    #state = {
        value: 0,
        isAnimated: false,
        isHidden: false,
        isDarkTheme: false
    }
    
    /**
    * Создание прогресс бара.
    * @param {HTMLElement} parentNode - Передается родительный элемент в котором создается прогресс бар.
    */
    constructor(parentNode) {
        
        if (!parentNode || !(parentNode instanceof HTMLElement)) {
            return;
        }
        const container = createElementWithClassAndText("container");
        const progressBar = createElementWithClassAndText("progressBar");
        const progressCircle = createElementWithClassAndText("progressBar__circle");
        
        
        
        progressBar.appendChild(createElementWithClassAndText("progressBar__title", "h3","Progress",));
        
        progressCircle.appendChild(createElementImg("./src/assets/image/cat.png", "Кошечка", "progressBar__cat-image"))
        progressCircle.appendChild(createElementWithClassAndText(["progressBar__eye", "left"]))
        progressCircle.appendChild(createElementWithClassAndText(["progressBar__eye", "right"]))
        
        progressBar.appendChild(progressCircle);
        progressBar.appendChild(createSettingsSection(this.#state.value, this.#state.isAnimated, this.#state.isHidden, this.#state.isDarkTheme));
        
        const toggleDarkLightElem = progressBar.querySelector(".toggleDarkLight")
        toggleDarkLightElem.appendChild(createElementWithClassAndText("star"))
        toggleDarkLightElem.appendChild(createElementWithClassAndText("moon"))
        
        container.appendChild(progressBar);
        
        parentNode.appendChild(container);
        
        
        addProgressHandler();
        addClickHandler("#animate", () => this.toggleAnimation());
        addClickHandler("#hide", () => this.toggleHide()); 
        addClickHandler("#darkLightMode", () => this.toggleTheme());
        
        this.turnStartToggle();
    }
    
    // Переключает анимацию прогресс бара.
    toggleAnimation() {
        try {
            changeClassPresence(".progressBar__circle", "progressBar__circle_animated");
            this.#state.isAnimated = !this.#state.isAnimated;
            const animateToggle = document.querySelector("#animate");
            const spanElement = document.querySelector('[data-animate]');
            animateToggle.checked = this.#state.isAnimated;
            spanElement.classList.toggle("active")
        } catch (e) {
            console.log(e);
        }
    }
    
    // Переключает анимацию прогресс видимость прогресс бара.
    toggleHide() {
        try {
            changeClassPresence(".progressBar__circle", "progressBar__circle_hidden");
            this.#state.isHidden = !this.#state.isHidden;
            const hideToggle = document.querySelector("#hide");
            const spanElement = document.querySelector('[data-hide]');
            hideToggle.checked = this.#state.isHidden;
            spanElement.classList.toggle("active")
        } catch (e) {
            console.log(e);
        }
    }
    
    // Переключает тему прогресс бара с светлой на темную.
    toggleTheme() {
        try {
            const spanElement = document.querySelector('[data-darkLightMode]');
            const root = document.documentElement;
            root.classList.toggle('dark-theme');
            this.#state.isDarkTheme = !this.#state.isDarkTheme;
            spanElement.innerHTML = this.#state.isDarkTheme ? 'Light' : 'Dark';
            spanElement.classList.toggle("active")
            
        } catch (e) {
            console.log(e);
        }
    }
    
    // Проверяет есть ли включенные сначала переключатели и выполняет функцию.
    turnStartToggle() {
        if (this.#state.isAnimated) this.toggleAnimation()
            if (this.#state.isHidden) this.toggleHide() 
                if (this.#state.isDarkTheme) this.toggleTheme()
                }
}

/**
* Обновляет положение глаз кота от значения прогресс бара.
* @param {number} progress - Передается значения прогресс бара для обновления положения глаз.
*/
function updateEyes(progress) {
    const eyes = document.querySelectorAll('.progressBar__eye');
    const radius = 5; 
    const angle = progress * 3.6;
    
    eyes.forEach((eye) => {
        const eyeX = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
        const eyeY = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
        eye.style.setProperty('--pupil-offset-x', `${eyeX}px`);
        eye.style.setProperty('--pupil-offset-y', `${eyeY}px`)
    })
    
}
/**
* Обновляет цвет прогресс бара в зависимости от заполненности.
* @param {number} progress - Передается значения прогресс бара для обновления цвета.
*/
function setGradient(progress) {
    const progressBar = document.querySelector('.progressBar__circle')
    const settingInput = document.querySelector('.settings__input')
    if (progress << 30) {
        progressBar.style.setProperty('--progress-color-circle','#ff3a33');
        settingInput.style.setProperty('--progress-color-input','#ff3a33');
    }
    if (progress > 30) {
        progressBar.style.setProperty('--progress-color-circle','#ffff00');
        settingInput.style.setProperty('--progress-color-input','#ffff00');
    }
    if (progress > 70) {
        progressBar.style.setProperty('--progress-color-circle','#47d794');
        settingInput.style.setProperty('--progress-color-input','#47d794');
    }
    
}



/**
* Связывает значение в форме ввода с процентом выполнения.
*/
function addProgressHandler() {
    try {
        const valueInputField = document.querySelector("#value");
        const progressCircle = document.querySelector(".progressBar__circle");
        let progressBarMove;
        valueInputField.addEventListener('input', (e) => {
            e.target.value  = validateInput(e.target.value)
            let currentValue = getComputedStyle(progressCircle).getPropertyValue("--progress");
            clearInterval(progressBarMove);
            progressBarMove = setInterval(() => {
                currentValue < e.target.value  ? currentValue++ : currentValue--;
                updateEyes(currentValue)
                setGradient(currentValue)
                progressCircle.style.setProperty('--progress', String(currentValue));
                if (+e.target.value  === +currentValue) {
                    clearInterval(progressBarMove);
                }
            }, 20);
        });
    } catch (e) {
        console.log(e)
    }
}

/**
* Валидирует строку передаваемую пользователем в значение от 0 до 100.
* @param {string} inputString - Передается значения для валидации.
* @return {string} Возвращается строка с числом от 0 до 100.
*/
function validateInput(inputString) {
    if (inputString.length === 0) {
        return "";
    }
    if (inputString[0] === '0') {
        return inputString.slice(1);
    }
    if (inputString > 100) {
        return "100";
    }
    return inputString.replace(/[^0-9]/g, "");
}

/**
* Создание обработчика клика для элемента.
* @param {string} selector - Передается селектор элемента, которому добавляется обработчик клика.
* @param {function} handler - Передается функция которая вызывается при клике на элемент.
*/
function addClickHandler(selector, handler) {
    try {
        document.querySelector(selector).addEventListener('click', handler);
    } catch (e) {
        console.log(e);
    }
}

/**
* Добавляет или удаляет класс у элемента.
* @param {string} selector - Передается селектор элемента, которому добавляется или удаляется класс.
* @param {string} className - Передается класс для добавление или удаления.
*/
function changeClassPresence(selector, className) {
    try {
        document.querySelector(selector).classList.toggle(className);
    } catch (e) {
        console.log(e);
    }
}

/**
* Создаются настройки для прогресс бара.
* @param {number} value - Передается значение процента выполнения.
* @param {boolean} isAnimated - Передается состояние анимации.
* @param {boolean} isHidden - Передается состояние скрытия.
* @param {boolean} isDarkTheme - Передается состояние темы страницы.
* @return {HTMLElement} возвращается готовый блок с настройками.    
*/
function createSettingsSection(value, isAnimated, isHidden, isDarkTheme) {
    const settings = createElementWithClassAndText(["progressBar__settings", "settings"], "ul" );
    settings.appendChild(createInputWithText(["settings__property", "input"], "settings__input", "Value", value, "input", "value", "toggle"));
    settings.appendChild(createInputWithText("settings__property", "settings__checkbox", "Animate", isAnimated, "checkbox", "animate", "toggle"));
    settings.appendChild(createInputWithText("settings__property", "settings__checkbox", "Hide", isHidden, "checkbox", "hide", "toggle"));
    settings.appendChild(createInputWithText("settings__property", "settings__checkbox", "Dark", isDarkTheme, "checkbox", "darkLightMode", "toggleDarkLight"));
    return settings;
}

/**
* Создается инпут элемент на заданных параметрах.
* @param {string|string[]} [className] - Передается классы блока в который добавляется input.
* @param {string|string[]} [inputClassName] - Задаются классы для input элемента.
* @param {string} [inputText] - Передается текст который будет описывать функционал input.
* @param {number|boolean} [inputValue] - Передается для checkbox input значение или значение для заполнения прогресс бара.
* @param {string} [inputType] - Передается тип input элемента.
* @param {string|number} [id] - Передается id инпут элемента.
* @param {string} [lableClassName] - Передается класс для label элемента.
* @return {HTMLElement} - Возвращается input с переданными значениями.
*/
function createInputWithText(className = "", inputClassName = "", inputText = "", inputValue = 0, inputType = "", id = String(Date.now()), lableClassName = "") {
    
    try {
        let boolAttr;
        let valueAttr;
        if (typeof inputValue === 'boolean') {
            boolAttr = inputValue;
        } else { 
            valueAttr = inputValue;
        }
        const inputContainer = createElementWithClassAndText(className, "li");
        if (Array.isArray(inputClassName)) {
            const inputElem = inputContainer.appendChild(Object.assign(document.createElement("input"), {type: inputType, id: id, checked: boolAttr,  value: valueAttr}))
            inputClassName.forEach(name => inputElem.classList.add(name));
        } else {
            inputContainer.appendChild(Object.assign(document.createElement("input"), {type: inputType, id: id, classList: inputClassName, checked: boolAttr, value: valueAttr}))
            
        }
        
        inputContainer.appendChild(Object.assign(document.createElement("label"), { htmlFor: id, className: lableClassName}));
        inputContainer.appendChild(Object.assign(document.createElement("span"), {innerText: inputText } )).setAttribute(`data-${id}`, id)
        return inputContainer;
    } catch (e) {
        console.log(e);
    }
}

/**
* Создает html элемент с классами и текстом.
* @param {string|string[]} [className] - Может принимать одиночный класс или список классов.
* @param {string} [text] - Передается текст помещенный в элемент.
* @return {HTMLElement} - Возвращается созданный html элемент.
*/
function createElementWithClassAndText(className = "",element = "div", text = "") {
    if (Array.isArray(className)) {
        const divElem = Object.assign(document.createElement(element), {innerHTML: text})
        className.forEach(name => divElem.classList.add(name))
        return divElem;
    } else {
        const divElem = Object.assign(document.createElement(element), {innerHTML: text, classList: className})
        return divElem;
    }
}


/**
* Создает img элемент с классами, ссылкой или путем к картинке и описанием.
* @param {string} [src] - Ссылка/путь на картинку.
* @param {string} [alt] - Описание картинки.
* @param {string|string[]} [className] - Может принимать одиночный класс или список классов.
* @return {HTMLElement} - Возвращает img элемент
*/
function createElementImg(src = "", alt = "Картинка", className = "") {
    return Object.assign(document.createElement('img'), {src : src, alt: alt, classList: className});
}
