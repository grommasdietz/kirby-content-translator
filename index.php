<?php

use Kirby\Cms\App as Kirby;
use Kirby\Cms\File;
use Kirby\Cms\Page;
use Kirby\Cms\Site;

@include_once __DIR__ . '/vendor/autoload.php';

Kirby::plugin('johannschopplich/content-translator', [
    'api' => require __DIR__ . '/src/extensions/api.php',
    'sections' => require __DIR__ . '/src/extensions/sections.php',
    'translations' => require __DIR__ . '/src/extensions/translations.php',
    'siteMethods' => [
        'translator' => function (array $options = []) {
            return new \JohannSchopplich\ContentTranslator\Translator($this, $options);
        }
    ],
    'pageMethods' => [
        'translator' => function (array $options = []) {
            return new \JohannSchopplich\ContentTranslator\Translator($this, $options);
        }
    ],
    'fileMethods' => [
        'translator' => function (array $options = []) {
            return new \JohannSchopplich\ContentTranslator\Translator($this, $options);
        }
    ]
]);

if (!function_exists('translator')) {
    function translator(Site|Page|File $model, array $options = []): \JohannSchopplich\ContentTranslator\Translator
    {
        return new \JohannSchopplich\ContentTranslator\Translator($model, $options);
    }
}

if (!function_exists('translate')) {
    function translate(string $text, string $targetLanguage, string|null $sourceLanguage = null): string
    {
        return \JohannSchopplich\ContentTranslator\Translator::translateText($text, $targetLanguage, $sourceLanguage);
    }
}
