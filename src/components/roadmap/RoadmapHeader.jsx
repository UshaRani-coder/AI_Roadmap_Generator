// export default function RoadmapHeader({ roadmap }) {
//   return (
//     <section className="mx-auto max-w-5xl px-6 pt-12 pb-10 mt-20">
//       <p className="mb-3 text-sm font-medium text-violet-400">
//         Your personalized roadmap
//       </p>

//       <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
//         {roadmap.title}
//       </h1>

//       <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
//         {roadmap.description}
//       </p>

//       <div className="mt-8 flex flex-wrap gap-3">
//         <div className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-zinc-300">
//           {roadmap.duration}
//         </div>

//         <div className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-zinc-300">
//           {roadmap.timePerDay}
//         </div>

//         <div className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-zinc-300">
//           {roadmap.experience}
//         </div>
//       </div>
//     </section>
//   );
// }

export default function RoadmapHeader({ roadmap }) {
  return (
    <section className="mx-auto mt-20 max-w-5xl px-6 pt-12 pb-10">
      <p className="mb-3 text-sm font-medium text-accent">
        Your personalized roadmap
      </p>

      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {roadmap.title}
      </h1>

      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        {roadmap.description}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <div className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted">
          {roadmap.duration}
        </div>

        <div className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted">
          {roadmap.timePerDay}
        </div>

        <div className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted">
          {roadmap.experience}
        </div>
      </div>
    </section>
  );
}