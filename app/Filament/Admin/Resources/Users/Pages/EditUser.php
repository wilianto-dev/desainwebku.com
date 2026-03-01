<?php

namespace App\Filament\Admin\Resources\Users\Pages;

use App\Filament\Admin\Resources\Users\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Hash;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->label('Delete')
                ->icon('heroicon-m-trash')
                ->color('danger')
                ->modalHeading('Delete User')
                ->modalDescription('Are you sure you want to delete this user? This action cannot be undone.'),
                
            Actions\ForceDeleteAction::make()
                ->label('Force Delete')
                ->icon('heroicon-m-x-circle')
                ->color('danger')
                ->modalHeading('Force Delete User')
                ->modalDescription('Are you sure you want to force delete this user? This action cannot be undone.'),
                
            Actions\RestoreAction::make()
                ->label('Restore')
                ->icon('heroicon-m-arrow-uturn-left')
                ->color('success'),
        ];
    }
    
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
    
    protected function getSavedNotificationTitle(): ?string
    {
        return 'User updated successfully';
    }
    
    protected function mutateFormDataBeforeSave(array $data): array
    {
        // Remove password if empty
        if (empty($data['password'])) {
            unset($data['password']);
        } else {
            // Hash password if provided
            $data['password'] = Hash::make($data['password']);
        }
        
        return $data;
    }
    
    protected function afterSave(): void
    {
        $user = $this->record;
        
        // Handle roles manually jika perlu
        if (isset($this->data['roles'])) {
            $roles = $this->data['roles'];
            
            // Validasi: user tidak bisa memberikan role super-admin jika bukan super-admin
            $currentUser = auth()->user();
            if (!$currentUser->hasRole('super-admin') && in_array('super-admin', $roles)) {
                // Filter out super-admin if current user is not super-admin
                $roles = array_filter($roles, fn($role) => $role !== 'super-admin');
            }
            
            // Sync roles
            $user->syncRoles($roles);
        }
        
        // Pastikan user memiliki setidaknya satu role
        if ($user->roles()->count() === 0) {
            $user->assignRole('customer');
        }
    }
}