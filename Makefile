PROJECT_NAME=any-spa
TAG=local-any-spa
APP_URL=any-spa.com
APP_URL_HTTPS:="https://${APP_URL}"

include .env

CURRENT_UID := $(shell id -u)
CURRENT_GID := $(shell id -g)

SHORT_COMPOSE := && cd build/docker && docker-compose -f docker-compose.yml -f docker-compose.dev.yml
VARIABLES:= export CURRENT_UID=$(CURRENT_UID) APP_URL=$(APP_URL) APP_URL_HTTPS=$(APP_URL_HTTPS) CURRENT_GID=$(CURRENT_GID) COMPOSE_PROJECT_NAME=$(PROJECT_NAME) TAG=$(TAG)
COMPOSE:=$(VARIABLES) $(SHORT_COMPOSE)

# Шаг 1 (MacOS). Установка ssl сертификата и поднятие всего, что нужно
init-mac: ssl-cert-macos init

# Шаг 1. При первом запуске соберем все что можно
init: up-all m seed

# Шаг 2. Запуск для локальной разработки. Если запустили init, то уже не надо ничего делать
up-all: build-app up ps

up-rebuild: down
	$(COMPOSE) up -d --build

# Собирает образ
build-app:
	$(COMPOSE) build

# Поднимает запускаем обновление js и php зависимостей и запускаем контейнер с nginx (подтянуться php/postgresql/redis)
up: up-composer install-js up-nginx

# Выключение всех контейнеров
down:
	$(COMPOSE) down

# Выключение всех контейнеров
down-v:
	$(COMPOSE) down --volumes

up-composer:
	$(COMPOSE) run --rm composer

up-nginx:
	$(COMPOSE) up -d nginx

# Установка js зависимостей
install-js:
	$(COMPOSE) run --rm node

# Смотрим все запущенные контейнеры в docker-compose
ps:
	$(COMPOSE) ps

# Входим в редис и смотрим его
redis:
	docker exec -it "redis-${PROJECT_NAME}" sh -c "redis-cli"

# Вход в контейнер с php
php:
	$(COMPOSE) run --rm -u $(CURRENT_UID) --entrypoint bash php

# Вход в контейнер с php
db:
	$(COMPOSE) run --rm -u $(CURRENT_UID) --entrypoint bash postgresql

# Логи php
l-php:
	$(COMPOSE) logs --follow php

# Логи nginx
l-nginx:
	$(COMPOSE) logs --follow nginx

# Логи nginx
l-db:
	$(COMPOSE) logs --follow postgresql

# Подготавливает файлы и проверяет их на ошибки линтером
prepare:
	make larastan
	make fix-ide-helper
	make fix-cs

# Запускает проверку на ошибки
larastan:
	$(COMPOSE) run --rm -u $(CURRENT_UID) --entrypoint bash composer -c "php /var/www/vendor/bin/phpstan analyse --memory-limit 500M"

# Делает форматирование кода
fix-cs:
	$(COMPOSE) run --rm -u $(CURRENT_UID) --entrypoint bash composer -c "/var/www/vendor/bin/php-cs-fixer fix --verbose --config=.php_cs.laravel.php"

# Добавляет/обновляет файл для работы с Laravel в IDE
fix-ide-helper:
	$(COMPOSE) run --rm -u $(CURRENT_UID) --entrypoint bash php -c "php artisan ide-helper:generate && php artisan ide-helper:meta && php artisan ide-helper:models -W"

# Применение миграции
m:
	$(COMPOSE) run --rm -u $(CURRENT_UID) --entrypoint bash php -c "php artisan migrate"

# Сброс миграций на одну итерацию назад
m_down:
	$(COMPOSE) run --rm -u $(CURRENT_UID) --entrypoint bash php -c "php artisan migrate:rollback"

# Удаляет все таблицы и запускает миграции заново
m_reset:
	$(COMPOSE) run --rm -u $(CURRENT_UID) --entrypoint bash php -c "php artisan migrate:fresh"
	make seed

m_create_table:
	$(COMPOSE) run --rm -u $(CURRENT_UID) --entrypoint bash php -c "php artisan make:migration create_${name}_table"

seed:
	$(COMPOSE) run --rm -u $(CURRENT_UID) --entrypoint bash php -c "php artisan db:seed -vvv"

# запуск сборки reactjs
vite-dev:
	# $(COMPOSE) run --rm -u $(CURRENT_UID) --entrypoint npm node run dev
	# npm i # если ошибку выдает, то юзаем это
	npm i
	npm run dev

# запуск сборки reactjs
vite-prod:
	npm run build

# Скачивание и добавление сертификата с ssl доступом
ssl-cert-macos:
	brew install mkcert && \
	 mkcert -install && \
	 mkcert -key-file key.pem -cert-file cert.pem $(APP_URL)
