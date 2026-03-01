<?php

namespace App\Filament\Admin\Resources\Services\Schemas;

use Filament\Forms;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Service Management')
                    ->tabs([
                        Tab::make('Service Details')
                            ->icon('heroicon-m-document-text')
                            ->schema([
                                Section::make('Basic Information')
                                    ->description('Enter the basic service details')
                                    ->icon('heroicon-m-information-circle')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\TextInput::make('title')
                                                    ->label('Title')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->placeholder('Enter service title')
                                                    ->helperText('The display name of the service')
                                                    ->live(onBlur: true)
                                                    ->afterStateUpdated(fn ($state, callable $set) => 
                                                        $set('slug', str()->slug($state))
                                                    ),
                                                    
                                                Forms\Components\TextInput::make('slug')
                                                    ->label('Slug')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->unique(ignoreRecord: true)
                                                    ->placeholder('auto-generated-from-title')
                                                    ->helperText('URL-friendly name (auto-generated from title)')
                                                    ->readOnly()
                                                    ->dehydrated(true),
                                            ]),
                                            
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\Select::make('icon')
                                                    ->label('Icon')
                                                    ->options([
                                                        // Font Awesome Icons (Sesuai Seeder)
                                                        'Font Awesome' => [
                                                            'fas fa-building' => '🏢 Building',
                                                            'fas fa-shopping-cart' => '🛒 Shopping Cart',
                                                            'fas fa-laptop-code' => '💻 Laptop Code',
                                                            'fas fa-mobile-alt' => '📱 Mobile Alt',
                                                            'fas fa-paint-brush' => '🎨 Paint Brush',
                                                            'fas fa-tools' => '🔧 Tools',
                                                            'fas fa-globe' => '🌐 Globe',
                                                            'fas fa-chart-line' => '📈 Chart Line',
                                                            'fas fa-cogs' => '⚙️ Cogs',
                                                            'fas fa-database' => '🗄️ Database',
                                                            'fas fa-cloud' => '☁️ Cloud',
                                                            'fas fa-shield-alt' => '🛡️ Shield',
                                                            'fas fa-rocket' => '🚀 Rocket',
                                                            'fas fa-star' => '⭐ Star',
                                                            'fas fa-heart' => '❤️ Heart',
                                                            'fas fa-users' => '👥 Users',
                                                            'fas fa-user-tie' => '👔 User Tie',
                                                            'fas fa-clock' => '⏰ Clock',
                                                            'fas fa-phone' => '📞 Phone',
                                                            'fas fa-envelope' => '📧 Envelope',
                                                            'fas fa-map-marker-alt' => '📍 Map Marker',
                                                            'fas fa-file-alt' => '📄 File',
                                                            'fas fa-image' => '🖼️ Image',
                                                            'fas fa-video' => '🎥 Video',
                                                            'fas fa-camera' => '📷 Camera',
                                                            'fas fa-search' => '🔍 Search',
                                                            'fas fa-chart-pie' => '🥧 Chart Pie',
                                                            'fas fa-chart-bar' => '📊 Chart Bar',
                                                            'fas fa-wallet' => '👛 Wallet',
                                                            'fas fa-credit-card' => '💳 Credit Card',
                                                            'fas fa-money-bill' => '💰 Money Bill',
                                                            'fas fa-truck' => '🚚 Truck',
                                                            'fas fa-box' => '📦 Box',
                                                            'fas fa-tag' => '🏷️ Tag',
                                                            'fas fa-percent' => '💯 Percent',
                                                            'fas fa-bolt' => '⚡ Bolt',
                                                            'fas fa-fire' => '🔥 Fire',
                                                            'fas fa-bell' => '🔔 Bell',
                                                            'fas fa-calendar' => '📅 Calendar',
                                                            'fas fa-paper-plane' => '✈️ Paper Plane',
                                                            'fas fa-thumbs-up' => '👍 Thumbs Up',
                                                            'fas fa-thumbs-down' => '👎 Thumbs Down',
                                                            'fas fa-check-circle' => '✅ Check Circle',
                                                            'fas fa-times-circle' => '❌ Times Circle',
                                                            'fas fa-exclamation-circle' => '⚠️ Exclamation Circle',
                                                            'fas fa-info-circle' => 'ℹ️ Info Circle',
                                                            'fas fa-question-circle' => '❓ Question Circle',
                                                        ],
                                                        
                                                        // Heroicons
                                                        'Heroicons' => [
                                                            'BuildingOfficeIcon' => '🏢 Building Office',
                                                            'ShoppingCartIcon' => '🛒 Shopping Cart',
                                                            'CodeBracketIcon' => '💻 Code Bracket',
                                                            'DevicePhoneMobileIcon' => '📱 Device Mobile',
                                                            'PaintBrushIcon' => '🎨 Paint Brush',
                                                            'WrenchScrewdriverIcon' => '🔧 Wrench',
                                                            'CpuChipIcon' => '⚡ CPU Chip',
                                                            'ServerIcon' => '🖥️ Server',
                                                            'GlobeAltIcon' => '🌐 Globe Alt',
                                                            'ChartBarSquareIcon' => '📊 Chart Bar',
                                                            'MagnifyingGlassIcon' => '🔍 Magnifying Glass',
                                                            'ShieldCheckIcon' => '🛡️ Shield Check',
                                                            'LockClosedIcon' => '🔒 Lock Closed',
                                                            'RocketLaunchIcon' => '🚀 Rocket Launch',
                                                            'SparklesIcon' => '✨ Sparkles',
                                                            'BoltIcon' => '⚡ Bolt',
                                                            'UsersIcon' => '👥 Users',
                                                            'TrophyIcon' => '🏆 Trophy',
                                                            'ClockIcon' => '⏰ Clock',
                                                            'CurrencyDollarIcon' => '💰 Dollar',
                                                            'ChatBubbleLeftRightIcon' => '💬 Chat',
                                                            'PhoneIcon' => '📞 Phone',
                                                            'BriefcaseIcon' => '💼 Briefcase',
                                                            'UserCircleIcon' => '👤 User Circle',
                                                            'EnvelopeIcon' => '📧 Envelope',
                                                            'MapPinIcon' => '📍 Map Pin',
                                                            'DocumentTextIcon' => '📄 Document',
                                                            'StarIcon' => '⭐ Star',
                                                        ],
                                                        
                                                        // React Icons
                                                        'React Icons' => [
                                                            'SiLaravel' => '🔥 Laravel',
                                                            'SiReact' => '⚛️ React',
                                                            'SiTailwindcss' => '🎨 Tailwind CSS',
                                                            'SiInertia' => '⚡ Inertia',
                                                            'SiVuedotjs' => '🟢 Vue.js',
                                                            'SiMysql' => '🐬 MySQL',
                                                            'SiPostgresql' => '🐘 PostgreSQL',
                                                            'SiDocker' => '🐳 Docker',
                                                            'SiAmazonwebservices' => '☁️ AWS',
                                                            'SiPhp' => '🐘 PHP',
                                                            'SiJavascript' => '📜 JavaScript',
                                                            'SiTypescript' => '🔷 TypeScript',
                                                            'SiHtml5' => '🌐 HTML5',
                                                            'SiCss3' => '🎨 CSS3',
                                                            'SiNodejs' => '🟢 Node.js',
                                                            'SiPython' => '🐍 Python',
                                                            'SiJava' => '☕ Java',
                                                            'SiKotlin' => '📱 Kotlin',
                                                            'SiSwift' => '🐦 Swift',
                                                            'SiFlutter' => '🦋 Flutter',
                                                            'SiAndroid' => '🤖 Android',
                                                            'SiApple' => '🍎 Apple',
                                                            'SiWindows' => '🪟 Windows',
                                                            'SiLinux' => '🐧 Linux',
                                                            'SiGithub' => '🐙 GitHub',
                                                            'SiGitlab' => '🦊 GitLab',
                                                            'SiJira' => '📊 Jira',
                                                            'SiTrello' => '📋 Trello',
                                                            'SiSlack' => '💬 Slack',
                                                            'SiDiscord' => '💬 Discord',
                                                            'SiFigma' => '🎨 Figma',
                                                            'SiAdobe' => '🎭 Adobe',
                                                            'SiCanva' => '🎨 Canva',
                                                        ],
                                                    ])
                                                    ->searchable()
                                                    ->placeholder('Select an icon')
                                                    ->helperText('Icon untuk ditampilkan di frontend (mendukung Font Awesome, Heroicons, dan React Icons)')
                                                    ->columnSpanFull()
                                                    ->native(false)
                                                    ->default('fas fa-building'),
                                            ]),
                                            
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\Select::make('status')
                                                    ->label('Status')
                                                    ->options([
                                                        'active' => 'Active',
                                                        'inactive' => 'Inactive',
                                                    ])
                                                    ->default('active')
                                                    ->required()
                                                    ->native(false)
                                                    ->helperText('Set service visibility'),
                                                    
                                                Forms\Components\Toggle::make('is_featured')
                                                    ->label('Featured Service')
                                                    ->inline(false)
                                                    ->helperText('Show this service in featured sections')
                                                    ->default(true), // Sesuai seeder
                                            ]),
                                            
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\TextInput::make('sort_order')
                                                    ->label('Sort Order')
                                                    ->required()
                                                    ->numeric()
                                                    ->default(0)
                                                    ->minValue(0)
                                                    ->step(1)
                                                    ->helperText('Order of display (lower numbers appear first)'),
                                            ]),
                                    ]),
                            ]),
                            
                        Tab::make('Description')
                            ->icon('heroicon-m-document-text')
                            ->schema([
                                Section::make('Service Description')
                                    ->description('Detailed information about the service')
                                    ->icon('heroicon-m-document-check')
                                    ->schema([
                                        Forms\Components\Textarea::make('short_description')
                                            ->label('Short Description')
                                            ->rows(3)
                                            ->columnSpanFull()
                                            ->placeholder('Brief summary of the service...')
                                            ->helperText('Appears in service listings and cards')
                                            ->maxLength(500)
                                            ->required(), // Sesuai seeder
                                            
                                        Forms\Components\Textarea::make('description')
                                            ->label('Full Description')
                                            ->required()
                                            ->rows(8)
                                            ->columnSpanFull()
                                            ->placeholder('Detailed description of the service...')
                                            ->helperText('Complete service details for the service page')
                                            ->maxLength(5000),
                                    ]),
                            ]),
                            
                        Tab::make('Additional Info')
                            ->icon('heroicon-m-paper-clip')
                            ->schema([
                                Section::make('System Information')
                                    ->description('Auto-generated system data')
                                    ->icon('heroicon-m-cpu-chip')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\Placeholder::make('created_at')
                                                    ->label('Created At')
                                                    ->content(fn ($record): string => $record?->created_at?->format('d M Y H:i') ?? '-'),
                                                    
                                                Forms\Components\Placeholder::make('updated_at')
                                                    ->label('Last Updated')
                                                    ->content(fn ($record): string => $record?->updated_at?->format('d M Y H:i') ?? '-'),
                                            ]),
                                            
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\Placeholder::make('packages_count')
                                                    ->label('Total Packages')
                                                    ->content(fn ($record): string => $record?->packages()->count() ?? '0')
                                                    ->visibleOn('edit'),
                                            ]),
                                    ])
                                    ->visibleOn('edit'),
                                    
                                Section::make('SEO Information')
                                    ->description('Search engine optimization settings')
                                    ->icon('heroicon-m-globe-alt')
                                    ->schema([
                                        Grid::make(1)
                                            ->schema([
                                                Forms\Components\TextInput::make('meta_title')
                                                    ->label('Meta Title')
                                                    ->placeholder('Enter meta title')
                                                    ->helperText('SEO title (leave empty to use service title)')
                                                    ->maxLength(60),
                                                    
                                                Forms\Components\Textarea::make('meta_description')
                                                    ->label('Meta Description')
                                                    ->rows(3)
                                                    ->placeholder('Enter meta description')
                                                    ->helperText('SEO description (max 160 characters)')
                                                    ->maxLength(160),
                                            ]),
                                    ])
                                    ->visible(fn ($livewire) => $livewire instanceof EditRecord)
                                    ->collapsible()
                                    ->collapsed(),
                            ]),
                    ])
                    ->columnSpanFull()
                    ->persistTabInQueryString(),
            ]);
    }
}