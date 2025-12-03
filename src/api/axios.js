API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
  
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  
    return req;
  });
  