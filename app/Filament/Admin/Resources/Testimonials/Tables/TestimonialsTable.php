<?php

namespace App\Filament\Admin\Resources\Testimonials\Tables;

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

class TestimonialsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->copyable()
                    ->copyMessage('Name copied'),
                    
                TextColumn::make('company')
                    ->label('Company')
                    ->searchable()
                    ->sortable()
                    ->toggleable()
                    ->placeholder('No company'),
                    
                TextColumn::make('service.title')
                    ->label('Service')
                    ->searchable()
                    ->sortable()
                    ->toggleable()
                    ->placeholder('No service'),
                    
                BadgeColumn::make('rating')
                    ->label('Rating')
                    ->formatStateUsing(fn ($state) => str_repeat('⭐', $state) . " ($state/5)")
                    ->colors([
                        'success' => 5,
                        'primary' => 4,
                        'warning' => 3,
                        'danger' => [1, 2],
                    ])
                    ->sortable(),
                    
                TextColumn::make('content')
                    ->label('Testimonial')
                    ->limit(50)
                    ->tooltip(fn ($state) => $state)
                    ->searchable(),
                    
                BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'success' => 'approved',
                        'warning' => 'pending',
                        'danger' => 'rejected',
                    ])
                    ->icons([
                        'heroicon-o-check-circle' => 'approved',
                        'heroicon-o-clock' => 'pending',
                        'heroicon-o-x-circle' => 'rejected',
                    ])
                    ->sortable(),
                    
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
                
                SelectFilter::make('service_id')
                    ->label('Service')
                    ->relationship('service', 'title')
                    ->multiple()
                    ->searchable()
                    ->preload(),
                    
                SelectFilter::make('rating')
                    ->label('Rating')
                    ->options([
                        5 => '5 Stars',
                        4 => '4 Stars',
                        3 => '3 Stars',
                        2 => '2 Stars',
                        1 => '1 Star',
                    ])
                    ->multiple(),
                    
                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'approved' => 'Approved',
                        'pending' => 'Pending',
                        'rejected' => 'Rejected',
                    ])
                    ->multiple()
                    ->searchable()
                    ->preload(),
            ])
            ->recordActions([
                EditAction::make()
                    ->label('Edit')
                    ->icon('heroicon-m-pencil-square')
                    ->color('warning'),
                    
                DeleteAction::make()
                    ->label('Delete')
                    ->icon('heroicon-m-trash')
                    ->color('danger')
                    ->modalHeading('Delete Testimonial')
                    ->modalDescription('Are you sure you want to delete this testimonial? This action cannot be undone.'),
                    
                RestoreAction::make()
                    ->label('Restore')
                    ->icon('heroicon-m-arrow-uturn-left')
                    ->color('success'),
                    
                ForceDeleteAction::make()
                    ->label('Force Delete')
                    ->icon('heroicon-m-x-circle')
                    ->color('danger')
                    ->modalHeading('Force Delete Testimonial'),
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
            ->defaultSort('created_at', 'desc')
            ->poll('60s')
            ->striped()
            ->paginated([10, 25, 50, 100])
            ->defaultPaginationPageOption(25);
    }
}