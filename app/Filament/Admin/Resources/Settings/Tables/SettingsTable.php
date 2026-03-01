<?php

namespace App\Filament\Admin\Resources\Settings\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class SettingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                BadgeColumn::make('type')
                    ->label('Type')
                    ->colors([
                        'primary' => 'text',
                        'success' => 'boolean',
                        'warning' => 'number',
                        'info' => 'json',
                    ])
                    ->icons([
                        'text' => 'heroicon-o-document-text',
                        'boolean' => 'heroicon-o-check-circle',
                        'number' => 'heroicon-o-hashtag',
                        'json' => 'heroicon-o-code-bracket',
                    ])
                    ->formatStateUsing(fn ($state): string => ucfirst($state))
                    ->sortable(),
                    
                TextColumn::make('key')
                    ->label('Key')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->copyable()
                    ->copyMessage('Key copied')
                    ->description(fn ($record): string => Str::limit($record->value, 50), position: 'below'),
                    
                TextColumn::make('value')
                    ->label('Value')
                    ->searchable()
                    ->limit(50)
                    ->formatStateUsing(function ($state, $record) {
                        if ($record->type === 'json') {
                            $value = is_array($state) ? $state : json_decode($state, true);
                            if (is_array($value)) {
                                return '🔹 ' . implode(' 🔹 ', array_keys($value));
                            }
                        } elseif ($record->type === 'boolean') {
                            return $state === 'true' || $state === true ? '✅ Yes' : '❌ No';
                        }
                        return $state;
                    })
                    ->tooltip(fn ($state, $record) => $record->type === 'json' ? json_encode($state, JSON_PRETTY_PRINT) : $state),
                    
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
            ])
            ->filters([
                SelectFilter::make('type')
                    ->label('Type')
                    ->options([
                        'text' => 'Text',
                        'boolean' => 'Boolean',
                        'number' => 'Number',
                        'json' => 'JSON',
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
                    ->modalHeading('Delete Setting')
                    ->modalDescription('Are you sure you want to delete this setting? This action cannot be undone.'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->label('Delete Selected')
                        ->icon('heroicon-m-trash'),
                ])
                ->label('Bulk Actions')
                ->icon('heroicon-m-ellipsis-horizontal'),
            ])
            ->defaultSort('key', 'asc')
            ->poll('60s')
            ->striped()
            ->paginated([10, 25, 50, 100])
            ->defaultPaginationPageOption(25);
    }
}