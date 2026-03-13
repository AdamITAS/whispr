const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  // GET /api/messages?user=marco  →  ritorna tutti i messaggi di @marco
  if (req.method === 'GET') {
    const { user } = req.query
    if (!user) return res.status(400).json({ error: 'missing user' })

    const { data, error } = await supabase
      .from('messages')
      .select('id, text, created_at')
      .eq('username', user.toLowerCase().trim())
      .order('created_at', { ascending: false })

    if (error) return res.status(500).json({ error: error.message })
    return res.json(data)
  }

  // POST /api/messages  body: { username, text }  →  salva messaggio
  if (req.method === 'POST') {
    const { username, text } = req.body
    if (!username || !text) return res.status(400).json({ error: 'campi mancanti' })
    if (text.trim().length === 0) return res.status(400).json({ error: 'messaggio vuoto' })
    if (text.length > 280) return res.status(400).json({ error: 'troppo lungo (max 280)' })

    const { error } = await supabase
      .from('messages')
      .insert({ username: username.toLowerCase().trim(), text: text.trim() })

    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json({ ok: true })
  }

  res.status(405).end()
}
