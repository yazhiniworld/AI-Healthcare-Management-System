(async ()=>{
  try {
    const resp = await fetch('https://ai-healthcare-management-system-im8h.onrender.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testpatient',
        email: 'testpatient@example.com',
        password: 'pass123',
        role: 'PATIENT',
        phone: '1234567890'
      })
    });

    console.log('STATUS', resp.status);
    const data = await resp.text();
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }
})();
