const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
sql`SELECT * FROM founders_table_rsvps ORDER BY created_at ASC`.then(rows => {
  if (!rows.length) { console.log('No RSVPs yet'); return; }
  const headers = Object.keys(rows[0]).join(',');
  const data = rows.map(r => Object.values(r).map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  require('fs').writeFileSync('rsvps.csv', headers + '\n' + data);
  console.log('Done — ' + rows.length + ' RSVPs exported to rsvps.csv');
});
