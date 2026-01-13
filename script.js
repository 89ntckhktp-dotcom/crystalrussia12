document.addEventListener('DOMContentLoaded', function() {
    // Создание анимированного фона с кристаллами
    const bgAnimation = document.getElementById('bgAnimation');
    if (bgAnimation) {
        // Уменьшаем количество кристаллов для лучшей производительности на мобильных
        const maxCrystals = window.innerWidth <= 768 ? 15 : 40;
        for (let i = 0; i < maxCrystals; i++) {
            const crystal = document.createElement('div');
            crystal.classList.add('crystal');
            crystal.style.left = `${Math.random() * 100}%`;
            crystal.style.animationDelay = `${Math.random() * 8}s`;
            crystal.style.width = `${Math.random() * 4 + 2}px`;
            crystal.style.height = crystal.style.width;
            crystal.style.opacity = Math.random() * 0.8 + 0.2;
            // Добавляем вариативность в цвет
            crystal.style.boxShadow = `0 0 10px ${(Math.random() > 0.5) ? 'rgba(232, 67, 147, 0.7)' : 'rgba(253, 121, 168, 0.7)'}`;
            bgAnimation.appendChild(crystal);
        }
    }
    
    // Мобильное меню
    const menuBtn = document.getElementById('menuBtn');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-links a');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav a');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Обновление активного пункта меню для мобильного меню
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            // Обновление активного пункта меню
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            
            // Также обновляем десктопное меню
            desktopNavLinks.forEach(item => item.classList.remove('active'));
            const href = link.getAttribute('href');
            const correspondingDesktopLink = document.querySelector(`.desktop-nav a[href="${href}"]`);
            if (correspondingDesktopLink) {
                correspondingDesktopLink.classList.add('active');
            }
        });
    });
    
    // Обновление активного пункта для десктопного меню
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Обновление активного пункта меню
            desktopNavLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            
            // Также обновляем мобильное меню
            navLinks.forEach(item => item.classList.remove('active'));
            const href = link.getAttribute('href');
            const correspondingMobileLink = document.querySelector(`.nav-links a[href="${href}"]`);
            if (correspondingMobileLink) {
                correspondingMobileLink.classList.add('active');
            }
        });
    });
    
    // Функция для установки активной вкладки при загрузке страницы
    function setActiveTab() {
        const currentPath = window.location.pathname.split('/').pop();
        
        // Обновляем мобильное меню
        navLinks.forEach(item => item.classList.remove('active'));
        const mobileLink = document.querySelector(`.nav-links a[href="${currentPath}"]`);
        if (mobileLink) {
            mobileLink.classList.add('active');
        }
        
        // Обновляем десктопное меню
        desktopNavLinks.forEach(item => item.classList.remove('active'));
        const desktopLink = document.querySelector(`.desktop-nav a[href="${currentPath}"]`);
        if (desktopLink) {
            desktopLink.classList.add('active');
        }
    }
    
    // Вызываем функцию при загрузке страницы
    setActiveTab();
    
    // Слайдер галереи
    const slides = document.getElementById('slides');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        if (!slides || dots.length === 0) return;
        
        if (index < 0) index = dots.length - 1;
        if (index >= dots.length) index = 0;
        
        slides.style.transform = `translateX(-${index * 100}%)`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    if (dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                showSlide(slideIndex);
            });
        });
        
        // Автоматическое переключение слайдов
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }
    
    // Анимация при скролле
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkAnimation() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Проверка при загрузке и скролле
    checkAnimation();
    window.addEventListener('scroll', checkAnimation);
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Если ссылка ведет на якорь на этой же странице
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Имитация нажатия кнопок
    const buttons = document.querySelectorAll('.btn, .feature-card, .stat-item, .social-card, .download-card, .step-card, .contact-card, .preview-card, .faq-item');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Сохраняем оригинальное состояние
            const originalTransform = this.style.transform;
            const originalTransition = this.style.transition;
            
            // Анимация нажатия
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.15s ease';
            
            // Возвращаем обратно
            setTimeout(() => {
                this.style.transform = originalTransform;
                this.style.transition = originalTransition;
            }, 150);
        });
    });
    
    // Динамическое изменение шапки при скролле
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.padding = '10px 20px';
                header.style.backgroundColor = 'rgba(10, 10, 26, 0.95)';
            } else {
                header.style.padding = '15px 20px';
                header.style.backgroundColor = 'rgba(10, 10, 26, 0.9)';
            }
        }
    });
    
    // Восстановление текста и анимации при возвращении на страницу
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            // Принудительная перерисовка через изменение opacity
            document.body.style.opacity = '0.99';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
                
                // Перезапуск анимаций кристаллов
                const crystals = document.querySelectorAll('.crystal');
                crystals.forEach(crystal => {
                    const animation = crystal.style.animation;
                    crystal.style.animation = 'none';
                    
                    requestAnimationFrame(() => {
                        crystal.style.animation = animation;
                    });
                });
                
                // Перезапуск слайдера
                if (typeof showSlide !== 'undefined' && typeof currentSlide !== 'undefined') {
                    showSlide(currentSlide);
                }
                
                // Обновление скролл-анимаций
                checkAnimation();
            }, 100);
        }
    });
    
    // Обработка карточек социальных сетей
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        if (card.classList.contains('development')) {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Этот раздел находится в разработке. Следите за новостями в наших социальных сетях!');
            });
        }
    });
    
    // Кнопка скачивания APK
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Анимация нажатия
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Скачивание...';
            this.style.opacity = '0.7';
            
            // Имитация скачивания
            setTimeout(() => {
                alert('Начинается скачивание CRYSTAL RUSSIA для Android. Если скачивание не началось, проверьте настройки вашего устройства.');
                
                // Создаем временную ссылку для скачивания
                const link = document.createElement('a');
                link.href = 'download/crystal-russia.apk';
                link.download = 'crystal-russia.apk';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Возвращаем кнопку в исходное состояние
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.opacity = '1';
                }, 500);
            }, 1500);
        });
    }
    
    // Обработка формы вопроса в FAQ
    const submitBtn = document.getElementById('submitQuestion');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const category = document.getElementById('questionCategory');
            const question = document.getElementById('questionText');
            const email = document.getElementById('questionEmail');
            
            if (!category || !question || !email) return;
            
            if (!category.value || !question.value || !email.value) {
                alert('Пожалуйста, заполните все поля формы');
                return;
            }
            
            if (!email.value.includes('@') || !email.value.includes('.')) {
                alert('Пожалуйста, введите корректный email адрес');
                return;
            }
            
            // Показываем анимацию отправки
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            this.disabled = true;
            
            // Имитация отправки
            setTimeout(() => {
                alert('Ваш вопрос успешно отправлен! Ответ придет на указанный email в течение 1-3 рабочих дней.\n\nДля более быстрого ответа рекомендуем также задать вопрос в наших социальных сетях.');
                
                // Сбрасываем форму
                if (category) category.value = '';
                if (question) question.value = '';
                if (email) email.value = '';
                
                // Возвращаем кнопку в исходное состояние
                this.innerHTML = originalHTML;
                this.disabled = false;
            }, 1500);
        });
    }
    
    // Таймер редиректа для форума
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        let countdown = 5;
        let countdownInterval;
        
        function startCountdown() {
            countdownInterval = setInterval(function() {
                countdown--;
                countdownElement.textContent = countdown;
                
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    window.open('https://forum.crystal-game.ru/index.php', '_blank');
                }
            }, 1000);
        }
        
        // Запускаем обратный отсчет
        startCountdown();
        
        // Обработка кнопки
        const forumLink = document.getElementById('forumLink');
        if (forumLink) {
            forumLink.addEventListener('click', function() {
                clearInterval(countdownInterval);
                countdownElement.textContent = '0';
            });
            
            // Остановка отсчета при наведении
            forumLink.addEventListener('mouseenter', function() {
                clearInterval(countdownInterval);
            });
            
            forumLink.addEventListener('mouseleave', function() {
                startCountdown();
            });
        }
    }
});

// Функция для доступа к админке через консоль
window.adminAccess = function(code) {
    if (code === 'crystal-admin-2026') {
        // Устанавливаем флаг доступа в localStorage
        localStorage.setItem('adminAccessGranted', 'true');
        // Перенаправляем на страницу админки
        window.location.href = 'admin/index.html';
    } else {
        alert('Неверный код доступа. Доступ к админке запрещен.');
    }
};