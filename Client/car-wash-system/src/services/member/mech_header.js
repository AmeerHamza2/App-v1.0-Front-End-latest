export default function mechHeader() {
  const mechanic = JSON.parse(localStorage.getItem("mechanic"));

  if (mechanic && mechanic.token) {
    // for Node.js Express back-end
    //console.log(mechanic.token);
    return { "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdjZjMwNzE1YzRjZTAyMzhlZThkYTgiLCJpYXQiOjE2NjkxOTk1NzQsImV4cCI6MTY2OTIwMzE3NH0.s68ppf6SzjbDYM8lGTt0tFh6pltkNEOvoXkSwZhnrVc" };
  } else {
    return {};
  }
}
