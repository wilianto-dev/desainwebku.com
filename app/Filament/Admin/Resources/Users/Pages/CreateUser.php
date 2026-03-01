<?php

namespace App\Filament\Admin\Resources\Users\Pages;

use App\Filament\Admin\Resources\Users\UserResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Hash;

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;
    
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
    
    protected function getCreatedNotificationTitle(): ?string
    {
        return 'User created successfully';
    }
    
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // Hash password
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        
        // Set default avatar if not provided
        if (!isset($data['avatar']) && isset($data['name'])) {
            $data['avatar'] = 'https://ui-avatars.com/api/?name=' . urlencode($data['name']) . '&background=0D8F81&color=fff';
        }
        
        return $data;
    }
    
    protected function afterCreate(): void
    {
        $user = $this->record;
        
        // Handle roles manually
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
        } else {
            // Default role jika tidak ada yang dipilih
            $user->assignRole('customer');
        }
    }
}