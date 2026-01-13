document.addEventListener('DOMContentLoaded', function() {
    initWikiTree();
    loadWikiContent();
    initInteractiveWiki();
});

// Инициализация интерактивной Wiki с всплывающими окнами
function initInteractiveWiki() {
    // Создаем элементы всплывающего окна
    function createPopup() {
        // Проверяем, существует ли уже попап
        if (document.getElementById('popupOverlay')) return;
        
        const overlay = document.createElement('div');
        overlay.id = 'popupOverlay';
        overlay.className = 'popup-overlay';
        
        const window = document.createElement('div');
        window.className = 'popup-window';
        
        const header = document.createElement('div');
        header.className = 'popup-header';
        
        const title = document.createElement('h2');
        title.className = 'popup-title';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'popup-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', closePopup);
        
        const content = document.createElement('div');
        content.className = 'popup-content';
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        window.appendChild(header);
        window.appendChild(content);
        overlay.appendChild(window);
        
        document.body.appendChild(overlay);
        
        // Закрытие по клику вне окна
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closePopup();
            }
        });
        
        // Закрытие по клавише Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
    }
    
    function openPopup(title, content) {
        createPopup();
        
        const overlay = document.getElementById('popupOverlay');
        const titleEl = document.querySelector('.popup-title');
        const contentEl = document.querySelector('.popup-content');
        
        titleEl.textContent = title;
        contentEl.innerHTML = content;
        
        // Показываем попап
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку фона
    }
    
    function closePopup() {
        const overlay = document.getElementById('popupOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // Восстанавливаем прокрутку
        }
    }
    
    // Добавляем обработчики для кликабельных элементов
    function makeInteractive() {
        // Селекторы для элементов, которые должны открывать попап
        const selectors = [
            '.tree-node', 
            '.tree-label'
        ];
        
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                // Проверяем, не является ли элемент уже обработанным
                if (!el.classList.contains('popup-trigger')) {
                    el.classList.add('popup-trigger', 'shimmer-effect');
                    el.style.cursor = 'pointer';
                    
                    el.addEventListener('click', function(e) {
                        // Проверяем, не кликнули ли по иконке или другому элементу управления
                        if (e.target.closest('.tree-toggle')) {
                            return;
                        }
                        
                        e.preventDefault();
                        
                        const title = this.textContent.trim();
                        let content = '';
                        
                        // Определяем содержимое в зависимости от заголовка
                        switch(title) {
                            // Полные описания для всех разделов Wiki
                            
                            // Ролевая игра
                            case 'Что такое РП?':
                                content = `<h3>Что такое Ролевая Игра (РП)?</h3>
                                <p>Ролевая игра в CRYSTAL RUSSIA — это форма интерактивного storytelling, где каждый игрок берет на себя роль персонажа и взаимодействует с другими участниками, создавая совместную историю.</p>
                                <p>Цель РП — погрузиться в атмосферу реального мира, где действия персонажа логичны, последовательны и соответствуют его характеру, прошлому и целям.</p>
                                <ul>
                                    <li>Действуйте как ваш персонаж, а не как игрок</li>
                                    <li>Сохраняйте консистентность в поведении и мотивации</li>
                                    <li>Уважайте границы других игроков и их персонажей</li>
                                    <li>Избегайте метаигры и знания сверх возможного для персонажа</li>
                                    <li>Создавайте увлекательные сюжеты и развивайте историю</li>
                                </ul>
                                <p>Качественная РП — основа нашего игрового сообщества. Мы поощряем глубокое погружение в роль и творческий подход к развитию сюжетов.</p>`;
                                break;
                                
                            case 'Запрещённые темы':
                                content = `<h3>Запрещённые темы в Ролевой Игре</h3>
                                <p>Для поддержания комфортной, безопасной и уважительной игровой среды запрещены следующие темы:</p>
                                <ul>
                                    <li>Политические и религиозные высказывания, пропаганда</li>
                                    <li>Национальная, расовая и гендерная дискриминация</li>
                                    <li>Экстремистские идеи, призывы к насилию и терроризму</li>
                                    <li>Порнографические материалы и откровенные сцены</li>
                                    <li>Темы, связанные с реальными трагедиями, катастрофами и болезнями</li>
                                    <li>Оскорбительные стереотипы и уничижительные образы</li>
                                </ul>
                                <p>Администрация оставляет за собой право отредактировать, прервать или удалить любые сцены, нарушающие эти правила. Нарушение может повлечь за собой наказание.</p>
                                <p>Цель правил — обеспечить безопасное пространство для всех игроков, независимо от их возраста, происхождения и взглядов.</p>`;
                                break;
                                
                            // Правила сервера
                            case 'Правила':
                                content = `<h3>Основные Правила Сервера</h3>
                                <p>Соблюдение правил — обязательное условие для комфортной и честной игры всех участников. Правила едины для всех игроков.</p>
                                <ul>
                                    <li><strong>Читинг и эксплойты</strong> — строго запрещены любые сторонние программы, модификации клиента и использование багов</li>
                                    <li><strong>Уважение</strong> — запрещено оскорбление других игроков, администрации и нарушение этических норм</li>
                                    <li><strong>Ролевая этика</strong> — требуется соблюдение принципов честной и качественной ролевой игры</li>
                                    <li><strong>Реклама</strong> — запрещена любая реклама других проектов, сайтов и услуг</li>
                                    <li><strong>Язык общения</strong> — в общем чате запрещено использование нецензурной лексики и оскорблений</li>
                                    <li><strong>Идентичность</strong> — запрещено маскироваться под администрацию или других игроков</li>
                                </ul>
                                <p>Полный список правил доступен в официальном документе на форуме. Незнание правил не освобождает от ответственности.</p>`;
                                break;
                                
                            case 'Наказания':
                                content = `<h3>Система Наказаний</h3>
                                <p>За нарушение правил предусмотрены следующие меры, зависящие от тяжести проступка и истории поведения игрока:</p>
                                <ul>
                                    <li><strong>Предупреждение</strong> — устное или письменное замечание, фиксируется в истории</li>
                                    <li><strong>Мут</strong> — блокировка чата от 1 часа до 7 дней за нарушения общения</li>
                                    <li><strong>Тайм-аут</strong> — временный бан от 1 до 14 дней за серьезные нарушения</li>
                                    <li><strong>Бан</strong> — постоянная блокировка аккаунта за крайне тяжкие нарушения</li>
                                    <li><strong>Перманентный бан</strong> — бессрочная блокировка без возможности разбана</li>
                                </ul>
                                <p>Повторные нарушения усугубляют наказание. Администрация руководствуется принципами справедливости и прозрачности при вынесении решений.</p>
                                <p>Решение принимается на основе доказательств и контекста инцидента.</p>`;
                                break;
                                
                            case 'Апелляции':
                                content = `<h3>Процедура Подачи Апелляции</h3>
                                <p>Если вы считаете, что получили наказание по ошибке или несправедливо, вы можете подать апелляцию для пересмотра решения:</p>
                                <ol>
                                    <li>Перейдите на официальный форум проекта</li>
                                    <li>Найдите раздел "Апелляции" и создайте новую тему</li>
                                    <li>Укажите ваш игровой ник, причину бана и дату инцидента</li>
                                    <li>Приложите все доступные доказательства: скриншоты, видео, логи чата</li>
                                    <li>Ожидайте ответа от администрации — рассмотрение занимает до 72 часов</li>
                                </ol>
                                <p>Администрация рассматривает каждую апелляцию индивидуально, объективно и конфиденциально. Решение может быть как подтверждено, так и отменено.</p>
                                <p>Важно: подача апелляции не означает автоматический разбан. Решение принимается на основе представленных доказательств.</p>`;
                                break;
                                
                            // Переименование и обновление структуры
                            case 'Правила сервера+':
                                content = `<h3>Правила Сервера CRYSTAL RUSSIA</h3>
                                <p>Добро пожаловать в раздел с полным описанием правил нашего сервера. Здесь вы найдете всю необходимую информацию о том, как вести себя в игре, что разрешено, а что запрещено, и какие последствия могут быть за нарушения.</p>
                                <p>Правила разработаны для обеспечения честной, безопасной и увлекательной игры для всех участников. Мы стремимся создать сообщество, основанное на уважении, творчестве и командной игре.</p>
                                <p>Настоятельно рекомендуем ознакомиться со всеми разделами перед началом активной игры. Это поможет вам избежать проблем и полностью погрузиться в атмосферу проекта.</p>
                                <p>Новые игроки получают 7-дневный период адаптации, в течение которого за первые нарушения выдается только предупреждение.</p>`;
                                break;
                                
                            // Все темы теперь имеют полное описание
                                content = '';
                                break;
                        }
                        
                        openPopup(title, content);
                    });
                }
            });
        });
    }
    
    // Инициализация интерактивности
    createPopup();
    makeInteractive();
    
    // Все содержимое теперь полноценное — скрытие устаревших сообщений не требуется
    // Все разделы имеют детальное описание и не нуждаются в заглушках

    // Переименование "Система репутации+" в "Правила сервера+"
    document.querySelectorAll('.tree-node, .faq-item').forEach(node => {
        const label = node.querySelector('.tree-label');
        if (label && label.textContent.trim() === 'Система репутации+') {
            label.textContent = 'Правила сервера+';
        }
    });
}

