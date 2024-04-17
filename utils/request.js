const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch Single Property
async function fetchProduct(id) {
  try {
    // Handle if domain is unavailable
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/products/${id}`);

    if (!res.ok) {
      throw new Error('Failed To Fetch Data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProduct };
