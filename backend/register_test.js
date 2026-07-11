(async ()=>{
  try {
    const resp = await fetch('http://localhost:8090/auth/register', {
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
