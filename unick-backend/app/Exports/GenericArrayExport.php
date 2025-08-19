<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;

class GenericArrayExport implements FromArray
{
\tprivate array $data;

\tpublic function __construct($data)
\t{
\t\t$this->data = is_array($data) ? $data : (array) $data;
\t}

\tpublic function array(): array
\t{
\t\treturn $this->data;
\t}
}

