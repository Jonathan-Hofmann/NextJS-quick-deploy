export default function AppHome() {
  return (
    <main className="">
      <h1 className="text-4xl font-bold mb-4">Base Project <code className="text-blue-500 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-sm mx-1">/app</code> Directory</h1>
      <p className="text-muted-foreground">This page is only accessible when being logged in. All pages within <code className="text-blue-500 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-sm mx-1">/app</code> are protected.</p>
    </main>
  );
}