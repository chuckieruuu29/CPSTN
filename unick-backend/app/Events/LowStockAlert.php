<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LowStockAlert implements ShouldBroadcast
{
\tuse Dispatchable, InteractsWithSockets, SerializesModels;

\tpublic array $payload;

\tpublic function __construct(array $payload)
\t{
\t\t$this->payload = $payload;
\t}

\tpublic function broadcastOn(): Channel
\t{
\t\treturn new Channel('notifications');
\t}

\tpublic function broadcastAs(): string
\t{
\t\treturn 'low-stock';
\t}
}

