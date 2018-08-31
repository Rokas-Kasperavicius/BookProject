export const booksApi = () => {
  return fetch('/api/books')
    .then(res => res.json())
    .then(books => {
      return books;
    });
};

export const subjectsApi = () => {
  return fetch('/api/subjects')
    .then(res => res.json())
    .then(subjects => {
      return subjects;
  });
};

export const booksApiPost = books => {
  fetch('/api/books', {
    method: 'POST',
    body: JSON.stringify(books),
    headers: {"Content-Type": "application/json"}
  }).then( res => {
    console.log(`Sending books' data to API... Response status: ${res.status}`);
  });
};

export const login = values => {
   return fetch('/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {"Content-Type": "application/json"}})
       .then(res => res.json())
       .then(properties => {
         return properties;
     });
};

export const register = values => {
  return fetch('/register', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {"Content-Type": "application/json"}})
      .then(res => res.json())
      .then(errors => {
        return errors;
    });
};
