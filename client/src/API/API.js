import { NotificationManager } from 'react-notifications';
import { timeout } from '../Constants/Constants';

export const dataApiGet = id => {  //TODO: First make a check if cookie exist and then do all of API requests!!! (Create SuperAdmin role)
  return fetch('/api/dataGet', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {"Content-Type": "application/json"}})
    .then( res => res.json())
    .then(data => {
      return data;
    })
    .catch(() => {
      NotificationManager.error('Something went wrong. Please try again', '', timeout);
    });
};

export const booksApiPost = (book, id) => {
  return fetch('/api/books', {
    method: 'POST',
    body: JSON.stringify({ book, id }),
    headers: {"Content-Type": "application/json"}})
      .then( res => res.json())
      .then(books => {
        return books;
    })
    .catch(() => {
      NotificationManager.error('Something went wrong. Please try again', '', timeout);
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
     })
     .catch(() => {
       NotificationManager.error('Something went wrong. Please try again', '', timeout);
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
    })
    .catch(() => {
      NotificationManager.error('Something went wrong. Please try again', '', timeout);
    });
};
