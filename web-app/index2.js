fetch("http://127.0.0.1:3000/users")
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
    })
    .catch((error) => {
        console.error("Terjadi kesalahan:", error);
    });
