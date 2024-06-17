<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit592cf057cc504881c1cc974db07f279e
{
    public static $prefixLengthsPsr4 = array (
        'K' => 
        array (
            'Kirby\\' => 6,
        ),
        'J' => 
        array (
            'JohannSchopplich\\Licensing\\' => 27,
            'JohannSchopplich\\' => 17,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Kirby\\' => 
        array (
            0 => __DIR__ . '/..' . '/getkirby/composer-installer/src',
        ),
        'JohannSchopplich\\Licensing\\' => 
        array (
            0 => __DIR__ . '/..' . '/johannschopplich/kirby-tools-licensing/src',
        ),
        'JohannSchopplich\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src/classes',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'JohannSchopplich\\ContentTranslator\\DeepL' => __DIR__ . '/../..' . '/src/classes/ContentTranslator/DeepL.php',
        'JohannSchopplich\\ContentTranslator\\Translator' => __DIR__ . '/../..' . '/src/classes/ContentTranslator/Translator.php',
        'JohannSchopplich\\Licensing\\Licenses' => __DIR__ . '/..' . '/johannschopplich/kirby-tools-licensing/src/Licenses.php',
        'Kirby\\ComposerInstaller\\CmsInstaller' => __DIR__ . '/..' . '/getkirby/composer-installer/src/ComposerInstaller/CmsInstaller.php',
        'Kirby\\ComposerInstaller\\Installer' => __DIR__ . '/..' . '/getkirby/composer-installer/src/ComposerInstaller/Installer.php',
        'Kirby\\ComposerInstaller\\Plugin' => __DIR__ . '/..' . '/getkirby/composer-installer/src/ComposerInstaller/Plugin.php',
        'Kirby\\ComposerInstaller\\PluginInstaller' => __DIR__ . '/..' . '/getkirby/composer-installer/src/ComposerInstaller/PluginInstaller.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit592cf057cc504881c1cc974db07f279e::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit592cf057cc504881c1cc974db07f279e::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit592cf057cc504881c1cc974db07f279e::$classMap;

        }, null, ClassLoader::class);
    }
}
