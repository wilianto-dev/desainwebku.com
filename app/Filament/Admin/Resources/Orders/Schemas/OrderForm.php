<?php

namespace App\Filament\Admin\Resources\Orders\Schemas;

use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;


class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Order Management')
                    ->tabs([
                        Tab::make('Order Details')
                            ->icon('heroicon-m-document-text')
                            ->schema([
                                Section::make('Basic Information')
                                    ->description('Enter the basic order details')
                                    ->icon('heroicon-m-information-circle')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\Select::make('user_id')
                                                    ->label('Customer')
                                                    ->relationship('user', 'name')
                                                    ->searchable()
                                                    ->preload()
                                                    ->required()
                                                    ->createOptionForm([
                                                        Forms\Components\TextInput::make('name')
                                                            ->required()
                                                            ->maxLength(255),
                                                        Forms\Components\TextInput::make('email')
                                                            ->email()
                                                            ->required()
                                                            ->unique(),
                                                        Forms\Components\TextInput::make('phone')
                                                            ->tel()
                                                            ->maxLength(20),
                                                    ])
                                                    ->placeholder('Select a customer'),
                                                    
                                                Forms\Components\Select::make('package_id')
                                                    ->label('Package')
                                                    ->relationship('package', 'name')
                                                    ->searchable()
                                                    ->preload()
                                                    ->required()
                                                    ->createOptionForm([
                                                        Forms\Components\TextInput::make('name')
                                                            ->required()
                                                            ->maxLength(255),
                                                        Forms\Components\Textarea::make('description')
                                                            ->rows(3),
                                                        Forms\Components\TextInput::make('price')
                                                            ->numeric()
                                                            ->required()
                                                            ->prefix('Rp'),
                                                    ])
                                                    ->placeholder('Select a package'),
                                            ]),
                                            
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\TextInput::make('order_number')
                                                    ->label('Order Number')
                                                    ->required()
                                                    ->unique(ignoreRecord: true)
                                                    ->maxLength(255)
                                                    ->placeholder('ORD-' . date('Ymd') . '-XXXX')
                                                    ->helperText('Unique order identifier'),
                                                    
                                                Forms\Components\Select::make('status')
                                                    ->label('Status')
                                                    ->options([
                                                        'pending' => 'Pending',
                                                        'paid' => 'Paid',
                                                        'in_progress' => 'In Progress',
                                                        'completed' => 'Completed',
                                                        'cancelled' => 'Cancelled',
                                                    ])
                                                    ->default('pending')
                                                    ->required()
                                                    ->native(false)
                                                    ->helperText('Current order status'),
                                            ]),
                                            
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\TextInput::make('total_price')
                                                    ->label('Total Price')
                                                    ->required()
                                                    ->numeric()
                                                    ->prefix('Rp')
                                                    ->minValue(0)
                                                    ->step(1000)
                                                    ->helperText('Enter the total order amount'),
                                            ]),
                                            
                                        Forms\Components\Textarea::make('notes')
                                            ->label('Notes')
                                            ->rows(4)
                                            ->columnSpanFull()
                                            ->placeholder('Add any additional notes about this order...')
                                            ->helperText('Optional: Additional information'),
                                    ]),
                            ]),
                            
                        Tab::make('Timeline')
                            ->icon('heroicon-m-clock')
                            ->schema([
                                Section::make('Order Timeline')
                                    ->description('Track the order progress')
                                    ->icon('heroicon-m-calendar')
                                    ->schema([
                                        Grid::make(3)
                                            ->schema([
                                                Forms\Components\DateTimePicker::make('paid_at')
                                                    ->label('Paid At')
                                                    ->native(false)
                                                    ->displayFormat('d M Y H:i')
                                                    ->placeholder('Select date and time')
                                                    ->helperText('When payment was received'),
                                                    
                                                Forms\Components\DateTimePicker::make('started_at')
                                                    ->label('Started At')
                                                    ->native(false)
                                                    ->displayFormat('d M Y H:i')
                                                    ->placeholder('Select date and time')
                                                    ->helperText('When work started'),
                                                    
                                                Forms\Components\DateTimePicker::make('completed_at')
                                                    ->label('Completed At')
                                                    ->native(false)
                                                    ->displayFormat('d M Y H:i')
                                                    ->placeholder('Select date and time')
                                                    ->helperText('When work was completed'),
                                            ]),
                                    ])
                                    ->collapsible()
                                    ->collapsed(),
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
                            ]),
                    ])
                    ->columnSpanFull()
                    ->persistTabInQueryString(),
            ]);
    }
}