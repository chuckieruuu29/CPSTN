<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name', 'email', 'password', 'role', 'phone', 'address'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function customer()
    {
        return $this->hasOne(Customer::class);
    }

    public function assignedBatches()
    {
        return $this->hasMany(ProductionBatch::class, 'assigned_staff_id');
    }

    public function productionLogs()
    {
        return $this->hasMany(ProductionLog::class, 'staff_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function inventoryTransactions()
    {
        return $this->hasMany(InventoryTransaction::class);
    }

    public function isAdmin()
    {
        return $this->hasRole('Admin') || $this->role === 'admin';
    }

    public function isStaff()
    {
        return $this->hasAnyRole(['Admin','Staff']) || in_array($this->role, ['admin', 'staff']);
    }
}