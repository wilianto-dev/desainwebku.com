<?php

namespace App\Filament\Admin\Resources\Packages\Tables;

use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Filters\SelectFilter;

// Actions dari Filament\Actions di v5
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;

class PackagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Package Name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->copyable()
                    ->copyMessage('Package name copied'),
                    
                // Perbaiki relationship - gunakan 'title' bukan 'name'
                TextColumn::make('service.title')
                    ->label('Service')
                    ->searchable()
                    ->sortable()
                    ->toggleable()
                    ->copyable()
                    ->copyMessage('Service name copied'),
                    
                TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable()
                    ->sortable()
                    ->copyable()
                    ->copyMessage('Slug copied')
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                TextColumn::make('price')
                    ->label('Price')
                    ->money('IDR')
                    ->sortable()
                    ->weight('bold')
                    ->alignRight()
                    ->copyable()
                    ->copyMessage('Price copied'),
                    
                TextColumn::make('duration')
                    ->label('Duration')
                    ->numeric()
                    ->sortable()
                    ->alignRight()
                    ->suffix(' days')
                    ->toggleable(),
                    
                BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'success' => 'active',
                        'danger' => 'inactive',
                    ])
                    ->icons([
                        'heroicon-o-check-circle' => 'active',
                        'heroicon-o-x-circle' => 'inactive',
                    ])
                    ->sortable(),
                    
                IconColumn::make('is_popular')
                    ->label('Popular')
                    ->boolean()
                    ->trueIcon('heroicon-o-fire')
                    ->falseIcon('heroicon-o-fire')
                    ->trueColor('danger')
                    ->falseColor('gray')
                    ->sortable(),
                    
                TextColumn::make('sort_order')
                    ->label('Sort Order')
                    ->numeric()
                    ->sortable()
                    ->alignRight()
                    ->toggleable(),
                    
                TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                TextColumn::make('updated_at')
                    ->label('Updated At')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                TextColumn::make('deleted_at')
                    ->label('Deleted At')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TrashedFilter::make(),
                
                // Perbaiki filter relationship
                SelectFilter::make('service_id')
                    ->label('Service')
                    ->relationship('service', 'title') // Gunakan 'title' bukan 'name'
                    ->multiple()
                    ->searchable()
                    ->preload(),
                    
                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'active' => 'Active',
                        'inactive' => 'Inactive',
                    ])
                    ->multiple()
                    ->searchable()
                    ->preload(),
                    
                SelectFilter::make('is_popular')
                    ->label('Popular')
                    ->options([
                        '1' => 'Popular',
                        '0' => 'Not Popular',
                    ]),
            ])
            ->recordActions([
                EditAction::make()
                    ->label('Edit')
                    ->icon('heroicon-m-pencil-square')
                    ->color('warning'),
                    
                DeleteAction::make()
                    ->label('Delete')
                    ->icon('heroicon-m-trash')
                    ->color('danger'),
                    
                RestoreAction::make()
                    ->label('Restore')
                    ->icon('heroicon-m-arrow-uturn-left')
                    ->color('success'),
                    
                ForceDeleteAction::make()
                    ->label('Force Delete')
                    ->icon('heroicon-m-x-circle')
                    ->color('danger')
                    ->modalHeading('Force Delete Package'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->label('Delete Selected')
                        ->icon('heroicon-m-trash'),
                    ForceDeleteBulkAction::make()
                        ->label('Force Delete Selected')
                        ->icon('heroicon-m-x-circle'),
                    RestoreBulkAction::make()
                        ->label('Restore Selected')
                        ->icon('heroicon-m-arrow-uturn-left'),
                ])
                ->label('Bulk Actions')
                ->icon('heroicon-m-ellipsis-horizontal'),
            ])
            ->defaultSort('sort_order', 'asc')
            ->poll('60s')
            ->striped()
            ->paginated([10, 25, 50, 100])
            ->defaultPaginationPageOption(25)
            ->reorderable('sort_order');
    }
}