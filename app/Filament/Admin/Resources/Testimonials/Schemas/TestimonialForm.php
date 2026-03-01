<?php

namespace App\Filament\Admin\Resources\Testimonials\Schemas;

use Filament\Forms;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class TestimonialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Testimonial Management')
                    ->tabs([
                        Tab::make('Testimonial Details')
                            ->icon('heroicon-m-chat-bubble-left-right')
                            ->schema([
                                Section::make('Basic Information')
                                    ->description('Enter the testimonial details')
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
                                                    ->helperText('The service this testimonial is about'),
                                                    
                                                Forms\Components\TextInput::make('name')
                                                    ->label('Name')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->placeholder('Enter full name')
                                                    ->helperText('Client name'),
                                            ]),
                                            
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\TextInput::make('company')
                                                    ->label('Company')
                                                    ->maxLength(255)
                                                    ->placeholder('Enter company name')
                                                    ->helperText('Client company (optional)')
                                                    ->prefixIcon('heroicon-m-building-office'),
                                                    
                                                Forms\Components\Select::make('rating')
                                                    ->label('Rating')
                                                    ->options([
                                                        5 => '⭐⭐⭐⭐⭐ (5 Stars)',
                                                        4 => '⭐⭐⭐⭐ (4 Stars)',
                                                        3 => '⭐⭐⭐ (3 Stars)',
                                                        2 => '⭐⭐ (2 Stars)',
                                                        1 => '⭐ (1 Star)',
                                                    ])
                                                    ->default(5)
                                                    ->required()
                                                    ->native(false)
                                                    ->helperText('Client rating'),
                                            ]),
                                            
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\Select::make('status')
                                                    ->label('Status')
                                                    ->options([
                                                        'approved' => 'Approved',
                                                        'pending' => 'Pending',
                                                        'rejected' => 'Rejected',
                                                    ])
                                                    ->default('pending')
                                                    ->required()
                                                    ->native(false)
                                                    ->helperText('Testimonial status'),
                                            ]),
                                    ]),
                                    
                                Section::make('Testimonial Content')
                                    ->description('The testimonial message')
                                    ->icon('heroicon-m-document-text')
                                    ->schema([
                                        Forms\Components\Textarea::make('content')
                                            ->label('Content')
                                            ->required()
                                            ->rows(6)
                                            ->columnSpanFull()
                                            ->placeholder('Write the testimonial content here...')
                                            ->helperText('The actual testimonial message'),
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
                                    
                                Section::make('Approval Information')
                                    ->description('Review and approval details')
                                    ->icon('heroicon-m-check-circle')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\Placeholder::make('approved_at')
                                                    ->label('Approved At')
                                                    ->content(fn ($record): string => 
                                                        $record && $record->status === 'approved' 
                                                            ? ($record->updated_at?->format('d M Y H:i') ?? '-')
                                                            : 'Not approved yet'
                                                    )
                                                    ->visibleOn('edit'),
                                            ]),
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