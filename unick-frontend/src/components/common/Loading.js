export default function Loading({ message = 'Loading...' }) {
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
			<div className="spinner" style={{ width: 22, height: 22, border: '3px solid #ddd', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginRight: 8 }} />
			<span>{message}</span>
			<style>
				{`@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }`}
			</style>
		</div>
	);
}

