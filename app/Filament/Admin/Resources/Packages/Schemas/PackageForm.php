<?php

namespace App\Filament\Admin\Resources\Packages\Schemas;

use Filament\Forms;
use Filament\Forms\Components\Repeater;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class PackageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Package Management')
                    ->tabs([
                        Tab::make('Package Details')
                            ->icon('heroicon-m-document-text')
                            ->schema([
                                Section::make('Basic Information')
                                    ->description('Enter the basic package details')
                                    ->icon('heroicon-m-information-circle')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\Select::make('service_id')
                                                    ->label('Service')
                                                    ->relationship('service', 'title')
                                                    ->searchable()
                                                    ->preload()
                                                    ->required()
                                                    ->createOptionForm([
                                                        Forms\Components\TextInput::make('title')
                                                            ->required()
                                                            ->maxLength(255)
                                                            ->live(onBlur: true)
                                                            ->afterStateUpdated(fn ($state, callable $set) => 
                                                                $set('slug', str()->slug($state))
                                                            ),
                                                        Forms\Components\TextInput::make('slug')
                                                            ->required()
                                                            ->unique('services', 'slug'),
                                                        Forms\Components\Textarea::make('short_description')
                                                            ->rows(2)
                                                            ->maxLength(500),
                                                        Forms\Components\Toggle::make('status')
                                                            ->default('active')
                                                            ->inline(false),
                                                    ])
                                                    ->placeholder('Select a service'),
                                                    
                                                Forms\Components\TextInput::make('name')
                                                    ->label('Package Name')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->placeholder('Enter package name')
                                                    ->helperText('The display name of the package')
                                                    ->live(onBlur: true)
                                                    ->afterStateUpdated(fn ($state, callable $set) => 
                                                        $set('slug', str()->slug($state))
                                                    ),
                                            ]),
                                            
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\TextInput::make('slug')
                                                    ->label('Slug')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->unique(ignoreRecord: true)
                                                    ->placeholder('auto-generated-from-name')
                                                    ->helperText('URL-friendly name (auto-generated from name)')
                                                    ->readOnly()
                                                    ->dehydrated(true),
                                            ]),
                                    ]),
                                    
                                Section::make('Pricing & Duration')
                                    ->description('Set package pricing and duration')
                                    ->icon('heroicon-m-currency-dollar')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\TextInput::make('price')
                                                    ->label('Price')
                                                    ->required()
                                                    ->numeric()
                                                    ->prefix('Rp')
                                                    ->minValue(0)
                                                    ->step(1000)
                                                    ->helperText('Package price in Rupiah')
                                                    ->mask('999.999.999')
                                                    ->formatStateUsing(fn ($state) => $state ? number_format($state, 0, ',', '.') : ''),
                                                    
                                                Forms\Components\TextInput::make('duration')
                                                    ->label('Duration (days)')
                                                    ->numeric()
                                                    ->minValue(1)
                                                    ->maxValue(365)
                                                    ->step(1)
                                                    ->suffix('days')
                                                    ->placeholder('e.g., 30')
                                                    ->helperText('Number of days for package completion'),
                                            ]),
                                    ]),
                                    
                                Section::make('Display Settings')
                                    ->description('Control how the package appears')
                                    ->icon('heroicon-m-eye')
                                    ->schema([
                                        Grid::make(3)
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
                                                    ->helperText('Set package visibility'),
                                                    
                                                Forms\Components\Toggle::make('is_popular')
                                                    ->label('Popular Package')
                                                    ->inline(false)
                                                    ->helperText('Mark as popular (shows with special badge)')
                                                    ->default(false),
                                                    
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
                                Section::make('Package Description')
                                    ->description('Detailed information about the package')
                                    ->icon('heroicon-m-document-check')
                                    ->schema([
                                        Forms\Components\Textarea::make('short_description')
                                            ->label('Short Description')
                                            ->rows(3)
                                            ->columnSpanFull()
                                            ->placeholder('Brief summary of the package...')
                                            ->helperText('Appears in package listings and cards')
                                            ->maxLength(500),
                                            
                                        Forms\Components\Textarea::make('description')
                                            ->label('Full Description')
                                            ->rows(6)
                                            ->columnSpanFull()
                                            ->placeholder('Detailed description of the package...')
                                            ->helperText('Complete package details')
                                            ->maxLength(5000),
                                    ]),
                            ]),
                            
                        Tab::make('Features')
                            ->icon('heroicon-m-list-bullet')
                            ->schema([
                                Section::make('Package Features')
                                    ->description('List all features included in this package')
                                    ->icon('heroicon-m-check-circle')
                                    ->schema([
                                        // Gunakan SimpleRepeater untuk array of strings (sesuai seeder)
                                        Repeater::make('features')
                                            ->label('Features')
                                            ->simple(
                                                Forms\Components\TextInput::make('feature')
                                                    ->label('Feature')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., 24/7 Support')
                                            )
                                            ->defaultItems(0)
                                            ->addActionLabel('Add Feature')
                                            ->collapsible()
                                            ->cloneable()
                                            ->reorderable()
                                            ->reorderableWithButtons()
                                            ->grid(1)
                                            ->columnSpanFull(),
                                            
                                        Forms\Components\Placeholder::make('features_note')
                                            ->label('')
                                            ->content('Features will be displayed as a bullet list in the frontend.')
                                            ->extraAttributes(['class' => 'text-sm text-gray-500 dark:text-gray-400']),
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
                                                    ->helperText('SEO title (leave empty to use package name)')
                                                    ->maxLength(60),
                                                    
                                                Forms\Components\Textarea::make('meta_description')
                                                    ->label('Meta Description')
                                                    ->rows(2)
                                                    ->placeholder('Enter meta description')
                                                    ->helperText('SEO description (max 160 characters)')
                                                    ->maxLength(160),
                                            ]),
                                    ])
                                    ->visible(fn ($livewire) => $livewire instanceof EditRecord),
                            ]),
                    ])
                    ->columnSpanFull()
                    ->persistTabInQueryString(),
            ]);
    }
}