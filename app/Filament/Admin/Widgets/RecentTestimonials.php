<?php

namespace App\Filament\Admin\Widgets;

use App\Models\Testimonial;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;

class RecentTestimonials extends BaseWidget
{
    protected static ?int $sort = 6;
    
    protected int | string | array $columnSpan = 'half';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Testimonial::query()
                    ->with('service')
                    ->latest()
                    ->limit(5)
            )
            ->columns([
                TextColumn::make('name')
                    ->label('Client')
                    ->searchable()
                    ->weight('bold'),
                    
                TextColumn::make('company')
                    ->label('Company')
                    ->toggleable(),
                    
                TextColumn::make('service.title')
                    ->label('Service')
                    ->toggleable(),
                    
                TextColumn::make('rating')
                    ->label('Rating')
                    ->formatStateUsing(fn ($state) => str_repeat('⭐', $state))
                    ->badge()
                    ->color('warning'),
                    
                BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'success' => 'approved',
                        'warning' => 'pending',
                        'danger' => 'rejected',
                    ]),
                    
                TextColumn::make('created_at')
                    ->label('Date')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(),
            ])
            ->heading('Recent Testimonials')
            ->defaultSort('created_at', 'desc')
            ->paginated(false);
    }
}