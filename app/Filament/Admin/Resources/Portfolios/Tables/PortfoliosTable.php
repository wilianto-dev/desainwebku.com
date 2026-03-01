<?php

namespace App\Filament\Admin\Resources\Portfolios\Tables;

use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\ImageColumn;
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

class PortfoliosTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->label('Image')
                    ->circular()
                    ->size(50)
                    ->defaultImageUrl(url('/images/placeholder.png')),
                    
                TextColumn::make('title')
                    ->label('Title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->copyable()
                    ->copyMessage('Title copied')
                    ->limit(30),
                    
                TextColumn::make('service.title')
                    ->label('Service')
                    ->searchable()
                    ->sortable()
                    ->toggleable()
                    ->placeholder('No Service'),
                    
                BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'success' => 'published',
                        'warning' => 'draft',
                    ])
                    ->icons([
                        'heroicon-o-check-circle' => 'published',
                        'heroicon-o-clock' => 'draft',
                    ])
                    ->sortable(),
                    
                TextColumn::make('completion_date')
                    ->label('Completed')
                    ->date('d M Y')
                    ->sortable()
                    ->toggleable(),
                    
                TextColumn::make('published_at')
                    ->label('Published')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                TextColumn::make('technologies')
                    ->label('Technologies')
                    ->formatStateUsing(function ($state) {
                        if (!$state) return '-';
                        $techs = json_decode($state, true);
                        if (is_array($techs)) {
                            return collect($techs)->map(fn($tech) => "🔹 {$tech}")->implode('<br>');
                        }
                        return $state;
                    })
                    ->html()
                    ->toggleable(isToggledHiddenByDefault: true),
                    
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
                    
                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'published' => 'Published',
                        'draft' => 'Draft',
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
                    ->color('danger'),
                    
                RestoreAction::make()
                    ->label('Restore')
                    ->icon('heroicon-m-arrow-uturn-left')
                    ->color('success'),
                    
                ForceDeleteAction::make()
                    ->label('Force Delete')
                    ->icon('heroicon-m-x-circle')
                    ->color('danger')
                    ->modalHeading('Force Delete Portfolio'),
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
            ->defaultSort('completion_date', 'desc')
            ->poll('60s')
            ->striped()
            ->paginated([10, 25, 50, 100])
            ->defaultPaginationPageOption(25);
    }
}