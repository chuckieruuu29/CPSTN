<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewOrderCreated implements ShouldBroadcast
{
\tuse Dispatchable, InteractsWithSockets, SerializesModels;

\tpublic Order $order;

\tpublic function __construct(Order $order)
\t{
\t\t$this->order = $order->load('customer.user');
\t}

\tpublic function broadcastOn(): Channel
\t{
\t\treturn new Channel('notifications');
\t}

\tpublic function broadcastAs(): string
\t{
\t\treturn 'new-order';
\t}
}

