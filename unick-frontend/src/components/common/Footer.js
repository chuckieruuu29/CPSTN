export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ padding: 16, textAlign: 'center', color: '#64748b' }}>
      © {year} Unick Enterprises
    </footer>
  );
}