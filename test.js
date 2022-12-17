import axios from 'axios'
const response = await axios.post('http://localhost:8090/auth/register', {"username": "Ifee",
"email": "Ifechukwu@gmail.com",
"password": "udokwu",
"bio": "Backend Engineer",
"location": "Lagos",
"profilepicture": "",
"followers": [],
"followings": []
})
console.log(response)
