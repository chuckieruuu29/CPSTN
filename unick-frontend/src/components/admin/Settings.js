import { useMemo } from 'react';

export default function Settings() {
    const roles = useMemo(() => ([
        { name: 'Admin', permissions: ['manage users','manage inventory','view reports','configure settings'] },
        { name: 'Staff', permissions: ['manage inventory','update production','view orders'] },
        { name: 'Customer', permissions: ['place orders','view own orders'] },
    ]), []);

    return (
        <div className="card p-3">
            <h3 className="mb-3">Settings</h3>
            <p className="text-muted">Roles & Permissions (server powered by Spatie Laravel Permission)</p>
            <div className="row">
                {roles.map((r) => (
                    <div key={r.name} className="col-md-4 mb-3">
                        <div className="card p-3 h-100">
                            <div className="fw-bold mb-2">{r.name}</div>
                            <ul className="mb-0">
                                {r.permissions.map((p) => <li key={p}>{p}</li>)}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

