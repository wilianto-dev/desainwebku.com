<?php

namespace App\Filament\Admin\Resources\Portfolios\Schemas;

use Filament\Forms;
use Filament\Forms\Components\Repeater;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class PortfolioForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Portfolio Management')
                    ->tabs([
                        Tab::make('Portfolio Details')
                            ->icon('heroicon-m-document-text')
                            ->schema([
                                Section::make('Basic Information')
                                    ->description('Enter the basic portfolio details')
                                    ->icon('heroicon-m-information-circle')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\Select::make('service_id')
                                                    ->label('Service')
                                                    ->relationship('service', 'title')
                                                    ->searchable()
                                                    ->preload()
                                                    ->placeholder('Select a service (optional)')
                                                    ->helperText('The service category for this portfolio'),
                                                    
                                                Forms\Components\TextInput::make('title')
                                                    ->label('Title')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->placeholder('Enter portfolio title')
                                                    ->helperText('The display name of the portfolio')
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
                                                    ->placeholder('auto-generated-from-title')
                                                    ->helperText('URL-friendly name (auto-generated from title)')
                                                    ->readOnly()
                                                    ->dehydrated(true),
                                            ]),
                                            
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\Select::make('status')
                                                    ->label('Status')
                                                    ->options([
                                                        'draft' => 'Draft',
                                                        'published' => 'Published',
                                                    ])
                                                    ->default('draft')
                                                    ->required()
                                                    ->native(false)
                                                    ->helperText('Set portfolio visibility'),
                                                    
                                                Forms\Components\DatePicker::make('completion_date')
                                                    ->label('Completion Date')
                                                    ->native(false)
                                                    ->displayFormat('d M Y')
                                                    ->placeholder('Select completion date')
                                                    ->helperText('When the project was completed'),
                                            ]),
                                            
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\DateTimePicker::make('published_at')
                                                    ->label('Published At')
                                                    ->native(false)
                                                    ->displayFormat('d M Y H:i')
                                                    ->placeholder('Select publish date')
                                                    ->helperText('When the portfolio was published (leave empty for drafts)'),
                                            ]),
                                    ]),
                                    
                                Section::make('Media')
                                    ->description('Upload portfolio images')
                                    ->icon('heroicon-m-photo')
                                    ->schema([
                                        Forms\Components\FileUpload::make('image')
                                            ->label('Portfolio Image')
                                            ->image()
                                            ->required()
                                            ->directory('portfolios')
                                            ->imageEditor()
                                            ->imageEditorAspectRatios([
                                                '16:9',
                                                '4:3',
                                                '1:1',
                                            ])
                                            ->maxSize(5120)
                                            ->helperText('Upload the main portfolio image (max 5MB)')
                                            ->columnSpanFull(),
                                    ]),
                            ]),
                            
                        Tab::make('Description')
                            ->icon('heroicon-m-document-text')
                            ->schema([
                                Section::make('Project Description')
                                    ->description('Detailed information about the project')
                                    ->icon('heroicon-m-document-check')
                                    ->schema([
                                        Forms\Components\Textarea::make('description')
                                            ->label('Description')
                                            ->required()
                                            ->rows(8)
                                            ->columnSpanFull()
                                            ->placeholder('Detailed description of the project...')
                                            ->helperText('Complete project description')
                                            ->maxLength(5000),
                                    ]),
                            ]),
                            
                        Tab::make('Technologies')
                            ->icon('heroicon-m-code-bracket')
                            ->schema([
                                Section::make('Technologies Used')
                                    ->description('List all technologies used in this project')
                                    ->icon('heroicon-m-cpu-chip')
                                    ->schema([
                                        Repeater::make('technologies_list')
                                            ->label('Technologies')
                                            ->schema([
                                                Forms\Components\TextInput::make('technology')
                                                    ->label('Technology')
                                                    ->required()
                                                    ->maxLength(100)
                                                    ->placeholder('e.g., Laravel, React, MySQL'),
                                            ])
                                            ->defaultItems(0)
                                            ->addActionLabel('Add Technology')
                                            ->collapsible()
                                            ->cloneable()
                                            ->reorderable()
                                            ->reorderableWithButtons()
                                            ->grid(2)
                                            ->columnSpanFull(),
                                            
                                        Forms\Components\Placeholder::make('technologies_note')
                                            ->label('')
                                            ->content('Technologies will be displayed as tags in the frontend.')
                                            ->extraAttributes(['class' => 'text-sm text-gray-500 dark:text-gray-400']),
                                    ]),
                            ]),
                            
                        Tab::make('Results')
                            ->icon('heroicon-m-chart-bar')
                            ->schema([
                                Section::make('Project Results')
                                    ->description('Key achievements and results from this project')
                                    ->icon('heroicon-m-trophy')
                                    ->schema([
                                        Repeater::make('results_list')
                                            ->label('Results')
                                            ->schema([
                                                Forms\Components\TextInput::make('result')
                                                    ->label('Result')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., 300% increase in online sales'),
                                            ])
                                            ->defaultItems(0)
                                            ->addActionLabel('Add Result')
                                            ->collapsible()
                                            ->cloneable()
                                            ->reorderable()
                                            ->reorderableWithButtons()
                                            ->grid(1)
                                            ->columnSpanFull(),
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
                                                    ->helperText('SEO title (leave empty to use portfolio title)')
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