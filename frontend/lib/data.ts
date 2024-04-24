import axios from "axios";

export async function getCategory() {
    try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/categories/`
    );
    return response.data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
