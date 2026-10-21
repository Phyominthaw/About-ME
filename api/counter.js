export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const token = process.env.COUNTER_API_TOKEN; // Vercel Environment Variable ထဲက ယူမည်

    try {
        const response = await fetch('https://api.counterapi.dev/v1/phyominthaw/portfolio/up', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ count: 1 });
    }
}