<?php

declare(strict_types=1);

namespace App\Console\Commands\System;

use App\Console\Commands\CommandsLogAbstract;
use App\Enums\Common\Locale;
use App\Exceptions\Entity\CustomException;
use App\Models\News\News;
use App\Repositories\News\NewsRepository;
use SimpleXMLElement;

class GenerateSiteMap extends CommandsLogAbstract
{
    public const NAME = 'system__generate_site_map';

    protected $signature = self::NAME;

    protected $description = 'Генерируем сайтмапы со всех разделов';

    private const SITEMAP_COMMON = 'sitemap_common.xml';
    private const SITEMAP_NEWS = 'sitemap_news.xml';

    public function handle()
    {
        return $this->logMiddleware(function (): bool {
            $host = rtrim(env('APP_URL'), '/');

            if (!$this->saveCommonSiteMap($host)) {
                throw new CustomException('sitemap with news has error');
            }

            if (!$this->saveSiteMapNews($host)) {
                throw new CustomException('sitemap with news has error');
            }

            if (!$this->saveMainSiteMap($host)) {
                throw new CustomException('sitemap with main has error');
            }

            return true;
        });
    }

    /**
     * Генерим мапу с основными URL сайта.
     * @param string $host
     * @return bool
     */
    private function saveCommonSiteMap(string $host): bool
    {
        $xml = $this->createXmlClass();

        $urls = ['administrator', 'login', 'register', 'password/reset', 'support-tech', 'privacy', 'cookie', 'term-of-use-private-policy'];

        $now = now()->format('c');
        // Основные страницы анонима
        foreach (Locale::cases() as $locale) {
            $url = "{$host}/{$locale->value}";
            $this->addLine($xml, $url, $now, '1', 'daily');

            foreach ($urls as $pathURL) {
                $url = "{$host}/{$locale->value}/{$pathURL}";
                $this->addLine($xml, $url, $now, '1', 'daily');
            }
        }

        return $this->saveAsXML($xml, self::SITEMAP_COMMON);
    }

    /**
     * Генерим мапу новостей.
     * @param string $host
     * @return bool
     */
    private function saveSiteMapNews(string $host): bool
    {
        $now = now()->format('c');
        $xml = $this->createXmlClass();

        // Основная страница новостей
        foreach (Locale::cases() as $locale) {
            $url = "{$host}/{$locale->value}/news";
            $this->addLine($xml, $url, $now, '1', 'daily');
        }

        $news = app(NewsRepository::class)->findForSiteMap();
        if ($news->isEmpty()) {
            return $this->saveAsXML($xml, self::SITEMAP_NEWS);
        }

        // Список все страниц с постраничной навигацией
        foreach (Locale::cases() as $locale) {
            // @phpstan-ignore-next-line
            $newsLocale = $news->filter(fn (News $oneNews) => $oneNews->locale === $locale);
            $pages = (int)ceil($newsLocale->count() / NewsRepository::PER_PAGE);

            for ($i = 1; $i <= $pages; $i++) {
                $url = "{$host}/{$locale->value}/news?page={$i}";
                $this->addLine($xml, $url, $now, '1', 'daily');
            }
        }

        // Каждая новость по отдельности
        /** @var News $item */
        foreach ($news as $item) {
            $url = "{$host}/{$item->locale->value}/news/{$item->id}/{$item->slug}";
            $this->addLine($xml, $url, $item->updated_at->format('c'));
        }

        return $this->saveAsXML($xml, self::SITEMAP_NEWS);
    }

    private function createXmlClass(): SimpleXMLElement
    {
        return new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
    }

    private function saveAsXML(SimpleXMLElement $xml, string $name): bool
    {
        $res = $xml->asXML('public/'.$name);
        if (is_bool($res) && $res) {
            return true;
        }

        return false;
    }

    /**
     * Генерим основную карту с остальными картами.
     * @param string $host
     * @return bool
     */
    private function saveMainSiteMap(string $host): bool
    {
        $xml = $this->createXmlClass();

        $now = now()->format('c');
        $maps = [self::SITEMAP_COMMON, self::SITEMAP_NEWS];
        foreach ($maps as $map) {
            $url = "{$host}/{$map}";
            $this->addLine($xml, $url, $now, '1', 'daily');
        }

        return $this->saveAsXML($xml, 'sitemap.xml');
    }

    private function addLine(SimpleXMLElement $xml, string $url, string $lastmod, string $priority = '0.5', string $changeFreq = 'weekly'): void
    {
        $urlElement = $xml->addChild('url');
        $urlElement->addChild('loc', $url);
        $urlElement->addChild('lastmod', $lastmod);
        $urlElement->addChild('changefreq', $changeFreq);
        $urlElement->addChild('priority', $priority);
    }
}
