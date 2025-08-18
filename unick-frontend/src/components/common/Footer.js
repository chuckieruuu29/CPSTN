
export default function Footer() {
	return (
		<footer style={{ padding: 12, borderTop: '1px solid var(--border-color)', background: '#fff', marginTop: 12 }}>
			<small style={{ color: 'var(--text-muted)' }}>© {new Date().getFullYear()} Unick Enterprises. All rights reserved.</small>
		</footer>
	);
}
