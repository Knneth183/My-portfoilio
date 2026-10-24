export const revalidate = 3600;

type UpstreamContribution = { date: string; count: number };
type UpstreamResponse = {
  contributions?: UpstreamContribution[];
};

export async function GET() {
  try {
    const response = await fetch('https://github-contributions-api.jogruber.de/v4/Knneth183?y=last', {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return Response.json({ error: 'Contribution data unavailable' }, { status: 502 });
    }

    const data = await response.json() as UpstreamResponse;
    if (!Array.isArray(data.contributions)) {
      return Response.json({ error: 'Invalid contribution data' }, { status: 502 });
    }

    const contributions = data.contributions
      .filter((day) => /^\d{4}-\d{2}-\d{2}$/.test(day.date) && Number.isFinite(day.count))
      .map((day) => ({ date: day.date, count: Math.max(0, day.count) }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return Response.json({
      contributions,
      total: contributions.reduce((sum, day) => sum + day.count, 0),
    });
  } catch {
    return Response.json({ error: 'Contribution data unavailable' }, { status: 502 });
  }
}
