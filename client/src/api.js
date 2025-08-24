const API_BASE = import.meta.env.VITE_API_BASE;

export async function apiGet(path) {
  try {
    const res = await fetch(`${API_BASE}${path}`, { 
      credentials: 'include' 
    });
    
    if (!res.ok) {
      throw new Error(`GET ${path} failed: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('API GET Error:', error);
    throw error;
  }
}

export async function apiPost(path, body) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      credentials: 'include',
      body: JSON.stringify(body || {})
    });
    
    if (!res.ok) {
      throw new Error(`POST ${path} failed: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('API POST Error:', error);
    throw error;
  }
}

export async function apiDelete(path) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    
    if (!res.ok) {
      throw new Error(`DELETE ${path} failed: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('API DELETE Error:', error);
    throw error;
  }
}

export async function apiPut(path, body) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json' 
      },
      credentials: 'include',
      body: JSON.stringify(body || {})
    });
    
    if (!res.ok) {
      throw new Error(`PUT ${path} failed: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('API PUT Error:', error);
    throw error;
  }
}