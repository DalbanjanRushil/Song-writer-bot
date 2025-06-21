// /api/generate.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed.' });
  }

  const { topic, genre, tone } = req.body;

  if (!topic || !genre || !tone) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const prompt = `Write a ${tone.toLowerCase()} ${genre.toLowerCase()} song about "${topic}". Include verses and a chorus. Make it original and lyrical.`;

  try {
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt: prompt,
        max_tokens: 300,
        temperature: 0.8
      }),
    });

    const data = await response.json();

    if (data.generations && data.generations[0].text) {
      return res.status(200).json({ result: data.generations[0].text.trim() });
    } else {
      return res.status(500).json({ error: "Failed to generate lyrics." });
    }
  } catch (err) {
    console.error("Cohere API Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
