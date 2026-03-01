<?php

namespace App\Filament\Admin\Resources\Testimonials\Pages;

use App\Filament\Admin\Resources\Testimonials\TestimonialResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTestimonial extends EditRecord
{
    protected static string $resource = TestimonialResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->label('Delete')
                ->icon('heroicon-m-trash')
                ->color('danger')
                ->modalHeading('Delete Testimonial')
                ->modalDescription('Are you sure you want to delete this testimonial? This action cannot be undone.'),
                
            Actions\ForceDeleteAction::make()
                ->label('Force Delete')
                ->icon('heroicon-m-x-circle')
                ->color('danger')
                ->modalHeading('Force Delete Testimonial')
                ->modalDescription('Are you sure you want to force delete this testimonial? This action cannot be undone.'),
                
            Actions\RestoreAction::make()
                ->label('Restore')
                ->icon('heroicon-m-arrow-uturn-left')
                ->color('success'),
                
            Actions\Action::make('approve')
                ->label('Approve')
                ->icon('heroicon-m-check-circle')
                ->color('success')
                ->visible(fn ($record) => $record && $record->status === 'pending')
                ->action(function ($record) {
                    $record->update(['status' => 'approved']);
                    $this->notify('success', 'Testimonial approved successfully');
                }),
                
            Actions\Action::make('reject')
                ->label('Reject')
                ->icon('heroicon-m-x-circle')
                ->color('danger')
                ->visible(fn ($record) => $record && $record->status === 'pending')
                ->action(function ($record) {
                    $record->update(['status' => 'rejected']);
                    $this->notify('success', 'Testimonial rejected successfully');
                }),
        ];
    }
    
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
    
    protected function getSavedNotificationTitle(): ?string
    {
        return 'Testimonial updated successfully';
    }
}