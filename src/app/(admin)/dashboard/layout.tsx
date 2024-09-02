export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2>From Dashboard layout</h2>
      {children}
    </div>
  );
}
