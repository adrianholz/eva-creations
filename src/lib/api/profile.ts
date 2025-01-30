import { User } from "@/interfaces/user";

export async function apiGetProfile() : Promise<User> {
  return fetch('/api/profile').then((res) => res.json());
}

export async function apiUpdateProfile(data: {
  firstName: string;
  lastName: string;
  email: string;
}) : Promise<User> {
  return fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async(res) => {

    return await res.json();
  }).catch((error) => {
    console.error('Error:', error);
  });
}

export async function apiUpdatePassword(password: string) : Promise<User> {
  return fetch('/api/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  }).then((res) => res.json());
}