const URL = "http://localhost:4000/api/v1/books";

async function addJobs() {
  const requests = [];

  for (let i = 1; i <= 10; i++) {
    requests.push(
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Book ${i}`,
          author: `Author ${i}`,
          price: i * 100,
        }),
      }),
    );
  }

  await Promise.all(requests);

  console.log("✅ 10 Jobs Added");
  const responses = await Promise.all(requests);

  console.log(responses.map((r) => r.status));
}

addJobs();
