<?php

namespace App\Filament\Admin\Resources\Settings\Schemas;

use Filament\Forms;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class SettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Setting Management')
                    ->tabs([
                        Tab::make('Setting Details')
                            ->icon('heroicon-m-cog')
                            ->schema([
                                Section::make('Basic Information')
                                    ->description('Enter the setting details')
                                    ->icon('heroicon-m-information-circle')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\TextInput::make('key')
                                                    ->label('Key')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->unique(ignoreRecord: true)
                                                    ->placeholder('site_name, contact_email, etc')
                                                    ->helperText('Unique identifier for this setting')
                                                    ->prefixIcon('heroicon-m-key'),
                                                    
                                                Forms\Components\Select::make('type')
                                                    ->label('Type')
                                                    ->options([
                                                        'text' => 'Text',
                                                        'textarea' => 'Textarea (Long Text)',
                                                        'boolean' => 'Boolean (Yes/No)',
                                                        'number' => 'Number',
                                                        'json' => 'JSON (Array/Object)',
                                                    ])
                                                    ->default('text')
                                                    ->required()
                                                    ->native(false)
                                                    ->helperText('Data type for this setting')
                                                    ->reactive()
                                                    ->afterStateUpdated(fn ($state, callable $set) => 
                                                        $set('value', null)
                                                    ),
                                            ]),
                                    ]),
                                    
                                Section::make('Value')
                                    ->description('Enter the setting value')
                                    ->icon('heroicon-m-document-text')
                                    ->schema([
                                        // Dynamic field based on type
                                        Grid::make(1)
                                            ->schema([
                                                // Text input for text type
                                                Forms\Components\TextInput::make('value')
                                                    ->label('Value')
                                                    ->required()
                                                    ->visible(fn ($get) => $get('type') === 'text')
                                                    ->placeholder('Enter text value'),
                                                    
                                                // Textarea for textarea type
                                                Forms\Components\Textarea::make('value')
                                                    ->label('Value')
                                                    ->rows(3)
                                                    ->visible(fn ($get) => $get('type') === 'textarea')
                                                    ->placeholder('Enter long text value'),
                                                    
                                                // Toggle for boolean type
                                                Forms\Components\Toggle::make('value')
                                                    ->label('Value')
                                                    ->required()
                                                    ->visible(fn ($get) => $get('type') === 'boolean')
                                                    ->helperText('On = Yes/True, Off = No/False')
                                                    ->formatStateUsing(function ($state) {
                                                        // Convert string 'true'/'false' to boolean
                                                        if (is_string($state)) {
                                                            return $state === 'true';
                                                        }
                                                        return (bool) $state;
                                                    }),
                                                    
                                                // Number input for number type
                                                Forms\Components\TextInput::make('value')
                                                    ->label('Value')
                                                    ->required()
                                                    ->numeric()
                                                    ->visible(fn ($get) => $get('type') === 'number')
                                                    ->placeholder('Enter number value'),
                                                    
                                                // Key-value repeater for JSON type
                                                Forms\Components\Repeater::make('json_value')
                                                    ->label('Value')
                                                    ->visible(fn ($get) => $get('type') === 'json')
                                                    ->schema([
                                                        Grid::make(2)
                                                            ->schema([
                                                                Forms\Components\TextInput::make('key')
                                                                    ->label('Key')
                                                                    ->required()
                                                                    ->maxLength(255)
                                                                    ->placeholder('e.g., facebook'),
                                                                    
                                                                Forms\Components\TextInput::make('value')
                                                                    ->label('Value')
                                                                    ->required()
                                                                    ->placeholder('e.g., https://facebook.com/...'),
                                                            ]),
                                                    ])
                                                    ->defaultItems(0)
                                                    ->addActionLabel('Add Item')
                                                    ->collapsible()
                                                    ->cloneable()
                                                    ->reorderable()
                                                    ->reorderableWithButtons()
                                                    ->grid(1)
                                                    ->columnSpanFull()
                                                    ->afterStateHydrated(function ($component, $state, $record) {
                                                        // Handle JSON data when loading the form
                                                        if ($record && $record->type === 'json' && $record->value) {
                                                            $value = $record->value;
                                                            
                                                            // If it's a JSON string, decode it
                                                            if (is_string($value)) {
                                                                $decoded = json_decode($value, true);
                                                                if (is_array($decoded)) {
                                                                    // Convert associative array to key-value pairs for repeater
                                                                    $items = [];
                                                                    foreach ($decoded as $key => $val) {
                                                                        $items[] = ['key' => $key, 'value' => $val];
                                                                    }
                                                                    $component->state($items);
                                                                }
                                                            }
                                                            // If it's already an array
                                                            elseif (is_array($value)) {
                                                                $items = [];
                                                                foreach ($value as $key => $val) {
                                                                    $items[] = ['key' => $key, 'value' => $val];
                                                                }
                                                                $component->state($items);
                                                            }
                                                        }
                                                    }),
                                            ]),
                                            
                                        Forms\Components\Placeholder::make('value_note')
                                            ->label('')
                                            ->content(fn ($get) => match ($get('type')) {
                                                'boolean' => 'Boolean values are stored as "true" or "false" strings.',
                                                'json' => 'JSON values will be automatically encoded/decoded.',
                                                default => '',
                                            })
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
                                    
                                Section::make('Usage Information')
                                    ->description('How to use this setting')
                                    ->icon('heroicon-m-information-circle')
                                    ->schema([
                                        Forms\Components\Placeholder::make('usage_code')
                                            ->label('PHP Usage')
                                            ->content(fn ($record): string => 
                                                $record 
                                                    ? "Setting::getValue('{$record->key}')" 
                                                    : "Setting::getValue('your_key')"
                                            )
                                            ->extraAttributes(['class' => 'font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded']),
                                            
                                        Forms\Components\Placeholder::make('blade_usage')
                                            ->label('Blade Usage')
                                            ->content(fn ($record): string => 
                                                $record 
                                                    ? "{{ setting('{$record->key}') }}" 
                                                    : "{{ setting('your_key') }}"
                                            )
                                            ->extraAttributes(['class' => 'font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded']),
                                    ])
                                    ->visibleOn('edit')
                                    ->collapsible()
                                    ->collapsed(),
                            ]),
                    ])
                    ->columnSpanFull()
                    ->persistTabInQueryString(),
            ]);
    }
}