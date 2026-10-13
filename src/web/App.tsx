import { useEffect, useState } from "react";

export function App() {
  const [apiStatus, setApiStatus] = useState("checking…");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data: { ok: boolean }) =>
        setApiStatus(data.ok ? "connected" : "error"),
      )
      .catch(() => setApiStatus("not reachable"));
  }, []);

  return (
    <main>
      <h1>Workout Tracker</h1>
      <p>API: {apiStatus}</p>
    </main>
  );
}