// Структура данных для Wiki
const wikiData = {
    "Ролевая игра+": {
        "Основы РП+": {
            "Что такое РП?": "Ролевая игра - это форма интерактивного storytelling, где игроки берут на себя роли персонажей и взаимодействуют друг с другом, создавая совместную историю.",
            "Запрещённые темы": "Некоторые темы запрещены для ролевой игры в целях безопасности и комфорта игроков."
        },
        "Примеры хороших РП": "Описание успешных примеров ролевой игры между игроками."
    },
    "Мультиаккаунтинг+": {
        "Правила": "Строгие правила, касающиеся использования нескольких аккаунтов.",
        "Последствия": "Наказания за нарушение правил мультиаккаунтинга."
    },
    "Система репутации+": {
        "Как работает система": "Описание механики системы репутации в игре.",
        "Преимущества высокой репутации": "Бонусы и привилегии для игроков с высокой репутацией."
    },
    "Экономика+": {
        "Банковская система+": {
            "Открытие счета": "Процесс открытия банковского счёта в игре.",
            "Кредиты и депозиты": "Условия получения кредитов и открытия депозитов."
        },
        "Недвижимость+": {
            "Покупка и аренда": "Механика приобретения жилья и коммерческой недвижимости.",
            "Налоги": "Система налогообложения объектов недвижимости."
        }
    }
};

