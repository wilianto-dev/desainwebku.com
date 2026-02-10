<x-mail::message>
# Pesan Kontak Baru

Anda menerima pesan kontak baru dari website.

**Nama:** {{ $data['name'] }}  
**Email:** {{ $data['email'] }}  
**Telepon:** {{ $data['phone'] }}  
**Subjek:** {{ $data['subject'] }}

**Pesan:**  
{{ $data['message'] }}

<x-mail::button :url="route('admin.dashboard')">
Lihat di Dashboard
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>