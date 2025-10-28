
export const user = async () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const token = localStorage.getItem('jwt-token')
  try {
    const response = await fetch(`${BASE_URL}api/me`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()
    if(!response.ok){
      return {data, status: response.status}
    }
    return {data, status: response.status}
  } catch (error) {
    console.log(error)
  }
}