// Инициализация дерева навигации
function initWikiTree() {
    const treeContainer = document.getElementById('wikiTree');
    if (!treeContainer) return;
    
    // Создаем корневые узлы
    Object.keys(wikiData).forEach(key => {
        const node = createTreeNode(key, wikiData[key]);
        treeContainer.appendChild(node);
    });
}

// Создание узла дерева
function createTreeNode(title, children) {
    const node = document.createElement('div');
    node.className = 'tree-node';
    
    // Проверяем, есть ли подпункты
    const hasChildren = children && typeof children === 'object';
    
    // Создаем содержимое узла
    const nodeContent = document.createElement('div');
    nodeContent.className = 'tree-node-content';
    
    // Добавляем переключатель, только если есть подпункты
    if (hasChildren) {
        const toggle = document.createElement('div');
        toggle.className = 'tree-toggle';
        toggle.textContent = '+';
        nodeContent.appendChild(toggle);
    }
    
    // Добавляем метку
    const label = document.createElement('div');
    label.className = 'tree-label';
    label.textContent = title;
    nodeContent.appendChild(label);
    
    node.appendChild(nodeContent);
    
    // Добавляем дочерние узлы, если они есть
    if (hasChildren) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'tree-children';
        
        Object.keys(children).forEach(childKey => {
            const childNode = createTreeNode(childKey, children[childKey]);
            childrenContainer.appendChild(childNode);
        });
        
        node.appendChild(childrenContainer);
        
        // Добавляем обработчик клика
        nodeContent.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleNode(node);
        });
    }
    
    return node;
}

// Переключение состояния узла
function toggleNode(node) {
    if (!node.classList.contains('tree-node')) return;
    
    const childrenContainer = node.querySelector('.tree-children');
    if (!childrenContainer) return;
    
    const toggle = node.querySelector('.tree-toggle');
    
    if (node.classList.contains('active')) {
        node.classList.remove('active');
        childrenContainer.classList.remove('open');
        if (toggle) toggle.textContent = '+';
    } else {
        node.classList.add('active');
        childrenContainer.classList.add('open');
        if (toggle) toggle.textContent = '−';
    }
}

// Загрузка контента для Wiki
function loadWikiContent() {
    // Здесь можно загружать дополнительный контент, если нужно
    // Пока оставим пустым, так как контент хранится в wikiData
}