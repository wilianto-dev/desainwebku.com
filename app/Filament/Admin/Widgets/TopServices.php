<?php

namespace App\Filament\Admin\Widgets;

use App\Models\Service;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;

class TopServices extends BaseWidget
{
    protected static ?int $sort = 5;
    
    protected int | string | array $columnSpan = 'half';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Service::query()
                    ->withCount(['packages', 'orders'])
                    ->orderBy('orders_count', 'desc')
                    ->limit(5)
            )
            ->columns([
                TextColumn::make('title')
                    ->label('Service')
                    ->searchable()
                    ->weight('bold'),
                    
                TextColumn::make('packages_count')
                    ->label('Packages')
                    ->alignCenter(),
                    
                TextColumn::make('orders_count')
                    ->label('Total Orders')
                    ->alignCenter()
                    ->color('success')
                    ->weight('bold'),
                    
                IconColumn::make('status')
                    ->label('Status')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('danger'),
            ])
            ->heading('Top Services by Orders')
            ->paginated(false);
    }
}